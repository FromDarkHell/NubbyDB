<script setup lang="ts">
import { NubbyPerkTier, type NubbyPerk } from "@/lib/nubby/perks";

defineProps<{
  perk: NubbyPerk;
}>();
</script>

<template>
  <div class="inline-flex items-center w-full flex-wrap">
    <div class="inline-flex items-center">
      <img
        src="@/assets/icons/badges/spr_Sub_Perk.png"
        class="w-12 h-full object-contain"
      />

      <div>
        <div v-if="perk.perkTier == NubbyPerkTier.Rare">
          <img
            src="@/assets/icons/badges/spr_Sub_RarePerk.gif"
            class="w-12 h-full object-contain"
          />
        </div>
        <div v-else-if="perk.perkTier == NubbyPerkTier.UltraRare">
          <img
            src="@/assets/icons/badges/spr_Sub_UltraRarePerk.gif"
            class="w-24 h-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>
