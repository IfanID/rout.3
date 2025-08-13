<template>
  <div class="dashboard-container">
    <div class="header-section">
      <h1>DashboardView</h1>
      <button @click="goToLogin" class="login-button">Login</button>
    </div>
    <!-- Konten dashboard lainnya bisa ditambahkan di sini -->
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  name: "DashboardView",
});
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative; /* Diperlukan untuk posisi absolut tombol */
}

.login-button {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  position: absolute; /* Posisi absolut */
  top: 0; /* Sesuaikan posisi vertikal */
  right: 0; /* Sesuaikan posisi horizontal */
}

.login-button:hover {
  background-color: var(--md-sys-color-primary-hover);
}
</style>
