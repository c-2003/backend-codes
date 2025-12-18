# Healthcare Service API

/healthcare-service-api
│
├── /models
│   └── Service.models.js

│
├── /routes
│   └── Route.js

│
├── /controllers
│   └── Controller.js

│
├── app.js

├── package.json

└── .env


## Setup Instructions

1. Clone the repository:
git clone <https://github.com/Mayanks08/Backend-codes/edit/main/Health_service>

cd healthcare-service-api
 
 Install dependencies:

    npm install

    
npm install express mongoose body-parser

    npm install --save-dev nodemon


Create a .env file and add your MongoDB 

connection string:
MONGO_URI=mongodb://localhost:27017/healthcare_services
 
Start the server:

npm start

API Endpoints
[POST /api/services: Add a new healthcare service] 

[GET /api/services: Get all services]

[PUT /api/services/:id: Update a service by ID]

[DELETE /api/services/:id: Delete a service by ID]

