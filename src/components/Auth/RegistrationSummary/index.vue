<template>
  <div :class="$style.overlay">
    <div :class="$style.summaryBox">
      <h2 :class="$style.title">{{ t("registrationSummary.title") }}</h2>
      <p :class="$style.description">
        {{ t("registrationSummary.description") }}
      </p>

      <div :class="$style.dataGrid">
        <div :class="$style.dataRow">
          <span :class="$style.dataLabel">{{
            t("registrationSummary.username")
          }}</span>
          <span :class="$style.dataValue">{{ userData.username }}</span>
        </div>
        <div :class="$style.dataRow">
          <span :class="$style.dataLabel">{{
            t("registrationSummary.email")
          }}</span>
          <span :class="$style.dataValue">{{ userData.email }}</span>
        </div>
        <div :class="$style.dataRow">
          <span :class="$style.dataLabel">{{
            t("registrationSummary.userId")
          }}</span>
          <span :class="$style.dataValue">{{ userData.userId }}</span>
        </div>
      </div>

      <div :class="$style.actions">
        <button
          :class="[$style.button, $style.cancelButton]"
          @click="emit('cancel')"
        >
          {{ t("registrationSummary.cancel") }}
        </button>
        <button
          :class="[$style.button, $style.confirmButton]"
          @click="emit('confirm')"
        >
          {{ t("registrationSummary.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  name: "AuthRegistrationSummary",
});
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Props untuk menerima data pengguna dari parent
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

// Emits untuk mengirim event ke parent
const emit = defineEmits(["confirm", "cancel"]);
</script>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100; /* Lebih tinggi dari modal RegisterBox */
  backdrop-filter: blur(5px);
}

.summaryBox {
  background: var(--surface);
  padding: 32px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin: 0;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
  margin: 0;
}

.dataGrid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 24px 0;
}

.dataRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dataLabel {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 16px;
}

.dataValue {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.button {
  flex-grow: 1;
  padding: 14px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

.cancelButton {
  background-color: var(--surface);
  color: var(--primary);
  border: 1px solid var(--border-color);
}

.cancelButton:hover {
  background-color: var(--background);
}

.confirmButton {
  background-color: var(--button-cyan);
  color: var(--teks-kirim);
}

.confirmButton:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, black);
  box-shadow: 0 4px 8px rgba(0, 98, 230, 0.2);
}
</style>
