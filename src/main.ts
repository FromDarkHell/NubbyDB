import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./lib/router";
import VueKonva from "vue-konva";

import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(router).use(VueKonva).use(pinia).mount("#app");
