# API Monitoring 

This repository contains the backend logic for the API Monitor & Analytics Platform, built with Node.js/Express.js and a PostgreSQL database. Its primary function is logging, storage, and exposing RESTful endpoints for tracking API requests and detected problems.

## Project setup and running

**1. CLONE THE REPOSITORY** 
```
git clone https://github.com/deanvidovic/api-monitoring.git
cd api-monitoring

```
**2. INSTALL DEPENDENCIES** 
```
npm install
```
**3. DATABASE CONFIGURATION (PostgreSQL)**

You will need a running instance of a **PostgreSQL** database.

**A. Create the `.env` File**
   
Create a file named .env in the project root directory and define your connection parameters exactly as provided:
```
# PostgreSQL Connection
PGUSER=postgres
PGPASSWORD=your_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=postgres

# Server Configuration
PORT=8080
```

**B. Initialize the Schema**
```
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    method VARCHAR(10) NOT NULL,
    path VARCHAR(255) NOT NULL,
    response TEXT NOT NULL,
    statusCode INT,
    responseTime INT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    description VARCHAR(255)
);

CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    request_id INT NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    response_time INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**4. RUNNING THE SERVER**

To start the server with automatic restart (e.g., using nodemon):
```
npm run dev
```

**5. SENDING REQUESTS TO THE API MONITOR**

To add requests to the monitoring system, you can send a POST request via Postman to the endpoint:
```bash
POST http://localhost:8080/api/send/requests
```

**Request body example:**
```bash
{
  "method": "POST",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "data": null
}
```

--`method`: HTTP method of the request you want to monitor (`GET`, `POST`, etc.)
--`url`: URL of the target API (can be any valid API endpoint)
--`data`: Optional payload for the request (can be `null` if not needed)
