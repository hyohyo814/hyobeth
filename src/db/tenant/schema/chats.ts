import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tickets } from "./tickets";

export const chats = sqliteTable("chats", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  ticket_id: integer("ticket_id").notNull(),
  message: text("message").notNull(),
  sender: text("status", {
    enum: ["employee", "customer"],
  }).notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
}, (table) => ({
  status_index: index("status_index").on(table.status),
}),
);

export const chatRelations = relations(chats, ({ one }) => ({
  tickets: one(tickets, {
    fields: [chats.ticket_id],
    references: [tickets.id],
  }),
}));

