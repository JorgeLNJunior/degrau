<script setup lang="ts">
import { reactive } from 'vue'

import type { Education, Experience, Profile, Skills } from '@/types/resume.types'

const profile: Profile = reactive({
  name: 'Seu Nome Completo',
  location: 'Cidade, Estado',
  phone: '(00) 00000-0000',
  email: 'email@exemplo.com',
  linkedin: 'https://linkedin.com/in/usuario',
  portfolio: 'https://github.com/usuario',
  summary:
    'Desenvolvedor Full Stack especializado em ecossistemas modernos de JavaScript. Experiência em arquitetura de componentes escaláveis e otimização de performance para aplicações web de larga escala.',
})

const experiences: Experience[] = reactive([
  {
    role: 'Desenvolvedor Frontend Sênior',
    company: 'Empresa de Tecnologia S.A.',
    location: 'São Paulo, SP (Remoto)',
    period: 'Março 2021 – Presente',
    bullets: [
      'Desenvolvimento de interfaces reativas utilizando Vue.js e Tailwind CSS para mais de 1 milhão de usuários ativos.',
      'Redução do tempo de carregamento da aplicação em 35% através de técnicas de code-splitting e lazy loading.',
      'Mentoria de desenvolvedores juniores e condução de code reviews focados em boas práticas e segurança.',
    ],
  },
  {
    role: 'Desenvolvedor Web Pleno',
    company: 'Agência Digital X',
    location: 'Rio de Janeiro, RJ',
    period: 'Janeiro 2019 – Fevereiro 2021',
    bullets: [
      'Criação de dashboards administrativos complexos com integração via REST APIs.',
      'Implementação de fluxos de CI/CD, agilizando o deploy de novas features em 50%.',
    ],
  },
])

const skills: Skills = reactive({
  tech: ['Vue.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'SQL'],
  tools: ['Git', 'Docker', 'AWS', 'Jira', 'Figma'],
})

const education: Education[] = reactive([
  {
    degree: 'Graduação em Engenharia de Software',
    institution: 'Universidade Federal',
    year: 2018,
  },
])
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
        <div class="mt-1 text-blue-800 text-sm font-medium">
          <a :href="profile.linkedin" target="_blank">LinkedIn</a> |
          <a :href="profile.portfolio" target="_blank">Portfolio / GitHub</a>
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
          Habilidades Técnicas
        </h2>
        <div class="mt-2 text-sm text-gray-700">
          <p><strong>Tecnologias:</strong> {{ skills.tech.join(', ') }}</p>
          <p class="mt-1"><strong>Ferramentas e Outros:</strong> {{ skills.tools.join(', ') }}</p>
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
