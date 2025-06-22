import { Request, Response } from "express";
import {
  createBookServices,
  getBooksServices,
  getBookByIdServices,
  updateBookServices,
  deleteBookServices,
} from "./book.service";
import { getAuthorByName, createAuthor } from "../auth/auth.service";

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await getBooksServices();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get books" });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const book = await getBookByIdServices(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get book" });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author name are required" });
  }

  try {
    let authorRecord = await getAuthorByName(author);

    // If author not found, create one with default genreId
    if (!authorRecord) {
      authorRecord = await createAuthor({ authorName: author, genreId: 1 });
    }

    const newBook = await createBookServices({
      title,
      authorId: authorRecord.authorId,
    });

    res.status(201).json({
      message: "✅ Book added successfully",
      book: newBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create book" });
  }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  try {
    let authorRecord = await getAuthorByName(author);

    // If author not found, create one with default genreId
    if (!authorRecord) {
      authorRecord = await createAuthor({ authorName: author, genreId: 1 });
    }

    const updatedBook = await updateBookServices(id, {
      title,
      authorId: authorRecord.authorId,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "✅ Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update book" });
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteBookServices(id);

    if (!deleted) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "🗑️ Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete book" });
  }
};
