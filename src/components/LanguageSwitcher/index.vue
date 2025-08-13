<template>
  <div class="custom-language-switcher" @click="toggleDropdown">
    <div class="selected-language">
      <span>{{ currentLangText }}</span>
      <span class="arrow" :class="{ 'arrow-up': isOpen }">&#9660;</span>
    </div>
    <ul v-if="isOpen" class="language-list">
      <li
        v-for="lang in languages"
        :key="lang.value"
        @click.stop="selectLanguage(lang.value)"
        :class="{ active: currentLang === lang.value }"
      >
        {{ lang.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  data() {
    return {
      isOpen: false,
      currentLang: localStorage.getItem("user-lang") || "id",
      languages: [
        { text: "Indonesia", value: "id" },
        { text: "English", value: "en" },
      ],
    };
  },
  computed: {
    currentLangText() {
      const selected = this.languages.find((l) => l.value === this.currentLang);
      return selected ? selected.text : "";
    },
  },
  mounted() {
    this.$i18n.locale = this.currentLang;
    // Menambahkan event listener untuk menutup dropdown saat klik di luar komponen
    document.addEventListener("click", this.closeDropdownOnClickOutside);
  },
  beforeUnmount() {
    // Menghapus event listener saat komponen dihancurkan
    document.removeEventListener("click", this.closeDropdownOnClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectLanguage(newLang) {
      this.currentLang = newLang;
      localStorage.setItem("user-lang", newLang);
      this.$i18n.locale = newLang;
      this.isOpen = false; // Menutup dropdown setelah memilih
    },
    closeDropdownOnClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.custom-language-switcher {
  position: relative;
  width: 200px;
  font-family: "Google Sans Text", sans-serif;
  cursor: pointer;
  border: 2px solid rgb(var(--v-theme-border));
  border-radius: 16px;
  background-color: rgb(var(--v-theme-background));
  user-select: none;
}

.selected-language {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  color: rgb(var(--v-theme-onBackground));
}

.arrow {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.arrow.arrow-up {
  transform: rotate(180deg);
}

.language-list {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 5px 0;
  background-color: rgb(
    var(--v-theme-background)
  ); /* Menggunakan tema Vuetify */
  border: 2px solid rgb(var(--v-theme-border)); /* Menggunakan tema Vuetify */
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}

.language-list li {
  padding: 12px 15px;
  font-size: 14px;
  color: rgb(var(--v-theme-onBackground)); /* Menggunakan tema Vuetify */
  transition: background-color 0.2s ease;
}

.language-list li:hover {
  background-color: rgb(
    var(--v-theme-secondary)
  ); /* Menggunakan tema Vuetify untuk hover */
}

.language-list li.active {
  background-color: rgb(var(--v-theme-primary)); /* Menggunakan tema Vuetify */
  color: rgb(var(--v-theme-teksKirim)); /* Menggunakan tema Vuetify */
  font-weight: 500;
}
</style>
