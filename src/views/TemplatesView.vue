<script setup lang="ts">
import ResumeTemplate from '@/components/resumeTemplate.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-full">
    <div class="container mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold mb-6">Modelos de Currículo</h1>
      <p class="text-muted-foreground mb-8 text-lg">
        Escolha o modelo ideal para apresentar sua trajetória profissional.
      </p>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Placeholder for future templates grid -->
        <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-card">
          <div
            class="aspect-[210/297] bg-muted mb-4 flex items-center justify-center rounded-md overflow-hidden relative group"
          >
            <div
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <span class="text-white font-medium">Visualizar</span>
            </div>
            <!-- Simplified preview using existing component structure if possible, or just a placeholder div -->
            <div class="w-full h-full bg-white p-2 text-[4px] text-gray-300 overflow-hidden">
              <div class="h-2 w-1/2 bg-gray-400 mb-2"></div>
              <div class="h-1 w-full bg-gray-200 mb-1"></div>
              <div class="h-1 w-full bg-gray-200 mb-1"></div>
              <div class="h-1 w-3/4 bg-gray-200 mb-4"></div>
              <div class="h-2 w-1/3 bg-gray-400 mb-2"></div>
              <div class="h-1 w-full bg-gray-200 mb-1"></div>
              <div class="h-1 w-full bg-gray-200 mb-1"></div>
            </div>
          </div>
          <h3 class="font-semibold text-lg">Modelo Padrão ATS</h3>
          <p class="text-sm text-muted-foreground mt-1">Otimizado para sistemas de rastreamento.</p>
        </div>

        <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-card opacity-60">
          <div class="aspect-[210/297] bg-muted mb-4 flex items-center justify-center rounded-md">
            <span class="text-muted-foreground text-sm">Em breve</span>
          </div>
          <h3 class="font-semibold text-lg">Modelo Moderno</h3>
          <p class="text-sm text-muted-foreground mt-1">Design limpo com destaque visual.</p>
        </div>

        <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-card opacity-60">
          <div class="aspect-[210/297] bg-muted mb-4 flex items-center justify-center rounded-md">
            <span class="text-muted-foreground text-sm">Em breve</span>
          </div>
          <h3 class="font-semibold text-lg">Modelo Executivo</h3>
          <p class="text-sm text-muted-foreground mt-1">Ideal para cargos de liderança.</p>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
