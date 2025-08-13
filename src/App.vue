<template>
  <div id="app">
    <Notification />
    <router-view />
  </div>
</template>

<script>
import { onMounted } from "vue";
import "./assets/styles/main.css"; // Import global styles
import Notification from "@/components/Notification/index.vue";
import { useTheme } from "@/utils/theme.js";

export default {
  name: "App",
  components: {
    Notification,
  },
  setup() {
    const { initializeTheme } = useTheme();

    onMounted(() => {
      initializeTheme();
    });
  },
};
</script>

<style>
/* Global styles for theme application */
#app {
  height: 100%;
  width: 100%;
}

.theme-light {
  /* Variables for light theme, already defined in Login.vue style module */
}

.theme-dark {
  /* Variables for dark theme, already defined in Login.vue style module */
}
</style>
