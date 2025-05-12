document.addEventListener("DOMContentLoaded", () => {
  // === Preloader ===
  const preloader = document.querySelector(".preloader");
  window.addEventListener("load", () => {
    preloader.classList.add("loaded");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  // === Header Scroll Effect ===
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector(".menu-toggle");
  const navContainer = document.querySelector(".nav-container");

  if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
      navContainer.classList.toggle("active");
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        navContainer.classList.remove("active");
      });
    });
  }

  // === Active Navigation Link ===
  const navLinks = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll("section");

  const setActiveLink = () => {
    let index = sections.length;

    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index]?.classList.add("active");
  };

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // Initial call

  // === Smooth Scroll ===
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // === Fade Up Animation on Scroll ===
  const fadeElements = document.querySelectorAll(".fade-up");

  const revealElements = () => {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealElements);
  revealElements(); // Initial call

  // === Menu Gallery Tabs ===
  const menuTabButtons = document.querySelectorAll(".menu-tab-btn");
  const menuGalleryItems = document.querySelectorAll(".menu-gallery-item");

  menuTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      menuTabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Get category from data attribute
      const category = button.getAttribute("data-category");

      // Show/hide gallery items
      menuGalleryItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.classList.add("show");
        } else {
          item.classList.remove("show");
        }
      });
    });
  });

  // === Testimonial Slider ===
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  let currentSlide = 0;

  const showSlide = (index) => {
    testimonialSlides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  };

  // Initialize slider
  showSlide(currentSlide);

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  // === Form Validation ===
  const reservationForm = document.querySelector(".reservation-form");
  const contactForm = document.querySelector(".contact-form form");
  const newsletterForm = document.querySelector(".newsletter-form");

  const validateForm = (form, e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ff5555";
        input.placeholder = "This field is required";
      } else {
        input.style.borderColor = "var(--color-primary)";
      }
    });

    if (isValid) {
      // For demo purposes, just show an alert
      alert("Form submitted successfully!");
      form.reset();
    }
  };

  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) =>
      validateForm(reservationForm, e)
    );
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => validateForm(contactForm, e));
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (
        emailInput.value.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
      ) {
        alert("Thank you for subscribing!");
        newsletterForm.reset();
      } else {
        emailInput.style.borderColor = "#ff5555";
        emailInput.placeholder = "Please enter a valid email";
      }
    });
  }

  // === Parallax Effect ===
  const parallaxSections = document.querySelectorAll(".parallax-section");

  window.addEventListener("scroll", () => {
    parallaxSections.forEach((section) => {
      const scrolled = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrolled >= sectionTop - window.innerHeight &&
        scrolled <= sectionTop + sectionHeight
      ) {
        const parallaxValue = (scrolled - sectionTop) * 0.5;
        section.style.backgroundPositionY = `${parallaxValue}px`;
      }
    });
  });
});
