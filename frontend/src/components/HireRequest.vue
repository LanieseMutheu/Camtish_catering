<script setup>

import { ref } from 'vue'

const props = defineProps({
  hireItems: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'remove-item',
  'increase',
  'decrease',
  'clear'
])

const customerName = ref('')
const phone = ref('')
const eventType = ref('')
const eventDate = ref('')
const location = ref('')
const notes = ref('')

const submitted = ref(false)

function submitRequest() {

  if (
    !customerName.value ||
    !phone.value ||
    !eventType.value ||
    !eventDate.value
  ) {
    alert('Please fill in all required fields.')
    return
  }

  submitted.value = true
}

</script>

<template>

  <div class="hire-request">

    <div class="section-heading left">

      <span>HIRE REQUEST</span>

      <h2>
        Tell Us About
        <strong>Your Event</strong>
      </h2>

      <p>
        Select your equipment and send us your
        event details for a quotation.
      </p>

    </div>

    <!-- SELECTED ITEMS -->

    <div class="selected-items">

      <div class="selected-header">

        <h3>
          Selected Equipment
        </h3>

        <button
          v-if="props.hireItems.length"
          @click="emit('clear')"
        >
          Clear All
        </button>

      </div>

      <div
        v-if="props.hireItems.length"
      >

        <div
          v-for="item in props.hireItems"
          :key="item.id"
          class="selected-item"
        >

        <div class="selected-item-image">

          <img
          :src="item.image"
          :alt="item.name"
          >
          </div>


          <div class="selected-item-info">

            <strong>
              {{ item.name }}
            </strong>

            <small>
              KSh {{ item.price }} / event
            </small>

          </div>

          <div class="quantity-controls">

            <button
              @click="emit('decrease', item)"
            >
              −
            </button>

            <span>
              {{ item.quantity }}
            </span>

            <button
              @click="emit('increase', item)"
            >
              +
            </button>

          </div>

          <button
            class="remove-button"
            @click="emit('remove-item', item.id)"
          >
            ×
          </button>

        </div>

      </div>

      <div
        v-else
        class="no-items"
      >

        <span>🛒</span>

        <p>
          No equipment selected yet.
        </p>

        <small>
          Choose equipment from the catalogue above.
        </small>

      </div>

    </div>

    <!-- CUSTOMER FORM -->

    <form
      class="customer-form"
      @submit.prevent="submitRequest"
    >

      <div class="form-row">

        <div class="form-group">

          <label>
            Your Name *
          </label>

          <input
            v-model="customerName"
            type="text"
            placeholder="Enter your name"
          >

        </div>

        <div class="form-group">

          <label>
            Phone Number *
          </label>

          <input
            v-model="phone"
            type="tel"
            placeholder="07XXXXXXXX"
          >

        </div>

      </div>

      <div class="form-row">

        <div class="form-group">

          <label>
            Event Type *
          </label>

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

            <option>
              Other
            </option>

          </select>

        </div>

        <div class="form-group">

          <label>
            Event Date *
          </label>

          <input
            v-model="eventDate"
            type="date"
          >

        </div>

      </div>

      <div class="form-group">

        <label>
          Event Location
        </label>

        <input
          v-model="location"
          type="text"
          placeholder="Where will the event take place?"
        >

      </div>

      <div class="form-group">

        <label>
          Additional Information
        </label>

        <textarea
          v-model="notes"
          rows="4"
          placeholder="Tell us anything else we should know..."
        ></textarea>

      </div>

      <button
        type="submit"
        class="submit-button"
      >
        Request Quote
      </button>

    </form>

    <div
      v-if="submitted"
      class="success-message"
    >

      <span>✓</span>

      <div>

        <strong>
          Request Received!
        </strong>

        <p>
          Thank you, {{ customerName }}.
          DACADO will contact you on {{ phone }}
          about your event.
        </p>

      </div>

    </div>

  </div>

</template>