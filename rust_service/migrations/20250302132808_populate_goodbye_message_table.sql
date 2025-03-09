-- Add migration script here

INSERT INTO goodbye_messages (name, message)
SELECT 'Priax', 'Goodbye, Priax!'
WHERE NOT EXISTS (SELECT 1 FROM goodbye_messages WHERE name = 'Priax');

INSERT INTO goodbye_messages (name, message)
SELECT 'Alice', 'Rawr Alice !'
WHERE NOT EXISTS (SELECT 1 FROM goodbye_messages WHERE name = 'Alice');

