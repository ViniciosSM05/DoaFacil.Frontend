import { useHttpService } from '@/services/http/http-service'
import type { ResponseApiT } from '@/types/api/ResponseApi'
import type { AddDoacao } from '../types/AddDoacao'

export const useDoacaoApi = () => {
  const http = useHttpService('doacoes')

  const add = (doacao: AddDoacao) => http.post<ResponseApiT<string>>('', doacao)

  return {
    add
  }
}
