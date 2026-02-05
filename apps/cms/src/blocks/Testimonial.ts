import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorTitle',
      type: 'text',
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Dark', value: 'dark' },
        { label: 'Image with Overlay', value: 'image' },
      ],
      defaultValue: 'gold',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.backgroundStyle === 'image',
      },
    },
  ],
}
