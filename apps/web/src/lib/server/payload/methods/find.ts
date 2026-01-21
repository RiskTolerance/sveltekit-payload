const PAYLOAD_URL = import.meta.env.PAYLOAD_URL ?? 'http://localhost:3000'

type PayloadResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const find = async <T>(
  collection: string,
  query?: Record<string, unknown>
): Promise<PayloadResponse<T>> => {
  const params = new URLSearchParams()

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      params.set(key, String(value))
    }
  }

  const url = `${PAYLOAD_URL}/api/${collection}?${params}`
  const res = await fetch(url)

  if (!res.ok) throw new Error(`Payload error: ${res.status}`)

  return res.json()
}

export const findOne = async<T>(
  collection: string,
  id: string
): Promise<T> => {
  const res = await fetch(`${PAYLOAD_URL}/api/${collection}/${id}`)

  if (!res.ok) throw new Error(`Payload error: ${res.status}`)

  return res.json()
}