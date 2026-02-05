import { pages } from "$lib/server/payload"
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const page = await pages.findBySlug(params.slug)
    
    if (!page) {
      throw error(404, 'Page not found')
    }
    
    return { page }
  } catch (err) {
    console.error(`[Page Load Error] Slug: ${params.slug}`, err)
    throw error(404, 'Page not found')
  }
}
