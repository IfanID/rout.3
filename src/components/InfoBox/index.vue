<template>
  <div :class="$style.overlay" @click.self="$emit('close')">
    <div :class="$style.infoBox">
      <button :class="$style.closeButton" @click="$emit('close')">
        <span class="material-symbols-outlined">close</span>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoBox",
  emits: ["close"],
};
</script>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.infoBox {
  background: rgb(var(--v-theme-surface));
  padding: 40px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 3px solid rgb(var(--v-theme-outline));
  width: 90%;
  max-width: 500px; /* Adjust as needed */
  position: relative;
  text-align: center;
}

.closeButton {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 24px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.closeButton:hover {
  background-color: rgb(var(--v-theme-background));
}
</style>
