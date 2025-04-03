<script setup lang="ts">
import { ItemInfo } from "@/components/item/info";
import { ControllableGIF } from "@/components/ui/controllable-gif";

import type { SimplifiedNubbyItem } from "@/lib/nubby/items";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

defineProps({
  item: Object as () => SimplifiedNubbyItem,
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <ControllableGIF
        :src="'dumps/sprites/' + item?.spriteName + '.gif'"
        class="w-12 h-12 object-contain cursor-pointer"
        v-bind="$attrs"
      />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] md:min-w-1/2">
      <DialogHeader>
        <DialogTitle>{{ item?.nameText }}</DialogTitle>
      </DialogHeader>
      <div class="flex-wrap text-wrap">
        <ItemInfo :item="item" :show-mutant-info="false" />

        <div v-if="item?.upgradeItem != undefined">
          <ItemInfo :item="item!.upgradeItem" />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
