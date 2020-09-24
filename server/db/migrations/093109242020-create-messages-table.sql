CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER,
    project_id INTEGER,
    
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);