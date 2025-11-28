<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>Ошибка сервера</h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">Вернуться на главную</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({ statusCode: 500, message: 'An error occurred' })
    }
  },
  layout: 'error'
}
</script>

<style>
.error-page {
  text-align: center;
  padding: 50px;
}
</style>
