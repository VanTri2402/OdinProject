export const footer = () => {
    const footerDiv = document.createElement('footer');
    footerDiv.className = 'main-footer';
  
    footerDiv.innerHTML = `
      <div class="footer-content">
        <div class="footer-section">
          <h4>Contact</h4>
          <p>(123) 456-7890</p>
          <p>info@naturaldining.com</p>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <p>&copy; 2025 Natural Dining. All rights reserved.</p>
        </div>
      </div>
    `;
  
    console.log('Footer created:', footerDiv);
    return footerDiv;
  };