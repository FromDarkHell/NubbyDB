<script setup lang="ts">
import { PerkBlob } from "@/components/perk/blob";
import { PerkInfo } from "@/components/perk/info";

import type { NubbyPerk } from "@/lib/nubby/perks";
import { NubbyPerkType, NubbyPerkPool } from "@/lib/nubby/perks";
import {
  perks,
  nubbyPerkPoolLabels,
  nubbyPerkTypeLabels,
  nubbyPerkTierLabels,
} from "@/lib/nubby/perks";
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

var groupedPerks = Object.groupBy(perks, (perk: NubbyPerk) => {
  return perk.perkTier;
});

const itemTypeFilter = ref<NubbyPerkType | "-1">("-1");
const itemPoolFilter = ref<NubbyPerkPool | "-1">("-1");
const itemNameFilter = ref<string>("");

const selectedPerk = ref<NubbyPerk | undefined>(undefined);
</script>

<template>
  <div class="flex shrink-0">
    <aside
      id="default-sidebar"
      class="left-0 z-40 w-80 shrink-0 h-screen hidden md:block"
      aria-label="Sidebar"
    >
      <div
        class="h-full px-3 py-4 overflow-y-auto"
        style="
          background-color: hsl(var(--sidebar-background));
          color: hsl(var(--sidebar-foreground));
          border: hsl(var(--sidebar-border));
        "
      >
        <div v-if="selectedPerk != undefined" class="transition">
          <PerkInfo :perk="selectedPerk" />
        </div>
      </div>
    </aside>

    <div class="w-full flex-wrap">
      <div
        class="w-full px-8 py-4"
        style="
          background-color: hsl(var(--sidebar-background));
          color: hsl(var(--sidebar-foreground));
          border: hsl(var(--sidebar-border));
        "
      >
        <div class="flex justify-start items-center gap-2 mb-2">
          <Input
            v-model="itemNameFilter"
            type="text"
            placeholder="Search"
            class="mr-2"
          />

          <Select v-model="itemTypeFilter">
            <SelectTrigger>
              <SelectValue placeholder="Perk Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="-1" selected>All</SelectItem>

              <SelectItem
                v-for="(label, itemType) in nubbyPerkTypeLabels"
                :value="itemType"
                >{{ label }}</SelectItem
              >
            </SelectContent>
          </Select>

          <Select v-model="itemPoolFilter">
            <SelectTrigger>
              <SelectValue placeholder="Perk Pool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="-1" selected>All Obtainable</SelectItem>
              <SelectItem
                v-for="(label, perkPool) in nubbyPerkPoolLabels"
                :value="perkPool"
                >{{ label }}</SelectItem
              >
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="ml-2">
        <div
          v-for="(nubbyItems, groupKey) in groupedPerks"
          v-bind:key="groupKey"
        >
          <div class="text-center my-4 text-xl">
            <p>{{ nubbyPerkTierLabels[groupKey] }}</p>
          </div>

          <div class="flex gap-x-4 gap-y-0 flex-wrap px-8">
            <div
              v-for="item in nubbyItems?.filter((i) => {
                if (itemPoolFilter != '-1') {
                  if (i.perkPool != itemPoolFilter) return false;
                }

                if (itemPoolFilter == '-1') {
                  if (i.perkPool == NubbyPerkPool.Unobtainable) {
                    // Kebab and Croissant Perk
                    // These are both obtainable, but they're in the unobtainable pool
                    if (i.id != 2 && i.id != 30) return false;
                  }
                }

                if (itemTypeFilter != '-1') {
                  if (i.perkType != itemTypeFilter) return false;
                }

                if (itemNameFilter != '') {
                  if (
                    !i.perkName
                      .toLowerCase()
                      .includes(itemNameFilter.toLowerCase()) &&
                    !i.triggerText
                      .toLowerCase()
                      .includes(itemNameFilter.toLowerCase()) &&
                    !i.perkDescription
                      .toLowerCase()
                      .includes(itemNameFilter.toLowerCase()) &&
                    (i.altPerkDescText == null ||
                      !i.altPerkDescText
                        .toLowerCase()
                        .includes(itemNameFilter.toLowerCase()))
                  )
                    return false;
                }

                return true;
              })"
              v-bind:key="item.id + '_' + item.objectName"
            >
              <PerkBlob v-bind:perk="item" @mouseover="selectedPerk = item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
