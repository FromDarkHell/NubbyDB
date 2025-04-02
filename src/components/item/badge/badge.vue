<script setup lang="ts">
import {
  NubbyItemTier,
  NubbyItemType,
  type NubbyItem,
} from "@/lib/nubby/items";

defineProps<{
  item: NubbyItem;
}>();

function isItem(item: NubbyItem): boolean {
  return (
    item.itemType == NubbyItemType.CorruptedItem ||
    item.itemType == NubbyItemType.UpgradedCorruptedItem ||
    item.itemType == NubbyItemType.Item ||
    item.itemType == NubbyItemType.UpgradedItem
  );
}
</script>

<template>
  <div class="inline-flex items-center w-full flex-wrap">
    <div class="inline-flex items-center">
      <div v-if="isItem(item)">
        <img
          src="@/assets/icons/badges/spr_Sub_Item.png"
          class="w-12 h-full object-contain"
        />
      </div>
      <div
        v-else-if="
          item.itemType == NubbyItemType.Food || NubbyItemType.UpgradedFood
        "
      >
        <img
          src="@/assets/icons/badges/spr_Sub_Food.png"
          class="w-12 h-full object-contain"
        />
      </div>

      <div>
        <div v-if="item.itemRarity == NubbyItemTier.RARE">
          <img
            src="@/assets/icons/badges/spr_Sub_RareItem.gif"
            class="w-12 h-full object-contain"
          />
        </div>
        <div v-else-if="item.itemRarity == NubbyItemTier.ULTRA_RARE">
          <img
            src="@/assets/icons/badges/spr_Sub_UltraRareItem.gif"
            class="w-24 h-full object-contain"
          />
        </div>
      </div>

      <div
        v-if="
          item.itemType == NubbyItemType.CorruptedItem ||
          item.itemType == NubbyItemType.UpgradedCorruptedItem
        "
      >
        <img
          src="@/assets/icons/badges/spr_Sub_Corrupted.png"
          class="w-24 h-full object-contain"
        />
      </div>
    </div>

    <div
      v-if="
        item.itemType == NubbyItemType.UpgradedItem ||
        item.itemType == NubbyItemType.UpgradedCorruptedItem ||
        item.itemType == NubbyItemType.UpgradedFood
      "
    >
      <img
        src="@/assets/icons/badges/spr_Sub_Upgr.png"
        class="w-6 h-6 object-contain"
      />
    </div>
  </div>
</template>
