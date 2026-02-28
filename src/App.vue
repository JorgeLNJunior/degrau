<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { Toaster } from './components/ui/sonner'
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Navbar class="print:hidden" />
    <main class="flex-1 overflow-hidden">
      <RouterView v-slot="{ Component }">
        <component :is="Component" class="h-full" />
      </RouterView>
    </main>
  </div>
  <Toaster class="print:hidden" />
</template>
