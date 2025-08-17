<template>
  <div :class="$style.adminRegisterBox">
    <form
      v-if="!showCreateCredentialsForm"
      @submit.prevent="handleAdminRegister"
    >
      <h2>{{ $t("adminRegisterBox.title") }}</h2>
      <p>{{ $t("adminRegisterBox.description") }}</p>
      <div :class="$style.inputGroup">
        <label for="adminId">{{ $t("adminRegisterBox.adminIdLabel") }}</label>
        <HelpTooltip messageKey="adminRegisterBox.adminIdHelpMessage" />
        <AdminIdInput
          id="adminId"
          v-model="adminData.adminId"
          :placeholder="$t('adminRegisterBox.adminIdPlaceholder')"
          @validation="adminIdValid = $event"
        />
      </div>
      <div :class="$style.inputGroup">
        <label for="adminEmail">{{
          $t("adminRegisterBox.adminEmailLabel")
        }}</label>
        <div :class="$style.inputWrapper">
          <span class="material-symbols-outlined">mail</span>
          <input
            type="email"
            id="adminEmail"
            v-model="adminData.email"
            :placeholder="$t('adminRegisterBox.adminEmailPlaceholder')"
            required
          />
        </div>
      </div>

      <div :class="$style.formActions">
        <button
          type="submit"
          :class="[$style.registerButton, $style.mainRegisterButton]"
        >
          <span :class="$style.registerButtonText">{{
            $t("adminRegisterBox.registerButton")
          }}</span>
        </button>
      </div>
    </form>
    <AdminCreateCredentialsBox
      v-if="showCreateCredentialsForm"
      :admin-id="adminData.adminId"
      :admin-email="adminData.email"
      @close="handleCreateCredentialsClose"
    />
    <button :class="$style.closeButton" @click="$emit('close')">
      <span class="material-symbols-outlined">close</span>
    </button>
  </div>
</template>

<script>
import AdminIdInput from "@/components/Admin/AdminIdInput/index.vue";
import AdminCreateCredentialsBox from "@/components/Admin/adminCreateCredentials/index.vue";
import HelpTooltip from "@/components/HelpTooltip/index.vue";

export default {
  name: "AdminRegister",
  components: {
    AdminIdInput,
    AdminCreateCredentialsBox,
    HelpTooltip,
  },
  emits: ["close"],
  data() {
    return {
      adminData: {
        adminId: "",
        email: "",
      },
      adminIdValid: false,
      showCreateCredentialsForm: false, // State baru untuk menampilkan form pembuatan kredensial
    };
  },
  methods: {
    handleAdminRegister() {
      console.log("Debug: handleAdminRegister called.");
      console.log(
        "Debug: Initial showCreateCredentialsForm:",
        this.showCreateCredentialsForm,
      );
      console.log("Debug: this.adminData.adminId =", this.adminData.adminId);
      console.log(
        "Debug: VITE_OWNER_ADMIN_ID =",
        import.meta.env.VITE_OWNER_ADMIN_ID,
      );
      console.log(
        "Debug: VITE_OWNER_EMAIL =",
        import.meta.env.VITE_OWNER_EMAIL,
      );
      console.log(
        "Debug: Admin ID Comparison result =",
        this.adminData.adminId === import.meta.env.VITE_OWNER_ADMIN_ID,
      );
      console.log(
        "Debug: Admin Email Comparison result =",
        this.adminData.email === import.meta.env.VITE_OWNER_EMAIL,
      );

      // Periksa apakah Admin ID dan Email adalah owner ID dan Email terlebih dahulu
      if (
        this.adminData.adminId === import.meta.env.VITE_OWNER_ADMIN_ID &&
        this.adminData.email.toLowerCase() === import.meta.env.VITE_OWNER_EMAIL.toLowerCase()
      ) {
        this.isOwnerId = true;
        console.log(this.$t("adminRegisterBox.ownerIdDetected"));
        console.log("Admin ID:", this.adminData.adminId);
        console.log("Admin Email:", this.adminData.email);
        this.$emit("close"); // Menutup dialog
        this.$router.push("/owner"); // Redireksi ke halaman /owner
        console.log("Debug: Attempted to redirect to /admin.");
        return;
      }

      // Jika bukan owner ID, baru periksa validasi format umum
      if (!this.adminIdValid) {
        console.log("Admin ID tidak valid.");
        this.$emitter.emit("show-notification", {
          message: this.$t("adminRegisterBox.invalidAdminId"),
          type: "error",
        });
        return;
      }

      this.isOwnerId = false; // Pastikan ini false jika bukan owner
      console.log("Admin ID:", this.adminData.adminId);
      console.log("Admin Email:", this.adminData.email);
      // Di sini Anda akan menambahkan logika untuk memproses pendaftaran admin
      // Misalnya, memanggil API pendaftaran admin
      this.showCreateCredentialsForm = true; // Tampilkan form pembuatan kredensial
      console.log(
        "Debug: showCreateCredentialsForm after setting:",
        this.showCreateCredentialsForm,
      );
    },
    closeAdminRegisterModalAndRedirect() {
      this.$emit("close"); // Tutup modal AdminRegister
      this.$router.push("/login"); // Redireksi ke halaman login
    },
    handleCreateCredentialsClose() {
      // Metode baru untuk menangani event close dari AdminCreateCredentialsBox
      console.log(
        "Event close from AdminCreateCredentialsBox received. Emitting close from AdminRegister.",
      ); // Tambahkan log ini
      this.$emit("close"); // Memancarkan event close ke komponen induk AdminRegister
    },
  },
};
</script>

<style module>
.adminRegisterBox {
  background: rgb(var(--v-theme-background));
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
  position: relative;
}

.adminRegisterBox h2 {
  font-size: 28px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0;
}

.adminRegisterBox p {
  color: rgb(var(--v-theme-onBackground));
  font-size: 16px;
  margin-bottom: 16px;
}

.inputGroup {
  text-align: left;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.inputGroup label {
  margin-bottom: 8px;
  font-weight: 500;
  color: rgb(var(--v-theme-onBackground));
  font-size: 14px;
  margin-right: 8px; /* Add some space between label and icon */
}





.inputWrapper {
  display: flex;
  align-items: center;
  background-color: rgb(var(--v-theme-background));
  border: 2px solid rgb(var(--v-theme-onBackground));
  border-radius: 16px;
  transition: border-color 0.2s;
  padding: 0 16px;
}

.inputWrapper:focus-within {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(0, 98, 230, 0.2);
}

.inputWrapper .material-symbols-outlined {
  font-size: 20px;
  color: rgb(var(--v-theme-onBackground));
}

.inputWrapper input {
  flex-grow: 1;
  width: 100%;
  padding: 14px 20px 14px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: rgb(var(--v-theme-onBackground));
  outline: none;
}

.inputWrapper input::placeholder {
  color: rgb(var(--v-theme-onBackground));
  opacity: 0.7;
}

.formActions {
  margin-top: 24px;
}

.registerButton {
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

.mainRegisterButton {
  background-color: rgb(var(--v-theme-primary));
  color: #000000;
  border: 1px solid rgb(var(--v-theme-primary));
}

.mainRegisterButton:hover {
  background-color: color-mix(in srgb, rgb(var(--v-theme-primary)) 90%, black);
  box-shadow: 0 4px 8px rgba(0, 98, 230, 0.2);
}

.registerButtonText {
  color: rgb(var(--v-theme-on-primary));
}

.closeButton {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(var(--v-theme-primary));
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.closeButton:hover {
  background-color: rgb(var(--v-theme-background));
}
</style>
