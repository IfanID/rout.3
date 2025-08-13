<template>
  <div :class="$style.loginPage">
    <header :class="$style.header">
      <div :class="$style.languageSwitcher">
        <LanguageSwitcher />
      </div>
      <div :class="$style.headerActions">
        <v-btn icon @click="toggleTheme" variant="text" rounded="xl">
          <span class="material-symbols-outlined">{{
            theme === "light" ? "light_mode" : "dark_mode"
          }}</span>
        </v-btn>
        <button :class="$style.registerButton" @click="handleRegisterClick">
          {{ $t("login.register_button") }}
        </button>
      </div>
    </header>

    <main :class="$style.loginContainer">
      <div :class="$style.loginBox">
        <h1>
          {{
            loginMode === "user"
              ? $t("login.user_login_title")
              : $t("login.admin_login_title")
          }}
        </h1>
        <form @submit.prevent="handleLogin">
          <div :class="$style.inputGroup">
            <label for="username">{{ $t("login.username_label") }}</label>
            <div :class="$style.inputWrapper">
              <span class="material-symbols-outlined">person</span>
              <input
                type="text"
                id="username"
                v-model="username"
                :placeholder="
                  loginMode === 'user'
                    ? $t('login.user_username_placeholder')
                    : $t('login.admin_username_placeholder')
                "
                required
              />
            </div>
          </div>
          <div :class="$style.inputGroup">
            <label for="password">{{ $t("login.password_label") }}</label>
            <div :class="[$style.inputWrapper, $style.passwordInputContainer]">
              <span class="material-symbols-outlined">lock</span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                :placeholder="
                  loginMode === 'user'
                    ? $t('login.user_password_placeholder')
                    : $t('login.admin_password_placeholder')
                "
                required
              />
              <PasswordToggle
                :show-password="showPassword"
                @toggle="togglePassword"
              />
            </div>
            <PasswordValidator
              :password="password"
              ref="passwordValidatorRef"
            />
          </div>
          <div :class="$style.formActions">
            <button
              type="button"
              :class="[$style.loginButton, $style.toggleModeButton]"
              @click="toggleLoginMode"
            >
              {{
                loginMode === "user"
                  ? $t("login.switch_admin_login")
                  : $t("login.switch_user_login")
              }}
            </button>
            <button
              type="submit"
              :class="[$style.loginButton, $style.mainLoginButton]"
            >
              <span :class="$style.loginButtonText">{{
                $t("login.login_button")
              }}</span>
            </button>
          </div>
        </form>

        <div :class="$style.separator">
          <span>{{ $t("login.or_login_with") }}</span>
        </div>

        <div :class="$style.socialLogin">
          <button :class="[$style.socialButton, $style.googleButton]">
            <span class="material-symbols-outlined">g_mobiledata</span> Google
          </button>
          <button :class="[$style.socialButton, $style.githubButton]">
            <span class="material-symbols-outlined">code</span> GitHub
          </button>
          <button
            type="button"
            :class="[$style.socialButton, $style.adminButton]"
            @click="showAdminRegisterBoxDialog = true"
          >
            <span class="material-symbols-outlined">admin_panel_settings</span>
            {{ $t("login.admin_button") }}
          </button>
          <button
            type="button"
            :class="$style.socialButton"
            @click="showNotificationSimulation"
          >
            <span class="material-symbols-outlined">science</span>
            Simulasi Notif
          </button>
        </div>
      </div>
    </main>

    <!-- Dialog untuk RegisterBox -->
    <div
      v-if="showRegisterBoxDialog"
      :class="$style.dialogOverlay"
      @click="closeRegisterBoxDialog"
    >
      <div :class="$style.dialogContent" @click.stop>
        <Register @close="closeRegisterBoxDialog" />
      </div>
    </div>

    <!-- Dialog untuk AdminRegisterBox -->
    <div
      v-if="showAdminRegisterBoxDialog"
      :class="$style.dialogOverlay"
      @click="closeAdminRegisterBoxDialog"
    >
      <div :class="$style.dialogContent" @click.stop>
        <AdminRegister @close="closeAdminRegisterBoxDialog" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Register from "@/components/Auth/Register/index.vue";
import AdminRegister from "@/components/Auth/AdminRegister/index.vue"; // Impor AdminRegister
import PasswordToggle from "@/components/Password/PasswordToggle/index.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import PasswordValidator from "@/components/Password/PasswordValidator/index.vue";
import { useTheme } from "@/utils/theme.js";

export default {
  name: "AuthLoginPage",
  components: {
    Register,
    AdminRegister, // Daftarkan komponen AdminRegister
    PasswordToggle,
    LanguageSwitcher,
    PasswordValidator,
  },
  setup() {
    const { theme, toggleTheme, initializeTheme } = useTheme();

    onMounted(() => {
      initializeTheme();
    });

    return { theme, toggleTheme };
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      showRegisterBoxDialog: false,
      showAdminRegisterBoxDialog: false, // State baru untuk dialog AdminRegisterBox
      loginMode: "user",
      passwordValidatorRef: null, // Tambahkan ref untuk PasswordValidator
    };
  },
  mounted() {
    this.passwordValidatorRef = this.$refs.passwordValidatorRef;
  },
  methods: {
    showNotificationSimulation() {
      const notifications = [
        { message: "Ini adalah notifikasi sukses!", type: "success" },
        { message: "Ini adalah notifikasi error.", type: "error" },
        { message: "Ini adalah notifikasi peringatan.", type: "warning" },
        { message: "Ini adalah notifikasi info.", type: "info" },
      ];

      notifications.forEach((notif, index) => {
        setTimeout(() => {
          this.$emitter.emit("show-notification", notif);
        }, index * 1000); // Munculkan setiap 1 detik
      });
    },
    handleLogin() {
      if (this.passwordValidatorRef && !this.passwordValidatorRef.validate()) {
        this.$emitter.emit("show-notification", {
          message: this.$t("passwordValidator.minLength"),
          type: "error",
        });
        return;
      }
      console.log(
        "Logging in as",
        this.loginMode,
        "with:",
        this.username,
        this.password,
      );
    },
    handleRegisterClick() {
      this.showRegisterBoxDialog = true;
    },
    closeRegisterBoxDialog() {
      this.showRegisterBoxDialog = false;
    },
    closeAdminRegisterBoxDialog() {
      // Metode baru untuk menutup dialog AdminRegisterBox
      this.showAdminRegisterBoxDialog = false;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleLoginMode() {
      this.loginMode = this.loginMode === "user" ? "admin" : "user";
      console.log("Login mode switched to:", this.loginMode);
    },
  },
};
</script>

<style module>
/* Import Material Symbols */
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

*,
*::before,
*::after {
  box-sizing: border-box;
}

.loginPage {
  display: flex;
  flex-direction: column;
  height: 100dvh; /* Use dynamic viewport height */
  overflow: hidden; /* Prevent scrolling on the body */
  background-color: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-on-background));
  transition:
    background-color 0.3s,
    color 0.3s;
}

.header {
  display: flex;
  justify-content: space-between; /* Mengatur ruang antara elemen */
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  flex-shrink: 0;
  height: rgb(var(--v-theme-primary));
}

.headerActions {
  display: flex;
  gap: 12px;
}

.languageSwitcher {
  /* Posisi di pojok kiri atas */
  display: flex;
  align-items: center;
  width: 150px; /* Sesuaikan lebar v-select */
}

.language-select.v-input {
  font-size: 14px;
  border-radius: 16px;
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-onBackground));
}

.language-select.v-input .v-field__outline {
  border-color: rgb(var(--v-theme-border)) !important;
}

.language-select.v-input .v-field__input {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  min-height: unset !important;
}

.language-select.v-input .v-field__append-inner > .v-icon {
  color: rgb(var(--v-theme-on-surface-variant));
}

.language-select.v-input.v-input--is-focused .v-field__outline {
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 0 0 2px rgba(0, 98, 230, 0.2);
}

/* Override default Vuetify styles for dropdown content */
:global(.v-overlay-container .v-overlay__content) {
  background-color: rgb(var(--v-theme-surface)) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

:global(.v-overlay-container .v-list-item) {
  color: rgb(var(--v-theme-on-background)) !important;
}

:global(.v-overlay-container .v-list-item--active) {
  background-color: rgb(var(--v-theme-primary-container)) !important;
  color: rgb(var(--v-theme-on-primary-container)) !important;
}

:global(.v-overlay-container .v-list-item:hover) {
  background-color: rgb(var(--v-theme-background)) !important;
}

.loginContainer {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Keep padding for spacing */
  overflow-y: auto; /* Allow vertical scrolling */
  min-height: 0; /* Allow flex item to shrink */
}

.loginBox {
  background: rgb(var(--v-theme-surface));
  padding: 40px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 3px solid rgb(var(--v-theme-border));
  width: 100%;
  max-width: 420px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.loginBox h1 {
  font-size: 32px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0;
}

.inputGroup {
  text-align: left;
}

.inputGroup label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: rgb(var(--v-theme-onBackground));
  font-size: 14px;
}

.inputWrapper {
  display: flex;
  align-items: center;
  background-color: rgb(var(--v-theme-background));
  border: 2px solid rgb(var(--v-theme-border));
  border-radius: 16px;
  transition: border-color 0.2s;
  padding: 0 16px; /* Padding kiri dan kanan */
}

.inputWrapper:focus-within {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(0, 98, 230, 0.2);
}

.inputWrapper .material-symbols-outlined {
  font-size: 20px;
  color: rgb(var(--v-theme-test));
}

.inputWrapper input {
  flex-grow: 1;
  width: 100%;
  padding: 14px 20px 14px 20px; /* Tambahkan padding kiri */
  border: none;
  background: rgb(var(--v-theme-background));
  font-size: 12px;
  color: rgb(var(--v-theme-onBackground));
  outline: none;
}

.inputWrapper input::placeholder {
  color: rgb(var(--v-theme-onBackground));
  opacity: 0.7;
}

.passwordInputContainer {
  position: relative;
}

.formActions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.loginButton {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

.mainLoginButton {
  background-color: rgb(var(--v-theme-primary));
  color: #000000;
  border: 1px solid rgb(var(--v-theme-primary));
}

.mainLoginButton:hover {
  background-color: color-mix(
    in srgb,
    rgb(var(--v-theme-secondary)) 90%,
    black
  );
  box-shadow: 0 4px 8px rgba(0, 98, 230, 0.2);
}

.loginButtonText {
  color: rgb(var(--v-theme-on-secondary)); /* Warna teks hitam */
}

.registerButton {
  background-color: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-teksKirim));
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.registerButton:hover {
  background-color: darkblue;
}

.toggleModeButton {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-background));
  border: 1px solid rgb(var(--v-theme-border));
}

.toggleModeButton:hover {
  background-color: rgb(var(--v-theme-background));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: rgb(var(--v-theme-onBackground));
  font-size: 14px;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgb(var(--v-theme-border));
}

.separator:not(:empty)::before {
  margin-right: 0.25em;
}

.separator:not(:empty)::after {
  margin-left: 0.25em;
}

.socialLogin {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.socialButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid rgb(var(--v-theme-border));
  border-radius: 16px;
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-background));
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  flex-grow: 1;
  flex-basis: calc(50% - 6px); /* Two columns with gap */
  max-width: calc(50% - 6px);
}

.socialButton:hover {
  background-color: rgb(var(--v-theme-background));
  border-color: rgb(var(--v-theme-secondary));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.socialButton .material-symbols-outlined {
  font-size: 20px;
  color: rgb(var(--v-theme-on-surface-variant));
}

/* Gaya untuk dialog baru */
.dialogOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.dialogContent {
  background: transparent;
  padding: 0;
  border-radius: 28px;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .loginBox {
    padding: 24px;
  }

  .header {
    padding: 12px;
  }

  .socialLogin {
    flex-direction: column;
    gap: 8px;
  }

  .socialButton {
    flex-basis: 100%;
    max-width: 100%;
  }
}

@media (max-height: 600px) {
  .loginBox {
    padding: 24px;
  }
  .loginBox h1 {
    font-size: 28px;
    margin-bottom: 24px;
  }
  .inputGroup {
    margin-bottom: 18px;
  }
  .loginButton {
    padding: 14px;
  }
  .socialLogin {
    gap: 10px;
  }
  .socialButton {
    padding: 10px 18px;
  }
}
</style>
