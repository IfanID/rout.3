<template>
  <button
    type="button"
    :class="$style.togglePasswordButton"
    @click="togglePassword"
  >
    <span class="material-symbols-outlined">{{
      showPassword ? "visibility" : "visibility_off"
    }}</span>
  </button>
</template>

<script>
export default {
  name: "PasswordToggle",
  props: {
    showPassword: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle"],
  methods: {
    togglePassword() {
      this.$emit("toggle");
    },
  },
};
</script>

<style module>
.togglePasswordButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border-radius: 50%;
  transition: background-color 0.2s;
}

.togglePasswordButton:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
