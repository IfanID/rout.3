import Admin from "@/views/admin/admin/index.vue";

import OwnerView from "@/views/owner/owner/index.vue";

const adminRoutes = [
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true, isAdmin: true },
  },

  {
    path: "/owner",
    name: "Owner",
    component: OwnerView,
    meta: { requiresAuth: true, isAdmin: true, isOwner: true },
  },
];

export default adminRoutes;
