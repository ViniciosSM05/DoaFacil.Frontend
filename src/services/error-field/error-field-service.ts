import type { ValidationControlFailure } from '@/types/api/ValidationControlFailure'

export const useErrorFiedService = (getErrors: () => ValidationControlFailure[]) => {
  const hasError = (propertyName: string) =>
    getErrors().some((x) => x.propertyName === propertyName)

  const getErrorMessages = (propertyName: string) =>
    getErrors()
      .filter((x) => x.propertyName.toLowerCase() === propertyName.toLowerCase())
      .map((x) => x.errorMessage)

  return { hasError, getErrorMessages }
}
