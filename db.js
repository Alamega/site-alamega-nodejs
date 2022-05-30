const Pool = require("pg").Pool;

var pool;

try {
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    pool = new Pool({
      connectionString: "postgres://postgres:1111@localhost:5432/alamegas",
    });
  }
} catch (error) {
  console.log("Ошибка при подключении к базе данных.");
}

pool.query(
  `
CREATE TABLE IF NOT EXISTS users
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username varchar(40) UNIQUE NOT NULL,
    password text NOT NULL,
    role text
);
`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
    pool.end;
  }
);

module.exports = pool;
