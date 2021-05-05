<template>
  <div class="demo-alert-box">
    <strong>Error!</strong>
    <slot />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.demo-alert-box {
  padding: 10px 20px;
  background: #f3beb8;
  border: 1px solid #f09898;
  width: 250px;
  margin: 0 auto;
}
</style>
