<template>

    <section class="section">
  
      <div class="container">
  
        <div class="form-container">
  
          <h2>Admin Login</h2>
  
          <form @submit.prevent="login">
  
            <div class="form-group">
  
              <label>Email</label>
  
              <input
                v-model="email"
                type="email"
                required
              >
  
            </div>
  
            <div class="form-group">
  
              <label>Password</label>
  
              <input
                v-model="password"
                type="password"
                required
              >
  
            </div>
  
            <p v-if="error">
              {{ error }}
            </p>
  
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="loading"
            >
  
              {{ loading
                ? 'Logging in...'
                : 'Login'
              }}
  
            </button>
  
          </form>
  
        </div>
  
      </div>
  
    </section>
  
  </template>
  
  <script setup>
  
  import { ref } from 'vue'
  
  import { useRouter } from 'vue-router'
  
  import api from '../services/api'
  
  const router = useRouter()
  
  const email = ref('')
  
  const password = ref('')
  
  const loading = ref(false)
  
  const error = ref('')
  
  const login = async () => {
  
    loading.value = true
  
    error.value = ''
  
    try {
  
      const response =
        await api.post(
          '/auth/login',
          {
            email: email.value,
            password: password.value
          }
        )
  
      localStorage.setItem(
        'token',
        response.data.token
      )
  
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      )
  
      router.push('/admin')
  
    } catch (err) {
  
      error.value =
        err.response?.data?.message ||
        'Login failed.'
  
    } finally {
  
      loading.value = false
  
    }
  
  }
  
  </script>