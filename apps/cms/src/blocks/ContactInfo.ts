import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
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
      defaultValue: 'Contact Us',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'hours',
      type: 'textarea',
      admin: {
        description: 'Business hours (supports line breaks)',
      },
    },
    {
      name: 'mapEmbed',
      type: 'text',
      admin: {
        description: 'Google Maps embed URL',
      },
    },
    {
      name: 'additionalContent',
      type: 'textarea',
      admin: {
        description: 'Additional text or info',
      },
    },
  ],
}
