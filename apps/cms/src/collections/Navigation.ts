import type { CollectionConfig, FieldHook } from 'payload'

// Hook to generate descriptive labels for navigation items
const formatNavItemLabel: FieldHook = ({ data }) => {
  if (!data) return 'New Item'
  const label = data.label || 'Untitled'
  const hasChildren = data.children && data.children.length > 0
  return `${label}${hasChildren ? ` (${data.children.length} sub-items)` : ''}`
}

// Hook to prevent duplicate navigation locations
const validateUniqueLocation: FieldHook = async ({ value, originalDoc, req }) => {
  if (!value) return value

  // Skip validation if we're updating the same document
  if (originalDoc?.id) {
    const existing = await req.payload.find({
      collection: 'navigation',
      where: {
        location: { equals: value },
        id: { not_equals: originalDoc.id },
      },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      throw new Error(
        `A navigation for "${value}" location already exists. Each location can only have one navigation.`,
      )
    }
  } else {
    // Creating new document
    const existing = await req.payload.find({
      collection: 'navigation',
      where: { location: { equals: value } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      throw new Error(
        `A navigation for "${value}" location already exists. Each location can only have one navigation.`,
      )
    }
  }

  return value
}

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'updatedAt'],
    group: 'Content',
    description:
      'Create navigation menus for header, footer, and sidebar areas. Each location can only have one navigation.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Settings',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Navigation Name',
              admin: {
                description: 'Internal name for this navigation (e.g., "Main Header Nav")',
              },
            },
            {
              name: 'location',
              type: 'select',
              required: true,
              hooks: {
                beforeValidate: [validateUniqueLocation],
              },
              options: [
                { label: 'Header (Main navigation)', value: 'header' },
                { label: 'Footer (Bottom navigation)', value: 'footer' },
                { label: 'Sidebar (Side navigation)', value: 'sidebar' },
                { label: 'Utility (Top bar, secondary)', value: 'utility' },
              ],
              defaultValue: 'header',
              admin: {
                description:
                  'Where this navigation will appear on the site. Each location can only have one navigation.',
              },
            },
          ],
        },
        {
          label: 'Navigation Items',
          fields: [
            {
              name: 'items',
              type: 'array',
              label: 'Navigation Items',
              admin: {
                description: 'Add top-level navigation items. Drag to reorder.',
                initCollapsed: false,
                components: {
                  // Custom row label disabled - using field hooks for formatting
                },
              },
              labels: {
                singular: 'Nav Item',
                plural: 'Nav Items',
              },
              fields: [
                // Visual indicator in admin
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Link Label',
                  admin: {
                    description: 'The text displayed for this link',
                    width: '50%',
                  },
                },
                // Optional icon (for modern UI support)
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icon',
                  required: false,
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Home', value: 'home' },
                    { label: 'About', value: 'about' },
                    { label: 'Products', value: 'products' },
                    { label: 'Contact', value: 'contact' },
                    { label: 'Phone', value: 'phone' },
                    { label: 'Email', value: 'email' },
                    { label: 'External Link', value: 'external' },
                  ],
                  defaultValue: 'none',
                  admin: {
                    description: 'Optional icon to display with the label',
                    width: '50%',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'linkType',
                      type: 'select',
                      label: 'Link Type',
                      required: true,
                      options: [
                        { label: 'Internal Page', value: 'page' },
                        { label: 'Custom URL', value: 'custom' },
                      ],
                      defaultValue: 'page',
                      admin: {
                        width: '33%',
                      },
                    },
                    {
                      name: 'page',
                      type: 'relationship',
                      relationTo: 'pages',
                      admin: {
                        condition: (data, siblingData) => siblingData?.linkType === 'page',
                        width: '33%',
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: 'URL',
                      admin: {
                        condition: (data, siblingData) => siblingData?.linkType === 'custom',
                        description: 'Enter full URL including https://',
                        width: '33%',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      label: 'Open in New Tab',
                      defaultValue: false,
                      admin: {
                        description: 'Open this link in a new browser tab',
                        width: '50%',
                      },
                    },
                    {
                      name: 'highlight',
                      type: 'checkbox',
                      label: 'Highlight',
                      defaultValue: false,
                      admin: {
                        description: 'Style this link as important/featured',
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  admin: {
                    description: 'Optional description shown in mega menus or dropdowns',
                    rows: 2,
                  },
                },
                // Sub-items array
                {
                  name: 'children',
                  type: 'array',
                  label: 'Sub-menu Items',
                  admin: {
                    description: 'Add dropdown items (optional)',
                    initCollapsed: true,
                  },
                  labels: {
                    singular: 'Sub-item',
                    plural: 'Sub-items',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: 'Link Label',
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icon',
                      required: false,
                      options: [
                        { label: 'None', value: 'none' },
                        { label: 'Home', value: 'home' },
                        { label: 'About', value: 'about' },
                        { label: 'Products', value: 'products' },
                        { label: 'Contact', value: 'contact' },
                        { label: 'Phone', value: 'phone' },
                        { label: 'Email', value: 'email' },
                        { label: 'External Link', value: 'external' },
                      ],
                      defaultValue: 'none',
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'linkType',
                          type: 'select',
                          label: 'Link Type',
                          required: true,
                          options: [
                            { label: '📄 Internal Page', value: 'page' },
                            { label: '🔗 Custom URL', value: 'custom' },
                          ],
                          defaultValue: 'page',
                          admin: {
                            width: '33%',
                          },
                        },
                        {
                          name: 'page',
                          type: 'relationship',
                          relationTo: 'pages',
                          admin: {
                            condition: (data, siblingData) => siblingData?.linkType === 'page',
                            width: '33%',
                          },
                        },
                        {
                          name: 'url',
                          type: 'text',
                          label: 'URL',
                          admin: {
                            condition: (data, siblingData) => siblingData?.linkType === 'custom',
                            description: 'Full URL with https://',
                            width: '33%',
                          },
                        },
                      ],
                    },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      label: 'Open in New Tab',
                      defaultValue: false,
                      admin: {
                        description: 'Open this link in a new browser tab',
                      },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                      admin: {
                        description: 'Optional description for mega menus',
                        rows: 2,
                      },
                    },
                  ],
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
