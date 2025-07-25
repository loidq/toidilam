export function deepCleanObject<T>(data: T): T {
  if (data instanceof Date) {
    return data
  }
  if (Array.isArray(data)) {
    return data
      .map(item => deepCleanObject(item))
      .filter(item => item !== null && item !== undefined) as unknown as T
  }

  if (typeof data === 'object' && data !== null) {
    const result: any = {}
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'createdAt' || key === 'updatedAt') return
      if (value === null || value === undefined) return
      const cleaned = deepCleanObject(value)
      if (Array.isArray(cleaned) && cleaned.length === 0) return
      if (cleaned !== null && cleaned !== undefined) {
        result[key] = cleaned
      }
    })
    return result
  }

  return data
}
