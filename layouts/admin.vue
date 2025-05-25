<template>
  <div>
    <adminnavbar/>
    <slot />
    <!--Nuxt/-->
  </div>
</template>

<script setup>
  import adminnavbar from '~/components/v1/adminnavbar.vue';
  import apitoken from '~/middleware/apitoken'
  await apitoken()
</script>

<style>

</style>