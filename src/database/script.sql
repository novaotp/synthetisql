-- Initializes the project's database
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

CREATE TABLE account(
  id SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE diagram(
  id SERIAL NOT NULL PRIMARY KEY,
  account_id INT NOT NULL,
  title VARCHAR NOT NULL,
  data TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_diagram_account FOREIGN KEY (account_id) REFERENCES account (id)
);