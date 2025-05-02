export const menutab = () => {
  const contentDiv = document.createElement("div");
  contentDiv.className = "menu-container";

  contentDiv.innerHTML = `
    <h1>Our Menu</h1>
    <div class="menu-items">
      <div class="menu-card">
        <h3>Organic Salad</h3>
        <p>Fresh greens with house dressing</p>
        <span>$12</span>
      </div>
      <div class="menu-card">
        <h3>Grilled Salmon</h3>
        <p>Wild-caught salmon with herbs</p>
        <span>$25</span>
      </div>
      <div class="menu-card">
        <h3>Vegetarian Pasta</h3>
        <p>Pasta with seasonal vegetables</p>
        <span>$18</span>
      </div>
    </div>
  `;

  console.log("Menu content created:", contentDiv);
  return contentDiv;
};
