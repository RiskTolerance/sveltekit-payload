import { pages } from "$lib/server/payload/pages"
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const page = await pages.findBySlug(params.slug)
    
    if (!page) {
      throw error(404, {
        message: 'Page not found'
      })
    }
    
    return { page }
  } catch (err) {
    console.error('[Page Load Error]', err)
    throw error(404, {
      message: 'Page not found'
    })
  }
}
