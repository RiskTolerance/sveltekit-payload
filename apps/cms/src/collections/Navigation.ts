import type { CollectionConfig } from 'payload'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Navigation Name',
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Header', value: 'header' },
        { label: 'Footer', value: 'footer' },
        { label: 'Sidebar', value: 'sidebar' },
      ],
      defaultValue: 'header',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Page', value: 'page' },
                { label: 'Custom URL', value: 'custom' },
              ],
              defaultValue: 'page',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (data) => data?.link?.type === 'page',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'Custom URL',
              admin: {
                condition: (data) => data?.link?.type === 'custom',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in New Tab',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'children',
          type: 'array',
          label: 'Sub-items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Page', value: 'page' },
                    { label: 'Custom URL', value: 'custom' },
                  ],
                  defaultValue: 'page',
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    condition: (data) => data?.link?.type === 'page',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.link?.type === 'custom',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
