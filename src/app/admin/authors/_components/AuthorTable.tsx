'use client';

import {
  Box,
  Button,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from 'tharaday';

import { AuthorRow } from '../types';

type AuthorTableProps = {
  authors: AuthorRow[];
  isLoading?: boolean;
  onEdit: (author: AuthorRow) => void;
  onDelete: (id: number) => void;
};

export function AuthorTable({
  authors,
  isLoading,
  onEdit,
  onDelete,
}: AuthorTableProps) {
  return (
    <Table hoverable striped isLoading={isLoading}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Box padding={12}>
                <Loader size="lg" />
              </Box>
            </TableCell>
          </TableRow>
        ) : (
          authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>
                <Text weight="bold">
                  {[author.first_name, author.last_name]
                    .filter(Boolean)
                    .join(' ') || `Author ${author.id}`}
                </Text>
              </TableCell>
              <TableCell>{author.country || '—'}</TableCell>
              <TableCell>
                <Box display="flex" gap={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="neutral"
                    onClick={() => onEdit(author)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="danger"
                    onClick={() => onDelete(author.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
