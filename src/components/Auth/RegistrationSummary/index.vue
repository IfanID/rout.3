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
  background-color: rgba(var(--v-theme-scrim), 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100; /* Lebih tinggi dari modal RegisterBox */
  backdrop-filter: blur(5px);
}

.summaryBox {
  background: rgb(var(--v-theme-background));
  padding: 32px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgb(var(--v-theme-border));
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: rgb(var(--v-theme-onBackground));
  text-align: center;
  margin: 0;
}

.description {
  font-size: 14px;
  color: rgb(var(--v-theme-onBackground));
  text-align: center;
  margin: 0;
}

.dataGrid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid rgb(var(--v-theme-border));
  border-bottom: 1px solid rgb(var(--v-theme-border));
  padding: 24px 0;
}

.dataRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dataLabel {
  font-weight: 500;
  color: rgb(var(--v-theme-onBackground));
  font-size: 16px;
}

.dataValue {
  font-weight: 600;
  color: rgb(var(--v-theme-onBackground));
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
  background-color: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgb(var(--v-theme-primary));
}

.cancelButton:hover {
  background-color: rgb(var(--v-theme-background));
}

.confirmButton {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-onInverseSurface));
}

.confirmButton:hover {
  background-color: color-mix(in srgb, rgb(var(--v-theme-primary)) 90%, rgb(var(--v-theme-scrim)));
  box-shadow: 0 4px 8px rgba(0, 98, 230, 0.2);
}
</style>
