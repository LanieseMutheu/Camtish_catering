<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from '../assets/logo.jpeg'

const isOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => { isOpen.value = false })
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">

      <RouterLink to="/" class="logo" @click="isOpen = false">
        <img :src="logo" alt="CAMTISH Catering Services" />
        <span class="brand">CAMTISH <em>Catering Services</em></span>
      </RouterLink>

      <button
        class="menu-toggle"
        :class="{ open: isOpen }"
        @click="isOpen = !isOpen"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
      >
        <span></span>
      </button>

      <div class="nav-links" :class="{ open: isOpen }">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Appliances">Appliances</RouterLink>
        <RouterLink to="/RequestQuote" class="cta">Request Quote</RouterLink>
        <RouterLink to="/Login" class="ghost">Login</RouterLink>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.navbar {
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --green-soft: rgba(46, 125, 50, 0.08);

  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s ease;
}
.logo:hover { transform: scale(1.02); }

.logo img {
  display: block;
  height: 48px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  border-radius: 8px;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  color: var(--green);
  white-space: nowrap;
}
.brand em {
  font-style: normal;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #555;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links a {
  position: relative;
  padding: 8px 14px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-links a:hover {
  color: var(--green);
  background: var(--green-soft);
}

.nav-links a:not(.cta):not(.ghost)::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--green);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.nav-links a:not(.cta):not(.ghost):hover::after,
.nav-links a.router-link-exact-active:not(.cta):not(.ghost)::after {
  transform: scaleX(1);
}
.nav-links a.router-link-exact-active:not(.cta):not(.ghost) {
  color: var(--green);
}

.nav-links a.cta {
  margin-left: 8px;
  padding: 10px 20px;
  color: #fff;
  background: var(--green);
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.nav-links a.cta:hover {
  background: var(--green-dark);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(46, 125, 50, 0.4);
}

.nav-links a.ghost {
  border: 1.5px solid #e0e0e0;
  color: #333;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.nav-links a.ghost:hover {
  border-color: var(--green);
  color: var(--green);
  background: transparent;
}

.menu-toggle {
  display: none;
  position: relative;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  position: absolute;
  left: 50%;
  width: 24px;
  height: 2px;
  background: var(--green);
  border-radius: 2px;
  transform: translateX(-50%);
  transition: transform 0.25s ease, background 0.2s ease;
}
.menu-toggle span { top: 50%; margin-top: -1px; }
.menu-toggle span::before { content: ''; top: -7px; }
.menu-toggle span::after  { content: ''; top:  7px; }

.menu-toggle.open span { background: transparent; }
.menu-toggle.open span::before {
  transform: translateX(-50%) translateY(7px) rotate(45deg);
}
.menu-toggle.open span::after {
  transform: translateX(-50%) translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-toggle { display: block; }
  .brand { font-size: 0.95rem; }
  .brand em { font-size: 0.62rem; }

  .nav-links {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 12px 16px 20px;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
  }
  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .nav-links a { padding: 12px 14px; }
  .nav-links a:not(.cta):not(.ghost)::after { display: none; }
  .nav-links a.cta,
  .nav-links a.ghost {
    text-align: center;
    margin-top: 6px;
    margin-left: 0;
  }
}

@media (max-width: 420px) {
  .brand em { display: none; }
}
</style>