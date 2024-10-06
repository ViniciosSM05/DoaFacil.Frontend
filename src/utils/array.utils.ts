export function distinctBy<T>(array: T[], keySelector: (item: T) => any): T[] {
  const seen = new Set()
  return array.filter((item) => {
    const key = keySelector(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}
