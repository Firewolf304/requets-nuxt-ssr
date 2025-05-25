<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <CCard class="w-full max-w-md shadow-xl p-6">
      <CCardHeader class="text-center text-2xl font-bold text-gray-700 dark:text-white">
        Авторизация
      </CCardHeader>
      <CCardBody>
        <CForm @submit.prevent="handleLogin">
          <div class="mb-4">
            <CFormLabel for="login">Логин</CFormLabel>
            <CFormInput id="login" v-model="login" type="text" required placeholder="Введите логин" />
          </div>

          <div class="mb-4">
            <CFormLabel for="password">Пароль</CFormLabel>
            <CFormInput id="password" v-model="password" type="password" required placeholder="Введите пароль" />
          </div>

          <div class="mt-6">
            <CButton color="primary" type="submit" class="w-full">
              Войти
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie, useRuntimeConfig } from '#imports';
import { postLogin } from '@/composables/API/auth'

const login = ref('');
const password = ref('');
const handleLogin = async () => { postLogin(login.value, password.value); };
 
</script>

<style scoped>
.dark .CCard {
  background-color: #1e293b;
  color: #fff;
}
</style>
