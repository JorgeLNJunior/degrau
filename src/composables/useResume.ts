import { reactive } from 'vue'

import type { Resume } from '@/types/resume.types'

const defaultResume: Resume = {
  profile: {
    name: 'Seu Nome Completo',
    location: 'Cidade, Estado',
    phone: '(00) 00000-0000',
    email: 'email@exemplo.com',
    linkedin: 'https://linkedin.com/in/usuario',
    portfolio: 'https://github.com/usuario',
    summary:
      'Desenvolvedor Full Stack especializado em ecossistemas modernos de JavaScript. Experiência em arquitetura de componentes escaláveis e otimização de performance para aplicações web de larga escala.',
  },
  experience: [
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
  ],
  skills: {
    tech: ['Vue.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'SQL'],
    tools: ['Git', 'Docker', 'AWS', 'Jira', 'Figma'],
  },
  education: [
    {
      degree: 'Graduação em Engenharia de Software',
      institution: 'Universidade Federal',
      year: 2018,
    },
  ],
}

const resume = reactive<Resume>(defaultResume)

export function useResume() {
  const setResume = (newResume: Partial<Resume>) => {
    Object.assign(resume, newResume)
  }

  return {
    resume,
    setResume,
  }
}
