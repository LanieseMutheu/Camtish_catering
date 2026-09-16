<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const eventDate = ref('')
const eventType = ref('')
const location = ref('')

const errors = ref({})

const submitted = ref(false)

const request = ref([
  {
    name: 'Chafing Dish',
    price: 1000,
    quantity: 1
  },

  {
    name: 'Crockery & Cutlery',
    price: 500,
    quantity: 2
  }
])

const total = computed(() => {

  return request.value.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

})

function submitRequest() {

  errors.value = {}

  if (!name.value) {
    errors.value.name = 'Name is required.'
  }

  if (!phone.value) {
    errors.value.phone = 'Phone number is required.'
  }

  if (!eventDate.value) {
    errors.value.eventDate = 'Event date is required.'
  }

  if (!eventType.value) {
    errors.value.eventType = 'Please select an event type.'
  }

  if (Object.keys(errors.value).length) {
    return
  }

  submitted.value = true
}
</script>

<template>

  <main class="page">

    <section class="page-header">

      <span>HIRE REQUEST</span>

      <h1>
        Request a Quote
      </h1>

      <p>
        Tell us about your event and equipment needs.
      </p>

    </section>

    <section class="hire-layout">

      <form
        class="form-card"
        @submit.prevent="submitRequest"
      >

        <h2>Event Details</h2>

        <div class="form-group">

          <label>Your Name</label>

          <input
            v-model="name"
            type="text"
            placeholder="Enter your name"
          >

          <small v-if="errors.name">
            {{ errors.name }}
          </small>

        </div>

        <div class="form-group">

          <label>Email</label>

          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
          >

        </div>

        <div class="form-group">

          <label>Phone</label>

          <input
            v-model="phone"
            type="tel"
            placeholder="07XXXXXXXX"
          >

          <small v-if="errors.phone">
            {{ errors.phone }}
          </small>

        </div>

        <div class="form-group">

          <label>Event Date</label>

          <input
            v-model="eventDate"
            type="date"
          >

          <small v-if="errors.eventDate">
            {{ errors.eventDate }}
          </small>

        </div>

        <div class="form-group">

          <label>Event Type</label>

          <select v-model="eventType">

            <option value="">
              Select event type
            </option>

            <option>
              Wedding
            </option>

            <option>
              Corporate Event
            </option>

            <option>
              Birthday
            </option>

            <option>
              Church Function
            </option>

            <option>
              Private Party
            </option>

          </select>

          <small v-if="errors.eventType">
            {{ errors.eventType }}
          </small>

        </div>

        <div class="form-group">

          <label>Event Location</label>

          <input
            v-model="location"
            type="text"
            placeholder="Event location"
          >

        </div>

        <button
          type="submit"
          class="primary-button"
        >
          Request Quote
        </button>

        <div
          v-if="submitted"
          class="success-message"
        >
          Your quote request has been prepared successfully.
        </div>

      </form>

      <aside class="summary-card">

        <h2>Your Hire</h2>

        <div
          v-for="item in request"
          :key="item.name"
          class="summary-item"
        >

          <div>

            <strong>
              {{ item.name }}
            </strong>

            <span>
              {{ item.quantity }} × KSh {{ item.price }}
            </span>

          </div>

          <strong>
            KSh {{ item.quantity * item.price }}
          </strong>

        </div>

        <div class="summary-total">

          <span>
            Estimated Total
          </span>

          <strong>
            KSh {{ total }}
          </strong>

        </div>

      </aside>

    </section>

  </main>

</template>