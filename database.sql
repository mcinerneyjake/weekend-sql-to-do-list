CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"type" VARCHAR(100) NOT NULL,
	"importance" VARCHAR(20) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(500)
);

INSERT INTO "tasks"
("name", "type", "importance", "notes")
VALUES
('Rake Leaves', 'Yard', '3', 'Clear the leaves from the yard to prepare for the winter freeze.');