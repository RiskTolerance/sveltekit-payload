import { pages } from "$lib/server/payload/pages"

export async function load() {
  const home = await pages.findBySlug('__home__')

  return { page: home }
}