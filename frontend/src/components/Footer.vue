<script setup>
const year = new Date().getFullYear()
const phone = '0729641199'
const phoneIntl = '+254729641199'
</script>

<template>
  <footer class="footer">

    <div class="footer-container">

      <div class="footer-brand">
        <h2>CAMTISH</h2>
        <p class="tagline">Quality equipment. Seamless events. Every time.</p>

        <div class="footer-socials">
          <a :href="`tel:${phoneIntl}`" aria-label="Call us">📞</a>
          <a href="https://wa.me/254729641199" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
          <a href="mailto:camtish40@gmail.com" aria-label="Email">✉️</a>
        </div>
      </div>

      <div class="footer-column">
        <h3>Perfect For</h3>
        <ul>
          <li>Weddings</li>
          <li>Corporate Events</li>
          <li>Private Parties</li>
          <li>Church Functions</li>
          <li>Birthdays</li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Explore</h3>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/Appliances">Appliances</RouterLink></li>
          <li><RouterLink to="/RequestQuote">Request Quote</RouterLink></li>
          <li><RouterLink to="/Login">Login</RouterLink></li>
        </ul>
      </div>

      <div class="footer-column contact">
        <h3>Contact</h3>

        <a :href="`tel:${phoneIntl}`" class="contact-link">
          <span class="icon">📞</span>
          <span>
            <strong>{{ phone }}</strong>
            <em>Tap to call</em>
          </span>
        </a>

        <a href="https://wa.me/254729641199" target="_blank" rel="noopener" class="contact-link">
          <span class="icon">💬</span>
          <span>
            <strong>WhatsApp</strong>
            <em>Chat with us</em>
          </span>
        </a>

        <a href="mailto:camtish40@gmail.com" class="contact-link">
          <span class="icon">✉️</span>
          <span>
            <strong>Email us</strong>
            <em>camtish40@gmail.com</em>
          </span>
        </a>
      </div>

    </div>

    <div class="copyright">
      <span>© {{ year }} CAMTISH Catering Services. All rights reserved.</span>
      <span class="made">Made with care in Kenya 🇰🇪</span>
    </div>

  </footer>
</template>

<style scoped>
.footer {
  --green: #2e7d32;
  --green-light: #a5d6a7;
  --green-soft: rgba(46, 125, 50, 0.14);
  --bg: #0f1a12;
  --bg-soft: #17251a;
  --text: #c8d6ca;
  --text-dim: #8fa693;

  position: relative;
  margin-top: 80px;
  background: var(--bg);
  color: var(--text);
  border-top: 3px solid var(--green);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 120px;
  background: radial-gradient(ellipse at center, var(--green-soft), transparent 70%);
  pointer-events: none;
}

.footer-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 40px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
  gap: 40px;
}

.footer-brand h2 {
  margin: 0 0 10px;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #fff;
}
.footer-brand h2::after {
  content: '';
  display: block;
  width: 36px;
  height: 3px;
  margin-top: 10px;
  background: var(--green);
  border-radius: 2px;
}
.tagline {
  margin: 16px 0 22px;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-dim);
  max-width: 280px;
}

.footer-socials { display: flex; gap: 10px; }
.footer-socials a {
  width: 40px; height: 40px;
  display: grid;
  place-items: center;
  font-size: 1.05rem;
  text-decoration: none;
  border-radius: 10px;
  background: var(--bg-soft);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.footer-socials a:hover {
  background: var(--green);
  border-color: var(--green);
  transform: translateY(-2px);
}

.footer-column h3 {
  margin: 0 0 18px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--green-light);
}

.footer-column ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-column li {
  font-size: 0.92rem;
  color: var(--text-dim);
  transition: color 0.2s ease, transform 0.2s ease;
}
.footer-column li:hover {
  color: #fff;
  transform: translateX(4px);
}
.footer-column li a { color: inherit; text-decoration: none; }

.contact { display: flex; flex-direction: column; gap: 14px; }

.contact-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text);
  background: var(--bg-soft);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.contact-link:hover {
  background: rgba(46, 125, 50, 0.18);
  border-color: var(--green);
  transform: translateY(-2px);
}

.contact-link .icon {
  width: 38px; height: 38px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(46, 125, 50, 0.22);
  font-size: 1rem;
}

.contact-link strong {
  display: block;
  font-size: 0.95rem;
  color: #fff;
  font-weight: 600;
}
.contact-link em {
  display: block;
  font-style: normal;
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: 2px;
}

.copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 22px 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.82rem;
  color: var(--text-dim);
}
.made { color: var(--green-light); }

@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 560px) {
  .footer { margin-top: 56px; }
  .footer-container {
    grid-template-columns: 1fr;
    padding: 40px 20px 28px;
  }
  .copyright {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
}
</style>