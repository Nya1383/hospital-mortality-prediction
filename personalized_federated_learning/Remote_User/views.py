from django.db.models import Count
from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import VotingClassifier
# Create your views here.
from Remote_User.models import ClientRegister_Model,mortality_prediction,detection_ratio,detection_accuracy

def login(request):


    if request.method == "POST" and 'submit1' in request.POST:

        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            enter = ClientRegister_Model.objects.get(username=username,password=password)
            request.session["userid"] = enter.id

            return redirect('ViewYourProfile')
        except:
            pass

    return render(request,'RUser/login.html')

def index(request):
    return render(request, 'RUser/index.html')

def Add_DataSet_Details(request):

    return render(request, 'RUser/Add_DataSet_Details.html', {"excel_data": ''})


def Register1(request):

    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        phoneno = request.POST.get('phoneno')
        country = request.POST.get('country')
        state = request.POST.get('state')
        city = request.POST.get('city')
        address = request.POST.get('address')
        gender = request.POST.get('gender')
        ClientRegister_Model.objects.create(username=username, email=email, password=password, phoneno=phoneno,
                                            country=country, state=state, city=city,address=address,gender=gender)

        obj = "Registered Successfully"
        return render(request, 'RUser/Register1.html',{'object':obj})
    else:
        return render(request,'RUser/Register1.html')

def ViewYourProfile(request):
    userid = request.session['userid']
    obj = ClientRegister_Model.objects.get(id= userid)
    return render(request,'RUser/ViewYourProfile.html',{'object':obj})


def Predict_Hospital_Morality_Prediction(request):
    if request.method == "POST":

        if request.method == "POST":

            Fid= request.POST.get('Fid')
            PatientId= request.POST.get('PatientId')
            ICU_AppointmentID= request.POST.get('ICU_AppointmentID')
            Gender= request.POST.get('Gender')
            ScheduledDay= request.POST.get('ScheduledDay')
            AppointmentDay= request.POST.get('AppointmentDay')
            Age= request.POST.get('Age')
            Scheduled_Doctor= request.POST.get('Scheduled_Doctor')
            Scholarship= request.POST.get('Scholarship')
            Hipertension= request.POST.get('Hipertension')
            Diabetes= request.POST.get('Diabetes')
            Alcoholism= request.POST.get('Alcoholism')
            Handcap= request.POST.get('Handcap')
            SMS_received= request.POST.get('SMS_received')
            Patient_Diagnosis= request.POST.get('Patient_Diagnosis')

        df = pd.read_csv('Datasets.csv')

        def apply_response(Label):
            if (Label == 0):
                return 0  # Good
            elif(Label==1):
                return 1  # Bad

        df['results'] = df['Label'].apply(apply_response)


        X = df['Fid'].apply(str)
        y = df['results']

        print("Fid")
        print(X)
        print("Results")
        print(y)

        cv = CountVectorizer()
        X = cv.fit_transform(X)

        models = []
        from sklearn.model_selection import train_test_split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20)
        X_train.shape, X_test.shape, y_train.shape


        # SVM Model
        print("SVM")
        from sklearn import svm

        lin_clf = svm.LinearSVC()
        lin_clf.fit(X_train, y_train)
        predict_svm = lin_clf.predict(X_test)
        svm_acc = accuracy_score(y_test, predict_svm) * 100
        print("ACCURACY")
        print(svm_acc)
        print("CLASSIFICATION REPORT")
        print(classification_report(y_test, predict_svm))
        print("CONFUSION MATRIX")
        print(confusion_matrix(y_test, predict_svm))
        models.append(('svm', lin_clf))


        print("SGD Classifier")
        from sklearn.linear_model import SGDClassifier
        sgd_clf = SGDClassifier(loss='hinge', penalty='l2', random_state=0)
        sgd_clf.fit(X_train, y_train)
        sgdpredict = sgd_clf.predict(X_test)
        print("ACCURACY")
        print(accuracy_score(y_test, sgdpredict) * 100)
        print("CLASSIFICATION REPORT")
        print(classification_report(y_test, sgdpredict))
        print("CONFUSION MATRIX")
        print(confusion_matrix(y_test, sgdpredict))
        models.append(('SGDClassifier', sgd_clf))

        classifier = VotingClassifier(models)
        classifier.fit(X_train, y_train)
        y_pred = classifier.predict(X_test)

        Fid1 = [Fid]
        vector1 = cv.transform(Fid1).toarray()
        predict_text = classifier.predict(vector1)

        pred = str(predict_text).replace("[", "")
        pred1 = pred.replace("]", "")

        prediction = int(pred1)

        if (prediction == 0):
            val = 'Good'
        elif (prediction == 1):
            val = 'Bad'

        print(val)
        print(pred1)

        mortality_prediction.objects.create(
        Fid=Fid,
        PatientId=PatientId,
        ICU_AppointmentID=ICU_AppointmentID,
        Gender=Gender,
        ScheduledDay=ScheduledDay,
        AppointmentDay=AppointmentDay,
        Age=Age,
        Scheduled_Doctor=Scheduled_Doctor,
        Scholarship=Scholarship,
        Hipertension=Hipertension,
        Diabetes=Diabetes,
        Alcoholism=Alcoholism,
        Handcap=Handcap,
        SMS_received=SMS_received,
        Patient_Diagnosis=Patient_Diagnosis,
        Prediction=val)

        return render(request, 'RUser/Predict_Hospital_Morality_Prediction.html',{'objs': val})
    return render(request, 'RUser/Predict_Hospital_Morality_Prediction.html')



