import { useHttpService } from '@/services/http/http-service'
import type { ResponseApiT } from '@/types/api/ResponseApi'
import type { AnuncioToSave } from '../types/AnuncioFormState'
import type { AnuncioFiltro } from '../types/AnuncioFiltro'
import type { AnuncioData } from '../types/AnuncioData'
import type { AnuncioEdit } from '../types/AnuncioEdit'
import type { AnuncioDetalhes } from '../types/AnuncioDetalhes'

export const useAnuncioApi = () => {
  const http = useHttpService('anuncios')

  const add = (anuncio: AnuncioToSave) => http.post<ResponseApiT<string>>('', anuncio)

  const get = (filtro: AnuncioFiltro) => http.get<ResponseApiT<AnuncioData[]>>('', { filtro })

  const getEdit = (id: string) => http.get<ResponseApiT<AnuncioEdit>>(id)

  const getDetalhes = (id: string) => http.get<ResponseApiT<AnuncioDetalhes>>(`detalhes/${id}`)

  return {
    add,
    get,
    getEdit,
    getDetalhes
  }
}
