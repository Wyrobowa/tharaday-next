'use client';

import { Button, Card, CardHeader, CardContent, Text, Badge, Box } from 'ds-creator';
import Link from 'next/link';

export default function Home() {
  return (
    <Box paddingY={8}>
      <Text variant="h1" weight="bold">Dashboard</Text>
      <Box paddingY={4}>
        <Text variant="body-lg" color="subtle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Box>
      
      <Box display="flex" gap={4} paddingTop={4} paddingBottom={12}>
        <Link href="/users">
          <Button variant="solid" intent="info">Manage Users</Button>
        </Link>
        <Link href="/items">
          <Button variant="outline" intent="neutral">Tasks List</Button>
        </Link>
      </Box>
      
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8}>
        <Card bordered shadow="sm">
          <CardHeader title="System Integrity" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text variant="body-md">Security Modules</Text>
                <Badge intent="success">Active</Badge>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text variant="body-md">Internal API v2</Text>
                <Badge intent="success">Stable</Badge>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text variant="body-md">Cloud Sync</Text>
                <Badge intent="success">Synced</Badge>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text variant="body-md">Resource Monitoring</Text>
                <Badge intent="success">Online</Badge>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text variant="body-md">Legacy Integration</Text>
                <Badge intent="warning">In Migration</Badge>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card bordered shadow="sm">
          <CardHeader title="Organization Overview" />
          <CardContent>
            <Box display="flex" justifyContent="space-around" textAlign="center">
              <Box>
                <Text variant="h2" weight="bold">124</Text>
                <Text variant="label" color="subtle">Active Employees</Text>
              </Box>
              <Box>
                <Text variant="h2" weight="bold">42</Text>
                <Text variant="label" color="subtle">Running Projects</Text>
              </Box>
              <Box>
                <Text variant="h2" weight="bold">98%</Text>
                <Text variant="label" color="subtle">Uptime</Text>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
