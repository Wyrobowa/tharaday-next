'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from 'tharaday';

import { apiGet } from '@/lib/api';

import { TagRow } from './types';

export default function TagsPage() {
  const [tags, setTags] = useState<TagRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGet<TagRow[]>('/api/tags')
      .then((data) => setTags(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box paddingY={8}>
      <Box display="flex" alignItems="center" gap={4} paddingBottom={8}>
        <Text variant="h1" weight="bold">
          Tags
        </Text>
        <Text variant="body-sm" color="subtle">
          Read-only list of active tags.
        </Text>
      </Box>

      <Table hoverable striped isLoading={isLoading}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Box padding={12}>
                  <Loader size="lg" />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>
                  <Text weight="bold">{tag.name}</Text>
                </TableCell>
                <TableCell>{tag.is_active ? 'Active' : 'Inactive'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
