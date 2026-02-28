<script setup lang="ts">
import { computed } from 'vue'

import { useResume } from '@/composables/useResume'

const { resume } = useResume()

const profile = computed(() => resume.profile)
const experiences = computed(() => resume.experience)
const skills = computed(() => resume.skills)
const education = computed(() => resume.education)
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <main
      id="resume-paper"
      class="max-w-4xl mx-auto bg-white p-12 shadow-2xl print:shadow-none print:p-0"
    >
      <header class="text-center border-b-2 border-gray-800 pb-4">
        <h1 class="text-4xl font-bold uppercase tracking-tight text-gray-900">
          {{ profile.name }}
        </h1>
        <div class="mt-2 text-gray-700 flex flex-wrap justify-center gap-2 text-sm">
          <span>{{ profile.location }}</span>
          <span class="hidden md:inline">•</span>
          <span>{{ profile.phone }}</span>
          <span class="hidden md:inline">•</span>
          <a :href="'mailto:' + profile.email" class="underline">{{ profile.email }}</a>
        </div>
        <div
          v-if="profile.linkedin || profile.portfolio"
          class="mt-1 text-blue-800 text-sm font-medium"
        >
          <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank">LinkedIn</a>
          <span v-if="profile.linkedin && profile.portfolio"> | </span>
          <a v-if="profile.portfolio" :href="profile.portfolio" target="_blank">Portfolio</a>
        </div>
      </header>

      <section class="mt-6">
        <h2 class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300">
          Resumo Profissional
        </h2>
        <p class="mt-2 text-gray-700 leading-relaxed text-sm">
          {{ profile.summary }}
        </p>
      </section>

      <section class="mt-6">
        <h2 class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300">
          Experiência Profissional
        </h2>

        <div v-for="(exp, index) in experiences" :key="index" class="mt-4">
          <div class="flex justify-between items-baseline">
            <h3 class="font-bold text-md text-gray-900">{{ exp.role }}</h3>
            <span class="text-sm text-gray-600 italic">{{ exp.period }}</span>
          </div>
          <div class="flex justify-between items-baseline">
            <span class="text-sm font-semibold text-gray-700">{{ exp.company }}</span>
            <span class="text-xs text-gray-500">{{ exp.location }}</span>
          </div>
          <ul class="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li v-for="(bullet, bIndex) in exp.bullets" :key="bIndex">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </section>

      <section class="mt-6">
        <h2 class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300">
          Competências
        </h2>
        <div class="mt-2 text-sm text-gray-700">
          <p><strong>Habilidades Técnicas:</strong> {{ skills.hardSkills.join(', ') }}</p>
          <p class="mt-1">
            <strong>Habilidades Interpessoais:</strong> {{ skills.softSkills.join(', ') }}
          </p>
        </div>
      </section>

      <section class="mt-6">
        <h2 class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300">
          Formação Acadêmica
        </h2>
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="mt-3 flex justify-between items-baseline"
        >
          <div>
            <h3 class="font-bold text-sm text-gray-900">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-700">{{ edu.institution }}</p>
          </div>
          <span class="text-sm text-gray-600 italic">{{ edu.year }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
/* Ajustes específicos para a geração do PDF */
@media print {
  @page {
    margin: 1cm;
  }

  body {
    background-color: white !important;
  }

  .no-print-bg {
    background-color: white !important;
    padding: 0 !important;
  }

  button {
    display: none !important;
  }
}

/* Garante que o PDF tenha fontes legíveis se o Tailwind demorar a carregar */
body {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
}
</style>
