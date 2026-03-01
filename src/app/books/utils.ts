import { BookRecord } from './types';

export function getAuthorName(book: BookRecord) {
  const name = [book.author_first_name, book.author_last_name]
    .filter(Boolean)
    .join(' ');

  return name || 'Unknown author';
}

export function getBookTitle(book: BookRecord) {
  const normalizedTitle = book.title?.trim();
  if (normalizedTitle) {
    return normalizedTitle;
  }

  const legacyName = book.name?.trim();
  if (legacyName) {
    return legacyName;
  }

  return 'Untitled';
}
