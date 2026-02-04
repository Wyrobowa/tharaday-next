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

import { RoleRow } from './types';

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGet<RoleRow[]>('/api/roles')
      .then((data) => setRoles(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box paddingY={8}>
      <Box display="flex" alignItems="center" gap={4} paddingBottom={8}>
        <Text variant="h1" weight="bold">
          Roles
        </Text>
        <Text variant="body-sm" color="subtle">
          Read-only list of active roles.
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
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <Text weight="bold">{role.name}</Text>
                </TableCell>
                <TableCell>{role.is_active ? 'Active' : 'Inactive'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
