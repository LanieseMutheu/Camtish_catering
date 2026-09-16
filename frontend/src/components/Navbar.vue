<script setup>
import logo from '../assets/logo.jpeg'
</script>

<template>

  <nav class="navbar">

    <div class="nav-container">

      <RouterLink
        to="/"
        class="logo"
        >

        <img
          :src="logo"
          alt="CAMTISH Catering Services"
        >
      
      </RouterLink>

      <div class="nav-links">

        <RouterLink to="/">
          Home
        </RouterLink>

        <RouterLink to="/Appliances">
          Appliances
        </RouterLink>

        <RouterLink to="/HireRequest">
          Request Quote
        </RouterLink>

        <RouterLink to="/Login">
          Login
        </RouterLink>

      </div>

    </div>

  </nav>

</template>