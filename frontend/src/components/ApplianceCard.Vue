<script setup>

defineProps({
  appliance: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'add'
])
</script>

<template>

  <article class="appliance-card">

    <div class="appliance-image">

      <!-- <img
      :src="appliance.image"
      :alt="appliance.name"
      > -->
      <img 
      :src="getImageUrl(appliance.image)" 
      :alt="appliance.name" 
      class="appliance-image" 
    />

      </div>
    <div class="appliance-info">

      <span class="appliance-category">
        {{ appliance.category }}
      </span>

      <h3>
        {{ appliance.name }}
      </h3>

      <p>
        {{ appliance.description }}
      </p>

      <div class="card-bottom">

        <div class="price">

          <small>
            From
          </small>

          <!-- <strong>
            KSh {{ appliance.price }}
          </strong> -->

          <strong>KSh {{ formattedPrice }}</strong>

          <small>
            /event
          </small>

        </div>

        <button
          class="add-button"
          @click="emit('add', appliance)"
        >
          + Add
        </button>

      </div>

    </div>

  </article>

</template>