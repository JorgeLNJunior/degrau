<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="container flex h-14 items-center px-4">
      <div class="mr-4 flex">
        <RouterLink class="mr-6 flex items-center space-x-2" to="/">
          <img src="/logo.png" alt="Degrau Logo" class="h-8 w-8 object-contain" />
          <span class="hidden font-bold sm:inline-block">Degrau</span>
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
    </div>
  </header>
</template>
