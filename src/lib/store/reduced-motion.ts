import { defineStore } from "pinia";

export const useReducedMotion = defineStore("reducedMotion", {
  state: () => {
    return { enabled: false };
  },
  actions: {
    toggle() {
      this.enabled = !this.enabled;
    },
    enable() {
      this.enabled = true;
    },
    disable() {
      this.enabled = false;
    },
  },
});
