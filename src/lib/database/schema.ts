import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

export const student = sqliteTable('student', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	rollNumber: integer('rollnumber').notNull(),
	name: text('title').notNull(),
	marks: integer("marks").notNull(),
	email: text('email').notNull(),
	subjects: text("subjects").notNull(),
	// MachineLearning: text("ml"),
	// CyberSecurity: text("cs"),
	// SoftwareEngineering: text("se"),
	// DataMining: text("dm"),
	// DataCommunication: text("dc"),



});
export const login = sqliteTable('login', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	username: text('username').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull()
});

export type SelectStudent = InferSelectModel<typeof student>;
export type CreateStudent = InferInsertModel<typeof student>;

export type SelectLogin = InferSelectModel<typeof login>;
export type CreateLogin = InferInsertModel<typeof login>;

