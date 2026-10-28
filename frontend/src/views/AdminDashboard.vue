<!-- <script setup>
import { ref } from 'vue'

const stats = ref([
  {
    title: 'Total Equipment',
    value: 24
  },

  {
    title: 'Active Bookings',
    value: 8
  },

  {
    title: 'Pending Requests',
    value: 5
  },

  {
    title: 'Available Equipment',
    value: 18
  }
])
</script>

<template>

  <main class="page">

    <section class="page-header">

      <span>ADMINISTRATION</span>

      <h1>
        Dashboard
      </h1>

      <p>
        Manage your catering equipment and bookings.
      </p>

    </section>

    <section class="dashboard-grid">

      <div
        v-for="stat in stats"
        :key="stat.title"
        class="stat-card"
      >

        <span>
          {{ stat.title }}
        </span>

        <strong>
          {{ stat.value }}
        </strong>

      </div>

    </section>

  </main>

</template> -->

<template>

  <div class="admin-shell">

    <!-- ============ TOP ADMIN BAR ============ -->
    <header class="admin-bar">
      <div class="admin-bar-inner">

        <div class="admin-brand">
          <span class="admin-brand-mark">C</span>
          <div class="admin-brand-text">
            <strong>CAMTISH</strong>
            <em>Admin Console</em>
          </div>
        </div>

        <div class="admin-bar-right">

          <div class="admin-user">
            <span class="admin-user-avatar">{{ userInitial }}</span>
            <div class="admin-user-info">
              <strong>{{ adminUser.name || 'Administrator' }}</strong>
              <em>{{ adminUser.email || '' }}</em>
            </div>
          </div>

          <button class="logout-btn" @click="logout">
            <span>Logout</span>
          </button>

        </div>

      </div>
    </header>

    <!-- ============ MAIN ============ -->
    <main class="admin-main">
      <div class="admin-container">

        <header class="page-head">
          <div>
            <h1>Bookings</h1>
            <p>Review and respond to customer quote requests.</p>
          </div>
          <button class="refresh-btn" @click="getBookings" :disabled="loading">
            <span v-if="!loading">↻ Refresh</span>
            <span v-else>Refreshing…</span>
          </button>
        </header>

        <!-- STATS -->
        <section v-if="!loading && !error && bookings.length" class="stats-row">
          <div
            v-for="s in summary"
            :key="s.label"
            class="stat-tile"
            :class="s.tone"
          >
            <span class="stat-tile-label">{{ s.label }}</span>
            <strong class="stat-tile-value">{{ s.value }}</strong>
          </div>
        </section>

        <!-- FILTER TABS -->
        <section v-if="!loading && !error && bookings.length" class="filter-bar">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="filter-tab"
            :class="{ active: filter === tab.value }"
            @click="filter = tab.value"
          >
            {{ tab.label }}
            <span class="filter-count">{{ tab.count }}</span>
          </button>
        </section>

        <!-- LOADING -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <span>Loading bookings...</span>
        </div>

        <!-- ERROR -->
        <div v-else-if="error" class="error-state">
          <span>{{ error }}</span>
          <button class="btn btn-primary" @click="getBookings">
            Try again
          </button>
        </div>

        <!-- BOOKINGS -->
        <div v-else>

          <div v-if="!bookings.length" class="empty-state">
            <span>No bookings available yet.</span>
          </div>

          <div v-else-if="!filteredBookings.length" class="empty-state">
            <span>No {{ filter }} bookings right now.</span>
          </div>

          <div v-else class="booking-list">

            <article
              v-for="booking in filteredBookings"
              :key="booking.id"
              class="booking-card"
              :class="`status-${booking.status}`"
            >

              <div class="booking-head">
                <div class="booking-id">
                  <span class="hash">#</span>{{ booking.id }}
                </div>
                <p class="status-row" :class="`status-${booking.status}`">
                  {{ booking.status }}
                </p>
              </div>

              <div class="booking-body">

                <div class="booking-primary">
                  <h2>{{ booking.customer_name }}</h2>
                  <p class="booking-phone">{{ booking.customer_phone }}</p>
                </div>

                <div class="booking-details">
                  <div class="detail">
                    <span class="detail-label">Equipment</span>
                    <span class="detail-value">{{ booking.appliance_name }}</span>
                  </div>
                  <div class="detail">
                    <span class="detail-label">Quantity</span>
                    <span class="detail-value">{{ booking.quantity }}</span>
                  </div>
                  <div class="detail">
                    <span class="detail-label">Event</span>
                    <span class="detail-value">{{ booking.event_type }}</span>
                  </div>
                  <div class="detail">
                    <span class="detail-label">Event date</span>
                    <span class="detail-value">{{ booking.event_date }}</span>
                  </div>
                </div>

                <div class="booking-quote">
                  <span class="quote-label">Quoted amount</span>
                  <strong class="quote-value">KSh {{ Number(booking.quoted_amount).toLocaleString() }}</strong>
                </div>

              </div>

              <div class="booking-actions">

                <template v-if="booking.status === 'pending'">
                  <button class="btn btn-primary" @click="updateStatus(booking.id, 'confirmed')">
                    Confirm
                  </button>
                  <button class="btn btn-gold" @click="updateStatus(booking.id, 'rejected')">
                    Reject
                  </button>
                </template>

                <template v-else-if="booking.status === 'confirmed'">
                  <button class="btn btn-outline" @click="updateStatus(booking.id, 'pending')">
                    Reopen as pending
                  </button>
                  <button class="btn btn-ghost" @click="updateStatus(booking.id, 'rejected')">
                    Reject
                  </button>
                </template>

                <template v-else-if="booking.status === 'rejected'">
                  <button class="btn btn-outline" @click="updateStatus(booking.id, 'pending')">
                    Reopen as pending
                  </button>
                  <button class="btn btn-ghost" @click="updateStatus(booking.id, 'confirmed')">
                    Confirm
                  </button>
                </template>

                <template v-else>
                  <button class="btn btn-primary" @click="updateStatus(booking.id, 'confirmed')">
                    Confirm
                  </button>
                  <button class="btn btn-gold" @click="updateStatus(booking.id, 'rejected')">
                    Reject
                  </button>
                </template>

              </div>

            </article>

          </div>

        </div>

      </div>
    </main>

  </div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import api from '../services/api'

const router = useRouter()

const bookings = ref([])

const loading = ref(false)

const error = ref('')

const filter = ref('all')

const token =
  localStorage.getItem('token')

const adminUser = JSON.parse(localStorage.getItem('user') || '{}')

const userInitial = computed(() => {
  const name = adminUser.name || adminUser.email || 'A'
  return name.charAt(0).toUpperCase()
})

const summary = computed(() => {
  const total = bookings.value.length
  const confirmed = bookings.value.filter(b => b.status === 'confirmed').length
  const pending = bookings.value.filter(b => b.status === 'pending').length
  const revenue = bookings.value
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + Number(b.quoted_amount), 0)

  return [
    { label: 'Total Bookings', value: total, tone: 'tone-total' },
    { label: 'Pending', value: pending, tone: 'tone-pending' },
    { label: 'Confirmed', value: confirmed, tone: 'tone-confirmed' },
    { label: 'Revenue', value: `KSh ${revenue.toLocaleString()}`, tone: 'tone-confirmed' }
  ]
})

const tabs = computed(() => {
  const c = { all: bookings.value.length, pending: 0, confirmed: 0, rejected: 0 }
  bookings.value.forEach(b => {
    if (c[b.status] !== undefined) c[b.status]++
  })
  return [
    { label: 'All', value: 'all', count: c.all },
    { label: 'Pending', value: 'pending', count: c.pending },
    { label: 'Confirmed', value: 'confirmed', count: c.confirmed },
    { label: 'Rejected', value: 'rejected', count: c.rejected }
  ]
})

const filteredBookings = computed(() => {
  if (filter.value === 'all') return bookings.value
  return bookings.value.filter(b => b.status === filter.value)
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/Login')
}

const getBookings = async () => {

  loading.value = true

  try {

    const response = await api.get(
      '/bookings',
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    bookings.value = response.data

  } catch (err) {

    console.error(err)

    error.value =
      'Unable to load bookings.'

  } finally {

    loading.value = false

  }

}

const updateStatus = async (
  id,
  status
) => {

  try {

    await api.patch(
      `/bookings/${id}/status`,
      { status },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    await getBookings()

  } catch (err) {

    console.error(err)

    alert(
      'Unable to update booking.'
    )

  }

}

onMounted(() => {
  getBookings()
})

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.admin-shell {

  --cream: #faf6ee;
  --cream-2: #f2ead9;
  --ink: #1e2419;
  --muted: #6b6a5c;
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --gold: #b8956a;
  --line: rgba(30, 36, 25, 0.1);

  min-height: 100vh;
  background: var(--cream);
  color: var(--ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ============ TOP ADMIN BAR ============ */
.admin-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  box-shadow: 0 2px 16px rgba(20, 40, 25, 0.15);
}

.admin-bar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--cream);
}

.admin-brand-mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--gold);
  color: var(--green-dark);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 700;
}

.admin-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.admin-brand-text strong {
  font-size: 0.92rem;
  letter-spacing: 0.16em;
  font-weight: 600;
}

.admin-brand-text em {
  font-style: normal;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(250, 246, 238, 0.65);
}

.admin-bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 16px;
  border-right: 1px solid rgba(250, 246, 238, 0.2);
}

.admin-user-avatar {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(250, 246, 238, 0.15);
  color: var(--cream);
  font-weight: 700;
  font-size: 0.82rem;
  border: 1px solid rgba(250, 246, 238, 0.25);
}

.admin-user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.admin-user-info strong {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--cream);
}

.admin-user-info em {
  font-style: normal;
  font-size: 0.7rem;
  color: rgba(250, 246, 238, 0.65);
}

.logout-btn {
  padding: 9px 18px;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--cream);
  background: rgba(250, 246, 238, 0.1);
  border: 1px solid rgba(250, 246, 238, 0.25);
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.logout-btn:hover {
  background: rgba(250, 246, 238, 0.2);
  border-color: rgba(250, 246, 238, 0.4);
}

/* ============ MAIN ============ */
.admin-main {
  padding: 48px 32px 80px;
}

.admin-container {
  max-width: 1280px;
  margin: 0 auto;
}

/* ============ PAGE HEAD ============ */
.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.page-head h1 {
  margin: 0 0 6px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.9rem, 3.5vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1.1;
}

.page-head p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.6;
}

.refresh-btn {
  padding: 10px 20px;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--green);
  background: transparent;
  border: 1px solid rgba(46, 125, 50, 0.3);
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(46, 125, 50, 0.08);
  border-color: var(--green);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============ STATS ============ */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 22px 22px 20px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-top: 3px solid var(--gold);
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -14px rgba(30, 36, 25, 0.18);
}

.stat-tile.tone-total     { border-top-color: var(--green); }
.stat-tile.tone-confirmed { border-top-color: #059669; }
.stat-tile.tone-pending   { border-top-color: #d97706; }
.stat-tile.tone-rejected  { border-top-color: #dc2626; }

.stat-tile-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.stat-tile-value {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1;
}

/* ============ FILTER BAR ============ */
.filter-bar {
  display: flex;
  gap: 6px;
  padding: 6px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 8px;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  background: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
}

.filter-tab:hover {
  color: var(--ink);
  background: rgba(30, 36, 25, 0.04);
}

.filter-tab.active {
  background: var(--green);
  color: #ffffff;
}

.filter-count {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 20px;
  padding: 0 6px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(30, 36, 25, 0.08);
  color: inherit;
  border-radius: 999px;
}

.filter-tab.active .filter-count {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

/* ============ STATES ============ */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 20px;
  color: var(--muted);
  font-size: 0.95rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(46, 125, 50, 0.15);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 480px;
  margin: 40px auto;
  padding: 28px 26px;
  background: #fdf3ef;
  border: 1px solid rgba(192, 57, 43, 0.2);
  border-left: 4px solid #c0392b;
  border-radius: 6px;
  color: #8a2a1e;
  font-size: 0.92rem;
  text-align: center;
}

.empty-state {
  padding: 80px 20px;
  text-align: center;
  color: var(--muted);
  font-size: 0.95rem;
  background: #ffffff;
  border: 1px dashed var(--line);
  border-radius: 8px;
}

/* ============ BOOKING LIST ============ */
.booking-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ============ BOOKING CARD ============ */
.booking-card {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.booking-card::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
  background: var(--gold);
}

.booking-card.status-pending::before   { background: #d97706; }
.booking-card.status-confirmed::before { background: #059669; }
.booking-card.status-rejected::before  { background: #dc2626; }
.booking-card.status-cancelled::before { background: #6b7280; }

.booking-card:hover {
  border-color: rgba(184, 149, 106, 0.4);
  box-shadow: 0 16px 32px -22px rgba(30, 36, 25, 0.2);
}

.booking-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(30, 36, 25, 0.02);
  border-bottom: 1px solid var(--line);
}

.booking-id {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.booking-id .hash {
  color: var(--gold);
  margin-right: 2px;
  font-weight: 500;
}

/* status pill */
.status-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
}

.status-pending   { background: #fef3c7; color: #92400e; }
.status-confirmed { background: #d1fae5; color: #065f46; }
.status-rejected  { background: #fee2e2; color: #991b1b; }
.status-cancelled { background: #e5e7eb; color: #374151; }

/* body */
.booking-body {
  display: grid;
  grid-template-columns: 1.1fr 2fr 1fr;
  gap: 32px;
  padding: 24px;
  align-items: center;
}

.booking-primary h2 {
  margin: 0 0 4px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.booking-phone {
  margin: 0;
  font-size: 0.88rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.booking-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.detail-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.detail-value {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.booking-quote {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  padding-left: 24px;
  border-left: 1px solid var(--line);
  text-align: right;
}

.quote-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.quote-value {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--green);
  line-height: 1;
  letter-spacing: -0.01em;
}

/* actions */
.booking-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px 24px;
  background: rgba(30, 36, 25, 0.02);
  border-top: 1px solid var(--line);
  justify-content: flex-end;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.btn-primary {
  color: #ffffff;
  background: var(--green);
  box-shadow: 0 3px 0 0 var(--green-dark);
}
.btn-primary:hover {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 0 0 var(--green-dark);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 0 0 var(--green-dark);
}

.btn-gold {
  color: #ffffff;
  background: var(--gold);
  box-shadow: 0 3px 0 0 #96754f;
}
.btn-gold:hover {
  background: #a8835a;
  transform: translateY(-2px);
  box-shadow: 0 5px 0 0 #96754f;
}

.btn-outline {
  color: var(--green);
  background: transparent;
  border: 1px solid var(--green);
}
.btn-outline:hover {
  background: rgba(46, 125, 50, 0.08);
}

.btn-ghost {
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--line);
}
.btn-ghost:hover {
  color: var(--ink);
  border-color: rgba(30, 36, 25, 0.25);
  background: rgba(30, 36, 25, 0.03);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 1024px) {
  .booking-body {
    grid-template-columns: 1fr 2fr;
    gap: 24px;
  }
  .booking-quote {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
    padding-top: 16px;
    border-left: none;
    border-top: 1px solid var(--line);
  }
  .booking-details {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .admin-bar-inner {
    padding: 12px 20px;
    gap: 12px;
  }
  .admin-user-info { display: none; }
  .admin-bar-right { gap: 10px; }
  .admin-user { padding-right: 10px; }

  .admin-main { padding: 32px 16px 56px; }
  .page-head { margin-bottom: 24px; }
  .stats-row { gap: 12px; margin-bottom: 20px; }
  .stat-tile { padding: 18px; }
  .stat-tile-value { font-size: 1.7rem; }

  .booking-body {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  .booking-details { grid-template-columns: repeat(2, 1fr); gap: 12px 16px; }
  .booking-quote {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
  }
  .booking-actions {
    padding: 14px 20px;
    justify-content: stretch;
  }
  .booking-actions .btn { flex: 1; min-width: 0; }
  .booking-head { padding: 14px 20px; }
}

</style>