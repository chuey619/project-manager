CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    name VARCHAR(255),
    password_digest VARCHAR(255),
    UNIQUE (username, name)
)


