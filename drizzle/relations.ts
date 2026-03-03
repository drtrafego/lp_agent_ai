import { relations } from "drizzle-orm/relations";
import { user, members, columns, leads, lead_history, launch_leads } from "./schema";

export const membersRelations = relations(members, ({one}) => ({
	user: one(user, {
		fields: [members.user_id],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	members: many(members),
}));

export const leadsRelations = relations(leads, ({one, many}) => ({
	column: one(columns, {
		fields: [leads.column_id],
		references: [columns.id]
	}),
	lead_histories: many(lead_history),
	launch_leads: many(launch_leads),
}));

export const columnsRelations = relations(columns, ({many}) => ({
	leads: many(leads),
}));

export const lead_historyRelations = relations(lead_history, ({one}) => ({
	lead: one(leads, {
		fields: [lead_history.lead_id],
		references: [leads.id]
	}),
}));

export const launch_leadsRelations = relations(launch_leads, ({one}) => ({
	lead: one(leads, {
		fields: [launch_leads.lead_id],
		references: [leads.id]
	}),
}));