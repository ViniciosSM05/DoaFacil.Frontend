export const insertZeroBefore = (value: number): string => {
  if (value < 100) {
    return value.toString().padStart(3, '0')
  }

  return value.toString()
}
