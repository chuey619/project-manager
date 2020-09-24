CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id),
    name VARCHAR(255),
    description VARCHAR(255),
    is_completed BOOLEAN DEFAULT FALSE,
    UNIQUE(team_id, name)
);