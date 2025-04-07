<script setup lang="ts">
import { saveSaveFile, type SaveFileObject } from "@/lib/nubby/save";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonEditorVue from "json-editor-vue";
import "@/components/save/card/json-dark.css";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { downloadBlob } from "@/lib/utils";

const props = defineProps<{
  saveFile: SaveFileObject;
}>();

var mutableSaveFile = ref<SaveFileObject>(props.saveFile);

function downloadSaveFile() {
  var fileBytes = saveSaveFile(mutableSaveFile.value);
  downloadBlob(fileBytes, mutableSaveFile.value.fileName);
}
</script>

<template>
  <AccordionItem :key="saveFile.fileName" :value="saveFile.fileName">
    <AccordionTrigger>
      <div class="flex items-center">
        <code class="font-semibold">{{ saveFile.fileName }}</code>

        <Button
          variant="ghost"
          class="cursor-pointer ml-2"
          @click="downloadSaveFile()"
        >
          <Icon icon="radix-icons:download" class="h-[1em] w-[1em]" />
          <span class="sr-only">Download</span>
        </Button>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <JsonEditorVue
        :main-menu-bar="false"
        :navigation-bar="false"
        :status-bar="false"
        v-model="mutableSaveFile.contents"
        class="shadcn-json-dark"
      />
    </AccordionContent>
  </AccordionItem>
</template>
