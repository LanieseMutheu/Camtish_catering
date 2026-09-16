<script setup>
import flyer from '../assets/camtish-flyer.jpeg'

function browseEquipment() {
  document
    .getElementById('appliances')
    ?.scrollIntoView({
      behavior: 'smooth'
    })
}

function requestQuote() {
  document
    .getElementById('hire')
    ?.scrollIntoView({
      behavior: 'smooth'
    })
}
</script>

<template>

  <section
    id="top"
    class="hero"
  >

    <div class="hero-content">

      <span class="hero-label">
        QUALITY CATERING EQUIPMENT
      </span>

      <h2>
        Make Your Event
        <span>Extraordinary</span>
      </h2>

      <p>
        Reliable catering appliances and equipment
        available for weddings, corporate events,
        birthdays, church functions and private parties.
      </p>

      <div class="hero-buttons">

        <button
          class="primary-button"
          @click="browseEquipment"
        >
          Browse Appliances
        </button>

        <button
          class="secondary-button"
          @click="requestQuote"
        >
          Request a Quote
        </button>

      </div>

    </div>

    <div class="hero-image">

      <img
        :src="flyer"
        alt="DACADO catering equipment"
      >

    </div>

  </section>

</template>