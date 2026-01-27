import { stringify } from 'qs-esm'

// Use process.env for server-side runtime access
const PAYLOAD_URL = process.env.PAYLOAD_URL ?? 'http://localhost:3000'

// Debug: Log the PAYLOAD_URL being used
console.log('[Payload] PAYLOAD_URL:', PAYLOAD_URL)

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
  
  try {
    const res = await fetch(url)

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error')
      throw new Error(`Payload error: ${res.status} ${res.statusText} - ${errorText}`)
    }

    return res.json()
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error)
    throw error
  }
}

export const findOne = async<T>(
  collection: string,
  id: string,
  query?: Record<string, unknown>
): Promise<T> => {
  const queryString = query ? stringify(query, { addQueryPrefix: true }) : ''
  const url = `${PAYLOAD_URL}/api/${collection}/${id}${queryString}`
  
  try {
    const res = await fetch(url)

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error')
      throw new Error(`Payload error: ${res.status} ${res.statusText} - ${errorText}`)
    }

    return res.json()
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error)
    throw error
  }
}