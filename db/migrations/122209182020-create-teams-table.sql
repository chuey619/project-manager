CREATE TABLE teams
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    team_lead INT,
    FOREIGN KEY
    (team_lead) REFERENCES users
    (id)
);