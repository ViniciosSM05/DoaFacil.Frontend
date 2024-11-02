export interface AnuncioDetalhes {
  id: string
  nomeCategoria: string
  titulo: string
  codigo: number
  imagemBase64: string
  imagemTipo: string
  imagemBytes: Uint8Array
  arrecadado: number
  meta: number
  totalApoiadores: number
  chavePix: string
  dataAnuncio: string
  descricao: string
  anunciante: string
}
