const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "unlockmysql",
  database: "shorturls",
});

con.connect(function (error) {
  if (error) {
    console.error("Database Connection FAILED", error);
    return;
  }
  console.log("Connected to the database");
});

app.post("/api/create-short-url", function (request, response) {
  // Your existing logic for creating a short URL
  let uniqueID = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]/gi, "")
    .substr(2, 10);
  let sql = `INSERT INTO links(longurl, shorturlid) VALUES('${request.body.longurl}', '${uniqueID}')`;
  con.query(sql, function (error, result) {
    if (error) {
      response.status(500).json({
        status: "notok",
        message: "OOPS! Something Went Wrong",
      });
    } else {
      response.status(200).json({
        status: "ok",
        shorturlid: uniqueID,
      });
    }
  });
});

app.get("/api/get-all-short-urls", function (request, response) {
  // Your existing logic for getting all short URLs
  let sql = `SELECT * FROM links`;
  con.query(sql, function (error, result) {
    if (error) {
      response.status(500).json({
        status: "notok",
        message: "OOPS! Something Went Wrong",
      });
    } else {
      response.status(200).json(result);
    }
  });
});

app.get("/:shorturlid", function (request, response) {
  // Your existing logic for redirecting short URLs
  let shorturlid = request.params.shorturlid;
  let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
  // console.log(shorturlid);
  con.query(sql, function (error, result) {
    if (error) {
      response.status(500).json({
        status: "notok",
        message: "OOPS! Something Went Wrong",
      });
    } else {
      sql = `UPDATE links SET count=${result[0].count + 1} WHERE id='${
        result[0].id
      }' LIMIT 1`;
      con.query(sql, function (error, result2) {
        if (error) {
          response.status(500).json({
            status: "notok",
            message: "OOPS! Something Went Wrong",
          });
        } else {
          response.redirect(result[0].longurl);
        }
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
