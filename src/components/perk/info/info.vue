<script setup lang="ts">
import {
  NubbyPerkPool,
  nubbyPerkPoolLabels,
  nubbyPerkTierLabels,
  perks,
  type NubbyPerk,
} from "@/lib/nubby/perks";
import { ControllableGIF } from "@/components/ui/controllable-gif";
import { PerkBadge } from "@/components/perk/badge";

import { TooltipText } from "@/components/ui/tooltip-text";
import { htmlify } from "@/lib/nubby/util";
import rgbHex from "rgb-hex";
import { calculatePerkDropRate } from "@/lib/nubby/math";

defineProps({
  perk: Object as () => NubbyPerk,
});
</script>
<template>
  <div class="text-wrap">
    <div class="flex gap-2 my-2">
      <ControllableGIF
        :src="'dumps/sprites/' + perk?.spriteName + '.gif'"
        class="w-12 h-12 object-contain shrink-0"
      />

      <div class="text-left text-xl font-semibold w-full">
        <div>{{ perk?.perkName }}</div>
        <div class="flex gap-2 justify-start w-full">
          <PerkBadge :perk="perk!" />
        </div>
      </div>
    </div>

    <div class="ml-2">
      <div class="text-xl" v-html="htmlify(perk?.triggerText)"></div>
      <div class="text-xl" v-html="htmlify(perk?.perkDescription)"></div>

      <div
        class="text-xl"
        v-if="perk?.altPerkDescText != null"
        v-html="htmlify(perk?.altPerkDescText)"
      ></div>

      <div
        v-if="perk?.perkPool != NubbyPerkPool.Unobtainable"
        class="pt-1 border-t"
      >
        <p class="text-md inline">
          <TooltipText>
            <template v-slot:content>
              <p class="underline decoration-dashed underline-offset-3">
                Default Drop Rate:
              </p>
            </template>

            <template v-slot:tooltip>
              <p>
                These numbers can/will change depending on your run. Check out
                the
                <RouterLink to="/about" class="text-blue-500 underline"
                  >About</RouterLink
                >
                page to learn more
              </p>
            </template>
          </TooltipText>
        </p>

        {{ (calculatePerkDropRate(perk!, perks) * 100).toFixed(3) }}%
      </div>

      <div class="text-md border-x border-y border-accent-foreground">
        <div class="flex justify-between">
          <div class="flex">
            <div class="border-r px-1 border-accent-foreground">
              {{ nubbyPerkTierLabels[perk!.perkTier] }}
            </div>
            <div class="border-r px-1 border-accent-foreground">
              {{ nubbyPerkPoolLabels[perk!.perkPool] }}
            </div>
          </div>

          <TooltipText
            class="border-x border-accent-foreground min-w-1 grow"
            :style="{
              backgroundColor:
                'rgb(' +
                (perk?.perkEffectColor.r +
                  ',' +
                  perk?.perkEffectColor.g +
                  ',' +
                  perk?.perkEffectColor.b) +
                ')',
            }"
          >
            <template v-slot:content>
              <div></div>
            </template>

            <template v-slot:tooltip>
              <div>
                <p>This is the color when the perk activates</p>
                <p>
                  Hex Code: #{{
                    rgbHex(
                      perk!.perkEffectColor.r,
                      perk!.perkEffectColor.g,
                      perk!.perkEffectColor.b
                    ).toLocaleUpperCase()
                  }}
                </p>
              </div>
            </template>
          </TooltipText>

          <div class="flex">
            <div class="px-2 border-accent-foreground">ID: {{ perk?.id }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
