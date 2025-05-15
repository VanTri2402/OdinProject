require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 2402;

app.use(cors()); // Cho phép CORS

// Route test để kiểm tra server hoạt động
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Route gọi API thời tiết
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "2ee3b3210dda34c736ad85655cda8280"; // Sửa đúng tên biến
  console.log(req);
  if (!city) {
    return res.status(400).json({ error: "Thiếu tham số city" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Lỗi khi gọi OpenWeather API", details: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy server chạy tại http://localhost:${PORT}`)
);
