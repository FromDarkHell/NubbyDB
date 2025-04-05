<script setup lang="ts">
import { ControllableGIF } from "@/components/ui/controllable-gif";
import { PerkInfo } from "@/components/perk/info";

import type { NubbyPerk } from "@/lib/nubby/perks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

defineProps({
  perk: Object as () => NubbyPerk,
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <ControllableGIF
        :src="'dumps/sprites/' + perk?.spriteName + '.gif'"
        class="w-13 h-13 object-contain cursor-pointer"
        v-bind="$attrs"
      />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] md:min-w-1/2">
      <DialogHeader>
        <DialogTitle>{{ perk?.perkName }}</DialogTitle>
      </DialogHeader>
      <div class="flex-wrap text-wrap">
        <PerkInfo :perk="perk" />
      </div>
    </DialogContent>
  </Dialog>
</template>
