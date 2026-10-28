<template>

  <section class="login-page">

    <!-- Decorative background -->
    <div class="bg-shape bg-shape-1" aria-hidden="true"></div>
    <div class="bg-shape bg-shape-2" aria-hidden="true"></div>

    <div class="login-shell">

      <!-- ============ BRAND PANEL ============ -->
      <aside class="brand-panel">

        <div class="brand-top">
          <span class="brand-mark">C</span>
          <span class="brand-name">CAMTISH</span>
        </div>

        <div class="brand-content">
          <span class="brand-eyebrow">Administrator Portal</span>
          <h1>
            Welcome back to
            <em>your kitchen.</em>
          </h1>
          <p>
            Manage appliances, quotes and clients from a single,
            calm space — designed for the way you actually work.
          </p>
        </div>

        <p class="brand-footer">
          © {{ new Date().getFullYear() }} CAMTISH Catering Services
        </p>

        <span class="decor-ring" aria-hidden="true"></span>
        <span class="decor-dot" aria-hidden="true"></span>

      </aside>

      <!-- ============ FORM PANEL ============ -->
      <div class="form-panel">

        <div class="form-container">

          <div class="form-header">
            <span class="lock-badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                   stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
              </svg>
              Admin access only
            </span>
            <h2>Sign in</h2>
            <p class="form-sub">Use your administrator credentials to continue.</p>
          </div>

          <form @submit.prevent="login" novalidate>

            <div class="form-group">
              <label for="email">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="username"
                placeholder="camtish40@gmail.com"
                required
              >
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="••••••••"
                required
              >
            </div>

            <p v-if="error" class="form-error">
              <span class="error-icon">!</span>
              {{ error }}
            </p>

            <button
              class="btn btn-primary"
              type="submit"
              :disabled="loading"
            >
              <span v-if="!loading">Login</span>
              <span v-else class="btn-loading">
                <span class="spinner"></span>
                Logging in...
              </span>
            </button>

          </form>

          <p class="form-footer">
            <RouterLink to="/">← Back to website</RouterLink>
          </p>

        </div>

      </div>

    </div>

  </section>

</template>

<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import api from '../services/api'

import { onMounted } from 'vue'

const router = useRouter()

const email = ref('')

const password = ref('')

const loading = ref(false)

const error = ref('')

const login = async () => {

  loading.value = true

  error.value = ''

  try {

    const response =
      await api.post(
        '/auth/login',
        {
          email: email.value,
          password: password.value
        }
      )

      onMounted(() => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (token && user?.role === 'admin') {
    router.push('/adminDashboard')
  }
})

    // ==============================
    // ADMIN-ONLY GATE
    // ==============================

    const user = response.data?.user

    if (!user || user.role !== 'admin') {
      error.value =
        'Access denied. This portal is for administrators only.'
      return
    }

    localStorage.setItem(
      'token',
      response.data.token
    )

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    )

    router.push('/adminDashboard')

  } catch (err) {

    error.value =
      err.response?.data?.message ||
      'Login failed.'

  } finally {

    loading.value = false

  }

}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.login-page {

  --cream: #faf6ee;
  --cream-2: #f2ead9;
  --ink: #1e2419;
  --muted: #6b6a5c;
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --gold: #b8956a;
  --line: rgba(30, 36, 25, 0.1);

  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 40px 24px;
  display: grid;
  place-items: center;
  background: var(--cream);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--ink);
}

/* ============ DECORATIVE BLOBS ============ */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.bg-shape-1 {
  width: 460px;
  height: 460px;
  background: rgba(46, 125, 50, 0.14);
  top: -160px;
  left: -140px;
}
.bg-shape-2 {
  width: 400px;
  height: 400px;
  background: rgba(184, 149, 106, 0.14);
  bottom: -160px;
  right: -100px;
}

/* ============ SHELL ============ */
.login-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1000px;
  min-height: 580px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 30px 60px -20px rgba(30, 36, 25, 0.25),
    0 0 0 1px rgba(30, 36, 25, 0.06);
}

/* ============ BRAND PANEL ============ */
.brand-panel {

  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 44px;
  background: linear-gradient(150deg, #1b5e20 0%, #2e7d32 60%, #1b5e20 100%);
  color: var(--cream);

}

.brand-top {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
}
.brand-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--gold);
  color: var(--green-dark);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
}
.brand-name {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.brand-content {
  position: relative;
  z-index: 2;
  margin: 40px 0;
}

.brand-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}

.brand-panel h1 {
  margin: 0 0 18px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.brand-panel h1 em {
  display: block;
  font-style: italic;
  color: #d4b896;
  margin-top: 4px;
}

.brand-panel p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(250, 246, 238, 0.78);
  max-width: 340px;
}

.brand-footer {
  position: relative;
  z-index: 2;
  font-size: 0.75rem;
  color: rgba(250, 246, 238, 0.55);
  letter-spacing: 0.03em;
}

/* brand panel decorations */
.decor-ring {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 240px;
  height: 240px;
  border: 1px solid rgba(184, 149, 106, 0.35);
  border-radius: 50%;
  z-index: 1;
}
.decor-dot {
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(184, 149, 106, 0.12);
  z-index: 1;
}

/* ============ FORM PANEL ============ */
.form-panel {
  display: grid;
  place-items: center;
  padding: 56px 44px;
  background: var(--cream);
}

.form-container {
  width: 100%;
  max-width: 360px;
}

.form-header {
  margin-bottom: 32px;
}

.lock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--green);
  background: rgba(46, 125, 50, 0.08);
  border-radius: 999px;
  margin-bottom: 20px;
}

.form-header h2 {
  margin: 0 0 8px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);
  line-height: 1.15;
}

.form-sub {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--muted);
}

/* ============ FORM FIELDS ============ */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 16px;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--ink);
  background: #ffffff;
  border: 1.5px solid rgba(30, 36, 25, 0.15);
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input::placeholder {
  color: #a8a89a;
}

.form-group input:focus {
  border-color: var(--green);
  box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.12);
}

/* ============ ERROR ============ */
.form-error {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  padding: 12px 14px;
  font-size: 0.85rem;
  color: #8a2a1e;
  background: #fdf3ef;
  border-left: 3px solid #c0392b;
  border-radius: 4px;
  line-height: 1.5;
}
.error-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #c0392b;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

/* ============ BUTTON ============ */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 20px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.btn-primary {
  color: #ffffff;
  background: var(--green);
  box-shadow: 0 3px 0 0 var(--green-dark);
  margin-top: 4px;
}

.btn-primary:hover:not(:disabled) {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 0 0 var(--green-dark);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 0 0 var(--green-dark);
}

.btn-primary:disabled {
  opacity: 0.85;
  cursor: not-allowed;
}

.btn-loading {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============ FOOTER LINK ============ */
.form-footer {
  margin: 28px 0 0;
  text-align: center;
  font-size: 0.85rem;
}

.form-footer a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.form-footer a:hover {
  color: var(--green);
}

/* ============ RESPONSIVE ============ */
@media (max-width: 860px) {

  .login-shell {
    grid-template-columns: 1fr;
    max-width: 460px;
    min-height: auto;
  }

  .brand-panel {
    padding: 32px 28px;
  }

  .brand-content {
    margin: 28px 0 20px;
  }

  .brand-panel h1 {
    font-size: 1.6rem;
  }

  .brand-panel p {
    display: none;
  }

  .brand-footer {
    display: none;
  }

  .form-panel {
    padding: 40px 28px;
  }

  .form-header h2 {
    font-size: 1.7rem;
  }

}

@media (max-width: 460px) {

  .login-page {
    padding: 20px 12px;
  }

  .form-panel {
    padding: 32px 22px;
  }

}

</style>