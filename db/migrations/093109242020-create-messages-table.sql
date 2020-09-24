CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER,
    project_id INTEGER,
    sender VARCHAR(255),
    body VARCHAR(255),
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);