<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Github } from 'lucide-vue-next'

import { buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="flex h-14 items-center px-6 justify-between">
      <div class="mr-4 flex">
        <RouterLink class="mr-6 flex items-center space-x-3" to="/">
          <img src="/logo.png" alt="vaggo Logo" class="h-8 w-8 object-contain" />
          <span class="hidden font-bold sm:inline-block">Vaggo</span>
        </RouterLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink to="/" :class="navigationMenuTriggerStyle()"> Início </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink to="/tips" :class="navigationMenuTriggerStyle()"> Dicas </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink to="/templates" :class="navigationMenuTriggerStyle()">
                  Modelos
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink to="/about" :class="navigationMenuTriggerStyle()"> Sobre </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <a
        class="end-0"
        href="https://github.com/JorgeLNJunior/vaggo"
        target="_blank"
        rel="noreferrer"
        :class="
          cn(
            buttonVariants({
              variant: 'ghost',
              size: 'icon',
            }),
          )
        "
      >
        <Github class="h-4 w-4" />
        <span class="sr-only">GitHub</span>
      </a>
    </div>
  </header>
</template>
