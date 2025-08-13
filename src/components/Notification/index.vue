<template>
  <div class="notification-container">
    <TransitionGroup name="notification-slide">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification-item', `notification-${notification.type}`]"
        ref="notificationRefs"
      >
        <div class="notification-content">
          {{ notification.message }}
        </div>
        <button
          @click="removeNotification(notification.id)"
          class="notification-close"
        >
          &times;
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
const MAX_NOTIFICATIONS = 6; // Batas maksimal notifikasi yang tampil

export default {
  name: "AppNotification",
  data() {
    return {
      notifications: [],
      nextId: 0,
    };
  },
  mounted() {
    this.$emitter.on("show-notification", this.addOrUpdateNotification);
    window.addEventListener("scroll", this.checkNotificationPositions);
    window.addEventListener("resize", this.checkNotificationPositions);
  },
  beforeUnmount() {
    this.$emitter.off("show-notification", this.addOrUpdateNotification);
    window.removeEventListener("scroll", this.checkNotificationPositions);
    window.removeEventListener("resize", this.checkNotificationPositions);
  },
  methods: {
    addOrUpdateNotification({
      message,
      type = "info",
      key = null,
      timeout = 3000,
    }) {
      // Jika jumlah notifikasi sudah mencapai batas, hapus yang paling lama
      if (this.notifications.length >= MAX_NOTIFICATIONS) {
        const oldestNotification =
          this.notifications[this.notifications.length - 1];
        clearTimeout(oldestNotification.timer); // Hentikan timernya
        this.notifications.pop(); // Hapus dari array
      }

      if (key) {
        const existingIndex = this.notifications.findIndex(
          (n) => n.key === key,
        );
        if (existingIndex !== -1) {
          const existingNotification = this.notifications[existingIndex];
          clearTimeout(existingNotification.timer);
          this.notifications.splice(existingIndex, 1);
          this.$nextTick(() => {
            const newNotification = {
              id: this.nextId++,
              key,
              message,
              type,
              timer: setTimeout(
                () => this.removeNotification(newNotification.id),
                timeout,
              ),
            };
            this.notifications.unshift(newNotification);
          });
          return;
        }
      }

      const newNotification = {
        id: this.nextId++,
        key,
        message,
        type,
        timer: setTimeout(
          () => this.removeNotification(newNotification.id),
          timeout,
        ),
      };
      this.notifications.unshift(newNotification);
    },
    removeNotification(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        clearTimeout(this.notifications[index].timer);
        this.notifications.splice(index, 1);
      }
    },
    checkNotificationPositions() {
      const halfScreenHeight = window.innerHeight / 2;
      // Buat salinan array notifikasi untuk menghindari masalah reaktivitas saat menghapus
      // dan untuk memastikan kita mengiterasi notifikasi yang ada saat ini.
      [...this.notifications].forEach((notification) => {
        const index = this.notifications.findIndex(
          (n) => n.id === notification.id,
        );
        if (
          index !== -1 &&
          this.$refs.notificationRefs &&
          this.$refs.notificationRefs[index]
        ) {
          const el = this.$refs.notificationRefs[index];
          const rect = el.getBoundingClientRect();
          // Jika bagian bawah notifikasi melewati setengah layar (yaitu, notifikasi sudah di atas garis tengah)
          if (rect.bottom < halfScreenHeight) {
            this.removeNotification(notification.id);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

.notification-item {
  background-color: #333;
  color: white;
  padding: 12px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Google Sans Text", sans-serif;
  overflow: hidden;
  flex-shrink: 0; /* Mencegah notifikasi menciut */
}

.notification-content {
  flex-grow: 1;
  margin-right: 10px;
}

.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

/* Tipe notifikasi */
.notification-info {
  background-color: #2196f3;
}
.notification-success {
  background-color: #4caf50;
}
.notification-error {
  background-color: #f44336;
}
.notification-warning {
  background-color: #ffc107;
  color: #333;
}

/* Animasi */
.notification-slide-enter-active,
.notification-slide-leave-active,
.notification-slide-move {
  transition:
    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    opacity 0.4s ease;
}

.notification-slide-enter-from,
.notification-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-slide-enter-to,
.notification-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.notification-slide-leave-active {
  position: absolute;
  width: 100%;
}
</style>
