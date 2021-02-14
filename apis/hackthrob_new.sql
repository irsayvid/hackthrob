START TRANSACTION;
SET timezone = "+00:00";


CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  genres string NOT NULL,
  languages string NOT NULL,
  category varchar(255) NOT NULL,
  location varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ;

COMMIT;
