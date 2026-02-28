<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-full">
    <div class="container mx-auto py-10 px-4 max-w-3xl">
      <h1 class="text-3xl font-bold mb-2">Dicas para um Currículo Vencedor</h1>
      <p class="text-muted-foreground text-lg mb-8">
        Descubra como destacar suas experiências e conquistar a vaga dos seus sonhos.
      </p>

      <Accordion type="single" collapsible class="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Seja Objetivo</AccordionTrigger>
          <AccordionContent>
            Recrutadores gastam poucos segundos em cada currículo. Vá direto ao ponto, destacando
            suas conquistas mais relevantes e evitando informações desnecessárias.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Use Palavras-chave</AccordionTrigger>
          <AccordionContent>
            Adapte seu currículo para cada vaga usando os termos exatos encontrados na descrição do
            trabalho. Isso ajuda tanto na leitura humana quanto na filtragem por sistemas
            automáticos.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Revise Sempre</AccordionTrigger>
          <AccordionContent>
            Erros de português podem eliminar um candidato qualificado. Revise com atenção e, se
            possível, peça para outra pessoa ler antes de enviar.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>O que é um ATS?</AccordionTrigger>
          <AccordionContent>
            Um <strong class="text-foreground">Applicant Tracking System (ATS)</strong> é um
            software utilizado por empresas de todos os tamanhos para gerenciar o processo de
            recrutamento. Ele atua como um filtro inicial, analisando currículos em busca de
            palavras-chave, experiência e qualificações específicas antes que um recrutador humano
            os leia.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Como otimizar seu currículo para ATS?</AccordionTrigger>
          <AccordionContent>
            <ul class="list-disc pl-6 space-y-2">
              <li>
                <strong class="text-foreground">Use palavras-chave da vaga:</strong> Analise a
                descrição do trabalho e inclua termos exatos (habilidades, ferramentas, cargos) no
                seu currículo.
              </li>
              <li>
                <strong class="text-foreground">Evite formatação complexa:</strong> O ATS pode ter
                dificuldade em ler tabelas, colunas múltiplas, caixas de texto, gráficos e ícones.
                Mantenha o layout limpo e simples.
              </li>
              <li>
                <strong class="text-foreground">Use cabeçalhos padrão:</strong> Utilize títulos
                claros e comuns como "Experiência Profissional", "Educação" e "Habilidades" em vez
                de termos criativos.
              </li>
              <li>
                <strong class="text-foreground">Fontes legíveis:</strong> Opte por fontes padrão
                como Arial, Calibri, Helvetica ou Roboto.
              </li>
              <li>
                <strong class="text-foreground">Salve no formato correto:</strong> PDF e DOCX são os
                formatos mais seguros. Evite enviar currículos como imagem (JPG, PNG).
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </ScrollArea>
</template>
