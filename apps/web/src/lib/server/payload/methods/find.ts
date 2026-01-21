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

export const find = async <T>(
  collection: string,
  query?: Record<string, unknown>
): Promise<PayloadResponse<T>> => {
  const queryString = query ? stringify(query, { addQueryPrefix: true }) : ''
  const url = `${PAYLOAD_URL}/api/${collection}${queryString}`
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