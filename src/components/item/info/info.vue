<script setup lang="ts">
import { items, nubbyItemPoolLabels, type NubbyItem } from "@/lib/nubby/items";
import { calculateItemDropRate } from "@/lib/nubby/math";
import { ControllableGIF } from "@/components/ui/controllable-gif";

import { ItemBadge } from "@/components/item/badge";
import { TooltipText } from "@/components/ui/tooltip-text";

const { showMutantInfo = false } = defineProps({
  item: Object as () => NubbyItem,
  showMutantInfo: Object as () => boolean,
});

function htmlify(s: string | undefined) {
  if (s == undefined) return "";

  var ended = true;

  s = s.trim().replaceAll(/\[#[A-Za-z0-9]{6}\]/g, (substring: string) => {
    var hex = substring.trim().replace("]", "").replace("[", "");

    ended = !ended;
    return (
      (!ended ? "</div>" : "") +
      "<div style='color: " +
      hex +
      "' class='inline'>"
    );
  });

  s = s.replaceAll(/\[([A-Za-z0-9_]*),[0-9]+\]/g, (substring: string) => {
    var spriteName = substring.match(/(?!\[)[A-Za-z_]+(?=,[0-]+)/g);
    return (
      "<img src='dumps/sprites/" +
      spriteName +
      ".gif' class='w-4 h-4 object-contain inline'/>"
    );
  });

  s = s.replace(/\n/g, "");

  while (s.match(/\*.*/g)) {
    s = s.replaceAll(/\*.*/g, (substring: string) => {
      var contents = substring.substring(1);

      return "<li class='ml-4'>" + contents + "</li>";
    });
  }

  if (!ended) s += "</div>";

  var rawHTML = s;

  return rawHTML;
}
</script>
<template>
  <div>
    <div class="flex gap-2 my-2">
      <ControllableGIF
        :src="'dumps/sprites/' + item?.spriteName + '.gif'"
        class="w-12 h-12 object-contain shrink-0"
      />

      <div class="text-left text-xl font-semibold w-full">
        <div>{{ item?.nameText }}</div>
        <div class="flex gap-2 justify-start w-full">
          <ItemBadge :item="item!" />
        </div>
      </div>
    </div>

    <div class="ml-2">
      <div class="text-xl" v-html="htmlify(item?.mainTriggerText)"></div>
      <div
        class="text-xl"
        v-html="htmlify(item?.altTriggerText)"
        v-if="showMutantInfo"
      ></div>

      <div class="text-xl" v-html="htmlify(item?.descriptionText)"></div>

      <div v-if="item!.itemLevel < 2" class="pt-1 border-t">
        <p class="text-md">
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

        <ul class="list-disc ml-8">
          <li>
            <TooltipText>
              <template v-slot:content>
                <p class="underline decoration-dashed underline-offset-3">
                  Early:
                </p>
              </template>

              <template v-slot:tooltip>
                <p><code>Early</code> rounds are rounds before Round 10</p>
              </template>
            </TooltipText>

            {{ (calculateItemDropRate(item!, items).EARLY * 100).toFixed(3) }}%
            (Weight: {{ item?.levelWeighting.EARLY }})
          </li>
          <li>
            <TooltipText>
              <template v-slot:content>
                <p class="underline decoration-dashed underline-offset-3">
                  Mid:
                </p>
              </template>

              <template v-slot:tooltip>
                <p>
                  <code>Mid</code> rounds are rounds after Round 10 but before
                  Round 50
                </p>
              </template>
            </TooltipText>

            {{ (calculateItemDropRate(item!, items).MID * 100).toFixed(3) }}%
            (Weight: {{ item?.levelWeighting.MID }})
          </li>
          <li>
            <TooltipText>
              <template v-slot:content>
                <p class="underline decoration-dashed underline-offset-3">
                  Late:
                </p>
              </template>

              <template v-slot:tooltip>
                <p><code>Late</code> rounds are rounds after Round 50</p>
              </template>
            </TooltipText>

            {{ (calculateItemDropRate(item!, items).LATE * 100).toFixed(3) }}%
            (Weight: {{ item?.levelWeighting.LATE }})
          </li>
        </ul>
      </div>

      <div class="text-md border-x border-y border-accent-foreground">
        <div class="flex justify-between gap-1">
          <div class="flex">
            <div class="pr-2 border-r border-accent-foreground">
              <img
                src="@/assets/icons/spr_GoldCoinSm.gif"
                class="w-6 object-contain inline"
              />
              {{ item?.price }}
            </div>
            <div
              class="border-r px-2 border-accent-foreground"
              v-if="item!.itemLevel < 2"
            >
              {{ nubbyItemPoolLabels[item!.itemPool] }}
            </div>
          </div>

          <div class="border-l px-2 border-accent-foreground">
            ID: {{ item?.id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
