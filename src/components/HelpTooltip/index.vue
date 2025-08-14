<template>
  <div :class="$style.helpTooltipContainer" ref="helpTooltip">
    <!-- Overlay -->
    <div v-if="showHelp" :class="$style.overlay" @click="showHelp = false"></div>

    <span
      class="material-symbols-outlined"
      :class="$style.helpIcon"
      @click.stop="toggleHelp"
    >
      help
    </span>
    <p v-if="showHelp" :class="$style.helpMessage">
      {{ $t(messageKey) }}
    </p>
  </div>
</template>

<script>
export default {
  name: "HelpTooltip",
  props: {
    messageKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showHelp: false,
    };
  },
  methods: {
    toggleHelp() {
      this.showHelp = !this.showHelp;
    },
  },
};
</script>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent; /* Make it transparent */
  z-index: 999; /* Below the helpMessage (z-index: 1000) */
}

.helpTooltipContainer {
  position: relative;
  display: inline-block;
}

.helpIcon {
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
  color: rgb(var(--v-theme-onBackground));
  transition: color 0.2s;
}

.helpIcon:hover {
  color: rgb(var(--v-theme-primary));
}

.helpMessage {
  position: fixed; /* Position relative to the viewport */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust for true centering */
  z-index: 1000; /* Ensure it's on top of most content */
  font-size: 12px;
  color: rgb(var(--v-theme-test));
  background-color: rgb(var(--v-theme-background));
  padding: 8px;
  border-radius: 8px;
  border: 3px solid rgb(var(--v-theme-primary));
  width: 340px; /* Fixed width */
  text-align: center; /* Center text within the box */
}
</style>