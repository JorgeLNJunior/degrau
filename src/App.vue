<script setup lang="ts">
import { Toaster } from './components/ui/sonner'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
  <Toaster />
</template>
