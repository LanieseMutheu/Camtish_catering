<template>
  <div class="appliances-page">

    <section class="page-header">
      <div>
        <p class="eyebrow">CAMTISH CATERING</p>

        <h1>Catering Appliances</h1>

        <p>
          Quality equipment for weddings, corporate events,
          private parties and special occasions.
        </p>
      </div>
    </section>


    <!-- Loading -->
    <div v-if="loading" class="state-message">
      <div class="loader"></div>
      <p>Loading appliances...</p>
    </div>


    <!-- Error -->
    <div v-else-if="error" class="error-box">
      <h3>Unable to load appliances</h3>

      <p>{{ error }}</p>

      <button @click="getAppliances">
        Try Again
      </button>
    </div>


    <!-- Appliances -->
    <section v-else class="appliances-grid">

      <article
        v-for="appliance in appliances"
        :key="appliance.id"
        class="appliance-card"
      >

        <div class="image-container">
          <img
            :src="getApplianceImage(appliance.image)"
            :alt="appliance.name"
          />
        </div>


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
                KSh {{ Number(appliance.price).toLocaleString() }}
              </strong>
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


    <!-- Empty -->
    <div
      v-if="!loading && !error && appliances.length === 0"
      class="empty-state"
    >
      <h3>No appliances available</h3>

      <p>
        Please check again later.
      </p>
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import api from "../services/api";


// Router
const router = useRouter();


// State
const appliances = ref([]);

const loading = ref(false);

const error = ref("");


// Images
import chafingDish from "../assets/chafingDish.jpeg";
import crockery from "../assets/crockeryandcutlery.jpeg";
import beverageDispenser from "../assets/beverageDispenser.jpeg";
import soupKettle from "../assets/soupKettle.jpeg";
import table from "../assets/servingTable.jpeg";
import linen from "../assets/linen.jpeg";


const applianceImages = {
  "chafingDish.jpeg": chafingDish,
  "crockeryandcutlery.jpeg": crockery,
  "beverageDispenser.jpeg": beverageDispenser,
  "soupKettle.jpeg": soupKettle,
  "servingTable.jpeg": table,
  "linen.jpeg": linen,
};


// Get image
function getApplianceImage(filename) {
  return applianceImages[filename] || "";
}


// Get appliances
async function getAppliances() {

  loading.value = true;

  error.value = "";


  try {

    const response = await api.get("/appliances");

    appliances.value = response.data;

  } catch (err) {

    console.error(err);

    error.value =
      err.response?.data?.message ||
      "There was a problem connecting to the server.";

  } finally {

    loading.value = false;

  }
}


// Request quote
function requestQuote(appliance) {

  router.push({
    name: "RequestQuote",
    query: {
      applianceId: appliance.id,
    },
  });

}


// Load when page opens
onMounted(() => {
  getAppliances();
});
</script>


<style scoped>

.appliances-page {
  min-height: 100vh;
  padding: 50px 7%;
  background: #f7f8f5;
}


.page-header {
  margin-bottom: 40px;
}


.eyebrow {
  color: #0b4d2b;
  font-weight: 700;
  letter-spacing: 2px;
}


.page-header h1 {
  font-size: 42px;
  color: #0b4d2b;
  margin: 10px 0;
}


.page-header p {
  color: #666;
  max-width: 650px;
  font-size: 17px;
}


.appliances-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(280px, 1fr));

  gap: 28px;
}


.appliance-card {
  background: white;

  border-radius: 18px;

  overflow: hidden;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}


.appliance-card:hover {
  transform: translateY(-6px);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.12);
}


.image-container {
  width: 100%;
  height: 240px;

  background: #f3f3f3;

  overflow: hidden;
}


.image-container img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}


.card-content {
  padding: 24px;
}


.category {
  color: #b8860b;

  font-size: 13px;

  font-weight: 700;

  text-transform: uppercase;
}


.card-content h2 {
  color: #123d27;

  margin: 8px 0;

  font-size: 24px;
}


.card-content p {
  color: #666;

  line-height: 1.6;

  min-height: 50px;
}


.card-bottom {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  margin-top: 20px;
}


.price-label {
  display: block;

  color: #888;

  font-size: 13px;
}


.card-bottom strong {
  color: #b8860b;

  font-size: 20px;
}


.quote-button {
  border: none;

  background: #0b4d2b;

  color: white;

  padding: 11px 16px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;
}


.quote-button:hover {
  background: #07381f;
}


.state-message,
.empty-state {
  text-align: center;

  padding: 80px 20px;
}


.error-box {
  background: #fff1f1;

  border: 1px solid #ffcccc;

  padding: 25px;

  border-radius: 12px;

  text-align: center;
}


.error-box button {
  margin-top: 15px;

  padding: 10px 18px;

  border: none;

  border-radius: 7px;

  background: #0b4d2b;

  color: white;

  cursor: pointer;
}


.loader {
  width: 35px;
  height: 35px;

  border: 4px solid #ddd;

  border-top: 4px solid #0b4d2b;

  border-radius: 50%;

  animation: spin 1s linear infinite;

  margin: auto;
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


@media (max-width: 600px) {

  .appliances-page {
    padding: 35px 5%;
  }


  .page-header h1 {
    font-size: 32px;
  }


  .card-bottom {
    flex-direction: column;

    align-items: stretch;
  }


  .quote-button {
    width: 100%;
  }

}

</style>