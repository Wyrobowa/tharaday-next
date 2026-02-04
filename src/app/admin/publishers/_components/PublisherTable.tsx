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

import { PublisherRow } from '../types';

type PublisherTableProps = {
  publishers: PublisherRow[];
  isLoading?: boolean;
  onEdit: (publisher: PublisherRow) => void;
  onDelete: (id: number) => void;
};

export function PublisherTable({
  publishers,
  isLoading,
  onEdit,
  onDelete,
}: PublisherTableProps) {
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
          publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>
                <Text weight="bold">
                  {publisher.name || `Publisher ${publisher.id}`}
                </Text>
              </TableCell>
              <TableCell>{publisher.country || '—'}</TableCell>
              <TableCell>
                <Box display="flex" gap={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="neutral"
                    onClick={() => onEdit(publisher)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="danger"
                    onClick={() => onDelete(publisher.id)}
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
