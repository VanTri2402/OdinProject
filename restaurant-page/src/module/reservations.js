export const reservations = () => {
  const contentDiv = document.createElement("div");
  contentDiv.className = "reservations-container";

  contentDiv.innerHTML = `
      <div class="reservations-header">
        <h1>Make a Reservation</h1>
        <p>Book your table with us today!</p>
      </div>
      <div class="reservations-content">
        <div class="reservations-form">
          <h2>Reservation Form</h2>
          <form class="reservation-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <label for="date">Date</label>
              <input type="date" id="date" required />
            </div>
            <div class="form-group">
              <label for="time">Time</label>
              <input type="time" id="time" required />
            </div>
            <div class="form-group">
              <label for="guests">Number of Guests</label>
              <input type="number" id="guests" min="1" placeholder="Number of Guests" required />
            </div>
            <div class="form-group">
              <label for="notes">Special Requests</label>
              <textarea id="notes" placeholder="Any special requests?" rows="4"></textarea>
            </div>
            <button type="submit" class="submit-btn">Reserve Now</button>
          </form>
        </div>
        <div class="reservations-info">
          <h2>Reservation Information</h2>
          <p>We recommend booking in advance for weekends and holidays.</p>
          <p>For parties larger than 10, please contact us directly at (123) 456-7890.</p>
        </div>
      </div>
    `;

  console.log("Reservations content created:", contentDiv);
  return contentDiv;
};
