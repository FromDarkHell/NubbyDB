<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot name="content"></slot>
      </TooltipTrigger>
      <TooltipContent :side-offset="-10">
        <slot name="tooltip"></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
