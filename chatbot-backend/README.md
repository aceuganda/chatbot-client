## Server side: Flask:
### Steps:
1. create .env file 
  ```
    DB_NAME=
    CLUSTER_URL=
    GOOGLE_CLIENT_ID=
    SECRET_KEY=
    ALGORITHM=
    PROJECT_ID=
    BACKEND_URL=http://127.0.0.1:5000
    FRONTEND_URL=http://localhost:3000
  ```
2. Go to https://console.cloud.google.com/ and create client secrets and configuration file
3. Save as client_secret.json
4. Use the commands to start the server locally.
  ```
    cd chatbot-backend
    pip install virtualenv
    virtualenv env
    cd env/Scripts
    activate
    cd ..
    cd ..
    pip install -r requirements.txt
    python app.py
  ```
