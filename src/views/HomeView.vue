<script setup lang="ts">
import ResumeForm from '@/components/resumeForm.vue'
import ResumeTemplate from '@/components/resumeTemplate.vue'
</script>

<template>
  <div class="grid grid-cols-2">
    <section class="m-6" aria-label="Editor de Currículo">
      <ResumeForm />
    </section>
    <section aria-label="Pré-visualização do Currículo">
      <ResumeTemplate />
    </section>
  </div>
</template>
