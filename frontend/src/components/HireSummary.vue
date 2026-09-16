<script setup>

import { computed } from 'vue'

const props = defineProps({
  hireItems: {
    type: Array,
    required: true
  }
})

const subtotal = computed(() => {

  return props.hireItems.reduce(
    (total, item) => {
      return total + item.price * item.quantity
    },
    0
  )

})

const deliveryFee = computed(() => {

  if (props.hireItems.length === 0) {
    return 0
  }

  return 500

})

const estimatedTotal = computed(() => {

  return subtotal.value + deliveryFee.value

})

</script>

<template>

  <aside class="hire-summary">

    <div class="summary-header">

      <span>
        YOUR HIRE
      </span>

      <h2>
        Booking Summary
      </h2>

    </div>

    <div
      v-if="hireItems.length"
      class="summary-items"
    >

      <div
        v-for="item in hireItems"
        :key="item.id"
        class="summary-item"
      >

        <span>
          {{ item.name }}
          × {{ item.quantity }}
        </span>

        <strong>
          KSh {{ item.price * item.quantity }}
        </strong>

      </div>

    </div>

    <div
      v-else
      class="summary-empty"
    >

      <span>
        📋
      </span>

      <p>
        Your selected equipment will appear here.
      </p>

    </div>

    <div class="summary-calculations">

      <div>
        <span>
          Equipment
        </span>

        <strong>
          KSh {{ subtotal }}
        </strong>
      </div>

      <div>
        <span>
          Delivery
        </span>

        <strong>
          KSh {{ deliveryFee }}
        </strong>
      </div>

      <hr>

      <div class="total">

        <span>
          Estimated Total
        </span>

        <strong>
          KSh {{ estimatedTotal }}
        </strong>

      </div>

    </div>

    <p class="summary-note">
      * Final pricing may vary depending on event
      location, equipment quantity and hire duration.
    </p>

  </aside>

</template>