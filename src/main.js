import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/firebase/index.js"; // Import Firebase configuration
import vuetify from "@/plugins/vuetify.js";

// i18n
import { createI18n } from "vue-i18n";
import en from "./lang/en.json";
import id from "./lang/id.json";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("user-lang") || "id",
  fallbackLocale: "en",
  messages: {
    en,
    id,
  },
});

const app = createApp(App);

// Create a simple global event bus
const emitter = {
  _events: {},
  on(event, callback) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
  },
  emit(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach((callback) => callback(...args));
    }
  },
  off(event, callback) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter((cb) => cb !== callback);
    }
  },
};

app.config.globalProperties.$emitter = emitter;

app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");
