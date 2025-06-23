import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TUserInsert,
  TUserSelect,
  userTable,
  authorTable,
  TAuthorInsert,
  TAuthorSelect
} from "../drizzle/schema";

// Register a new user
export const createUserServices = async (user: TUserInsert): Promise<TUserSelect> => {
  const [newUser] = await db.insert(userTable).values(user).returning();
  return newUser; // return the created user
};

// Get user by email
export const getUserByEmailIdServices = async (email: string): Promise<TUserSelect | undefined> => {
  return await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });
};

// -------------------------------
// Author Services
// -------------------------------

// Get author by name
export const getAuthorByName = async (authorName: string): Promise<TAuthorSelect | undefined> => {
  return await db.query.authorTable.findFirst({
    where: eq(authorTable.authorName, authorName),
  });
};

// Create a new author
export const createAuthor = async (author: TAuthorInsert): Promise<TAuthorSelect> => {
  const inserted = await db.insert(authorTable).values(author).returning();
  return inserted[0]; // return created author
};
