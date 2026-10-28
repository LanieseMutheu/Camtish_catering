<template>
  <div class="appliances-page">

    <div class="page-content">

      <section class="page-header">

        <p class="eyebrow">
          CAMTISH CATERING
        </p>

        <h1>
          Catering Appliances
        </h1>

        <p>
          Quality equipment for weddings, corporate events,
          private parties and special occasions.
        </p>

      </section>

      <!-- LOADING -->

      <div
        v-if="loading"
        class="state-message"
      >

        <div class="loader"></div>

        <p>
          Loading appliances...
        </p>

      </div>


      <!-- ERROR -->

      <div
        v-else-if="error"
        class="error-box"
      >

        <h3>
          Unable to load appliances
        </h3>

        <p>
          {{ error }}
        </p>

        <button @click="getAppliances">
          Try Again
        </button>

      </div>


      <!-- APPLIANCES -->

      <section
        v-else
        class="appliances-grid"
      >

        <article
          v-for="appliance in appliances"
          :key="appliance.id"
          class="appliance-card"
        >

          <!-- IMAGE -->

          <div class="image-container">

            <img
              :src="getApplianceImage(appliance.image)"
              :alt="appliance.name"
              @error="handleImageError"
            />

          </div>


          <!-- CONTENT -->

          <div class="card-content">

            <span class="category">
              {{ appliance.category }}
            </span>

            <h2>
              {{ appliance.name }}
            </h2>

            <p>
              {{ appliance.description }}
            </p>


            <div class="card-bottom">

              <div>

                <span class="price-label">
                  From
                </span>

                <strong>
                  KSh {{ formatPrice(appliance) }}
                </strong>

                <span class="price-period">
                  / event
                </span>

              </div>


              <button
                class="quote-button"
                @click="requestQuote(appliance)"
              >
                Request Quote
              </button>

            </div>

          </div>

        </article>

      </section>


      <!-- NO RESULTS -->

      <div
        v-if="
          !loading &&
          !error &&
          appliances.length === 0
        "
        class="empty-state"
      >

        <h3>
          No appliances available
        </h3>

        <p>
          Please check again later.
        </p>

      </div>

    </div>

    <Footer/>

  </div>
</template>


<script setup>

import {
  ref,
  onMounted
} from "vue";

import {
  useRouter
} from "vue-router";

import api from "../services/api";

import Footer from "../components/Footer.vue";


// ==============================
// ROUTER
// ==============================

const router = useRouter();


// ==============================
// STATE
// ==============================

const appliances = ref([]);

const loading = ref(false);

const error = ref("");


// ==============================
// LOAD ALL ASSETS AUTOMATICALLY
// ==============================

const applianceImages = import.meta.glob(
  "../assets/*",
  {
    eager: true,
    query: "?url",
    import: "default"
  }
);


// ==============================
// GET IMAGE
// ==============================

function getApplianceImage(filename) {

  if (!filename) {
    return "";
  }


  // Get only the filename
  const cleanFilename =
    filename
      .split("/")
      .pop()
      .split("\\")
      .pop();


  // Find matching asset
  const assetPath =
    Object.keys(applianceImages).find(
      path =>
        path.endsWith(
          `/${cleanFilename}`
        )
    );


  if (assetPath) {
    return applianceImages[assetPath];
  }


  // Try case-insensitive matching
  const lowerFilename =
    cleanFilename.toLowerCase();


  const caseInsensitivePath =
    Object.keys(applianceImages).find(
      path =>
        path
          .split("/")
          .pop()
          .toLowerCase() === lowerFilename
    );


  if (caseInsensitivePath) {
    return applianceImages[
      caseInsensitivePath
    ];
  }


  console.warn(
    "Image not found:",
    filename
  );


  return "";
}


// ==============================
// FORMAT PRICE
// ==============================

function formatPrice(appliance) {

  // Supports either database field
  // price OR price_per_day

  const price =
    appliance.price ??
    appliance.price_per_day;


  const numericPrice =
    Number(price);


  if (Number.isNaN(numericPrice)) {
    return "Price unavailable";
  }


  return numericPrice.toLocaleString(
    "en-KE"
  );
}


// ==============================
// LOAD APPLIANCES
// ==============================

async function getAppliances() {

  loading.value = false;

  error.value = "";


  try {

    const response =
      await api.get("/appliances");


    appliances.value =
      response.data;


    console.log(
      "Appliances from API:",
      appliances.value
    );

  } catch (err) {

    console.error(
      "Failed to retrieve appliances:",
      err
    );


    error.value =
      err.response?.data?.message ||
      "Failed to retrieve appliances.";

  } finally {

    loading.value = false;

  }
}


// ==============================
// IMAGE ERROR
// ==============================

function handleImageError(event) {

  console.error(
    "Image failed to load:",
    event.target.src
  );

}


// ==============================
// REQUEST QUOTE
// ==============================

function requestQuote(appliance) {

  router.push({
    name: "RequestQuote",

    query: {
      applianceId: appliance.id
    }
  });

}


// ==============================
// LOAD PAGE
// ==============================

onMounted(() => {
  getAppliances();
});

</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');


.appliances-page {

  --cream: #faf6ee;
  --cream-2: #f2ead9;
  --ink: #1e2419;
  --muted: #6b6a5c;
  --green: #2e7d32;
  --green-dark: #1b5e20;
  --gold: #b8956a;
  --line: rgba(30, 36, 25, 0.1);

  min-height: 100vh;

  padding: 80px 7% 0;

  background: var(--cream);

  color: var(--ink);

  font-family: 'Inter', system-ui, -apple-system, sans-serif;

}


.page-header {

  max-width: 720px;

  margin: 0 auto 56px;

  text-align: center;

}


.eyebrow {

  display: inline-flex;

  align-items: center;

  gap: 12px;

  color: var(--green);

  font-size: 0.75rem;

  font-weight: 600;

  letter-spacing: 0.2em;

  text-transform: uppercase;

  margin: 0 0 20px;

  padding: 0;

}

.eyebrow::before {

  content: '';

  width: 32px;

  height: 1px;

  background: var(--gold);

}

.eyebrow::after {

  content: '';

  width: 32px;

  height: 1px;

  background: var(--gold);

}


.page-header h1 {

  font-family: 'Playfair Display', Georgia, serif;

  font-size: clamp(2rem, 4.5vw, 3.2rem);

  font-weight: 500;

  letter-spacing: -0.02em;

  line-height: 1.1;

  color: var(--ink);

  margin: 0 0 18px;

}


.page-header > p:last-child {

  color: var(--muted);

  max-width: 580px;

  margin: 0 auto;

  font-size: 1.02rem;

  line-height: 1.65;

}


/* ==========================
   GRID
========================== */

.appliances-grid {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(280px, 1fr)
    );

  gap: 28px;

  max-width: 1200px;

  margin: 0 auto;

  padding-bottom: 80px;

}


/* ==========================
   CARD
========================== */

.appliance-card {

  position: relative;

  background: #ffffff;

  border: 1px solid var(--line);

  border-radius: 8px;

  overflow: hidden;

  box-shadow:
    0 10px 30px
    rgba(30, 36, 25, 0.06);

  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;

}


.appliance-card::before {

  content: '';

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  height: 3px;

  background: var(--gold);

  transform: scaleX(0);

  transform-origin: left;

  transition: transform 0.4s ease;

  z-index: 2;

}


.appliance-card:hover {

  transform:
    translateY(-6px);

  border-color:
    rgba(184, 149, 106, 0.5);

  box-shadow:
    0 24px 48px -20px
    rgba(30, 36, 25, 0.22);

}

.appliance-card:hover::before {

  transform: scaleX(1);

}


/* ==========================
   IMAGE
========================== */

.image-container {

  width: 100%;

  height: 240px;

  background: var(--cream-2);

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  position: relative;

}


.image-container img {

  width: 100%;

  height: 100%;

  object-fit: contain;

  padding: 16px;

  display: block;

  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

}

.appliance-card:hover .image-container img {

  transform: scale(1.05);

}


/* ==========================
   CONTENT
========================== */

.card-content {

  padding: 24px 26px 28px;

}


.category {

  display: inline-block;

  color: var(--gold);

  font-size: 0.7rem;

  font-weight: 600;

  letter-spacing: 0.15em;

  text-transform: uppercase;

  margin-bottom: 4px;

}


.card-content h2 {

  font-family: 'Playfair Display', Georgia, serif;

  color: var(--ink);

  margin: 8px 0 10px;

  font-size: 1.35rem;

  font-weight: 600;

  line-height: 1.25;

  letter-spacing: -0.01em;

}


.card-content p {

  color: var(--muted);

  font-size: 0.92rem;

  line-height: 1.65;

  min-height: 50px;

  margin: 0;

}


/* ==========================
   BOTTOM
========================== */

.card-bottom {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  margin-top: 24px;

  padding-top: 20px;

  border-top: 1px solid var(--line);

}


.price-label {

  display: block;

  color: var(--muted);

  font-size: 0.72rem;

  letter-spacing: 0.1em;

  text-transform: uppercase;

  margin-bottom: 4px;

}


.card-bottom strong {

  color: var(--green);

  font-family: 'Playfair Display', Georgia, serif;

  font-size: 1.35rem;

  font-weight: 600;

  letter-spacing: -0.01em;

}


.price-period {

  color: var(--muted);

  font-size: 0.75rem;

  margin-left: 4px;

}


.quote-button {

  border: none;

  background: var(--green);

  color: #ffffff;

  padding: 12px 20px;

  border-radius: 4px;

  cursor: pointer;

  font-family: inherit;

  font-size: 0.85rem;

  font-weight: 600;

  letter-spacing: 0.02em;

  box-shadow: 0 3px 0 0 var(--green-dark);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.quote-button:hover {

  background: var(--green-dark);

  transform: translateY(-2px);

  box-shadow: 0 5px 0 0 var(--green-dark);

}

.quote-button:active {

  transform: translateY(0);

  box-shadow: 0 2px 0 0 var(--green-dark);

}


/* ==========================
   STATES
========================== */

.state-message,
.empty-state {

  text-align: center;

  padding: 100px 20px;

  color: var(--muted);

}


.state-message p,
.empty-state p {

  font-size: 0.95rem;

  margin-top: 12px;

}


.empty-state h3 {

  font-family: 'Playfair Display', Georgia, serif;

  font-size: 1.5rem;

  font-weight: 500;

  color: var(--ink);

  margin: 0;

}

.empty-state::before {

  content: '🍽';

  display: block;

  font-size: 2.2rem;

  margin-bottom: 18px;

  opacity: 0.5;

}


.error-box {

  max-width: 520px;

  margin: 40px auto;

  background: #fef7f3;

  border: 1px solid rgba(192, 57, 43, 0.2);

  border-left: 4px solid #c0392b;

  padding: 28px 32px;

  border-radius: 6px;

  text-align: center;

  color: var(--ink);

}

.error-box h3 {

  font-family: 'Playfair Display', Georgia, serif;

  font-size: 1.25rem;

  font-weight: 600;

  margin: 0 0 8px;

  color: var(--ink);

}

.error-box p {

  color: var(--muted);

  font-size: 0.92rem;

  margin: 0 0 8px;

  line-height: 1.6;

}


.error-box button {

  margin-top: 15px;

  padding: 10px 22px;

  border: none;

  border-radius: 4px;

  background: var(--green);

  color: white;

  cursor: pointer;

  font-family: inherit;

  font-size: 0.88rem;

  font-weight: 600;

  transition: background 0.2s ease;

}

.error-box button:hover {

  background: var(--green-dark);

}


/* ==========================
   LOADER
========================== */

.loader {

  width: 40px;

  height: 40px;

  border: 3px solid rgba(46, 125, 50, 0.15);

  border-top:
    3px solid var(--green);

  border-radius: 50%;

  animation:
    spin 0.9s linear infinite;

  margin: auto;

}


@keyframes spin {

  to {
    transform: rotate(360deg);
  }

}


/* ==========================
   MOBILE
========================== */

@media (max-width: 600px) {

  .appliances-page {

    padding:
      48px 5% 0;

  }


  .page-header {

    margin-bottom: 40px;

  }


  .page-header h1 {

    font-size: 32px;

  }


  .appliances-grid {

    padding-bottom: 48px;

    gap: 20px;

  }


  .card-bottom {

    flex-direction:
      column;

    align-items:
      stretch;

  }


  .quote-button {

    width: 100%;

  }

}


/* ==========================
   FOOTER FULL-WIDTH FIX
   (new rules — appended)
========================== */

.appliances-page {

  padding-left: 0;

  padding-right: 0;

}

.page-content {

  padding-left: 7%;

  padding-right: 7%;

}


@media (max-width: 600px) {

  .page-content {

    padding-left: 5%;

    padding-right: 5%;

  }

}

</style>