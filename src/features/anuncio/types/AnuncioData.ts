export interface AnuncioData {
  id: string
  imagemNome: string
  imagemBytes: Uint8Array
  imagemTipo: string
  imagemBase64: string
  titulo: string
  nomeCategoria: string
  codigo: number
  anunciante: string
  meta: number
  doado: number
  dataAnuncio: string
  anuncioPessoal: boolean
}
