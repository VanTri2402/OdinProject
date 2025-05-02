export const contact = () => {
  const contentDiv = document.createElement("div");
  contentDiv.className = "contact-container";

  contentDiv.innerHTML = `
    <div class="contact-header">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you!</p>
    </div>
    <div class="contact-content">
      <div class="contact-info">
        <div class="contact-card">
          <i class="fas fa-phone"></i>
          <h3>Phone</h3>
          <p>(123) 456-7890</p>
        </div>
        <div class="contact-card">
          <i class="fas fa-envelope"></i>
          <h3>Email</h3>
          <p>info@naturaldining.com</p>
        </div>
        <div class="contact-card">
          <i class="fas fa-map-marker-alt"></i>
          <h3>Address</h3>
          <p>123 Nature Lane, Green City</p>
        </div>
      </div>
      <div class="contact-form">
        <h3>Send Us a Message</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  `;

  console.log("Contact content created:", contentDiv);
  return contentDiv;
};
