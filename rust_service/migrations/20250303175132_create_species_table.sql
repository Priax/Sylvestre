-- Add migration script here

CREATE TABLE IF NOT EXISTS species (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

