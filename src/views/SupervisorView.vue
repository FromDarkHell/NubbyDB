<script setup lang="ts">
import type { NubbySupervisor } from "@/lib/nubby/supervisors";
import { supervisors } from "@/lib/nubby/supervisors";
import { SupervisorInfo } from "@/components/supervisor/info";
import { SupervisorBlob } from "@/components/supervisor/blob";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>

<template>
  <div class="w-full">
    <Carousel
      class="mx-auto relative w-[90%]"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent class="w-full">
        <CarouselItem
          class="w-full"
          v-for="(supervisor, index) in supervisors"
          :key="index"
        >
          <div class="p-1 w-full">
            <SupervisorInfo :supervisor="supervisor" />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <Carousel
      class="mx-auto relative w-[90%]"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex justify-center gap-1 ml-0">
        <CarouselItem
          v-for="(supervisor, index) in supervisors"
          :key="index"
          class="pl-0 basis-1/20 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div :class="index === selectedIndex ? '' : 'opacity-50'">
            <SupervisorBlob :supervisor="supervisor" :clickable="false" />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
