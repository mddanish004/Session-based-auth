import { uuid, integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: text('password_hash').notNull(),
  salt: text('salt').notNull(),  
});

export const sessions = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade"}),
    sessionToken: varchar("session_token", {length: 255}).notNull().unique(),
});