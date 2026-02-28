<script setup lang="ts">
import { computed } from 'vue'

import { useResume } from '@/composables/useResume'
import { emitter, events } from '@/event'

const { resume } = useResume()

const profile = computed(() => resume.profile)
const experiences = computed(() => resume.experience)
const skills = computed(() => resume.skills)
const education = computed(() => resume.education)

emitter.on(events.PRINT, () => {
  window.print()
})
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-6 no-print-bg">
    <main
      id="resume-paper"
      class="printable-area max-w-4xl mx-auto bg-white p-12 shadow-2xl print:shadow-none print:p-0"
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
        <h2
          class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300 break-after-avoid print:text-black print:border-black"
        >
          Resumo Profissional
        </h2>
        <p class="mt-2 text-gray-700 leading-relaxed text-sm print:text-black">
          {{ profile.summary }}
        </p>
      </section>

      <section class="mt-6">
        <h2
          class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300 break-after-avoid print:text-black print:border-black"
        >
          Experiência Profissional
        </h2>

        <div v-for="(exp, index) in experiences" :key="index" class="mt-4 break-inside-avoid">
          <div class="flex justify-between items-baseline">
            <h3 class="font-bold text-md text-gray-900 print:text-black">{{ exp.role }}</h3>
            <span class="text-sm text-gray-600 italic print:text-gray-800">{{ exp.period }}</span>
          </div>
          <div class="flex justify-between items-baseline">
            <span class="text-sm font-semibold text-gray-700 print:text-black">{{
              exp.company
            }}</span>
            <span class="text-xs text-gray-500 print:text-gray-600">{{ exp.location }}</span>
          </div>
          <ul class="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1 print:text-black">
            <li v-for="(bullet, bIndex) in exp.bullets" :key="bIndex">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </section>

      <section class="mt-6 break-inside-avoid">
        <h2
          class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300 break-after-avoid print:text-black print:border-black"
        >
          Competências
        </h2>
        <div class="mt-2 text-sm text-gray-700 print:text-black">
          <p><strong>Habilidades Técnicas:</strong> {{ skills.hardSkills.join(', ') }}</p>
          <p class="mt-1">
            <strong>Habilidades Interpessoais:</strong> {{ skills.softSkills.join(', ') }}
          </p>
        </div>
      </section>

      <section class="mt-6">
        <h2
          class="text-lg font-bold uppercase text-gray-800 border-b border-gray-300 break-after-avoid print:text-black print:border-black"
        >
          Formação Acadêmica
        </h2>
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="mt-3 flex justify-between items-baseline break-inside-avoid"
        >
          <div>
            <h3 class="font-bold text-sm text-gray-900 print:text-black">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-700 print:text-black">{{ edu.institution }}</p>
          </div>
          <span class="text-sm text-gray-600 italic print:text-gray-800">{{ edu.year }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
/* Ajustes específicos para a geração do PDF e impressão */
@media print {
  @page {
    margin: 1.5cm;
  }

  /* Reset basic styles */
  html,
  body {
    background-color: white;
    height: auto;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: visible;
  }

  /* Ensure body > * is hidden but #app is rendered for structure */
  body > *:not(#app) {
    display: none !important;
  }

  body > #app {
    display: block !important;
  }

  /* 1. Make body relative */
  body {
    position: relative;
  }

  /* 2. Hide everything by default using visibility */
  body * {
    visibility: hidden;
  }

  /* 3. Reset ancestors to avoid layout issues */
  #app,
  main:not(#resume-paper),
  div:not(#resume-paper):not(#resume-paper *),
  section:not(#resume-paper):not(#resume-paper *),
  header:not(#resume-paper):not(#resume-paper *) {
    position: static !important;
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;
    overflow: visible !important;
    transform: none !important;
    visibility: hidden;
  }

  /* 4. Show the resume and position it */
  #resume-paper {
    visibility: visible !important;
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    z-index: 2147483647;
    background-color: white !important;
  }

  /* 5. Show resume children and let them flow naturally */
  #resume-paper * {
    visibility: visible !important;
    position: static;
  }
}
</style>
