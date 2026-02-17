<script setup lang="ts">
import { Toaster } from './components/ui/sonner'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Navbar />
    <main class="flex-1 overflow-hidden">
      <RouterView v-slot="{ Component }">
        <component :is="Component" class="h-full" />
      </RouterView>
    </main>
  </div>
  <Toaster />
</template>
