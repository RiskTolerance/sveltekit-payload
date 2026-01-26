import { pages } from "$lib/server/payload/pages"
import { error } from '@sveltejs/kit'

export async function load() {
  try {
    const home = await pages.findBySlug('__home__')
    return { page: home }
  } catch (err) {
    console.error('[Page Load Error]', err)
    // Return null page instead of throwing to see the error
    return { page: null, error: err instanceof Error ? err.message : String(err) }
  }
}