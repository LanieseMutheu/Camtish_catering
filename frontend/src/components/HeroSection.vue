<script setup>
import { ref, onMounted } from 'vue'
import flyer from '../assets/catherinee.png'

function browseEquipment() {
  document.getElementById('appliances')?.scrollIntoView({ behavior: 'smooth' })
}

function requestQuote() {
  document.getElementById('hire')?.scrollIntoView({ behavior: 'smooth' })
}

const loaded = ref(false)
onMounted(() => { loaded.value = true })
</script>

<template>
  <section id="top" class="hero" :class="{ loaded }">

    <div class="hero-bg" aria-hidden="true">
      <span class="blob blob-1"></span>
      <span class="blob blob-2"></span>
      <span class="grid"></span>
    </div>

    <div class="hero-inner">

      <div class="hero-content">
        <span class="hero-label">
          <span class="dot"></span>
          Quality Catering Equipment
        </span>

        <h2>
          Make Your Event
          <span class="accent">Extraordinary</span>
        </h2>

        <p class="lead">
          Reliable catering appliances and equipment available for
          weddings, corporate events, birthdays, church functions
          and private parties.
        </p>

        <div class="hero-buttons">
          <button class="primary-button" @click="browseEquipment">
            Browse Appliances
            <span class="arrow">→</span>
          </button>
          <button class="secondary-button" @click="requestQuote">
            Request a Quote
          </button>
        </div>

        <ul class="hero-stats">
          <li><strong>500+</strong><span>Events served</span></li>
          <li><strong>10+</strong><span>Years experience</span></li>
          <li><strong>100%</strong><span>Sanitised gear</span></li>
        </ul>
      </div>

      <div class="hero-image">
        <div class="image-frame">
          <img :src="flyer" alt="CAMTISH catering services flyer" loading="eager" />
        </div>

        <div class="float-badge badge-top">
          <span class="icon">✨</span>
          <div><strong>Ready to serve</strong><em>Clean &amp; on time</em></div>
        </div>

        <div class="float-badge badge-bottom">
          <span class="icon">📍</span>
          <div><strong>Delivered to you</strong><em>Nationwide</em></div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --green-soft: rgba(46, 125, 50, 0.1);
  --gold: #c8a84b;

  position: relative;
  overflow: hidden;
  padding: 96px 0 112px;
  background: linear-gradient(180deg, #f7fbf7 0%, #ffffff 100%);
}

.hero-bg { position: absolute; inset: 0; pointer-events: none; }

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.6;
}
.blob-1 {
  width: 460px; height: 460px;
  background: rgba(46, 125, 50, 0.16);
  top: -160px; left: -140px;
}
.blob-2 {
  width: 400px; height: 400px;
  background: rgba(200, 168, 75, 0.14);
  bottom: -160px; right: -100px;
}

.grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(46, 125, 50, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(46, 125, 50, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 30% 40%, #000 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 30% 40%, #000 0%, transparent 70%);
}

.hero-inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 64px;
}

.hero-content {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.hero.loaded .hero-content {
  opacity: 1;
  transform: translateY(0);
}

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--green);
  background: var(--green-soft);
  border-radius: 999px;
  margin-bottom: 22px;
}
.dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15); }
  50%      { box-shadow: 0 0 0 8px rgba(46, 125, 50, 0.05); }
}

.hero h2 {
  margin: 0 0 20px;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #16241a;
}
.hero h2 .accent {
  display: block;
  color: var(--green);
}
.hero h2 .accent::after {
  content: '';
  display: block;
  width: 72px;
  height: 5px;
  margin-top: 16px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--green), var(--gold));
}

.lead {
  margin: 0 0 34px;
  max-width: 500px;
  font-size: 1.06rem;
  line-height: 1.7;
  color: #5b6b5e;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 44px;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 30px;
  font-size: 0.98rem;
  font-weight: 700;
  font-family: inherit;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.primary-button {
  color: #fff;
  background: var(--green);
  box-shadow: 0 10px 24px rgba(46, 125, 50, 0.28);
}
.primary-button:hover {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(46, 125, 50, 0.36);
}
.primary-button .arrow { transition: transform 0.2s ease; }
.primary-button:hover .arrow { transform: translateX(4px); }

.secondary-button {
  color: var(--green-dark);
  background: #fff;
  border: 1.5px solid #dfe8e1;
}
.secondary-button:hover {
  border-color: var(--green);
  color: var(--green);
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(20, 50, 30, 0.08);
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  list-style: none;
  padding: 26px 0 0;
  margin: 0;
  border-top: 1px solid #e6efe8;
}
.hero-stats li { display: flex; flex-direction: column; gap: 2px; }
.hero-stats strong {
  font-size: 1.5rem;
  font-weight: 800;
  color: #16241a;
  line-height: 1;
}
.hero-stats span { font-size: 0.8rem; color: #6b7c6f; }

.hero-image {
  position: relative;
  opacity: 0;
  transform: translateY(24px) scale(0.98);
  transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
}
.hero.loaded .hero-image {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.image-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #eef4ef;
  box-shadow:
    0 30px 60px rgba(20, 50, 30, 0.18),
    0 0 0 1px rgba(46, 125, 50, 0.06);
  border: 6px solid #fff;
  transform: rotate(-1deg);
  transition: transform 0.4s ease;
}
.image-frame:hover { transform: rotate(0deg) scale(1.01); }

.image-frame img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 560px;
  object-fit: cover;
}

.float-badge {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 16px 34px rgba(20, 50, 30, 0.16);
  animation: floatY 4s ease-in-out infinite;
}
.badge-top    { top: 6%;  left: -6%;  animation-delay: 0s; }
.badge-bottom { bottom: 8%; right: -6%; animation-delay: 1.2s; }

.float-badge .icon {
  width: 40px; height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--green-soft);
  font-size: 1.1rem;
}
.float-badge strong { display: block; font-size: 0.85rem; color: #16241a; }
.float-badge em { font-style: normal; font-size: 0.75rem; color: #6b7c6f; }

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

@media (max-width: 960px) {
  .hero { padding: 64px 0 80px; }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }
  .hero-label { margin-left: auto; margin-right: auto; }
  .hero h2 .accent::after { margin-left: auto; margin-right: auto; }
  .lead { margin-left: auto; margin-right: auto; }
  .hero-buttons { justify-content: center; }
  .hero-stats { justify-content: center; }

  .hero-image {
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
  }
  .image-frame { transform: none; }
  .badge-top    { left: 0; top: 4%; }
  .badge-bottom { right: 0; bottom: 6%; }
}

@media (max-width: 520px) {
  .hero { padding: 48px 0 64px; }
  .primary-button,
  .secondary-button { width: 100%; justify-content: center; }
  .hero-stats { gap: 20px; }
  .float-badge { padding: 10px 12px; }
  .float-badge .icon { width: 34px; height: 34px; font-size: 1rem; }
  .float-badge strong { font-size: 0.8rem; }
  .float-badge em { font-size: 0.7rem; }
  .badge-top    { left: -4px; }
  .badge-bottom { right: -4px; }
}
</style>