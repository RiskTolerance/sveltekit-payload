import type { Page, Navigation } from '$cms'
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

export const navigation = {
  find: (query?: Record<string, unknown>) => find<Navigation>('navigation', query),
  findOne: (id: string, query?: Record<string, unknown>) => findOne<Navigation>('navigation', id, query),
  
  /**
   * Find navigation by location (header, footer, sidebar, utility)
   */
  findByLocation: async (location: 'header' | 'footer' | 'sidebar' | 'utility'): Promise<Navigation | null> => {
    const res = await find<Navigation>('navigation', {
      where: {
        location: {
          equals: location
        }
      },
      depth: 2, // Populate page relationships for link resolution
      limit: 1
    })
    return res.docs[0] ?? null
  },
  
  /**
   * Find multiple navigations at once (useful for layout loading)
   */
  findByLocations: async (locations: Array<'header' | 'footer' | 'sidebar' | 'utility'>): Promise<Record<string, Navigation | null>> => {
    const res = await find<Navigation>('navigation', {
      where: {
        location: {
          in: locations
        }
      },
      depth: 2,
      limit: locations.length
    })
    
    // Map results by location
    const result: Record<string, Navigation | null> = {}
    locations.forEach(loc => {
      result[loc] = res.docs.find(n => n.location === loc) ?? null
    })
    
    return result
  }
}
