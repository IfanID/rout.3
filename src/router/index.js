import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/login/index.vue";
import Register from "@/components/Auth/Register/index.vue";
import adminRoutes from "./admin";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  ...adminRoutes,
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      // Hanya izinkan akses ke halaman register jika dari halaman login
      if (from.name !== "Login") {
        // Jika tidak, alihkan ke halaman login
        next({ name: "Login" });
      } else {
        // Jika ya, lanjutkan navigasi
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
