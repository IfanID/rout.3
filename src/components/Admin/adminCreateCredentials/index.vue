<template>
  <div class="modal-overlay">
    <div :class="$style.adminCreateCredentialsBox">
      <h2>{{ $t("adminCreateCredentialsBox.title") }}</h2>
      <p>{{ $t("adminCreateCredentialsBox.description") }}</p>
      <form @submit.prevent="handleCreateCredentials">
        <div :class="$style.inputGroup">
          <label for="username">{{
            $t("adminCreateCredentialsBox.usernameLabel")
          }}</label>
          <div :class="$style.inputWrapper">
            <span class="material-symbols-outlined">person</span>
            <input
              type="text"
              id="username"
              v-model="adminData.username"
              :placeholder="$t('adminCreateCredentialsBox.usernamePlaceholder')"
              required
            />
          </div>
        </div>
        <div :class="$style.inputGroup">
          <label for="password">{{
            $t("adminCreateCredentialsBox.passwordLabel")
          }}</label>
          <div :class="$style.inputWrapper">
            <span class="material-symbols-outlined">lock</span>
            <input
              :type="showPassword1 ? 'text' : 'password'"
              id="password"
              v-model="adminData.password"
              :placeholder="$t('adminCreateCredentialsBox.passwordPlaceholder')"
              required
            />
            <PasswordToggle
              :show-password="showPassword1"
              @toggle="togglePasswordVisibility1"
            />
          </div>
          <PasswordValidator
            :password="adminData.password"
            ref="passwordValidatorRef"
          />
        </div>
        <div :class="$style.inputGroup">
          <label for="confirmPassword">{{
            $t("adminCreateCredentialsBox.confirmPasswordLabel")
          }}</label>
          <div :class="$style.inputWrapper">
            <span class="material-symbols-outlined">lock</span>
            <input
              :type="showPassword2 ? 'text' : 'password'"
              id="confirmPassword"
              v-model="adminData.confirmPassword"
              :placeholder="
                $t('adminCreateCredentialsBox.confirmPasswordPlaceholder')
              "
              required
            />
            <PasswordToggle
              :show-password="showPassword2"
              @toggle="togglePasswordVisibility2"
            />
          </div>
          <PasswordValidator
            :password="adminData.confirmPassword"
            ref="confirmPasswordValidatorRef"
          />
        </div>

        <div :class="$style.formActions">
          <button
            type="submit"
            :class="[$style.createButton, $style.mainCreateButton]"
          >
            <span :class="$style.createButtonText">{{
              $t("adminCreateCredentialsBox.createButton")
            }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PasswordToggle from "@/components/Password/PasswordToggle/index.vue";
import PasswordValidator from "@/components/Password/PasswordValidator/index.vue";

export default {
  name: "AdminCreateCredentialsBox",
  components: {
    PasswordToggle,
    PasswordValidator,
  },
  emits: ["close"],
  props: {
    adminId: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      adminData: {
        adminId: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      showPassword1: false,
      showPassword2: false,
    };
  },
  created() {
    this.adminData.adminId = this.adminId;
    this.adminData.email = this.adminEmail;
  },
  methods: {
    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
    },

    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
    },

    handleCreateCredentials() {
      if (this.adminData.password !== this.adminData.confirmPassword) {
        this.$emitter.emit("show-notification", {
          message: this.$t("adminCreateCredentialsBox.passwordMismatch"),
          type: "error",
        });
        return;
      }

      const isPasswordValid =
        this.$refs.passwordValidatorRef &&
        this.$refs.passwordValidatorRef.validate();
      const isConfirmPasswordValid =
        this.$refs.confirmPasswordValidatorRef &&
        this.$refs.confirmPasswordValidatorRef.validate();

      if (!isPasswordValid || !isConfirmPasswordValid) {
        this.$emitter.emit("show-notification", {
          message: this.$t("adminCreateCredentialsBox.passwordInvalid"),
          type: "error",
        });
        return;
      }

      // Logika untuk menyimpan username dan password admin
      console.log("Data Admin Lengkap:", this.adminData);
      // Di sini Anda akan memanggil API untuk menyimpan kredensial admin

      // Memicu notifikasi sukses
      this.$emitter.emit("show-notification", {
        message: this.$t("adminCreateCredentialsBox.adminCreatedSuccess"), // Pesan sukses dari i18n
        type: "success",
        timeout: 2000, // Notifikasi akan hilang setelah 2 detik
      });

      // Menunda navigasi ke halaman login setelah notifikasi selesai
      setTimeout(() => {
        this.$emit("close"); // Emit event close
      }, 2000); // Navigasi setelah 2 detik
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of other content */
}
</style>

<style module>
.adminCreateCredentialsBox {
  background: var(--surface);
  padding: 40px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 3px solid var(--border-color);
  width: 100%;
  max-width: 420px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
}

.adminCreateCredentialsBox h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0;
}

.adminCreateCredentialsBox p {
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 16px;
}

.inputGroup {
  text-align: left;
  margin-bottom: 16px;
}

.inputGroup label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 14px;
}

.helpIcon {
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.helpIcon:hover {
  color: var(--primary);
}

.helpMessage {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 8px;
  background-color: var(--background);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.inputWrapper {
  display: flex;
  align-items: center;
  background-color: var(--background);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  transition: border-color 0.2s;
  padding: 0 16px;
}

.inputWrapper:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 98, 230, 0.2);
}

.inputWrapper .material-symbols-outlined {
  font-size: 20px;
  color: var(--text-secondary);
}

.inputWrapper input {
  flex-grow: 1;
  width: 100%;
  padding: 14px 20px 14px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
}

.inputWrapper input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.formActions {
  margin-top: 24px;
}

.createButton {
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

.mainCreateButton {
  background-color: var(--button-cyan);
  color: #000000;
  border: 1px solid var(--border-color);
}

.mainCreateButton:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, black);
  box-shadow: 0 4px 8px rgba(0, 98, 230, 0.2);
}

.createButtonText {
  color: var(--teks-kirim);
}
</style>
