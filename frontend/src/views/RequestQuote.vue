<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import HireRequest from '../components/HireRequest.vue'
import HireSummary from '../components/HireSummary.vue'

const route = useRoute()

const appliances = ref([])
const hireItems = ref([])
const loading = ref(true)
const submitting = ref(false)
const error = ref('')

const step = ref('build')       // 'build' | 'review' | 'success'
const bookingRef = ref('')

const customer = ref({
  name: '',
  phone: '',
  eventType: '',
  eventDate: '',
  location: '',
  notes: ''
})

// ---------- Resolve images from assets/ ----------
const applianceImages = import.meta.glob('../assets/*', {
  eager: true,
  query: '?url',
  import: 'default'
})

function resolveImage(filename) {
  if (!filename) return ''
  const clean = filename.split('/').pop().split('\\').pop()
  const path = Object.keys(applianceImages).find(p => p.endsWith(`/${clean}`))
  return path ? applianceImages[path] : ''
}

// ---------- Load catalogue ----------
async function loadAppliances() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/appliances')
    appliances.value = res.data.map(a => ({
      ...a,
      price: Number(a.price ?? a.price_per_day ?? 0),
      imageUrl: resolveImage(a.image)
    }))

    // Pre-select if coming from /Appliances?applianceId=X
    const preselected = route.query.applianceId
    if (preselected) {
      const found = appliances.value.find(a => String(a.id) === String(preselected))
      if (found) addItem(found)
    }
  } catch (err) {
    console.error('Failed to load appliances:', err)
    error.value = 'Unable to load appliances. Please try again.'
  } finally {
    loading.value = false
  }
}

// ---------- Item handlers ----------
function addItem(appliance) {
  const existing = hireItems.value.find(i => i.id === appliance.id)
  if (existing) {
    existing.quantity++
    return
  }
  hireItems.value.push({
    id: appliance.id,
    name: appliance.name,
    price: appliance.price,
    category: appliance.category,
    quantity: 1,
    imageUrl: appliance.imageUrl
  })
}

function increase(item) { item.quantity++ }
function decrease(item) { if (item.quantity > 1) item.quantity-- }
function removeItem(id) { hireItems.value = hireItems.value.filter(i => i.id !== id) }
function clearItems() { hireItems.value = [] }

// ---------- Step navigation ----------
function handleDetailsSubmit(details) {
  customer.value = details
  step.value = 'review'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function backToEdit() {
  step.value = 'build'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ---------- Submit booking ----------
async function submitBooking() {
  if (hireItems.value.length === 0) return

  submitting.value = true
  try {
    const subtotal = hireItems.value.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    )
    const totalBilling = subtotal + 500 // delivery fee

    const payload = {
      customer_name: customer.value.name,
      customer_phone: customer.value.phone,
      appliance_name: hireItems.value
        .map(i => `${i.name} × ${i.quantity}`)
        .join(', '),
      quantity: hireItems.value.reduce((s, i) => s + i.quantity, 0),
      event_type: customer.value.eventType,
      event_date: customer.value.eventDate,
      location: customer.value.location,
      notes: customer.value.notes,
      quoted_amount: totalBilling,
      status: 'pending'
    }

    const res = await api.post('/bookings', payload)

    bookingRef.value = res.data?.id
      ? `CAM-${res.data.id}`
      : `CAM-${Date.now().toString().slice(-6)}`

    step.value = 'success'
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (err) {
    console.error('Booking submit failed:', err)
    alert(
      err.response?.data?.message ||
      'Unable to submit booking. Please try again.'
    )
  } finally {
    submitting.value = false
  }
}

onMounted(loadAppliances)
</script>

<template>
  <main class="page">

    <!-- ============ PAGE HEAD ============ -->
    <header class="page-head">
      <span class="eyebrow"><span class="line"></span>HIRE REQUEST</span>
      <h1>Request a Quote</h1>
      <p>
        Choose your equipment, tell us about your event,
        and we'll be in touch within 24 hours.
      </p>
    </header>

    <!-- ============ STEPS INDICATOR ============ -->
    <div v-if="step !== 'success'" class="steps-indicator">
      <div class="step-item" :class="{ active: step === 'build', done: step === 'review' }">
        <span class="step-circle">
          <span v-if="step === 'review'">✓</span>
          <span v-else>1</span>
        </span>
        <span class="step-text">Select</span>
      </div>
      <div class="step-line" :class="{ done: step === 'review' }"></div>
      <div class="step-item" :class="{ active: step === 'review' }">
        <span class="step-circle">2</span>
        <span class="step-text">Review</span>
      </div>
      <div class="step-line"></div>
      <div class="step-item">
        <span class="step-circle">3</span>
        <span class="step-text">Confirm</span>
      </div>
    </div>

    <!-- ============ ERROR ============ -->
    <div v-if="error" class="error-box">
      <p>{{ error }}</p>
      <button @click="loadAppliances">Try again</button>
    </div>

    <!-- ============ STEP 1: BUILD ============ -->
    <HireRequest
      v-else-if="step === 'build'"
      :appliances="appliances"
      :hire-items="hireItems"
      :loading="loading"
      :initial-customer="customer"
      @add-item="addItem"
      @remove-item="removeItem"
      @increase="increase"
      @decrease="decrease"
      @clear="clearItems"
      @submit-details="handleDetailsSubmit"
    />

    <!-- ============ STEP 2: REVIEW ============ -->
    <HireSummary
      v-else-if="step === 'review'"
      :hire-items="hireItems"
      :customer="customer"
      :submitting="submitting"
      @back="backToEdit"
      @confirm="submitBooking"
    />

    <!-- ============ STEP 3: SUCCESS ============ -->
    <div v-else-if="step === 'success'" class="success-view">
      <div class="success-icon">✓</div>
      <h2>Booking Received!</h2>
      <p class="success-lead">
        Thank you, <strong>{{ customer.name }}</strong>.
        Your booking reference is
        <strong class="ref">{{ bookingRef }}</strong>.
      </p>
      <p class="success-sub">
        We'll contact you on <strong>{{ customer.phone }}</strong>
        within 24 hours to confirm the details.
      </p>

      <div class="success-actions">
        <RouterLink to="/" class="primary-btn">Back to Home</RouterLink>
        <RouterLink to="/Appliances" class="ghost-btn">Browse more equipment</RouterLink>
      </div>
    </div>

  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.page {
  --cream: #faf6ee;
  --cream-2: #f2ead9;
  --ink: #1e2419;
  --muted: #6b6a5c;
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --gold: #b8956a;
  --line: rgba(30, 36, 25, 0.1);

  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 64px 24px 96px;
  background: var(--cream);
  color: var(--ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ============ HEAD ============ */
.page-head {
  text-align: center;
  max-width: 620px;
  margin: 0 auto 40px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
}
.eyebrow .line {
  width: 28px;
  height: 1px;
  background: var(--gold);
}

.page-head h1 {
  margin: 0 0 12px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.page-head p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--muted);
}

/* ============ STEPS ============ */
.steps-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 auto 40px;
  max-width: 460px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}
.step-item.active,
.step-item.done { opacity: 1; }

.step-circle {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--line);
  color: var(--muted);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.9rem;
  font-weight: 700;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.step-item.active .step-circle {
  background: var(--green);
  border-color: var(--green);
  color: #ffffff;
  box-shadow: 0 0 0 5px rgba(46, 125, 50, 0.12);
}

.step-item.done .step-circle {
  background: var(--green);
  border-color: var(--green);
  color: #ffffff;
}

.step-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
}

.step-line {
  flex: 1;
  height: 2px;
  background: var(--line);
  border-radius: 2px;
  margin-bottom: 24px;
  transition: background 0.3s ease;
}
.step-line.done { background: var(--green); }

/* ============ ERROR ============ */
.error-box {
  max-width: 520px;
  margin: 0 auto;
  padding: 28px 28px;
  background: #fdf3ef;
  border: 1px solid rgba(192, 57, 43, 0.2);
  border-left: 4px solid #c0392b;
  border-radius: 6px;
  color: #8a2a1e;
  font-size: 0.92rem;
  text-align: center;
}
.error-box p { margin: 0 0 16px; }
.error-box button {
  padding: 10px 22px;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  background: var(--green);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* ============ SUCCESS ============ */
.success-view {
  max-width: 560px;
  margin: 24px auto 0;
  padding: 56px 40px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 20px 48px -24px rgba(30, 36, 25, 0.2);
}

.success-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(46, 125, 50, 0.1);
  color: var(--green);
  font-size: 2rem;
  font-weight: 700;
}

.success-view h2 {
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.success-lead {
  margin: 0 0 12px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--ink);
}
.success-sub {
  margin: 0 0 32px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
}

.ref {
  display: inline-block;
  padding: 3px 10px;
  margin: 0 4px;
  font-family: 'JetBrains Mono', monospace, 'Courier New';
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--green-dark);
  background: var(--cream-2);
  border-radius: 4px;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
}

.primary-btn,
.ghost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.primary-btn {
  color: #ffffff;
  background: var(--green);
  border: none;
  box-shadow: 0 4px 0 0 var(--green-dark);
}
.primary-btn:hover {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 var(--green-dark);
}

.ghost-btn {
  color: var(--ink);
  background: transparent;
  border: 1.5px solid var(--line);
}
.ghost-btn:hover {
  border-color: var(--green);
  color: var(--green);
  background: rgba(46, 125, 50, 0.04);
}

/* ============ RESPONSIVE ============ */
@media (max-width: 620px) {
  .page { padding: 40px 16px 64px; }
  .steps-indicator { gap: 8px; }
  .step-circle { width: 32px; height: 32px; font-size: 0.82rem; }
  .step-text { font-size: 0.68rem; }
  .step-line { margin-bottom: 20px; }
  .success-view { padding: 40px 24px; }
  .success-icon { width: 60px; height: 60px; font-size: 1.6rem; }
}
</style>