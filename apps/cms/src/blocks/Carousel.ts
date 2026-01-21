import type { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically advance slides',
      },
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      defaultValue: 3000,
      admin: {
        description: 'Delay between slides in milliseconds',
        condition: (_, siblingData) => siblingData.autoplay === true,
      },
    },
  ],
}
