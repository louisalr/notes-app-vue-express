CREATE DATABASE notes_express; 
USE notes_express;

CREATE TABLE notes ( 
    id integer PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL, 
    informations TEXT NOT NULL, 
    isFavorite BOOLEAN NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    dueDate TIMESTAMP NULL
);


INSERT INTO notes (title, informations, isFavorite) 
VALUES ('My first note', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor risus vitae lorem tempus, vitae suscipit libero iaculis.', FALSE);
INSERT INTO notes (title, informations, isFavorite, dueDate) VALUES ('My second note', 'Aenean non vestibulum diam.', TRUE, "2023-04-25");
INSERT INTO notes (title, informations, isFavorite, dueDate) VALUES ('My third note', 'Nullam at purus faucibus, consequat velit sed, commodo elit.', TRUE, "2023-06-15");
