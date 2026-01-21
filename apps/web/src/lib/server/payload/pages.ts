import type { Page } from '$cms'
import { findOne, find } from './methods'

export const pages = {
  find: (query?: Record<string, unknown>) => find<Page>('pages', query),
  findOne: (id: string, query?: Record<string, unknown>) => findOne<Page>('pages', id, query),
  findBySlug: async (slug: string): Promise<Page | null> => {
    const res = await find<Page>('pages', { 
      where: {
        slug: {
          equals: slug
        }
      },
      depth: 1, // Populate relationships (featuredImage, etc.)
      limit: 1
    })
    return res.docs[0] ?? null
  }
}
