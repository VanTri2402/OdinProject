export const header = () => {
  const headerDiv = document.createElement("header");
  headerDiv.className = "main-header";

  headerDiv.innerHTML = `
      <div class="logo">Natural Dining</div>
      <nav class="nav-container">
        <button class="nav-btn home-tab">Home</button>
        <button class="nav-btn about-tab">About</button>
        <button class="nav-btn menu-tab">Menu</button>
        <button class="nav-btn reservations-tab">Reservations</button>
        <button class="nav-btn contact-tab">Contact</button>
      </nav>
      <div class="header-actions">
        <button class="cta-btn">Book Now</button>
      </div>
    `;

  console.log("Header created:", headerDiv);
  return headerDiv;
};
