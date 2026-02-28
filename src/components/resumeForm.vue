<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { vMaska } from 'maska/vue'
import { watch } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/composables/useResume'
import type { Resume } from '@/types/resume.types'

// Local interface matching the form structure (textareas instead of arrays)
interface ResumeForm {
  profile: {
    name: string
    location: string
    phone: string
    email: string
    linkedin: string
    portfolio: string
    summary: string
  }
  experience: {
    role: string
    company: string
    location: string
    period: string
    bullets: string
  }[]
  skills: {
    hardSkills: string
    softSkills: string
  }
  education: {
    degree: string
    institution: string
    year: number
  }[]
}

const { resume, setResume } = useResume()

// Helper to transform Resume (global state) to ResumeForm (local form state)
const transformResumeToForm = (data: Resume): ResumeForm => {
  return {
    profile: {
      ...data.profile,
      linkedin: data.profile.linkedin || '',
      portfolio: data.profile.portfolio || '',
    },
    experience: data.experience.map((exp) => ({
      ...exp,
      bullets: exp.bullets.join('\n'),
    })),
    skills: {
      hardSkills: data.skills.hardSkills.join(', '),
      softSkills: data.skills.softSkills.join(', '),
    },
    education: data.education,
  }
}

// Helper to transform ResumeForm (local form state) to Resume (global state)
const transformFormToResume = (data: ResumeForm): Resume => {
  return {
    ...data,
    experience: data.experience.map((exp) => ({
      ...exp,
      bullets: exp.bullets
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== ''),
    })),
    skills: {
      hardSkills: data.skills.hardSkills
        .split(',')
        .map((line) => line.trim())
        .filter((line) => line !== ''),
      softSkills: data.skills.softSkills
        .split(',')
        .map((line) => line.trim())
        .filter((line) => line !== ''),
    },
    education: data.education,
    profile: {
      ...data.profile,
      linkedin: data.profile.linkedin || undefined,
      portfolio: data.profile.portfolio || undefined,
    },
  }
}

const resumeSchema = z.object({
  profile: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    location: z.string().min(1, 'Localização é obrigatória'),
    phone: z.string().length(15, 'Telefone deve ter 11 dígitos'), // 15 taking into account the mask
    email: z.string().email('Endereço de e-mail inválido'),
    linkedin: z
      .string()
      .regex(
        /^https:\/\/(www\.)?linkedin\.com\/in\/.*$/,
        'Deve ser uma URL válida do LinkedIn (https://linkedin.com/in/usuario)',
      )
      .or(z.literal('')),
    portfolio: z.string().url('URL inválida').or(z.literal('')),
    summary: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
  }),
  experience: z.array(
    z.object({
      role: z.string().min(1, 'Cargo é obrigatório'),
      company: z.string().min(1, 'Empresa é obrigatória'),
      location: z.string().min(1, 'Localização é obrigatória'),
      period: z.string().min(1, 'Período é obrigatório'),
      bullets: z.string().min(1, 'Descreva suas atividades'),
    }),
  ),
  skills: z.object({
    hardSkills: z.string().or(z.literal('')),
    softSkills: z.string().or(z.literal('')),
  }),
  education: z.array(
    z.object({
      degree: z.string().min(1, 'Grau é obrigatório'),
      institution: z.string().min(1, 'Instituição é obrigatória'),
      year: z
        .number()
        .min(1900, 'Ano inválido')
        .max(new Date().getFullYear() + 10, 'Ano inválido'),
    }),
  ),
})

const form = useForm({
  defaultValues: transformResumeToForm(resume),
  validators: {
    onChange: resumeSchema,
  },
  onSubmit: async ({ value }) => {
    // Transform form data to match Resume interface
    const resumeData = transformFormToResume(value)

    console.log('Transformed Resume Data:', resumeData)
    toast.success('Currículo gerado com sucesso!')
  },
})

// Use useStore to get reactive state
const formState = form.useStore((state) => state.values)

// Watch for form changes and update global state
watch(
  formState,
  (newValues) => {
    const resumeData = transformFormToResume(newValues as ResumeForm)
    setResume(resumeData)
  },
  { deep: true },
)
</script>

<template>
  <form @submit.prevent="form.handleSubmit" class="space-y-8">
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Preencha suas informações pessoais para o currículo.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form.Field name="profile.name">
          <template #default="{ field }">
            <Field :data-invalid="!field.state.meta.isValid">
              <FieldLabel :for="field.name">Nome completo</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                placeholder="Marcos Silva"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="profile.email">
            <template #default="{ field }">
              <Field :data-invalid="!field.state.meta.isValid">
                <FieldLabel :for="field.name">Email</FieldLabel>
                <Input
                  :id="field.name"
                  :name="field.name"
                  type="email"
                  :model-value="field.state.value"
                  placeholder="marcos@exemplo.com"
                  @blur="field.handleBlur"
                  @input="field.handleChange($event.target.value)"
                />
                <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
              </Field>
            </template>
          </form.Field>

          <form.Field name="profile.phone">
            <template #default="{ field }">
              <Field :data-invalid="!field.state.meta.isValid">
                <FieldLabel :for="field.name">Telefone</FieldLabel>
                <Input
                  :id="field.name"
                  :name="field.name"
                  :model-value="field.state.value"
                  placeholder="(00) 00000-0000"
                  @blur="field.handleBlur"
                  @input="field.handleChange($event.target.value)"
                  v-maska="'(##) #####-####'"
                />
                <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
              </Field>
            </template>
          </form.Field>
        </div>

        <form.Field name="profile.location">
          <template #default="{ field }">
            <Field :data-invalid="!field.state.meta.isValid">
              <FieldLabel :for="field.name">Localização</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                placeholder="Cidade, Estado"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="profile.linkedin">
            <template #default="{ field }">
              <Field :data-invalid="!field.state.meta.isValid">
                <FieldLabel :for="field.name">LinkedIn URL</FieldLabel>
                <Input
                  :id="field.name"
                  :name="field.name"
                  :model-value="field.state.value"
                  placeholder="https://linkedin.com/in/marcossilva"
                  @blur="field.handleBlur"
                  @input="field.handleChange($event.target.value)"
                />
                <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
              </Field>
            </template>
          </form.Field>

          <form.Field name="profile.portfolio">
            <template #default="{ field }">
              <Field :data-invalid="!field.state.meta.isValid">
                <FieldLabel :for="field.name">Portfolio URL</FieldLabel>
                <Input
                  :id="field.name"
                  :name="field.name"
                  :model-value="field.state.value"
                  placeholder="https://marcossilva.com"
                  @blur="field.handleBlur"
                  @input="field.handleChange($event.target.value)"
                />
                <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
              </Field>
            </template>
          </form.Field>
        </div>

        <form.Field name="profile.summary">
          <template #default="{ field }">
            <Field :data-invalid="!field.state.meta.isValid">
              <FieldLabel :for="field.name">Resumo Profissional</FieldLabel>
              <Textarea
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                placeholder="Breve resumo da sua experiência profissional"
                class="min-h-25"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Experiência Profissional</CardTitle>
        <CardDescription>Adicione suas experiências profissionais mais relevantes.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <form.Field name="experience" mode="array">
          <template #default="{ field }">
            <div v-for="(_, index) in field.state.value" :key="index" class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="text-sm font-semibold">Experiência {{ index + 1 }}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="field.removeValue(index)"
                  type="button"
                  class="text-destructive"
                >
                  Remover
                </Button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field :name="`experience[${index}].role`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid">
                      <FieldLabel :for="subField.name">Cargo</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        :model-value="subField.state.value"
                        placeholder="Engenheiro de Software Sênior"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange($event.target.value)"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>

                <form.Field :name="`experience[${index}].company`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid">
                      <FieldLabel :for="subField.name">Empresa</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        :model-value="subField.state.value"
                        placeholder="Tech Solutions Ltda"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange($event.target.value)"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field :name="`experience[${index}].location`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid">
                      <FieldLabel :for="subField.name">Localização</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        :model-value="subField.state.value"
                        placeholder="São Paulo, SP"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange($event.target.value)"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>

                <form.Field :name="`experience[${index}].period`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid">
                      <FieldLabel :for="subField.name">Período</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        :model-value="subField.state.value"
                        placeholder="Jan 2020 - Presente"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange($event.target.value)"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>
              </div>

              <form.Field :name="`experience[${index}].bullets`">
                <template #default="{ field: subField }">
                  <Field :data-invalid="!subField.state.meta.isValid">
                    <FieldLabel :for="subField.name">Atividades e Realizações</FieldLabel>
                    <Textarea
                      :id="subField.name"
                      :name="subField.name"
                      :model-value="subField.state.value"
                      placeholder="• Liderança técnica de equipe..."
                      class="min-h-25"
                      @blur="subField.handleBlur"
                      @input="subField.handleChange($event.target.value)"
                    />
                    <p class="text-[0.8rem] text-muted-foreground">
                      Separe os itens com uma nova linha.
                    </p>
                    <FieldError
                      v-if="!subField.state.meta.isValid"
                      :errors="subField.state.meta.errors"
                    />
                  </Field>
                </template>
              </form.Field>

              <Separator v-if="index < field.state.value.length - 1" class="my-6" />
            </div>

            <Button
              variant="outline"
              type="button"
              @click="
                field.pushValue({ role: '', company: '', location: '', period: '', bullets: '' })
              "
              class="w-full mt-4"
            >
              + Adicionar Experiência
            </Button>
          </template>
        </form.Field>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Educação</CardTitle>
        <CardDescription>Adicione sua formação acadêmica.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <form.Field name="education" mode="array">
          <template #default="{ field }">
            <div v-for="(_, index) in field.state.value" :key="index" class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="text-sm font-semibold">Formação {{ index + 1 }}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="field.removeValue(index)"
                  type="button"
                  class="text-destructive"
                >
                  Remover
                </Button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <form.Field :name="`education[${index}].degree`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid" class="md:col-span-1">
                      <FieldLabel :for="subField.name">Grau / Curso</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        :model-value="subField.state.value"
                        placeholder="Bacharelado em Ciência da Computação"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange($event.target.value)"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>

                <form.Field :name="`education[${index}].institution`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid" class="md:col-span-1">
                      <FieldLabel :for="subField.name">Instituição</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        :model-value="subField.state.value"
                        placeholder="Universidade Federal"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange($event.target.value)"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>

                <form.Field :name="`education[${index}].year`">
                  <template #default="{ field: subField }">
                    <Field :data-invalid="!subField.state.meta.isValid">
                      <FieldLabel :for="subField.name">Ano de Conclusão</FieldLabel>
                      <Input
                        :id="subField.name"
                        :name="subField.name"
                        type="number"
                        :model-value="subField.state.value"
                        placeholder="2023"
                        @blur="subField.handleBlur"
                        @input="subField.handleChange(Number($event.target.value))"
                      />
                      <FieldError
                        v-if="!subField.state.meta.isValid"
                        :errors="subField.state.meta.errors"
                      />
                    </Field>
                  </template>
                </form.Field>
              </div>

              <Separator v-if="index < field.state.value.length - 1" class="my-6" />
            </div>

            <Button
              variant="outline"
              type="button"
              @click="
                field.pushValue({ degree: '', institution: '', year: new Date().getFullYear() })
              "
              class="w-full mt-4"
            >
              + Adicionar Educação
            </Button>
          </template>
        </form.Field>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
        <CardDescription>Liste suas habilidades técnicas e ferramentas.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form.Field name="skills.hardSkills">
          <template #default="{ field }">
            <Field :data-invalid="!field.state.meta.isValid">
              <FieldLabel :for="field.name">Competências</FieldLabel>
              <Textarea
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                placeholder="Gestão de Projetos, Análise de Dados, Planejamento Estratégico..."
                class="min-h-25"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <p class="text-[0.8rem] text-muted-foreground">Separe os itens por vírgula.</p>
              <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="skills.softSkills">
          <template #default="{ field }">
            <Field :data-invalid="!field.state.meta.isValid">
              <FieldLabel :for="field.name">Habilidades Interpessoais</FieldLabel>
              <Textarea
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                placeholder="Liderança, Comunicação, Trabalho em Equipe..."
                class="min-h-25"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <p class="text-[0.8rem] text-muted-foreground">Separe os itens por vírgula.</p>
              <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>
      </CardContent>
      <CardFooter class="flex justify-end">
        <form.Subscribe>
          <template #default="{ canSubmit, isSubmitting }">
            <Button type="submit" :disabled="!canSubmit">
              {{ isSubmitting ? 'Gerando currículo...' : 'Gerar currículo' }}
            </Button>
          </template>
        </form.Subscribe>
      </CardFooter>
    </Card>
  </form>
</template>
