CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    title VARCHAR(255),
    description VARCHAR(255),
    completed_by INTEGER REFERENCES users(id) DEFAULT null
);