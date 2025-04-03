<script setup lang="ts">
import { ItemBlob } from "@/components/item/blob";
import { ItemInfo } from "@/components/item/info";

import type { SimplifiedNubbyItem } from "@/lib/nubby/items";
import { NubbyItemType, NubbyItemPool } from "@/lib/nubby/items";
import {
  simplifiedItems,
  nubbyItemTierLabels,
  nubbyItemTypeLabels,
  nubbyItemPoolLabels,
} from "@/lib/nubby/items";
import { ref } from "vue";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

var groupedItems = Object.groupBy(
  simplifiedItems,
  (item: SimplifiedNubbyItem) => {
    return item.itemRarity;
  }
);

const itemTypeFilter = ref<NubbyItemType | "-1">("-1");
const itemPoolFilter = ref<NubbyItemPool | "-1">("-1");
const itemNameFilter = ref<string>("");
const showMutantInfo = ref<boolean>(false);

const selectedItem = ref<SimplifiedNubbyItem | undefined>(undefined);
</script>

<template>
  <div class="flex shrink-0">
    <aside
      id="default-sidebar"
      class="left-0 z-40 w-80 shrink-0 h-screen transition-transform -translate-x-full sm:translate-x-0"
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
        <div v-if="selectedItem != undefined" class="transition">
          <ItemInfo :item="selectedItem" :show-mutant-info="showMutantInfo" />

          <div v-if="selectedItem.upgradeItem != undefined">
            <ItemInfo
              :item="selectedItem.upgradeItem"
              :show-mutant-info="showMutantInfo"
            />
          </div>
        </div>
      </div>
    </aside>

    <div class="w-full">
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
              <SelectValue placeholder="Item Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="-1" selected>All</SelectItem>

              <SelectItem
                v-for="itemType in [
                  NubbyItemType.Item,
                  NubbyItemType.Food,
                  NubbyItemType.CorruptedItem,
                ]"
                :value="itemType"
                >{{ nubbyItemTypeLabels[itemType] }}</SelectItem
              >
            </SelectContent>
          </Select>

          <Select v-model="itemPoolFilter">
            <SelectTrigger>
              <SelectValue placeholder="Item Pool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="-1" selected>All Obtainable</SelectItem>
              <SelectItem
                v-for="itemPool in [
                  NubbyItemPool.Unobtainable,
                  NubbyItemPool.Shop,
                  NubbyItemPool.BlackMarket,
                  NubbyItemPool.Cafe,
                ]"
                :value="itemPool"
                >{{ nubbyItemPoolLabels[itemPool] }}</SelectItem
              >
            </SelectContent>
          </Select>
        </div>

        <div class="flex justify-end">
          <div class="flex items-center space-x-2">
            <Switch id="mutant-tony" v-model="showMutantInfo" />
            <Label for="mutant-tony">Mutant Tony?</Label>
          </div>
        </div>
      </div>

      <div class="ml-2">
        <div
          v-for="(nubbyItems, groupKey) in groupedItems"
          v-bind:key="groupKey"
        >
          <div class="text-center my-4 text-xl">
            <p>{{ nubbyItemTierLabels[groupKey] }}</p>
          </div>

          <div class="flex gap-x-4 gap-y-0 flex-wrap px-8">
            <div
              v-for="item in nubbyItems?.filter((i) => {
                if (itemPoolFilter != '-1') {
                  if (i.itemPool != itemPoolFilter) return false;
                }
                if (itemPoolFilter == '-1') {
                  if (i.itemPool == NubbyItemPool.Unobtainable) return false;
                }

                if (itemTypeFilter != '-1') {
                  if (i.itemType != itemTypeFilter) return false;
                }

                if (itemNameFilter != '') {
                  if (
                    !i.nameText
                      .toLowerCase()
                      .includes(itemNameFilter.toLowerCase()) &&
                    !i.descriptionText
                      .toLowerCase()
                      .includes(itemNameFilter.toLowerCase())
                  )
                    return false;
                }

                return true;
              })"
              v-bind:key="item.id + '_' + item.objectName"
            >
              <ItemBlob v-bind:item="item" @mouseover="selectedItem = item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
