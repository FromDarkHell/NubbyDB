import { createMemoryHistory, createRouter } from "vue-router";

import ItemsView from "@/views/ItemsView.vue";
import AboutView from "@/views/AboutView.vue";
import PerksView from "@/views/PerksView.vue";
import SupervisorView from "@/views/SupervisorView.vue";

const routes = [
  { path: "/", component: ItemsView },
  { path: "/about", component: AboutView },
  { path: "/perks", component: PerksView },
  { path: "/supervisors", component: SupervisorView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
