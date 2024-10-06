import type { ValidationControlFailure } from './ValidationControlFailure'

export interface ResponseApi {
  fieldMessages: ValidationControlFailure[]
  fieldMessagesDictionary: Record<string, string[]>
  messagesWithoutField: ValidationControlFailure[]
  success: boolean
  messages: string[]
}
export interface ResponseApiT<TData> extends ResponseApi {
  data: TData
}
