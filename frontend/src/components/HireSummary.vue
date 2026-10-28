<script setup>
import { computed } from 'vue'

const props = defineProps({
  hireItems: { type: Array, required: true },
  customer: { type: Object, required: true },
  submitting: { type: Boolean, default: false }
})

const emit = defineEmits(['back', 'confirm'])

const subtotal = computed(() =>
  props.hireItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const deliveryFee = computed(() => (props.hireItems.length === 0 ? 0 : 500))
const estimatedTotal = computed(() => subtotal.value + deliveryFee.value)
const totalItems = computed(() =>
  props.hireItems.reduce((sum, item) => sum + item.quantity, 0)
)

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-KE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<template>
  <div class="hire-summary">

    <!-- ============ HEAD ============ -->
    <header class="summary-head">
      <span class="step-badge">03</span>
      <div>
        <h2>Review Your Booking</h2>
        <p>Check the details below and confirm to send your request.</p>
      </div>
    </header>

    <!-- ============ CUSTOMER ============ -->
    <section class="summary-block">
      <div class="block-head">
        <h3>Event Details</h3>
        <button type="button" class="link-btn" @click="emit('back')" :disabled="submitting">
          Edit
        </button>
      </div>

      <div class="customer-grid">
        <div class="row">
          <span class="row-label">Name</span>
          <strong class="row-value">{{ customer.name || '—' }}</strong>
        </div>
        <div class="row">
          <span class="row-label">Phone</span>
          <strong class="row-value">{{ customer.phone || '—' }}</strong>
        </div>
        <div class="row">
          <span class="row-label">Event</span>
          <strong class="row-value">{{ customer.eventType || '—' }}</strong>
        </div>
        <div class="row">
          <span class="row-label">Date</span>
          <strong class="row-value">{{ formatDate(customer.eventDate) }}</strong>
        </div>
        <div v-if="customer.location" class="row full">
          <span class="row-label">Location</span>
          <strong class="row-value">{{ customer.location }}</strong>
        </div>
        <div v-if="customer.notes" class="row full">
          <span class="row-label">Notes</span>
          <strong class="row-value">{{ customer.notes }}</strong>
        </div>
      </div>
    </section>

    <!-- ============ ITEMS ============ -->
    <section class="summary-block">
      <div class="block-head">
        <h3>
          Equipment
          <span class="count">{{ totalItems }}</span>
        </h3>
        <button type="button" class="link-btn" @click="emit('back')" :disabled="submitting">
          Change
        </button>
      </div>

      <ul class="items-list">
        <li v-for="item in hireItems" :key="item.id" class="item-row">
          <div class="item-thumb">
            <img
              v-if="item.imageUrl || item.image"
              :src="item.imageUrl || item.image"
              :alt="item.name"
            />
            <span v-else class="item-fallback">🍽</span>
          </div>

          <div class="item-info">
            <strong>{{ item.name }}</strong>
            <small>KSh {{ Number(item.price).toLocaleString() }} × {{ item.quantity }}</small>
          </div>

          <strong class="item-total">
            KSh {{ (item.price * item.quantity).toLocaleString() }}
          </strong>
        </li>
      </ul>
    </section>

    <!-- ============ TOTALS ============ -->
    <section class="summary-block totals">
      <div class="total-row">
        <span>Equipment subtotal</span>
        <strong>KSh {{ subtotal.toLocaleString() }}</strong>
      </div>
      <div class="total-row">
        <span>Delivery &amp; setup</span>
        <strong>KSh {{ deliveryFee.toLocaleString() }}</strong>
      </div>
      <div class="total-row grand">
        <span>Total billing</span>
        <strong>KSh {{ estimatedTotal.toLocaleString() }}</strong>
      </div>
    </section>

    <p class="summary-note">
      Final pricing may vary slightly based on event location and requirements.
      We'll confirm everything with you before proceeding.
    </p>

    <!-- ============ ACTIONS ============ -->
    <div class="summary-actions">
      <button
        type="button"
        class="ghost-btn"
        @click="emit('back')"
        :disabled="submitting"
      >
        ← Back to edit
      </button>

      <button
        type="button"
        class="primary-btn"
        @click="emit('confirm')"
        :disabled="submitting"
      >
        <span v-if="!submitting">Confirm Booking →</span>
        <span v-else class="btn-loading">
          <span class="spinner"></span>
          Submitting…
        </span>
      </button>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.hire-summary {
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
  gap: 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--ink);
}

/* ============ HEAD ============ */
.summary-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 4px;
}

.step-badge {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--green);
  color: #ffffff;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 1.05rem;
}

.summary-head h2 {
  margin: 0 0 4px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.summary-head p {
  margin: 0;
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.5;
}

/* ============ BLOCKS ============ */
.summary-block {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 24px 26px;
  box-shadow: 0 8px 24px -14px rgba(30, 36, 25, 0.1);
}

.block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}

.block-head h3 {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
}

.count {
  display: inline-grid;
  place-items: center;
  min-width: 24px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--cream-2);
  color: var(--green);
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
}

.link-btn {
  padding: 4px 10px;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--green);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.link-btn:hover:not(:disabled) {
  background: rgba(46, 125, 50, 0.08);
}
.link-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ============ CUSTOMER ============ */
.customer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 24px;
}
.row { display: flex; flex-direction: column; gap: 3px; }
.row.full { grid-column: 1 / -1; }

.row-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.row-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink);
  word-break: break-word;
}

/* ============ ITEMS ============ */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item-row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 10px 12px;
  background: var(--cream);
  border-radius: 8px;
}

.item-thumb {
  width: 56px;
  height: 56px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--cream-2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.item-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.item-fallback { font-size: 1.4rem; opacity: 0.5; }

.item-info { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.item-info strong {
  font-size: 0.95rem;
  color: var(--ink);
  font-weight: 600;
}
.item-info small { font-size: 0.78rem; color: var(--muted); }

.item-total {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--green);
  white-space: nowrap;
}

/* ============ TOTALS ============ */
.totals {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.92rem;
  color: var(--muted);
}
.total-row strong { color: var(--ink); font-weight: 600; }

.total-row.grand {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 2px solid var(--cream-2);
}
.total-row.grand span {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
}
.total-row.grand strong {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--green-dark);
  letter-spacing: -0.01em;
}

/* ============ NOTE ============ */
.summary-note {
  margin: 4px 4px 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--muted);
  font-style: italic;
}

/* ============ ACTIONS ============ */
.summary-actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.ghost-btn,
.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.2s ease;
}

.ghost-btn {
  flex: 0 0 auto;
  color: var(--ink);
  background: transparent;
  border: 1.5px solid var(--line);
}
.ghost-btn:hover:not(:disabled) {
  border-color: var(--green);
  color: var(--green);
  background: rgba(46, 125, 50, 0.04);
}
.ghost-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.primary-btn {
  flex: 1;
  color: #ffffff;
  background: var(--green);
  border: none;
  box-shadow: 0 4px 0 0 var(--green-dark);
}
.primary-btn:hover:not(:disabled) {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 var(--green-dark);
}
.primary-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 0 0 var(--green-dark);
}
.primary-btn:disabled {
  opacity: 0.85;
  cursor: not-allowed;
  transform: none;
}

.btn-loading {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ============ RESPONSIVE ============ */
@media (max-width: 620px) {
  .summary-block { padding: 20px; }
  .customer-grid { grid-template-columns: 1fr; gap: 12px; }
  .summary-actions { flex-direction: column-reverse; }
  .ghost-btn,
  .primary-btn { width: 100%; }
  .item-row {
    grid-template-columns: 48px 1fr;
    grid-template-areas:
      "thumb info"
      "thumb total";
  }
  .item-thumb { grid-area: thumb; width: 48px; height: 48px; }
  .item-info { grid-area: info; }
  .item-total { grid-area: total; margin-top: 4px; }
}
</style>