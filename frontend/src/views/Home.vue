<script setup>
import HeroSection from '../components/HeroSection.vue'
import Footer from '../components/Footer.vue'

const occasions = [
  'Weddings',
  'Corporate Events',
  'Private Parties',
  'Church Functions',
  'Birthdays',
  'Fundraisers'
]

const appliances = [
  {
    icon: '🍲',
    name: 'Chafing Dishes',
    desc: 'Keep every dish warm and presentable through the entire service — no cold mains, no soggy plates.',
    price: 'KSh 1,000'
  },
  {
    icon: '🍽',
    name: 'Crockery & Cutlery',
    desc: 'Spotless place settings for any guest count — polished cutlery, elegant presentation, delivered ready.',
    price: 'KSh 500'
  },
  {
    icon: '☕',
    name: 'Beverage Dispensers',
    desc: 'Juice, tea and coffee urns that keep refreshments flowing all evening — hot stays hot, cold stays cold.',
    price: 'KSh 800'
  },
 
]
</script>

<template>
  <main class="home">

    <!-- HERO -->
    <HeroSection />

    <!-- OCCASIONS MARQUEE -->
    <section class="marquee" aria-label="Occasions we cater">
      <div class="marquee-inner">
        <template v-for="(o, i) in occasions" :key="o">
          <span>{{ o }}</span>
          <i v-if="i < occasions.length - 1" aria-hidden="true">•</i>
        </template>
      </div>
    </section>

    <!-- APPLIANCES -->
    <section id="appliances" class="section appliances">
      <header class="section-head">
        <p class="eyebrow"><span class="line"></span>What we hire out</p>
        <h2>Everything you need, <em>ready to serve.</em></h2>
        <p class="sub">
          Clean, tested and delivered to your venue — set up exactly where you need it,
          collected after. You focus on your guests; we handle the rest.
        </p>
      </header>

      <div class="appliance-grid">
        <article v-for="a in appliances" :key="a.name" class="appliance-card">
          <span class="appliance-icon">{{ a.icon }}</span>
          <h3>{{ a.name }}</h3>
          <p>{{ a.desc }}</p>
          <span class="price">From {{ a.price }}</span>
        </article>
      </div>

      <div class="appliances-cta">
        <RouterLink to="/Appliances" class="text-link">
          View the full catalogue
          <span>→</span>
        </RouterLink>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section id="hire" class="cta-banner">
      <div class="cta-inner">
        <p class="eyebrow light"><span class="line"></span>Ready when you are</p>
        <h2>Let's plan something <em>beautiful.</em></h2>
        <p class="cta-sub">
          Tell us about your event — date, guest count, and what you need.
          We'll respond with a tailored quote within 24 hours.
        </p>
        <div class="cta-actions">
          <RouterLink to="/RequestQuote" class="btn-light">
            Request a Quote <span>→</span>
          </RouterLink>
          <a href="tel:+254729641199" class="btn-ghost">
            Call 0729 641 199
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <Footer />

  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.home {
  --cream: #faf6ee;
  --cream-2: #f2ead9;
  --ink: #1e2419;
  --muted: #6b6a5c;
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --gold: #b8956a;
  --line: rgba(30, 36, 25, 0.1);

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--cream);
  color: var(--ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ============ MARQUEE ============ */
.marquee {
  background: var(--cream-2);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 22px 0;
  overflow: hidden;
}
.marquee-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 1.05rem;
  color: var(--ink);
}
.marquee-inner i {
  font-style: normal;
  color: var(--gold);
  font-size: 0.7rem;
}

/* ============ SHARED SECTION ============ */
.section {
  padding: 112px 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.section-head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 64px;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
}
.eyebrow .line {
  width: 32px;
  height: 1px;
  background: var(--gold);
}
.section-head h2 {
  margin: 0 0 18px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.section-head h2 em {
  font-style: italic;
  color: var(--green);
}
.sub {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--muted);
}

/* ============ APPLIANCES ============ */
.appliance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.appliance-card {
  position: relative;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 36px 28px 32px;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.35s ease,
              box-shadow 0.35s ease;
}
.appliance-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gold);
  border-radius: 6px 6px 0 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.appliance-card:hover {
  transform: translateY(-6px);
  border-color: rgba(184, 149, 106, 0.5);
  box-shadow: 0 24px 48px -20px rgba(30, 36, 25, 0.18);
}
.appliance-card:hover::before {
  transform: scaleX(1);
}

.appliance-icon {
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background: var(--cream-2);
  font-size: 1.55rem;
  margin-bottom: 24px;
  transition: background 0.3s ease;
}
.appliance-card:hover .appliance-icon {
  background: rgba(184, 149, 106, 0.18);
}

.appliance-card h3 {
  margin: 0 0 10px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
}

.appliance-card p {
  margin: 0 0 24px;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--muted);
}

.price {
  display: inline-block;
  padding: 6px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green);
  border: 1px solid var(--green);
  border-radius: 999px;
}

/* catalogue link */
.appliances-cta {
  text-align: center;
  margin-top: 56px;
}
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--green);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 4px;
  transition: border-color 0.2s ease, gap 0.2s ease;
}
.text-link:hover {
  border-bottom-color: var(--green);
  gap: 14px;
}

/* ============ CTA BANNER ============ */
.cta-banner {
  position: relative;
  overflow: hidden;
  padding: 112px 24px;
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  color: var(--cream);
  text-align: center;
}
.cta-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184, 149, 106, 0.16), transparent 70%);
  pointer-events: none;
}
.cta-banner::after {
  content: '';
  position: absolute;
  bottom: -40%;
  left: -10%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
}

.eyebrow.light {
  color: var(--gold);
}
.eyebrow.light .line {
  background: var(--gold);
}

.cta-banner h2 {
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.cta-banner h2 em {
  font-style: italic;
  color: #d4b896;
}

.cta-sub {
  margin: 0 0 44px;
  font-size: 1.02rem;
  line-height: 1.65;
  color: rgba(250, 246, 238, 0.78);
}

.cta-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-light,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-light {
  color: var(--green-dark);
  background: var(--cream);
  box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.15);
}
.btn-light:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.15);
}
.btn-light span {
  transition: transform 0.2s ease;
}
.btn-light:hover span {
  transform: translateX(4px);
}

.btn-ghost {
  color: var(--cream);
  background: transparent;
  border: 1.5px solid rgba(250, 246, 238, 0.4);
}
.btn-ghost:hover {
  background: rgba(250, 246, 238, 0.1);
  border-color: var(--cream);
}

/* ============ RESPONSIVE ============ */
@media (max-width: 720px) {
  .section {
    padding: 72px 20px;
  }
  .marquee-inner {
    font-size: 0.92rem;
    gap: 16px;
  }
  .cta-banner {
    padding: 80px 20px;
  }
  .appliance-card {
    padding: 28px 22px 26px;
  }
  .btn-light,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }
}
</style>