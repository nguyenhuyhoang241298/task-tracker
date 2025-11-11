import { mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  salt: text('salt').notNull()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
