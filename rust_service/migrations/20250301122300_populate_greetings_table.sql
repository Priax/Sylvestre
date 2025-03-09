-- 20250301122300_populate_greetings_table.sql

INSERT INTO greetings (name, message)
SELECT 'Priax', 'Hello, Priax!'
WHERE NOT EXISTS (SELECT 1 FROM greetings WHERE name = 'Priax');

INSERT INTO greetings (name, message)
SELECT 'Alice', '=3= Alice'
WHERE NOT EXISTS (SELECT 1 FROM greetings WHERE name = 'Alice');

