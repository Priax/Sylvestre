-- 20250301122211_create_greetings_table.sql

CREATE TABLE IF NOT EXISTS greetings (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL
);

