const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(5000, () => {
  console.log("local host 8080");
});
