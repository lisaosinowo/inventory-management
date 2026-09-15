import { test, expect } from '@playwright/test';

test('GET books', async ({ request }) => {
  const books = await request.get("http://localhost:4000/books");
  expect(books.ok()).toBeTruthy();
});