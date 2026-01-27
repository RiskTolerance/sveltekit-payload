import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
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
    {
      name: 'alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'imageFit',
      type: 'select',
      options: [
        { label: 'Contain', value: 'contain' },
        { label: 'Cover', value: 'cover' },
        { label: 'Fill', value: 'fill' },
        { label: 'None', value: 'none' },
        { label: 'Scale Down', value: 'scale-down' },
      ],
      defaultValue: 'cover',
    },
    {
      name: 'maxHeight',
      type: 'select',
      options: [
        { label: '100 View Height', value: '100vh' },
        { label: '50 View Height', value: '50vh' },
        { label: '25 View Height', value: '25vh' },
      ],
    },
  ],
}
