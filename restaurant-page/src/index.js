import "./styles.css";
import { home } from "./module/home";
import { about } from "./module/about"; // Thêm About
import { menutab } from "./module/menu";
import { reservations } from "./module/reservations"; // Thêm Reservations
import { contact } from "./module/contact";
import { header } from "./module/header";
import { footer } from "./module/footer";

console.log("Restaurant Page is running!");

const headerElement = document.getElementById("header");
const content = document.getElementById("content");
const footerElement = document.getElementById("footer");

// Thêm header và footer
try {
  headerElement.appendChild(header());
  footerElement.appendChild(footer());
} catch (error) {
  console.error("Error appending header or footer:", error);
}

function clearContent() {
  content.innerHTML = "";
}

function displayTab(tabFunction) {
  clearContent();
  const tabContent = tabFunction();
  console.log("Displaying tab content:", tabContent);
  if (tabContent instanceof Node) {
    content.appendChild(tabContent);
  } else {
    console.error("tabContent is not a Node:", tabContent);
  }
}

displayTab(home);

// Cập nhật sự kiện cho 5 tab
const homeTab = document.querySelector(".home-tab");
const aboutTab = document.querySelector(".about-tab");
const menuTab = document.querySelector(".menu-tab");
const reservationsTab = document.querySelector(".reservations-tab");
const contactTab = document.querySelector(".contact-tab");

homeTab.addEventListener("click", () => displayTab(home));
aboutTab.addEventListener("click", () => displayTab(about));
menuTab.addEventListener("click", () => displayTab(menutab));
reservationsTab.addEventListener("click", () => displayTab(reservations));
contactTab.addEventListener("click", () => displayTab(contact));
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  animateElements.forEach((el) => observer.observe(el));
});
