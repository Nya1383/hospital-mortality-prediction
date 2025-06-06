import firebase_admin
from firebase_admin import credentials, firestore
import os
from django.conf import settings
import uuid
from collections import defaultdict

class Q:
    """Simple Q object implementation for Firestore queries"""
    def __init__(self, **kwargs):
        self.filters = kwargs
    
    def __and__(self, other):
        combined = Q()
        combined.filters = {**self.filters, **other.filters}
        return combined
    
    def __or__(self, other):
        # For simplicity, we'll just use the first filter for OR operations
        # In a full implementation, you'd need more complex logic
        return self

class FirestoreClient:
    _instance = None
    _db = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirestoreClient, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if self._db is None:
            self.initialize_firestore()

    def initialize_firestore(self):
        try:
            # Initialize Firebase Admin SDK
            if not firebase_admin._apps:
                # You'll need to place your serviceAccountKey.json in the project root
                service_account_path = os.path.join(settings.BASE_DIR, 'serviceAccountKey.json')
                if os.path.exists(service_account_path):
                    cred = credentials.Certificate(service_account_path)
                    firebase_admin.initialize_app(cred)
                else:
                    # For development, you can use default credentials
                    firebase_admin.initialize_app()
            
            self._db = firestore.client()
            print("Firestore initialized successfully")
        except Exception as e:
            print(f"Error initializing Firestore: {e}")
            # Fallback for development
            try:
                firebase_admin.initialize_app()
                self._db = firestore.client()
                print("Firestore initialized with default credentials")
            except Exception as e2:
                print(f"Failed to initialize Firestore: {e2}")

    def get_db(self):
        return self._db

class FirestoreQuerySet:
    def __init__(self, collection_name, db):
        self.collection_name = collection_name
        self.db = db
        self.filters = []
        self._data = None

    def filter(self, *args, **kwargs):
        new_qs = FirestoreQuerySet(self.collection_name, self.db)
        new_qs.filters = self.filters.copy()
        
        # Handle Q objects
        for arg in args:
            if isinstance(arg, Q):
                for key, value in arg.filters.items():
                    new_qs.filters.append((key, '==', value))
        
        # Handle regular kwargs
        for key, value in kwargs.items():
            if '__' in key:
                # Handle Django-style filters like Q objects
                field, operator = key.split('__', 1)
                if operator == 'icontains':
                    # For text search, we'll need to implement this differently
                    new_qs.filters.append((field, '>=', value))
                    new_qs.filters.append((field, '<=', value + '\uf8ff'))
                else:
                    new_qs.filters.append((field, '==', value))
            else:
                new_qs.filters.append((key, '==', value))
        return new_qs

    def all(self):
        new_qs = FirestoreQuerySet(self.collection_name, self.db)
        new_qs.filters = self.filters.copy()
        return new_qs

    def count(self):
        data = self._get_data()
        return len(data)

    def annotate(self, **kwargs):
        """Handle Django-style annotations for aggregations"""
        # For simplicity, return self - aggregations will be handled in values()
        return self

    def values(self, *fields):
        """Handle Django-style values() queries with aggregations"""
        data = self._get_data()
        result = []
        
        # Group data for aggregations
        groups = defaultdict(list)
        
        for doc in data:
            if len(fields) == 1:
                key = getattr(doc, fields[0], None)
                groups[key].append(doc)
            else:
                # For multiple fields, create a tuple key
                key_values = tuple(getattr(doc, field, None) for field in fields)
                groups[key_values].append(doc)
        
        # Convert groups to result format
        for key, docs in groups.items():
            if len(fields) == 1:
                result.append({fields[0]: key, 'dcount': len(docs)})
            else:
                doc_dict = {}
                if isinstance(key, tuple):
                    for i, field in enumerate(fields):
                        doc_dict[field] = key[i]
                else:
                    doc_dict[fields[0]] = key
                doc_dict['dcount'] = len(docs)
                result.append(doc_dict)
        
        return result

    def delete(self):
        """Delete all documents in this queryset"""
        if self.db is None:
            return
            
        data = self._get_data()
        for doc in data:
            self.db.collection(self.collection_name).document(doc.id).delete()

    def _get_data(self):
        if self._data is None:
            if self.db is None:
                self._data = []
                return self._data
                
            query = self.db.collection(self.collection_name)
            for field, operator, value in self.filters:
                query = query.where(field, operator, value)
            
            docs = query.stream()
            self._data = []
            for doc in docs:
                doc_data = doc.to_dict()
                doc_data['id'] = doc.id
                self._data.append(FirestoreDocument(doc_data))
        return self._data

    def __iter__(self):
        return iter(self._get_data())

    def __len__(self):
        return len(self._get_data())

    def get(self, **kwargs):
        filtered_qs = self.filter(**kwargs)
        data = filtered_qs._get_data()
        if not data:
            raise Exception("Document not found")
        return data[0]

class FirestoreDocument:
    def __init__(self, data):
        for key, value in data.items():
            setattr(self, key, value)

# Custom model manager for Firestore
class FirestoreManager:
    def __init__(self, collection_name):
        self.collection_name = collection_name
        self.client = FirestoreClient()
        self.db = self.client.get_db()

    def create(self, **kwargs):
        if self.db is None:
            return FirestoreDocument(kwargs)
            
        doc_id = str(uuid.uuid4())
        kwargs['id'] = doc_id
        doc_ref = self.db.collection(self.collection_name).document(doc_id)
        doc_ref.set(kwargs)
        return FirestoreDocument(kwargs)

    def all(self):
        if self.db is None:
            return FirestoreQuerySet(self.collection_name, None)
        return FirestoreQuerySet(self.collection_name, self.db)

    def filter(self, *args, **kwargs):
        qs = self.all()
        return qs.filter(*args, **kwargs)

    def get(self, **kwargs):
        return self.filter(**kwargs).get()

    def values(self, *fields):
        """For Django-style values() queries used in charts"""
        return self.all().values(*fields)

    def delete_all(self):
        """Delete all documents in the collection"""
        return self.all().delete()

# Add Count and Avg functions for compatibility
class Count:
    def __init__(self, field):
        self.field = field

class Avg:
    def __init__(self, field):
        self.field = field 