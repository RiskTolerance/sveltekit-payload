import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  HeroBlock,
  ContentBlock,
  ImageBlock,
  ImageGalleryBlock,
  CTABlock,
  CarouselBlock,
  RichTextBlock,
} from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
      validate: false, // Don't validate drafts
    },
    maxPerDoc: 100,
  },
  access: {
    read: ({ req: { user } }) => {
      // Public sees only published
      if (!user) return { _status: { equals: 'published' } }
      // Authenticated sees all
      return true
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description for previews and SEO',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, ContentBlock, ImageBlock, ImageGalleryBlock, CTABlock, CarouselBlock, RichTextBlock],
      admin: {
        description: 'Build your page layout using blocks',
      },
    },
  ],
  timestamps: true,
}
