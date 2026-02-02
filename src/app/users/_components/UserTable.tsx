'use client';

import {
  Box,
  Loader,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Text,
  Button,
} from 'tharaday';

import { getStatusBadgeIntent } from '@/helpers/status';
import { capitalizeFirstLetter } from '@/helpers/text';

import { UserRow } from '../types';

interface UserTableProps {
  users: UserRow[];
  isLoading?: boolean;
  onEdit: (user: UserRow) => void;
  onDelete: (id: number) => void;
}

export function UserTable({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <Table hoverable striped isLoading={isLoading}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} align="center">
              <Box padding={12}>
                <Loader size="lg" />
              </Box>
            </TableCell>
          </TableRow>
        ) : (
          <>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Text weight="bold">{user.name}</Text>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{capitalizeFirstLetter(user.role || '')}</TableCell>
                <TableCell>
                  <Badge
                    intent={getStatusBadgeIntent(user.status)}
                    variant="subtle"
                  >
                    {capitalizeFirstLetter(user.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      intent="neutral"
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </Button>
                    {user.status !== 'removed' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        intent="danger"
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
