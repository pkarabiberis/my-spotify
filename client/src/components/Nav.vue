<template>
  <div class="nav">
    <h4>Profile</h4>
    <h4>Top artists</h4>
    <h4>Top tracks</h4>
    <h4>Recent</h4>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav {
  background-color: rgb(4, 3, 6);
  color: white;
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  text-align: center;
  z-index: 99;
}

h4 {
  padding: 5px;
}
</style>