<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-full">
    <div class="container mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold mb-6">Dicas para um Currículo Vencedor</h1>
      <div class="prose dark:prose-invert max-w-none">
        <p class="text-muted-foreground text-lg mb-4">
          Descubra como destacar suas experiências e conquistar a vaga dos seus sonhos.
        </p>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <div class="p-6 border rounded-lg shadow-sm">
            <h3 class="font-semibold text-xl mb-2">Seja Objetivo</h3>
            <p class="text-sm text-muted-foreground">
              Recrutadores gastam poucos segundos em cada currículo. Vá direto ao ponto.
            </p>
          </div>
          <div class="p-6 border rounded-lg shadow-sm">
            <h3 class="font-semibold text-xl mb-2">Use Palavras-chave</h3>
            <p class="text-sm text-muted-foreground">
              Adapte seu currículo para cada vaga usando os termos da descrição.
            </p>
          </div>
          <div class="p-6 border rounded-lg shadow-sm">
            <h3 class="font-semibold text-xl mb-2">Revise Sempre</h3>
            <p class="text-sm text-muted-foreground">
              Erros de português podem eliminar um candidato qualificado. Revise com atenção.
            </p>
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
