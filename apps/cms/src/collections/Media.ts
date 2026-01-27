import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation, previousDoc }) => {
        // Prevent feedback loops when saving focal points
        // The admin UI may poll/refresh, causing multiple requests
        if (operation === 'update' && previousDoc) {
          const focalPointChanged = 
            (doc.focalX !== undefined && doc.focalX !== previousDoc.focalX) ||
            (doc.focalY !== undefined && doc.focalY !== previousDoc.focalY)
          
          if (focalPointChanged) {
            // Log to help debug the issue
            req.payload.logger.info(`Focal point updated for media ${doc.id}`)
            
            // Set context flag to prevent recursive updates
            if (!req.context) req.context = {}
            req.context.focalPointJustUpdated = true
          }
        }
        return doc
      },
    ],
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: 768,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    // NOTE: Known issue with Payload 3.73.0 + S3 storage + focal points
    // When saving focal point changes, Payload admin UI makes multiple GET requests
    // to /api/media/file/... causing a feedback loop. This is a Payload CMS bug.
    // Workaround: The hook above logs when focal point changes to help debug.
    // Consider upgrading Payload or monitoring GitHub issues for a fix.
  },
}
