import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

export const student = sqliteTable('student', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text('title').notNull(),
	marks: integer("marks").notNull(),
	email: text('email').notNull()

});

export type SelectStudent = InferSelectModel<typeof student>;
export type CreateStudent = InferInsertModel<typeof student>;

