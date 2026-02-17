<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { vMaska } from 'maska/vue'
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
import { Textarea } from '@/components/ui/textarea'
import type { Profile } from '@/types/resume.types'

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),
  phone: z.string().length(15, 'Telefone deve ter 11 dígitos'), // 15 taking into account the mask
  email: z.string().email('Endereço de e-mail inválido'),
  linkedin: z.string().url('Endereço do LinkedIn inválido').optional().or(z.literal('')),
  portfolio: z.string().url('URL inválida').optional().or(z.literal('')),
  summary: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
})

const form = useForm({
  defaultValues: <Profile>{
    email: '',
    location: '',
    name: '',
    phone: '',
    summary: '',
    linkedin: '',
    portfolio: '',
  },
  validators: {
    onChange: profileSchema,
  },
  onSubmit: async ({ value }) => {
    const result = profileSchema.safeParse(value)
    if (result.success) {
      toast.success('Profile updated successfully!')
    } else {
      toast.error('Please check the form for errors')
    }
  },
})
</script>

<template>
  <form @submit.prevent="form.handleSubmit">
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Preencha suas informações pessoais para o currículo.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form.Field name="name">
          <template #default="{ field }">
            <Field :data-invalid="!field.state.meta.isValid">
              <FieldLabel :for="field.name">Nome completo</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                placeholder="Marcos Silva"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <FieldError v-if="!field.state.meta.isValid" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="email">
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

          <form.Field name="phone">
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

        <form.Field name="location">
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
          <form.Field name="linkedin">
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

          <form.Field name="portfolio">
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

        <form.Field name="summary">
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
