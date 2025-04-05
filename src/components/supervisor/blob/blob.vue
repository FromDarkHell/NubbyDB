<script setup lang="ts">
import { ControllableGIF } from "@/components/ui/controllable-gif";
import { SupervisorInfo } from "@/components/supervisor/info";

import type { NubbySupervisor } from "@/lib/nubby/supervisors";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const { clickable = true } = defineProps({
  supervisor: Object as () => NubbySupervisor,
  clickable: Boolean,
});
</script>

<template>
  <Dialog v-if="clickable">
    <DialogTrigger as-child>
      <ControllableGIF
        :src="'dumps/sprites/' + supervisor?.spriteName + '.gif'"
        class="w-13 h-13 object-contain cursor-pointer"
        v-bind="$attrs"
      />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] md:min-w-1/2">
      <DialogHeader>
        <DialogTitle>{{ supervisor?.name }}</DialogTitle>
      </DialogHeader>
      <div class="flex-wrap text-wrap">
        <SupervisorInfo :supervisor="supervisor" />
      </div>
    </DialogContent>
  </Dialog>

  <div v-else-if="!clickable">
    <ControllableGIF
      :src="'dumps/sprites/' + supervisor?.spriteName + '.gif'"
      class="w-13 h-13 object-contain cursor-pointer"
      v-bind="$attrs"
    />
  </div>
</template>
