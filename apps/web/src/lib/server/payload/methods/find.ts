import { stringify } from 'qs-esm'

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

export async function find<T>(
  collection: string,
  query?: Record<string, unknown>
): Promise<PayloadResponse<T>> {
  const params = new URLSearchParams()

  // Always populate relationships one level deep
  params.set('depth', '1')

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
  id: string,
  query?: Record<string, unknown>
): Promise<T> => {
  const queryString = query ? stringify(query, { addQueryPrefix: true }) : ''
  const url = `${PAYLOAD_URL}/api/${collection}/${id}${queryString}`
  const res = await fetch(url)

  if (!res.ok) throw new Error(`Payload error: ${res.status}`)

  return res.json()
}