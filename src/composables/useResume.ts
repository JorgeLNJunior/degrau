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
      'Profissional experiente em gestão de projetos e liderança de equipes multidisciplinares. Focado em otimização de processos e entrega de resultados estratégicos.',
  },
  experience: [
    {
      role: 'Gerente de Projetos Sênior',
      company: 'Empresa Multinacional S.A.',
      location: 'São Paulo, SP',
      period: 'Março 2021 – Presente',
      bullets: [
        'Liderança de projetos estratégicos com orçamentos superiores a R$ 1 milhão.',
        'Implementação de novas metodologias que aumentaram a produtividade da equipe em 25%.',
        'Coordenação entre departamentos para garantir o alinhamento com os objetivos da empresa.',
      ],
    },
    {
      role: 'Analista de Processos',
      company: 'Consultoria Empresarial X',
      location: 'Rio de Janeiro, RJ',
      period: 'Janeiro 2019 – Fevereiro 2021',
      bullets: [
        'Mapeamento e otimização de processos internos, reduzindo custos operacionais em 15%.',
        'Elaboração de relatórios gerenciais para suporte à tomada de decisão da diretoria.',
      ],
    },
  ],
  skills: {
    hardSkills: [
      'Gestão de Projetos',
      'Análise de Dados',
      'Planejamento Estratégico',
      'MS Project',
      'Excel Avançado',
      'Inglês Fluente',
    ],
    softSkills: [
      'Liderança',
      'Comunicação Eficaz',
      'Resolução de Problemas',
      'Trabalho em Equipe',
      'Negociação',
    ],
  },
  education: [
    {
      degree: 'MBA em Gestão Empresarial',
      institution: 'Fundação Getúlio Vargas',
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
