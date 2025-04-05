<script setup lang="ts">
import { ControllableGIF } from "@/components/ui/controllable-gif";

import { TooltipText } from "@/components/ui/tooltip-text";
import { htmlify } from "@/lib/nubby/util";
import type { NubbySupervisor } from "@/lib/nubby/supervisors";

defineProps({
  supervisor: Object as () => NubbySupervisor,
});
</script>
<template>
  <div class="text-wrap">
    <div class="flex gap-2 my-2">
      <ControllableGIF
        :src="'dumps/sprites/' + supervisor?.spriteName + '.gif'"
        class="w-32 h-32 object-contain shrink-0"
      />

      <div
        class="py-2 text-left text-xl w-full bg-amber-300 border rounded-xl text-black"
      >
        <div class="inline-flex w-full">
          <p class="ml-2 mr-2 shrink-0">Hello! My name is:</p>
          <div class="font-semibold border-b-2 w-2/3 border-red-500">
            {{ supervisor?.name }}
          </div>
        </div>

        <div
          class="mt-2 mx-8 bg-amber-200 px-4 rounded-sm border border-amber-200"
        >
          <div class="text-xl" v-html="htmlify(supervisor?.description)"></div>
        </div>
      </div>
    </div>

    <div class="ml-2">
      <div class="text-md border-x border-y border-accent-foreground">
        <div class="flex justify-between">
          <div class="flex">
            <div class="px-2 border-r border-accent-foreground">
              <img
                src="@/assets/icons/spr_StarIconLrg.png"
                class="w-6 object-contain inline"
              />
              {{ supervisor?.cost }}
            </div>
          </div>

          <div class="flex">
            <div class="px-2 border-l border-accent-foreground">
              ID: {{ supervisor?.id }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
