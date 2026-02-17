<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-full">
    <div class="container mx-auto py-10 px-4 max-w-2xl">
      <h1 class="text-3xl font-bold mb-6">Sobre o Degrau</h1>
      <div class="space-y-6 text-lg">
        <p class="text-muted-foreground">
          O <strong>Degrau</strong> é uma ferramenta open-source desenvolvida para ajudar
          profissionais a criarem currículos otimizados para sistemas ATS (Applicant Tracking
          Systems).
        </p>
        <p>
          Nossa missão é democratizar o acesso a ferramentas de carreira de alta qualidade,
          permitindo que qualquer pessoa aumente suas chances de conseguir a vaga desejada.
        </p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">Como funciona?</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Preencha seus dados de forma simples e guiada.</li>
          <li>O sistema formata automaticamente seguindo as melhores práticas.</li>
          <li>Exporte seu currículo pronto para enviar.</li>
        </ul>
        <p class="text-sm text-muted-foreground mt-8 pt-4 border-t">
          Desenvolvido com tecnologia moderna para garantir velocidade e privacidade. Seus dados são
          processados localmente no seu navegador.
        </p>
      </div>
    </div>
  </ScrollArea>
</template>
