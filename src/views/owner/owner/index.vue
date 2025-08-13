<template>
  <div>
    <h1>Selamat Datang, Owner!</h1>
    <p>Ini adalah halaman khusus untuk Owner.</p>
  </div>
</template>

<script>
export default {
  name: "OwnerView",
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan Material You */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-primary);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: var(--primary);
}

p {
  font-size: 1.2em;
  color: var(--text-secondary);
}
</style>
