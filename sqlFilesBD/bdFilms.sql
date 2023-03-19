CREATE DATABASE dbFilms

CREATE TABLE Film (
  id_film serial PRIMARY KEY,
  name varchar(120) NOT NULL,
  year int2 NOT NULL CHECK (year >= 1895)
);

CREATE TABLE Genre (
  id_genre serial PRIMARY KEY,
  name varchar(60) NOT NULL,
  id_film int,
  CONSTRAINT FK_Genre_film
    FOREIGN KEY (id_film)
      REFERENCES Film(id_film)
        ON DELETE CASCADE
);

