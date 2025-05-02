export const home = () => {
  const contentDiv = document.createElement("div");
  contentDiv.className = "home-container";

  contentDiv.innerHTML = `
    <div class="banner">
      <div class="banner-text">
        <h1>Welcome to Natural Dining</h1>
        <p>Experience the finest organic cuisine in a serene environment.</p>
        <button class="cta-btn">Book a Table</button>
      </div>
      <div class="banner-image">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Restaurant View" />
      </div>
    </div>
  `;

  return contentDiv;
};
