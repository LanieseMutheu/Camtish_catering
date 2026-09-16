<script setup>

import ApplianceCard from './ApplianceCard.vue'

defineProps({
  appliances: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'add-to-hire'
])

function addItem(appliance) {
  emit('add-to-hire', appliance)
}

</script>

<template>

  <div>

    <div
      v-if="appliances.length > 0"
      class="appliance-grid"
    >

      <ApplianceCard
        v-for="appliance in appliances"
        :key="appliance.id"
        :appliance="appliance"
        @add="addItem"
      />

    </div>

    <div
      v-else
      class="empty-state"
    >

      <div class="empty-icon">
        🔍
      </div>

      <h3>
        No appliances found
      </h3>

      <p>
        Try another search or category.
      </p>

    </div>

  </div>

</template>