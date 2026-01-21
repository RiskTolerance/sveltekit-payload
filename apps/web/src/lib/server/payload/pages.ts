import type { Page } from '$cms'
import { findOne, find } from './methods'

export const pages = {
  find: (query?: Record<string, unknown>) => find<Page>('pages', query),
  findOne: (id: string) => findOne<Page>('pages', id),
  findBySlug: async (slug: string): Promise<Page | null> => {
    const res = await find<Page>('pages', { 'where[slug][equals]': slug })
    return res.docs[0] ?? null
  }
}
