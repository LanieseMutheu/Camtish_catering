<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    default: 'All'
  },

  search: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update:modelValue',
  'update:search'
])

const categories = [
  'All',
  'Serving',
  'Tableware',
  'Beverage',
  'Cooking',
  'Furniture'
]

</script>

<template>

  <div class="filters">

    <div class="category-buttons">

      <button
        v-for="category in categories"
        :key="category"
        :class="{
          active: props.modelValue === category
        }"
        @click="
          emit('update:modelValue', category)
        "
      >
        {{ category }}
      </button>

    </div>

    <input
      type="text"
      :value="props.search"
      @input="
        emit(
          'update:search',
          $event.target.value
        )
      "
      placeholder="Search appliances..."
      class="search-input"
    >

  </div>

</template>