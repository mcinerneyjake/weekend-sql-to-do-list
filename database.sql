CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"type" VARCHAR(100) NOT NULL,
	"importance" INTEGER,
	"complete" BOOLEAN,
	"notes" VARCHAR(500)
);

INSERT INTO "tasks"
("name", "type", "importance", "complete", "notes")
VALUES
('Rake Leaves', 'Yard', 3, false, 'Clear the leaves from the yard to prepare for the winter freeze.');