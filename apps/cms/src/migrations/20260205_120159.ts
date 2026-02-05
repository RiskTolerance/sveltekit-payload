import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_max_height" AS ENUM('100vh', '50vh', '25vh');
  CREATE TYPE "public"."enum__pages_v_blocks_image_max_height" AS ENUM('100vh', '50vh', '25vh');
  ALTER TABLE "pages_blocks_image" ADD COLUMN "max_height" "enum_pages_blocks_image_max_height";
  ALTER TABLE "_pages_v_blocks_image" ADD COLUMN "max_height" "enum__pages_v_blocks_image_max_height";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_image" DROP COLUMN "max_height";
  ALTER TABLE "_pages_v_blocks_image" DROP COLUMN "max_height";
  DROP TYPE "public"."enum_pages_blocks_image_max_height";
  DROP TYPE "public"."enum__pages_v_blocks_image_max_height";`)
}
