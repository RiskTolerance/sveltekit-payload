import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttons',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary (Gold)', value: 'primary' },
            { label: 'Secondary (White)', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Burgundy', value: 'burgundy' },
        { label: 'Gold', value: 'gold' },
      ],
      defaultValue: 'dark',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional background image with overlay',
      },
    },
  ],
}
