<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/vue";

import { useReducedMotion } from "@/lib/store/reduced-motion";
const reducedMotion = useReducedMotion();
</script>

<template>
  <header
    className="flex justify-between h-20 w-full shrink-0 items-center px-4 md:px-6"
  >
    <div class="flex items-center">
      <RouterLink to="/" class="mr-6 hidden lg:flex" prefetch="{false}">
        <img src="@/assets/icons/base.gif" className="h-6 w-6 mr-2" />
        <span>NubbyDB</span>
      </RouterLink>

      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <RouterLink
              to="/"
              class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              Items
            </RouterLink>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <RouterLink
              to="/about"
              class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              About
            </RouterLink>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    <div className="flex justify-between gap-x-2">
      <a
        href="https://github.com/FromDarkHell/NubbyDB"
        target="_blank"
        class="cursor-pointer"
      >
        <Button variant="outline" class="cursor-pointer">
          <Icon icon="radix-icons:github-logo" class="h-[1.2rem] w-[1.2rem]" />
          <span class="sr-only">Github</span>
        </Button>
      </a>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="cursor-pointer">
            <Icon
              icon="radix-icons:gear"
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
            />
            <span class="sr-only">Toggle Motion Reduction</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="reducedMotion.disable()"
            >Allow Motion</DropdownMenuItem
          >
          <DropdownMenuItem @click="reducedMotion.enable()"
            >Reduce Motion</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
