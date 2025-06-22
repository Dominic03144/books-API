import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "./book.controller";

const router = Router();

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
