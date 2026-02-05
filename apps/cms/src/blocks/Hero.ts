import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Small text above heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'highlightText',
      type: 'text',
      admin: {
        description: 'Text to highlight in gold color (must match part of heading)',
      },
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image shown beside text (creates two-column layout)',
      },
    },
    {
      name: 'sideImageCaption',
      type: 'text',
      admin: {
        condition: (_, siblingData) => !!siblingData.sideImage,
      },
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}
