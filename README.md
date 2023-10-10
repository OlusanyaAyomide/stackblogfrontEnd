##About Project
This is a blogApplication which is bootstrapped using create-next-app and django-admin startapp

##SetUp client
To setUp the application navigate to the root directoy of the project
  clone this repository
  #Installations:
  npm install
  #Development server
  npm run dev by default runs on port 3000
  #envConfiguration
    NEXT_PUBLIC_URL = https://stackblog.pythonanywhere.com
    NEXT_PUBLIC_GOOGLE_KEY = Create a new project on googleCloud console and create a new credentials application //
                            (https://console.cloud.google.com/apis/credentials) to get started
    NEXT_PUBLIC_CLOUDINARY_PRESET = Create a cloudinary,create a new preset and copy your preset namw
    NEXT_PUBLIC_CLOUD_NAME = Create a cloudinary account and copy your cloudinary name

    The four env keys are required to start the proect

#setUpserver
  The repository to the server side code can be found at https://github.com/OlusanyaAyomide/stackblogbackend.git
  clone the server repository
  #Installations:
  This is a django project and requires a python environment
  to install all modules run  
  pip install -r requirements.txt
  #Development server
  python manage.py runserver dy default runs on port 8000
  No database migration is required
  
  

