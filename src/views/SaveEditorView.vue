<script setup lang="ts">
import { loadSaveFile, type SaveFileObject } from "@/lib/nubby/save";
import { SaveFileCard } from "@/components/save/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ref } from "vue";

interface Dictionary<T> {
  [Key: string | number]: T;
}

const loadedSaveFiles = ref<Dictionary<SaveFileObject> | undefined>(undefined);

function loadSaveFileInput(e: Event) {
  loadedSaveFiles.value = {};

  let target = <HTMLInputElement>e.target;
  for (let index = 0; index < target.files!.length; index++) {
    const uploadedFile = target.files![index];
    const reader = new FileReader();
    reader.onload = (e) => {
      var fileName = target.files![index].name;
      var fileContents = <ArrayBuffer>e.target!.result;

      loadedSaveFiles.value![index] = loadSaveFile(fileName, fileContents);
    };
    reader.readAsArrayBuffer(uploadedFile);
  }
}
</script>

<template>
  <div class="mx-4">
    <Card>
      <CardHeader>
        <CardTitle>
          <p class="font-semibold text-xl">Save Editor</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          This supports loading all of the <code>.save</code> files created by
          the game. You can upload multiple files at once if you wish to
          view/edit every file.<br />
          All of these files are stored in
          <code>%localappdata%/NNF_FULLVERSION</code>.<br />
          <span class="font-semibold">NOTE</span>: This UI is a bit more
          technical; Please make sure to read 😊<br />

          <div class="w-full max-w-md items-center gap-1.5 mt-4">
            <Label for="saves" class="mb-1">Upload Files</Label>
            <Input
              id="saves"
              type="file"
              @change="loadSaveFileInput"
              multiple
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="mt-4 transition" v-if="loadedSaveFiles != undefined">
      <CardHeader>
        <CardTitle>
          <p class="font-semibold text-xl">Loaded Files</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Accordion type="multiple" class="w-full">
            <SaveFileCard
              :save-file="save"
              v-for="(save, _) of loadedSaveFiles"
            />
          </Accordion>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
