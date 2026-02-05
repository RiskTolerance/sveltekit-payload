import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Navigation } from './collections/Navigation'

import { s3Storage } from '@payloadcms/storage-s3';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Pages, Navigation],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
        push: true,
    }),
    sharp,
    plugins: [
        // Temporarily disabled due to bug with focal point saves causing feedback loops
        // See: https://github.com/payloadcms/payload/issues (S3 storage + focal points)
        // s3Storage({
        //     collections: {
        //         media: true,
        //     },
        //     bucket: process.env.R2_BUCKET || '',
        //     config: {
        //         credentials: {
        //             accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        //             secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        //         },
        //         region: process.env.R2_REGION || 'auto',
        //         endpoint: process.env.R2_ENDPOINT || '',
        //     },
        // }),
    ],
})
