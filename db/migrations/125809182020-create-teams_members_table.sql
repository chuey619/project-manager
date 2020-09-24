CREATE TABLE IF NOT EXISTS teams_members(
    id SERIAL PRIMARY KEY,
    team_id INTEGER,
    member_id INTEGER,
    UNIQUE (team_id, member_id),
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (member_id) REFERENCES users(id)
)