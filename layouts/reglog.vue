<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import apitoken from '~/middleware/apitoken'
  await apitoken()
  
</script>

<style>

</style>