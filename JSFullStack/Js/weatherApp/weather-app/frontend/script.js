var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var temperatureValue = document.querySelector(".temperature span");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");
var time = document.querySelector(".time");
var content = document.querySelector(".content");
var body = document.querySelector("body");

async function changeWeatherUI(capitalSearch) {
  let apiUrl = `http://localhost:2402/api/weather?city=${capitalSearch}`;

  try {
    let res = await fetch(apiUrl);
    let data = await res.json();

    if (data.cod !== 200) throw new Error(data.message);

    city.innerText = data.name;
    country.innerText = data.sys.country;
    let temp = Math.floor(data.main.temp);
    temperatureValue.innerText = temp + "°C";
    let date = new Date(data.dt * 1000);
    time.innerText = date.toLocaleDateString();
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "m/s";
    sun.innerText = data.main.humidity + "%";
    shortDesc.innerText = data.weather[0].description;

    if (temp <= 19) {
      body.setAttribute("class", "cold");
    } else if (temp <= 22) {
      body.setAttribute("class", "warn");
    } else {
      body.setAttribute("class", "hot");
    }
  } catch (error) {
    alert("Lỗi: " + error.message);
  }
}

changeWeatherUI("Ho Chi Minh");

search.addEventListener("keypress", function (e) {
  let capitalSearch = search.value.trim();
  if (e.key === "Enter" && capitalSearch !== "") {
    changeWeatherUI(capitalSearch);
  }
});
