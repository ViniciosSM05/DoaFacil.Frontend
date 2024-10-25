export function base64ToFile(base64: string, fileName: string, type: string): File {
  const base64Data = base64.split(',')[1]
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
    .fill(null)
    .map((_, i) => byteCharacters.charCodeAt(i))
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type })
  return new File([blob], fileName, { type })
}

export const convertToBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result?.toString() ?? null)
    reader.onerror = (error) => {
      console.error('Erro ao ler o arquivo:', error)
      reject(error)
    }
  })
}
