export const about = () => {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'about-container';
  
    contentDiv.innerHTML = `
      <div class="about-header">
        <h1>About Us</h1>
        <p>Discover the story behind Natural Dining</p>
      </div>
      <div class="about-content">
        <div class="about-story">
          <h2>Our Story</h2>
          <p>
            Natural Dining was founded with a passion for sustainable dining. We source our ingredients from local organic farms to bring you the freshest and most flavorful dishes.
          </p>
        </div>
        <div class="about-mission">
          <h2>Our Mission</h2>
          <p>
            We aim to provide a dining experience that nourishes both the body and the soul, all while promoting environmental sustainability.
          </p>
        </div>
        <div class="about-team">
          <h2>Meet Our Team</h2>
          <div class="team-members">
            <div class="team-card">
              <img src="https://via.placeholder.com/150x150?text=Chef+John" alt="Chef John" />
              <h3>Chef John</h3>
              <p>Head Chef</p>
            </div>
            <div class="team-card">
              <img src="https://via.placeholder.com/150x150?text=Manager+Emma" alt="Manager Emma" />
              <h3>Manager Emma</h3>
              <p>Restaurant Manager</p>
            </div>
          </div>
        </div>
      </div>
    `;
  
    console.log('About content created:', contentDiv);
    return contentDiv;
  };