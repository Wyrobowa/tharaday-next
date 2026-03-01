import { BookRecord } from './types';

export function getAuthorName(book: BookRecord) {
  const name = [book.author_first_name, book.author_last_name]
    .filter(Boolean)
    .join(' ');

  return name || 'Unknown author';
}
