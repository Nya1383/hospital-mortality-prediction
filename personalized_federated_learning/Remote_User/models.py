from django.db import models
from django.db.models import CASCADE
import sys
import os
# Add the parent directory to the path to import firestore_backend
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)

try:
    from firestore_backend import FirestoreManager
except ImportError:
    # Fallback for development
    class FirestoreManager:
        def __init__(self, collection_name):
            self.collection_name = collection_name
        
        def create(self, **kwargs):
            return type('MockObject', (), kwargs)()
        
        def all(self):
            return []
        
        def filter(self, **kwargs):
            return self
        
        def get(self, **kwargs):
            raise Exception("Object not found")
        
        def values(self, *fields):
            return []
        
        def delete_all(self):
            pass

# Create your models here.

class ClientRegister_Model:
    objects = FirestoreManager('client_register')
    
    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.username = kwargs.get('username')
        self.email = kwargs.get('email')
        self.password = kwargs.get('password')
        self.phoneno = kwargs.get('phoneno')
        self.country = kwargs.get('country')
        self.state = kwargs.get('state')
        self.city = kwargs.get('city')
        self.gender = kwargs.get('gender')
        self.address = kwargs.get('address')

class mortality_prediction:
    objects = FirestoreManager('mortality_predictions')
    
    def __init__(self, **kwargs):
        self.Fid = kwargs.get('Fid')
        self.PatientId = kwargs.get('PatientId')
        self.ICU_AppointmentID = kwargs.get('ICU_AppointmentID')
        self.Gender = kwargs.get('Gender')
        self.ScheduledDay = kwargs.get('ScheduledDay')
        self.AppointmentDay = kwargs.get('AppointmentDay')
        self.Age = kwargs.get('Age')
        self.Scheduled_Doctor = kwargs.get('Scheduled_Doctor')
        self.Scholarship = kwargs.get('Scholarship')
        self.Hipertension = kwargs.get('Hipertension')
        self.Diabetes = kwargs.get('Diabetes')
        self.Alcoholism = kwargs.get('Alcoholism')
        self.Handcap = kwargs.get('Handcap')
        self.SMS_received = kwargs.get('SMS_received')
        self.Patient_Diagnosis = kwargs.get('Patient_Diagnosis')
        self.Prediction = kwargs.get('Prediction')

class detection_accuracy:
    objects = FirestoreManager('detection_accuracy')
    
    def __init__(self, **kwargs):
        self.names = kwargs.get('names')
        self.ratio = kwargs.get('ratio')

class detection_ratio:
    objects = FirestoreManager('detection_ratio')
    
    def __init__(self, **kwargs):
        self.names = kwargs.get('names')
        self.ratio = kwargs.get('ratio')

# Keep the original Django models for compatibility (but they won't be used)
class ClientRegister_Model_Original(models.Model):
    username = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    password = models.CharField(max_length=10)
    phoneno = models.CharField(max_length=10)
    country = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    gender= models.CharField(max_length=30)
    address= models.CharField(max_length=30)

class mortality_prediction_original(models.Model):
    Fid= models.CharField(max_length=300)
    PatientId= models.CharField(max_length=300)
    ICU_AppointmentID= models.CharField(max_length=300)
    Gender= models.CharField(max_length=300)
    ScheduledDay= models.CharField(max_length=300)
    AppointmentDay= models.CharField(max_length=300)
    Age= models.CharField(max_length=300)
    Scheduled_Doctor= models.CharField(max_length=300)
    Scholarship= models.CharField(max_length=300)
    Hipertension= models.CharField(max_length=300)
    Diabetes= models.CharField(max_length=300)
    Alcoholism= models.CharField(max_length=300)
    Handcap= models.CharField(max_length=300)
    SMS_received= models.CharField(max_length=300)
    Patient_Diagnosis= models.CharField(max_length=300)
    Prediction= models.CharField(max_length=300)

class detection_accuracy_original(models.Model):
    names = models.CharField(max_length=300)
    ratio = models.CharField(max_length=300)

class detection_ratio_original(models.Model):
    names = models.CharField(max_length=300)
    ratio = models.CharField(max_length=300)



