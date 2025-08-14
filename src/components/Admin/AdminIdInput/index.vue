<template>
  <div :class="$style.inputContainer">
    <div :class="$style.inputWrapper">
      <span class="material-symbols-outlined">badge</span>
      <input
        type="text"
        :id="id"
        :value="modelValue"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :placeholder="placeholder"
        required
        autocomplete="username"
      />
    </div>
    <!-- Pesan validasi hanya muncul jika input fokus -->
    <p v-if="isFocused" :class="$style.errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "AdminIdInput",
  emits: ["update:modelValue", "validation"],
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isValid: true,
      errorMessage: "",
      isFocused: false, // Properti untuk melacak status fokus
    };
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit("update:modelValue", value);
      this.validate(value);
    },
    validate(value) {
      const regex = /^f3[a-zA-Z0-9]{5}r$/; // Validasi format ketat
      this.isValid = regex.test(value);

      // Mengatur errorMessage:
      if (!this.isValid) {
        this.errorMessage = this.$t("validation.adminIdFormat");
      } else {
        this.errorMessage = ""; // Reset pesan kesalahan jika valid
      }

      this.$emit("validation", this.isValid);
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.validate(newValue);
      },
    },
  },
};
</script>

<style module>
.inputWrapper {
  display: flex;
  align-items: center;
  background-color: rgb(var(--v-theme-background));
  border: 2px solid rgb(var(--v-theme-onBackground));
  border-radius: 16px;
  transition: border-color 0.2s;
  padding: 0 16px;
}

.inputWrapper:focus-within {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(0, 98, 230, 0.2);
}

.inputWrapper .material-symbols-outlined {
  font-size: 20px;
  color: rgb(var(--v-theme-onBackground));
}

.inputWrapper input {
  flex-grow: 1;
  width: 100%;
  padding: 14px 20px 14px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: rgb(var(--v-theme-onBackground));
  outline: none;
}

.inputWrapper input::placeholder {
  color: rgb(var(--v-theme-onBackground));
  opacity: 0.7;
}

.errorMessage {
  color: rgb(var(--v-theme-error));
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
}
</style>
