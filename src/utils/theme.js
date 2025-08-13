import { useTheme as useVuetifyTheme } from "vuetify";
import { computed } from "vue";

export function useTheme() {
  const vuetifyTheme = useVuetifyTheme();

  const theme = computed(() => vuetifyTheme.global.name.value);

  function toggleTheme() {
    const newTheme =
      vuetifyTheme.global.name.value === "light" ? "dark" : "light";
    vuetifyTheme.change(newTheme); // Menggunakan metode change() yang direkomendasikan
    localStorage.setItem("theme", newTheme);
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      vuetifyTheme.change(savedTheme); // Menggunakan metode change() yang direkomendasikan
    }
  }

  return {
    theme,
    toggleTheme,
    initializeTheme,
  };
}
