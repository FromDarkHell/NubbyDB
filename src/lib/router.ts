import { createMemoryHistory, createRouter } from "vue-router";

import ItemsView from "@/views/ItemsView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  { path: "/", component: ItemsView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
