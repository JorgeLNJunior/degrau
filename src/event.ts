import mitt from 'mitt'

export enum events {
  PRINT = 'print_pdf',
}

export const emitter = mitt()
