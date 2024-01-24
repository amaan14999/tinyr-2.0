# Tinyr 2.0 - URL Shortener

Tinyr is a simple and efficient URL shortener that allows users to convert long URLs into shorter, more manageable links. It provides a user-friendly web interface for URL input, validation, shortening, and tracking.

> <em>The Original Repository can be found [here](https://github.com/amaan14999/tinyr). The Migration was done to make the project more modular and easier to maintain. This new version is built in React and uses a NodeJS backend.</em>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Shortens long URLs to concise and memorable links.
- Validates entered URLs to ensure their correctness.
- Stores both the original long URLs and their shortened versions in a MySQL database.
- Displays a table showing the long URL, corresponding short URL, and the click count.
- Tracks the number of times each shortened link is accessed, providing valuable engagement metrics.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/amaan14999/tinyr-2.0.git
```

2. Navigate to the project directory:

```bash
cd tinyr-2.0
```

3. Navigate to the frontend directory:

```bash
cd ../frontend/
```

4. Install the dependencies:

```bash
npm install
```

5. Set up the MySQL database:

- Login to MySQL as root:

```bash
mysql -u root -p
Enter password: <your_password>
```

- Create the database and table:

```sql
mysql> CREATE DATABASE shorturls;

mysql> USE shorturls;

mysql> CREATE TABLE links (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    longurl VARCHAR(255),
    shorturlid VARCHAR(255),
    count INT(11) DEFAULT 0
);
```

- It should output something like this:

```bash
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| longurl    | varchar(255) | YES  |     | NULL    |                |
| shorturlid | varchar(255) | YES  |     | NULL    |                |
| count      | int          | YES  |     | 0       |                |
| id         | int          | NO   | PRI | NULL    | auto_increment |
+------------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```

- Grant privileges to the root user and set a password by replacing `your_new_password` with your desired password:

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';

```

- Flush Priviles(<em>to reload the grant tables in the database, ensuring that changes to privileges or new permissions are applied immediately.</em>):

```sql
mysql> FLUSH PRIVILEGES;
```

6. Edit the database credentials in the `../backend/server.js` file:

```js
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "unlockmysql",
  database: "shorturls",
});
```

7. Start the server:

```bash
cd ../backend/
node server.js
```

8. Start the client:

```bash
cd ../frontend/
npm run dev
```

9. Open the application in your browser:

```bash
http://localhost:5173
```

10. Enjoy!

## Technologies Used

- React
- Node.js
- Express.js
- MySQL

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT](https://github.com/amaan14999/tinyr/blob/main/LICENSE) License.
