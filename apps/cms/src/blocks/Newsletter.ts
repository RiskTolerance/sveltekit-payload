import type { Block } from 'payload'

export const NewsletterBlock: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
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
      defaultValue: 'Subscribe to Our Newsletter',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Sign up with your email address to receive news and updates.',
    },
    {
      name: 'placeholder',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Subscribe',
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thank you for subscribing!',
    },
    {
      name: 'privacyText',
      type: 'text',
      defaultValue: 'We respect your privacy.',
    },
  ],
}
