<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import gifff from "gifff/wasm";
import { useReducedMotion } from "@/lib/store/reduced-motion";
import { computedAsync } from "@vueuse/core";

const reducedMotion = useReducedMotion();

const props = defineProps<{
  src: string;
  class?: HTMLAttributes["class"];
}>();

const reducedMotionSrc = computedAsync(async () => {
  const blob = await gifff(props.src, {
    wasm: "https://unpkg.com/gifff/gifff_bg.wasm",
  });
  return blob;
});
</script>

<template>
  <div v-if="!reducedMotion.enabled">
    <img
      :src="src"
      :class="cn('motion-safe:block', props.class)"
      v-bind="$attrs"
    />
  </div>
  <div v-if="reducedMotion.enabled">
    <img
      :src="reducedMotionSrc"
      :class="cn('motion-safe:block', props.class)"
      v-bind="$attrs"
    />
  </div>
</template>
