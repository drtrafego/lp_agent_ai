import { pgTable, uuid, text, integer, foreignKey, timestamp, unique, jsonb, numeric } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const columns = pgTable("columns", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: text("title").notNull(),
	order: integer("order").default(0).notNull(),
	organization_id: text("organization_id").notNull(),
	color: text("color"),
});

export const members = pgTable("members", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	user_id: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	organization_id: text("organization_id").notNull(),
	role: text("role").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const invitations = pgTable("invitations", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: text("email").notNull(),
	organization_id: text("organization_id").notNull(),
	role: text("role").default('viewer').notNull(),
	status: text("status").default('pending').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const organizations = pgTable("organizations", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	features: jsonb("features"),
},
(table) => {
	return {
		organizations_slug_unique: unique("organizations_slug_unique").on(table.slug),
	}
});

export const leads = pgTable("leads", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	company: text("company"),
	email: text("email"),
	whatsapp: text("whatsapp"),
	campaign_source: text("campaign_source"),
	status: text("status").notNull(),
	column_id: uuid("column_id").references(() => columns.id),
	position: integer("position").default(0).notNull(),
	organization_id: text("organization_id").notNull(),
	notes: text("notes"),
	value: numeric("value", { precision: 10, scale:  2 }),
	first_contact_at: timestamp("first_contact_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	follow_up_date: timestamp("follow_up_date", { mode: 'string' }),
	follow_up_note: text("follow_up_note"),
	utm_source: text("utm_source"),
	utm_medium: text("utm_medium"),
	utm_campaign: text("utm_campaign"),
	page_path: text("page_path"),
	utm_term: text("utm_term"),
	utm_content: text("utm_content"),
});

export const settings = pgTable("settings", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	organization_id: text("organization_id").notNull(),
	company_name: text("company_name"),
	email: text("email"),
	view_mode: text("view_mode").default('kanban'),
},
(table) => {
	return {
		settings_organization_id_unique: unique("settings_organization_id_unique").on(table.organization_id),
	}
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
},
(table) => {
	return {
		user_email_unique: unique("user_email_unique").on(table.email),
	}
});

export const lead_history = pgTable("lead_history", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	lead_id: uuid("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" } ),
	action: text("action").notNull(),
	from_column: text("from_column"),
	to_column: text("to_column"),
	user_id: text("user_id"),
	details: text("details"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const launch_leads = pgTable("launch_leads", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	organization_id: text("organization_id").notNull(),
	form_name: text("form_name").notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	whatsapp: text("whatsapp"),
	form_data: jsonb("form_data"),
	utm_source: text("utm_source"),
	utm_medium: text("utm_medium"),
	utm_campaign: text("utm_campaign"),
	lead_id: uuid("lead_id").references(() => leads.id, { onDelete: "set null" } ),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	utm_term: text("utm_term"),
	utm_content: text("utm_content"),
});