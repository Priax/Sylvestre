-- Add migration script here

CREATE TABLE IF NOT EXISTS goodbye_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL
);

