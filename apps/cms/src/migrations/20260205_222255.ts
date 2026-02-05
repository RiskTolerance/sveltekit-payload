import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_background_style" AS ENUM('gold', 'dark', 'image');
  CREATE TYPE "public"."enum_pages_blocks_stats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_image_text_split_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_background_style" AS ENUM('gold', 'dark', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_split_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_navigation_items_children_icon" AS ENUM('none', 'home', 'about', 'products', 'contact', 'phone', 'email', 'external');
  CREATE TYPE "public"."enum_navigation_items_icon" AS ENUM('none', 'home', 'about', 'products', 'contact', 'phone', 'email', 'external');
  ALTER TYPE "public"."enum_navigation_location" ADD VALUE 'utility';
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Subscribe to Our Newsletter',
  	"description" varchar DEFAULT 'Sign up with your email address to receive news and updates.',
  	"placeholder" varchar DEFAULT 'Enter your email',
  	"button_text" varchar DEFAULT 'Subscribe',
  	"success_message" varchar DEFAULT 'Thank you for subscribing!',
  	"privacy_text" varchar DEFAULT 'We respect your privacy.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"author_image_id" integer,
  	"background_style" "enum_pages_blocks_testimonial_background_style" DEFAULT 'gold',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"columns" "enum_pages_blocks_stats_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_caption" varchar,
  	"image_position" "enum_pages_blocks_image_text_split_image_position" DEFAULT 'right',
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Contact Us',
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar,
  	"map_embed" varchar,
  	"additional_content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Subscribe to Our Newsletter',
  	"description" varchar DEFAULT 'Sign up with your email address to receive news and updates.',
  	"placeholder" varchar DEFAULT 'Enter your email',
  	"button_text" varchar DEFAULT 'Subscribe',
  	"success_message" varchar DEFAULT 'Thank you for subscribing!',
  	"privacy_text" varchar DEFAULT 'We respect your privacy.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"author_image_id" integer,
  	"background_style" "enum__pages_v_blocks_testimonial_background_style" DEFAULT 'gold',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"columns" "enum__pages_v_blocks_stats_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_caption" varchar,
  	"image_position" "enum__pages_v_blocks_image_text_split_image_position" DEFAULT 'right',
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Contact Us',
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar,
  	"map_embed" varchar,
  	"additional_content" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "navigation_items_children" DROP CONSTRAINT "navigation_items_children_link_page_id_pages_id_fk";
  
  ALTER TABLE "navigation_items" DROP CONSTRAINT "navigation_items_link_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_background_color";
  CREATE TYPE "public"."enum_pages_blocks_cta_background_color" AS ENUM('dark', 'burgundy', 'gold');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'dark'::"public"."enum_pages_blocks_cta_background_color";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum_pages_blocks_cta_background_color" USING "background_color"::"public"."enum_pages_blocks_cta_background_color";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_background_color";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background_color" AS ENUM('dark', 'burgundy', 'gold');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'dark'::"public"."enum__pages_v_blocks_cta_background_color";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum__pages_v_blocks_cta_background_color" USING "background_color"::"public"."enum__pages_v_blocks_cta_background_color";
  DROP INDEX "navigation_items_children_link_link_page_idx";
  DROP INDEX "navigation_items_link_link_page_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "highlight_text" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "side_image_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "side_image_caption" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "highlight_text" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "side_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "side_image_caption" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "navigation_items_children" ADD COLUMN "icon" "enum_navigation_items_children_icon" DEFAULT 'none';
  ALTER TABLE "navigation_items_children" ADD COLUMN "page_id" integer;
  ALTER TABLE "navigation_items_children" ADD COLUMN "url" varchar;
  ALTER TABLE "navigation_items_children" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "navigation_items_children" ADD COLUMN "description" varchar;
  ALTER TABLE "navigation_items" ADD COLUMN "icon" "enum_navigation_items_icon" DEFAULT 'none';
  ALTER TABLE "navigation_items" ADD COLUMN "page_id" integer;
  ALTER TABLE "navigation_items" ADD COLUMN "url" varchar;
  ALTER TABLE "navigation_items" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "navigation_items" ADD COLUMN "highlight" boolean DEFAULT false;
  ALTER TABLE "navigation_items" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_split" ADD CONSTRAINT "pages_blocks_image_text_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_split" ADD CONSTRAINT "pages_blocks_image_text_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_split" ADD CONSTRAINT "_pages_v_blocks_image_text_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_split" ADD CONSTRAINT "_pages_v_blocks_image_text_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_features_order_idx" ON "pages_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_parent_id_idx" ON "pages_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_features_image_idx" ON "pages_blocks_feature_grid_features" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_author_image_idx" ON "pages_blocks_testimonial" USING btree ("author_image_id");
  CREATE INDEX "pages_blocks_testimonial_background_image_idx" ON "pages_blocks_testimonial" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_split_order_idx" ON "pages_blocks_image_text_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_split_parent_id_idx" ON "pages_blocks_image_text_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_split_path_idx" ON "pages_blocks_image_text_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_split_image_idx" ON "pages_blocks_image_text_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_order_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_parent_id_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_image_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_order_idx" ON "_pages_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_parent_id_idx" ON "_pages_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_path_idx" ON "_pages_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_author_image_idx" ON "_pages_v_blocks_testimonial" USING btree ("author_image_id");
  CREATE INDEX "_pages_v_blocks_testimonial_background_image_idx" ON "_pages_v_blocks_testimonial" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_split_order_idx" ON "_pages_v_blocks_image_text_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_split_parent_id_idx" ON "_pages_v_blocks_image_text_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_split_path_idx" ON "_pages_v_blocks_image_text_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_split_image_idx" ON "_pages_v_blocks_image_text_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_side_image_id_media_id_fk" FOREIGN KEY ("side_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_side_image_id_media_id_fk" FOREIGN KEY ("side_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_items_children" ADD CONSTRAINT "navigation_items_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_side_image_idx" ON "pages_blocks_hero" USING btree ("side_image_id");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_hero_side_image_idx" ON "_pages_v_blocks_hero" USING btree ("side_image_id");
  CREATE INDEX "_pages_v_blocks_cta_background_image_idx" ON "_pages_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "navigation_items_children_page_idx" ON "navigation_items_children" USING btree ("page_id");
  CREATE INDEX "navigation_items_page_idx" ON "navigation_items" USING btree ("page_id");
  ALTER TABLE "navigation_items_children" DROP COLUMN "link_page_id";
  ALTER TABLE "navigation_items_children" DROP COLUMN "link_url";
  ALTER TABLE "navigation_items" DROP COLUMN "link_page_id";
  ALTER TABLE "navigation_items" DROP COLUMN "link_url";
  ALTER TABLE "navigation_items" DROP COLUMN "link_new_tab";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text_split" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_split" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_info" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_features" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_testimonial" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_image_text_split" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_features" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_split" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_side_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_cta" DROP CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_side_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta" DROP CONSTRAINT "_pages_v_blocks_cta_background_image_id_media_id_fk";
  
  ALTER TABLE "navigation_items_children" DROP CONSTRAINT "navigation_items_children_page_id_pages_id_fk";
  
  ALTER TABLE "navigation_items" DROP CONSTRAINT "navigation_items_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_background_color";
  CREATE TYPE "public"."enum_pages_blocks_cta_background_color" AS ENUM('default', 'light', 'dark');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'default'::"public"."enum_pages_blocks_cta_background_color";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum_pages_blocks_cta_background_color" USING "background_color"::"public"."enum_pages_blocks_cta_background_color";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_background_color";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background_color" AS ENUM('default', 'light', 'dark');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_cta_background_color";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum__pages_v_blocks_cta_background_color" USING "background_color"::"public"."enum__pages_v_blocks_cta_background_color";
  ALTER TABLE "navigation" ALTER COLUMN "location" SET DATA TYPE text;
  ALTER TABLE "navigation" ALTER COLUMN "location" SET DEFAULT 'header'::text;
  DROP TYPE "public"."enum_navigation_location";
  CREATE TYPE "public"."enum_navigation_location" AS ENUM('header', 'footer', 'sidebar');
  ALTER TABLE "navigation" ALTER COLUMN "location" SET DEFAULT 'header'::"public"."enum_navigation_location";
  ALTER TABLE "navigation" ALTER COLUMN "location" SET DATA TYPE "public"."enum_navigation_location" USING "location"::"public"."enum_navigation_location";
  DROP INDEX "pages_blocks_hero_side_image_idx";
  DROP INDEX "pages_blocks_cta_background_image_idx";
  DROP INDEX "_pages_v_blocks_hero_side_image_idx";
  DROP INDEX "_pages_v_blocks_cta_background_image_idx";
  DROP INDEX "navigation_items_children_page_idx";
  DROP INDEX "navigation_items_page_idx";
  ALTER TABLE "navigation_items_children" ADD COLUMN "link_page_id" integer;
  ALTER TABLE "navigation_items_children" ADD COLUMN "link_url" varchar;
  ALTER TABLE "navigation_items" ADD COLUMN "link_page_id" integer;
  ALTER TABLE "navigation_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "navigation_items" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "navigation_items_children" ADD CONSTRAINT "navigation_items_children_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "navigation_items_children_link_link_page_idx" ON "navigation_items_children" USING btree ("link_page_id");
  CREATE INDEX "navigation_items_link_link_page_idx" ON "navigation_items" USING btree ("link_page_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "highlight_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "side_image_id";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "side_image_caption";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "background_image_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "highlight_text";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "side_image_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "side_image_caption";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "background_image_id";
  ALTER TABLE "navigation_items_children" DROP COLUMN "icon";
  ALTER TABLE "navigation_items_children" DROP COLUMN "page_id";
  ALTER TABLE "navigation_items_children" DROP COLUMN "url";
  ALTER TABLE "navigation_items_children" DROP COLUMN "open_in_new_tab";
  ALTER TABLE "navigation_items_children" DROP COLUMN "description";
  ALTER TABLE "navigation_items" DROP COLUMN "icon";
  ALTER TABLE "navigation_items" DROP COLUMN "page_id";
  ALTER TABLE "navigation_items" DROP COLUMN "url";
  ALTER TABLE "navigation_items" DROP COLUMN "open_in_new_tab";
  ALTER TABLE "navigation_items" DROP COLUMN "highlight";
  ALTER TABLE "navigation_items" DROP COLUMN "description";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_testimonial_background_style";
  DROP TYPE "public"."enum_pages_blocks_stats_columns";
  DROP TYPE "public"."enum_pages_blocks_image_text_split_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_stats_columns";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_split_image_position";
  DROP TYPE "public"."enum_navigation_items_children_icon";
  DROP TYPE "public"."enum_navigation_items_icon";`)
}
