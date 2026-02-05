import { navigation } from '$lib/server/payload'
import type { Navigation } from '$cms'

export async function load() {
  // Fetch all navigations in parallel
  const [headerNav, footerNav] = await Promise.all([
    navigation.findByLocation('header').catch((err) => {
      console.error('[Layout] Failed to load header nav:', err)
      return null
    }),
    navigation.findByLocation('footer').catch((err) => {
      console.error('[Layout] Failed to load footer nav:', err)
      return null
    })
  ])

  // Log results for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Layout] Navigation loaded:', {
      header: headerNav ? `${headerNav.name} (${headerNav.items?.length ?? 0} items)` : 'not found',
      footer: footerNav ? `${footerNav.name} (${footerNav.items?.length ?? 0} items)` : 'not found'
    })
  }

  return {
    headerNav,
    footerNav
  }
}
