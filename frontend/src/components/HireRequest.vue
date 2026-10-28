<script setup>
import { ref } from 'vue'

const props = defineProps({
  appliances: { type: Array, default: () => [] },
  hireItems: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  initialCustomer: { type: Object, default: () => ({}) }
})

const emit = defineEmits([
  'add-item', 'remove-item', 'increase', 'decrease', 'clear', 'submit-details'
])

const customerName = ref(props.initialCustomer.name || '')
const phone = ref(props.initialCustomer.phone || '')
const eventType = ref(props.initialCustomer.eventType || '')
const eventDate = ref(props.initialCustomer.eventDate || '')
const location = ref(props.initialCustomer.location || '')
const notes = ref(props.initialCustomer.notes || '')

const errors = ref({})

function isSelected(appliance) {
  return props.hireItems.some(i => i.id === appliance.id)
}

function selectedQuantity(appliance) {
  const item = props.hireItems.find(i => i.id === appliance.id)
  return item ? item.quantity : 0
}

function submitDetails() {
  errors.value = {}

  if (!customerName.value.trim()) errors.value.name = 'Name is required.'
  if (!phone.value.trim()) errors.value.phone = 'Phone number is required.'
  else if (!/^[0-9+\s-]{7,15}$/.test(phone.value.trim()))
    errors.value.phone = 'Enter a valid phone number.'
  if (!eventType.value) errors.value.eventType = 'Select an event type.'
  if (!eventDate.value) errors.value.eventDate = 'Event date is required.'
  if (props.hireItems.length === 0) errors.value.items = 'Please select at least one appliance.'

  if (Object.keys(errors.value).length) return

  emit('submit-details', {
    name: customerName.value.trim(),
    phone: phone.value.trim(),
    eventType: eventType.value,
    eventDate: eventDate.value,
    location: location.value.trim(),
    notes: notes.value.trim()
  })
}
</script>

<template>
  <div class="hire-request">

    <!-- ================= STEP 1: SELECT EQUIPMENT ================= -->
    <section class="step-block">

      <header class="step-head">
        <span class="step-badge">01</span>
        <div>
          <h2>Select Equipment</h2>
          <p>Tap any appliance to add it to your booking.</p>
        </div>
      </header>

      <div v-if="loading" class="loading-inline">
        <div class="spinner"></div>
        <span>Loading catalogue…</span>
      </div>

      <div v-else-if="!appliances.length" class="empty-inline">
        No appliances available right now.
      </div>

      <div v-else class="picker-grid">
        <button
          v-for="a in appliances"
          :key="a.id"
          type="button"
          class="picker-card"
          :class="{ selected: isSelected(a) }"
          @click="!isSelected(a) && emit('add-item', a)"
        >
          <div class="picker-image">
            <img
              v-if="a.imageUrl || a.image"
              :src="a.imageUrl || a.image"
              :alt="a.name"
              loading="lazy"
            />
            <span v-else class="picker-fallback">🍽</span>

            <span v-if="isSelected(a)" class="picker-check">✓</span>
            <span v-if="isSelected(a)" class="picker-qty">{{ selectedQuantity(a) }}</span>
          </div>

          <div class="picker-info">
            <span class="picker-category">{{ a.category }}</span>
            <strong class="picker-name">{{ a.name }}</strong>
            <span class="picker-price">KSh {{ Number(a.price).toLocaleString() }}</span>
          </div>
        </button>
      </div>

      <div v-if="hireItems.length" class="selected-panel">
        <div class="selected-head">
          <h3>
            Selected
            <span class="selected-count">{{ hireItems.length }}</span>
          </h3>
          <button type="button" class="link-btn" @click="emit('clear')">Clear all</button>
        </div>

        <ul class="selected-list">
          <li v-for="item in hireItems" :key="item.id" class="selected-item">
            <div class="thumb">
              <img
                v-if="item.imageUrl || item.image"
                :src="item.imageUrl || item.image"
                :alt="item.name"
              />
              <span v-else class="thumb-fallback">🍽</span>
            </div>

            <div class="selected-info">
              <strong>{{ item.name }}</strong>
              <small>KSh {{ Number(item.price).toLocaleString() }} / event</small>
            </div>

            <div class="qty-controls">
              <button
                type="button"
                @click="emit('decrease', item)"
                :disabled="item.quantity <= 1"
                aria-label="Decrease"
              >−</button>
              <span>{{ item.quantity }}</span>
              <button
                type="button"
                @click="emit('increase', item)"
                aria-label="Increase"
              >+</button>
            </div>

            <button
              type="button"
              class="remove-btn"
              @click="emit('remove-item', item.id)"
              aria-label="Remove"
            >×</button>
          </li>
        </ul>
      </div>

      <p v-if="errors.items" class="error">{{ errors.items }}</p>

    </section>

    <!-- ================= STEP 2: EVENT DETAILS ================= -->
    <section class="step-block">

      <header class="step-head">
        <span class="step-badge">02</span>
        <div>
          <h2>Event Details</h2>
          <p>Tell us who you are and about your event.</p>
        </div>
      </header>

      <div class="form-grid">

        <div class="form-group">
          <label>Your Name <span class="req">*</span></label>
          <input v-model="customerName" type="text" placeholder="Enter your full name" />
          <small v-if="errors.name" class="error">{{ errors.name }}</small>
        </div>

        <div class="form-group">
          <label>Phone Number <span class="req">*</span></label>
          <input v-model="phone" type="tel" placeholder="07XXXXXXXX" />
          <small v-if="errors.phone" class="error">{{ errors.phone }}</small>
        </div>

        <div class="form-group">
          <label>Event Type <span class="req">*</span></label>
          <select v-model="eventType">
            <option value="">Select event type</option>
            <option>Wedding</option>
            <option>Corporate Event</option>
            <option>Birthday</option>
            <option>Church Function</option>
            <option>Private Party</option>
            <option>Other</option>
          </select>
          <small v-if="errors.eventType" class="error">{{ errors.eventType }}</small>
        </div>

        <div class="form-group">
          <label>Event Date <span class="req">*</span></label>
          <input v-model="eventDate" type="date" />
          <small v-if="errors.eventDate" class="error">{{ errors.eventDate }}</small>
        </div>

        <div class="form-group full">
          <label>Event Location</label>
          <input v-model="location" type="text" placeholder="Venue or area (e.g. Karen, Nairobi)" />
        </div>

        <div class="form-group full">
          <label>Additional Notes</label>
          <textarea
            v-model="notes"
            rows="3"
            placeholder="Anything we should know — setup time, special requests…"
          ></textarea>
        </div>

      </div>

      <button type="button" class="primary-btn" @click="submitDetails">
        Review Booking
        <span class="btn-arrow">→</span>
      </button>

    </section>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.hire-request {
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
  gap: 32px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--ink);
}

/* ============ STEP BLOCK ============ */
.step-block {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 8px 24px -14px rgba(30, 36, 25, 0.12);
}

.step-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}

.step-badge {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--cream-2);
  color: var(--green);
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 1.05rem;
}

.step-head h2 {
  margin: 0 0 4px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.step-head p {
  margin: 0;
  font-size: 0.92rem;
  color: var(--muted);
}

/* ============ APPLIANCE PICKER ============ */
.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
}

.picker-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.picker-card:hover {
  border-color: rgba(184, 149, 106, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -14px rgba(30, 36, 25, 0.2);
}

.picker-card.selected {
  border-color: var(--green);
  background: rgba(46, 125, 50, 0.03);
}

.picker-image {
  position: relative;
  aspect-ratio: 1;
  background: var(--cream-2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.picker-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
  transition: transform 0.4s ease;
}

.picker-card:hover .picker-image img {
  transform: scale(1.06);
}

.picker-fallback {
  font-size: 2rem;
  opacity: 0.5;
}

.picker-check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--green);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.4);
}

.picker-qty {
  position: absolute;
  bottom: 8px;
  right: 8px;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--green-dark);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
}

.picker-info {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.picker-category {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

.picker-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
}

.picker-price {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--green);
  margin-top: 2px;
}

/* ============ SELECTED PANEL ============ */
.selected-panel {
  padding: 20px;
  background: var(--cream);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.selected-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.selected-head h3 {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
}

.selected-count {
  display: inline-grid;
  place-items: center;
  min-width: 24px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--green);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
}

.link-btn {
  padding: 4px 8px;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s ease;
}

.link-btn:hover {
  color: #c0392b;
}

.selected-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.selected-item {
  display: grid;
  grid-template-columns: 52px 1fr auto auto;
  gap: 14px;
  align-items: center;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.thumb {
  width: 52px;
  height: 52px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--cream-2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}

.thumb-fallback {
  font-size: 1.3rem;
  opacity: 0.5;
}

.selected-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.selected-info strong {
  font-size: 0.92rem;
  color: var(--ink);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected-info small {
  font-size: 0.78rem;
  color: var(--muted);
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px;
  background: var(--cream);
  border-radius: 999px;
}

.qty-controls button {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  color: var(--green);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: background 0.15s ease, color 0.15s ease;
}

.qty-controls button:hover:not(:disabled) {
  background: var(--green);
  color: #ffffff;
}

.qty-controls button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.qty-controls span {
  min-width: 20px;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--ink);
}

.remove-btn {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.15s ease, color 0.15s ease;
}

.remove-btn:hover {
  background: #fdeaea;
  color: #c0392b;
}

/* ============ FORM ============ */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #34463a;
}

.req {
  color: var(--green);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--ink);
  background: #fbfdfb;
  border: 1.5px solid #dfe8e1;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9aa89e;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--green);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15);
}

.error {
  font-size: 0.8rem;
  color: #c0392b;
  font-weight: 500;
}

/* ============ BUTTONS ============ */
.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 15px 24px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #ffffff;
  background: var(--green);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 0 0 var(--green-dark);
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

.primary-btn:hover {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 var(--green-dark);
}

.primary-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 0 0 var(--green-dark);
}

.btn-arrow {
  transition: transform 0.2s ease;
}

.primary-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* ============ LOADING / EMPTY ============ */
.loading-inline,
.empty-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: var(--muted);
  font-size: 0.92rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(46, 125, 50, 0.15);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============ RESPONSIVE ============ */
@media (max-width: 620px) {
  .step-block { padding: 24px 20px; }
  .form-grid { grid-template-columns: 1fr; }
  .picker-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
  .selected-item {
    grid-template-columns: 44px 1fr auto;
    gap: 10px;
  }
  .remove-btn { grid-column: 3; }
  .thumb { width: 44px; height: 44px; }
}
</style>