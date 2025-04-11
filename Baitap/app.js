var btn = document.getElementById("btn");
let light = document.querySelector(".light");

let toggleBtn = () => {
  if (!btn.classList.contains("active")) {
    btn.classList.add("active");
    light.classList.add("on");
  } else {
    btn.classList.remove("active");
    light.classList.remove("on");
  }
};
