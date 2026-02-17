<script setup lang="ts">
import ResumeForm from '@/components/resumeForm.vue'
import ResumeTemplate from '@/components/resumeTemplate.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <div class="grid h-full w-full md:grid-cols-2">
    <section class="h-full border-r overflow-hidden" aria-label="Editor de Currículo">
      <ScrollArea class="h-full">
        <div class="p-6">
          <ResumeForm />
        </div>
      </ScrollArea>
    </section>
    <section class="h-full bg-muted/30 overflow-hidden" aria-label="Pré-visualização do Currículo">
      <ScrollArea class="h-full">
        <div class="flex justify-center p-6">
          <ResumeTemplate />
        </div>
      </ScrollArea>
    </section>
  </div>
</template>
