
-- Initializes the project's database

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE account(
  id SERIAL NOT NULL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE diagram(
  id SERIAL NOT NULL PRIMARY KEY,
  accountId INT NOT NULL,
  data JSONB NOT NULL,
  CONSTRAINT fkDiagramUser FOREIGN KEY (accountId) REFERENCES account (id)
);
