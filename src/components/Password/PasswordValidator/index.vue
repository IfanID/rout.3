<template>
  <div :class="$style.passwordValidator">
    <ul
      v-if="password.length > 0 && !hideValidationText"
      :class="$style.validationList"
    >
      <li :class="[$style.validationItem, { [$style.valid]: isLengthValid }]">
        <span class="material-symbols-outlined">
          {{ isLengthValid ? "check_circle" : "cancel" }}
        </span>
        {{ t("passwordValidator.minLength") }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  name: "PasswordInputValidator",
});
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  hideValidationText: {
    type: Boolean,
    default: false,
  },
});

const isLengthValid = computed(() => props.password.length >= 6);

const validate = () => {
  return isLengthValid.value;
};

defineExpose({
  validate,
});
</script>

<style module>
.passwordValidator {
  margin-top: 12px;
}

.validationList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.validationItem {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.validationItem .material-symbols-outlined {
  font-size: 20px;
  margin-right: 8px;
  color: var(--error); /* Warna default untuk ikon (tidak valid) */
  transition: color 0.3s ease;
}

.validationItem.valid {
  color: var(--success); /* Warna teks menjadi hijau jika valid */
}

.validationItem.valid .material-symbols-outlined {
  color: var(--success); /* Warna ikon menjadi hijau jika valid */
}
</style>
