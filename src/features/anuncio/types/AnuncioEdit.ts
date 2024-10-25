export interface AnuncioEdit {
  id: string
  meta: number
  titulo: string
  descricao: string
  categoriaId: string
  chavePix: string
  imagem: ImagemAnuncioEdit
}

export interface ImagemAnuncioEdit {
  nome: string
  bytes: Uint8Array
  base64: string
  tipo: string
  principal: boolean
}
