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
    type VARCHAR(50) NOT NULL,          -- npr. 'slow-response'
    response_time INT NOT NULL,         -- vrijeme koje je izazvalo problem
    created_at TIMESTAMP DEFAULT NOW()
);

