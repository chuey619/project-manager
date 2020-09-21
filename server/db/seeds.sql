INSERT INTO users
    (username, name, password_digest)
VALUES
    ('test', 'test', 'test'),
    ('test1', 'test1', 'test1'),
    ('test2', 'test2', 'test2');

INSERT INTO teams
    (name, team_lead)
VALUES
    ('test team1', 6),
    ('test team2', 7),
    ('test team3', 8);

INSERT INTO teams_members
(team_id, member_id)
VALUES
(4, 7),
(4, 8);

INSERT INTO projects
(team_id, name)
VALUES
(4, 'test project1'),
(4, 'test project2'),
(4, 'test project3');

INSERT INTO tasks
(project_id, title, description)
VALUES
(4, 'test task1', 'this task is a test1'),
(4, 'test task2', 'this task is a test2'),
(4, 'test task3', 'this task is a test3');

