import { test, expect } from "@playwright/test";
import BookModel from "../models/Book.model";

test.beforeEach(async ({ request }) => {});

test.describe("GET request tests", () => {
  test("Get all books from database", async ({ request }) => {
    const response = await request.get("http://localhost:4000/books");
    expect(response.status()).toBe(200);
  });

  test("Verify books are in an array and is not empty", async ({ request }) => {
    const response = await request.get("http://localhost:4000/books");
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    console.log(data);
  });

  test("Verify database properties", async ({ request }) => {
    const response = await request.get("http://localhost:4000/books");
    const books = await response.json();

    interface Books {
      bookName: string;
      countInStock: number;
      dateCreated: string;
      image: string;
      _id: string;
      id: string;
      __v: number
    };

    books.forEach((book: Books) => {
      expect(book).toHaveProperty("bookName");
      expect(book).toHaveProperty("countInStock");
      expect(book).toHaveProperty("dateCreated");
      expect(book).toHaveProperty("image");
      expect(book).toHaveProperty("_id");
      expect(book).toHaveProperty("_id");
      expect(book).toHaveProperty("__v");
    });
    console.log(books);
  });
});
