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

  <section class="section">

    <div class="container">

      <div class="section-header">

        <h2>Admin Dashboard</h2>

        <p>
          Manage CAMTISH equipment and bookings.
        </p>

      </div>

      <div v-if="loading">
        Loading bookings...
      </div>

      <div v-else-if="error">
        {{ error }}
      </div>

      <div v-else>

        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="appliance-card"
          style="margin-bottom: 20px;"
        >

          <div class="appliance-content">

            <h3>
              Booking #{{ booking.id }}
            </h3>

            <p>
              <strong>Customer:</strong>
              {{ booking.customer_name }}
            </p>

            <p>
              <strong>Phone:</strong>
              {{ booking.customer_phone }}
            </p>

            <p>
              <strong>Equipment:</strong>
              {{ booking.appliance_name }}
            </p>

            <p>
              <strong>Quantity:</strong>
              {{ booking.quantity }}
            </p>

            <p>
              <strong>Event:</strong>
              {{ booking.event_type }}
            </p>

            <p>
              <strong>Event Date:</strong>
              {{ booking.event_date }}
            </p>

            <p>
              <strong>Quote:</strong>
              KSh {{ Number(booking.quoted_amount).toLocaleString() }}
            </p>

            <p>
              <strong>Status:</strong>
              {{ booking.status }}
            </p>

            <button
              class="btn btn-primary"
              @click="updateStatus(booking.id, 'confirmed')"
            >
              Confirm
            </button>

            <button
              class="btn btn-gold"
              @click="updateStatus(booking.id, 'rejected')"
            >
              Reject
            </button>

          </div>

        </div>

      </div>

    </div>

  </section>

</template>

<script setup>

import { ref, onMounted } from 'vue'

import api from '../services/api'

const bookings = ref([])

const loading = ref(false)

const error = ref('')

const token =
  localStorage.getItem('token')

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