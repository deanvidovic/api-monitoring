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

-- INSERT INTO requests (method, path, response, statusCode, responseTime, description)
-- VALUES ('GET', '/posts', '{"id":1,"title":"Test post"}', 200, 123, 'Test request');

-- SELECT * FROM requests
-- ORDER BY createdAt DESC;

-- SELECT * FROM requests
-- WHERE method = 'GET' AND responseTime < 200
-- ORDER BY responseTime ASC;
