<template>
  <div class="modal-overlay">
    <div class="register-box">
      <div class="card">
        <div class="card-header">
          <button class="close-button" @click="emit('close')">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="header-content">
            <h2>{{ t("registerBox.createAccount") }}</h2>
            <p>{{ t("registerBox.fillDetails") }}</p>
          </div>
        </div>
        <div class="card-body chat-body">
          <div class="chat-messages" ref="chatMessagesContainer">
            <div
              v-for="(message, index) in chatMessages"
              :key="index"
              :class="['chat-bubble', message.sender]"
            >
              {{ message.text }}
            </div>
          </div>

          <div class="chat-input-area">
            <!-- Step 0: Initial question -->
            <div v-if="currentStep === 0" class="initial-question">
              <p>{{ t("registerBox.initialQuestion") }}</p>
              <div class="button-group">
                <button
                  class="btn-chat btn-cancel"
                  @click="startRegistration(false)"
                >
                  {{ t("registerBox.no") }}
                </button>
                <button class="btn-chat" @click="startRegistration(true)">
                  {{ t("registerBox.yes") }}
                </button>
              </div>
            </div>

            <!-- Step 1: Username input -->
            <div v-if="currentStep === 1" class="input-field">
              <label for="username">{{ t("registerBox.username") }}</label>
              <div class="password-input-wrapper">
                <input
                  type="text"
                  id="username"
                  v-model="currentInput"
                  @keyup.enter="processInput('username')"
                  :placeholder="t('registerBox.enterUsername')"
                  class="common-input-style"
                />
              </div>
              <div class="text-right mt-4">
                <button
                  class="btn-chat btn-send"
                  @click="processInput('username')"
                >
                  {{ t("registerBox.send") }}
                </button>
              </div>
            </div>

            <!-- Step 2: Email input -->
            <div v-if="currentStep === 2" class="input-field">
              <label for="email">{{ t("registerBox.emailAddress") }}</label>
              <div class="password-input-wrapper">
                <input
                  type="email"
                  id="email"
                  v-model="currentInput"
                  @keyup.enter="processInput('email')"
                  :placeholder="t('registerBox.emailPlaceholder')"
                  class="common-input-style"
                />
              </div>
              <div class="text-right mt-4">
                <button
                  class="btn-chat btn-send"
                  @click="processInput('email')"
                >
                  {{ t("registerBox.send") }}
                </button>
              </div>
            </div>

            <!-- Step 3: Password input -->
            <div v-if="currentStep === 3" class="input-field">
              <label for="password">{{ t("registerBox.password") }}</label>
              <div class="password-input-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="currentInput"
                  @keyup.enter="processInput('password')"
                  :placeholder="t('registerBox.enterPassword')"
                  class="common-input-style"
                />
                <PasswordToggle
                  :show-password="showPassword"
                  @toggle="togglePasswordVisibility"
                />
              </div>
              <PasswordValidator
                :password="currentInput"
                ref="passwordValidatorRef"
              />
              <div class="text-right mt-4">
                <button
                  class="btn-chat btn-send"
                  @click="processInput('password')"
                >
                  {{ t("registerBox.send") }}
                </button>
              </div>
            </div>

            <!-- Step 4: Confirm Password input -->
            <div v-if="currentStep === 4" class="input-field">
              <label for="confirm-password">{{
                t("registerBox.confirmPassword")
              }}</label>
              <div class="password-input-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="currentInput"
                  @keyup.enter="processInput('confirmPassword')"
                  :placeholder="t('registerBox.repeatPassword')"
                  class="common-input-style"
                />
                <PasswordToggle
                  :show-password="showPassword"
                  @toggle="togglePasswordVisibility"
                />
              </div>
              <PasswordValidator
                :password="currentInput"
                ref="confirmPasswordValidatorRef"
              />
              <div class="text-right mt-4">
                <button
                  class="btn-chat btn-send"
                  @click="processInput('confirmPassword')"
                >
                  {{ t("registerBox.send") }}
                </button>
              </div>
            </div>

            <!-- Step 5: Registration complete / Summary -->
            <div
              v-if="currentStep === 5 && !showRegistrationSummary"
              class="final-message"
            >
              <p>{{ finalMessageContent }}</p>
            </div>
            <RegistrationSummary
              v-if="currentStep === 5 && showRegistrationSummary"
              :user-data="userData"
              @cancel="handleSummaryCancel"
              @confirm="handleSummaryConfirm"
            />
            <div v-if="currentStep === -1" class="final-message">
              <p>{{ t("registerBox.registrationCancelled") }}</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <p>
            {{ t("registerBox.alreadyHaveAccount") }}
            <a href="/login">{{ t("registerBox.loginHere") }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  name: "AuthRegisterBox",
});
import { useI18n } from "vue-i18n";

const { t } = useI18n();

import { ref, nextTick, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import PasswordToggle from "@/components/Password/PasswordToggle/index.vue";
import PasswordValidator from "@/components/Password/PasswordValidator/index.vue"; // Impor PasswordValidator
import RegistrationSummary from "@/components/Auth/RegistrationSummary/index.vue";

// Mendefinisikan event `close` yang akan dikirim ke parent
const emit = defineEmits(["close"]);

const router = useRouter();

const currentStep = ref(0); // 0: initial question, 1: name, 2: email, 3: password, 4: confirm, 5: complete, -1: cancelled
const finalMessageContent = ref("");
const showRegistrationSummary = ref(false);
const chatMessages = ref([
  { text: t("registerBox.welcomeMessage"), sender: "system" },
]);
const currentInput = ref("");
const userData = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  userId: null, // Tambahkan properti userId
});

const showPassword = ref(false);
const passwordValidatorRef = ref(null); // Ref untuk PasswordValidator di stage 3
const confirmPasswordValidatorRef = ref(null); // Ref untuk PasswordValidator di stage 4

const chatMessagesContainer = ref(null);

// Fungsi untuk menghasilkan ID unik (dari IdGenerator)
import { generateUniqueId } from "@/utils/idGeneratorUtils";

const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessagesContainer.value) {
      chatMessagesContainer.value.scrollTop =
        chatMessagesContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  scrollToBottom();
});

watch(
  chatMessages.value,
  () => {
    scrollToBottom();
  },
  { deep: true },
);

watch(currentStep, async (newValue) => {
  if (newValue === 5) {
    finalMessageContent.value = t("registerBox.allDataFilled");
    setTimeout(() => {
      finalMessageContent.value = t("registerBox.creatingUserId");
      // Generate ID here
      try {
        userData.value.userId = generateUniqueId();
      } catch (e) {
        console.error("Error generating user ID:", e);
        finalMessageContent.value = "Error: Gagal membuat ID pengguna."; // Handle error
        return;
      }
      setTimeout(() => {
        finalMessageContent.value = t("registerBox.proceedToConfirmation");
        setTimeout(() => {
          showRegistrationSummary.value = true;
        }, 2300); // 1.1 detik
      }, 1800); // 1.8 detik delay for user ID creation message
    }, 2900); // 1.3 detik
  }
});

const addMessage = (text, sender) => {
  chatMessages.value.push({ text, sender });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const startRegistration = (agree) => {
  if (agree) {
    addMessage(t("registerBox.yes"), "user");
    addMessage(t("registerBox.askUsername"), "system");
    currentStep.value = 1;
  } else {
    addMessage(t("registerBox.no"), "user");
    addMessage(t("registerBox.cancelledMessage"), "system");
    currentStep.value = -1;
    setTimeout(() => emit("close"), 2000); // Tutup setelah 2 detik
  }
};

const validateEmailInput = (input) => {
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(input)) {
    addMessage(t("registerBox.invalidEmail"), "system");
    currentInput.value = "";
    return false;
  }
  return true;
};

const validatePasswordInput = (input) => {
  userData.value.password = input; // Set password dulu agar validator bisa bekerja
  if (passwordValidatorRef.value && !passwordValidatorRef.value.validate()) {
    addMessage(t("passwordValidator.minLength"), "system"); // Menggunakan pesan dari i18n
    currentInput.value = "";
    return false;
  }
  return true;
};

const validateConfirmPasswordInput = (input) => {
  userData.value.confirmPassword = input; // Set confirmPassword dulu agar validator bisa bekerja
  if (
    confirmPasswordValidatorRef.value &&
    !confirmPasswordValidatorRef.value.validate()
  ) {
    addMessage(t("passwordValidator.minLength"), "system"); // Menggunakan pesan dari i18n
    currentInput.value = "";
    return false;
  }
  if (userData.value.password !== userData.value.confirmPassword) {
    addMessage(t("registerBox.passwordMismatch"), "system");
    userData.value.confirmPassword = ""; // Reset confirm password
    currentInput.value = "";
    return false;
  }
  return true;
};

const processInput = (field) => {
  const input = currentInput.value.trim();
  if (!input) {
    addMessage(t("registerBox.emptyInput"), "system");
    return;
  }

  if (field === "email" && !validateEmailInput(input)) {
    return;
  }

  if (field === "password" && !validatePasswordInput(input)) {
    return;
  }

  if (field === "confirmPassword" && !validateConfirmPasswordInput(input)) {
    return;
  }

  addMessage(
    field === "password" || field === "confirmPassword"
      ? "•".repeat(input.length)
      : input,
    "user",
  );
  userData.value[field] = input;
  currentInput.value = "";

  switch (field) {
    case "username":
      addMessage(
        t("registerBox.askEmail", { username: userData.value.username }),
        "system",
      );
      currentStep.value = 2;
      break;
    case "email":
      addMessage(t("registerBox.askPassword"), "system");
      currentStep.value = 3;
      break;
    case "password":
      addMessage(t("registerBox.confirmPasswordPrompt"), "system");
      currentStep.value = 4;
      break;
    case "confirmPassword":
      addMessage(t("registerBox.passwordCreatedSuccess"), "system");
      currentStep.value = 5;
      break;
  }
};

const handleSummaryCancel = () => {
  currentStep.value = 0;
  showRegistrationSummary.value = false;
  userData.value = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  chatMessages.value = [
    { text: t("registerBox.welcomeMessage"), sender: "system" },
  ];
};

const handleSummaryConfirm = () => {
  showRegistrationSummary.value = false;
  performRegistrationAndRedirect();
};

const performRegistrationAndRedirect = () => {
  // Simulasi proses pendaftaran
  console.log(t("registerBox.registeringUser"), userData.value);
  // Di aplikasi nyata, di sini Anda akan memanggil API
  setTimeout(() => {
    finalMessageContent.value = t("registerBox.registrationSuccess");
    setTimeout(() => {
      // Redirect ke halaman login
      emit("close");
    }, 2300); // 1.5 detik sebelum redirect/close
  }, 500); // Simulasi waktu proses pendaftaran
};
</script>

<style scoped>
/* Mengikuti prinsip Material You untuk estetika */

.register-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.card {
  width: 100%;
  max-width: 450px;
  background-color: var(--background);
  border-radius: 28px;
  box-shadow:
    0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  color: var(--md-sys-color-on-surface, #1d1b20);
  border: 1px solid var(--border-color);
  position: relative;
}

.card-header {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.card-header h2 {
  font-family: "Google Sans Text", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--md-sys-color-on-surface, #1d1b20);
}

.card-header p {
  margin: 0;
  font-size: 14px;
  color: var(--md-sys-color-on-surface-variant, #49454f);
}

.header-content {
  margin-top: 28px;
  margin-bottom: 10px;
}

.card-body.chat-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
  padding: 24px;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  padding-right: 8px;
}

.chat-bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 20px;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.4;
}

.chat-bubble.system {
  background-color: var(--button-cyan);
  color: var(--teks-kirim);
  align-self: flex-start;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 4px;
}

.chat-bubble.user {
  background-color: var(--user-pesan);
  color: var(--user-pesan-teks);
  align-self: flex-end;
  margin-left: auto;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 4px;
}

.chat-input-area {
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.initial-question p {
  text-align: center;
  margin-bottom: 16px;
  font-size: 16px;
  color: var(--md-sys-color-on-surface, #1d1b20);
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-chat {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500; /* Mengubah font-weight menjadi 500 */
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.btn-chat:not(.btn-cancel):not(.btn-send) {
  background-color: var(--button-cyan);
  color: var(--teks-kirim);
}

.btn-chat:not(.btn-cancel):not(.btn-send):hover {
  background-color: black;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-chat.btn-cancel {
  background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
  color: var(--button-cyan);
  border: 1px solid var(--border-color);
}

.btn-chat.btn-cancel:hover {
  background-color: var(--md-sys-color-error-container, #f9dedc);
  color: var(--md-sys-color-on-error-container, #410e0b);
}

.input-field {
  display: block;
  margin-bottom: 16px;
}

.input-field label {
  font-size: 14px;
  color: var(--md-sys-color-on-surface-variant);
}

.common-input-style {
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border: none;
  background-color: transparent;
  color: var(--md-sys-color-on-surface);
  font-size: 16px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.common-input-style:focus {
  outline: none;
}

.common-input-style::placeholder {
  color: var(--md-sys-color-on-surface-variant);
  opacity: 0.7;
}

.password-input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background-color: var(--md-sys-color-surface-container-lowest);
  color: var(--md-sys-color-on-surface);
  font-size: 16px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  gap: 8px;
  min-height: 48px;
  padding: 0 16px;
}

.password-input-wrapper:focus-within {
  border-color: var(--border-color);
  box-shadow: 0 0 0 4px var(--button-cyan);
}

.btn-chat.btn-send {
  background-color: var(--button-cyan);
  color: var(--teks-kirim);
  padding: 12px 16px;
  border-radius: 20px; /* Mengubah border-radius menjadi 20px */
  min-height: 48px;
  font-weight: 500; /* Menambahkan font-weight 500 */
}

.btn-chat.btn-send:hover {
  background-color: var(--md-sys-color-primary-dark, #4f378b);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.final-message {
  text-align: center;
  font-size: 16px;
  color: var(--md-sys-color-on-surface, #1d1b20);
  padding: 18px;
  background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
  border-radius: 20px;
  border: 10px solid cyan;
}

.card-footer {
  padding: 20px;
  text-align: center;
  background-color: var(--md-sys-color-surface-container, #f3edf7);
  border-top: 1px solid var(--border-color);
}

.card-footer p {
  margin: 0;
  font-size: 14px;
}

.card-footer a {
  color: var(--button-cyan);
  text-decoration: none;
  font-weight: 600;
}

.card-footer a:hover {
  text-decoration: underline;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 24px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
}

.close-button .material-symbols-outlined {
  font-size: 24px;
}
</style>
