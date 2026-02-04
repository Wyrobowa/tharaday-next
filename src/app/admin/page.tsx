'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Text,
  Badge,
} from 'tharaday';

export default function AdminPage() {
  return (
    <Box paddingY={8} display="flex" flexDirection="column" gap={8}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Text variant="h1" weight="bold">
          Admin overview
        </Text>
        <Text variant="body-md" color="subtle">
          Monitor marketplace health, moderate listings, and manage users.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={6}
      >
        <Card bordered shadow="sm">
          <CardContent>
            <Text variant="label" color="subtle">
              Active sellers
            </Text>
            <Text variant="h2" weight="bold">
              218
            </Text>
            <Text variant="body-sm" color="subtle">
              +12 this week
            </Text>
          </CardContent>
        </Card>
        <Card bordered shadow="sm">
          <CardContent>
            <Text variant="label" color="subtle">
              Listings flagged
            </Text>
            <Text variant="h2" weight="bold">
              9
            </Text>
            <Text variant="body-sm" color="subtle">
              3 need review today
            </Text>
          </CardContent>
        </Card>
        <Card bordered shadow="sm">
          <CardContent>
            <Text variant="label" color="subtle">
              Orders in dispute
            </Text>
            <Text variant="h2" weight="bold">
              2
            </Text>
            <Text variant="body-sm" color="subtle">
              SLA 24h
            </Text>
          </CardContent>
        </Card>
        <Card bordered shadow="sm">
          <CardContent>
            <Text variant="label" color="subtle">
              Platform uptime
            </Text>
            <Text variant="h2" weight="bold">
              99.98%
            </Text>
            <Text variant="body-sm" color="subtle">
              Stable
            </Text>
          </CardContent>
        </Card>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="minmax(0, 1.4fr) minmax(0, 0.6fr)"
        gap={8}
      >
        <Card bordered shadow="sm">
          <CardHeader title="Queue highlights" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text variant="body-md" weight="medium">
                    High-value listing review
                  </Text>
                  <Text variant="body-sm" color="subtle">
                    Signed first editions
                  </Text>
                </Box>
                <Badge intent="warning">Pending</Badge>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text variant="body-md" weight="medium">
                    Seller onboarding
                  </Text>
                  <Text variant="body-sm" color="subtle">
                    5 new accounts awaiting KYC
                  </Text>
                </Box>
                <Badge intent="info">New</Badge>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text variant="body-md" weight="medium">
                    Dispute follow-up
                  </Text>
                  <Text variant="body-sm" color="subtle">
                    Order #10482
                  </Text>
                </Box>
                <Badge intent="warning">Urgent</Badge>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card bordered shadow="sm">
          <CardHeader title="Admin actions" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={3}>
              <Link href="/admin/users">
                <Button variant="solid" intent="info" fullWidth>
                  Manage users
                </Button>
              </Link>
              <Link href="/admin/books">
                <Button variant="outline" intent="neutral" fullWidth>
                  Review listings
                </Button>
              </Link>
              <Link href="/admin/authors">
                <Button variant="outline" intent="neutral" fullWidth>
                  Manage authors
                </Button>
              </Link>
              <Link href="/admin/publishers">
                <Button variant="outline" intent="neutral" fullWidth>
                  Manage publishers
                </Button>
              </Link>
              <Link href="/admin/tags">
                <Button variant="outline" intent="neutral" fullWidth>
                  View tags
                </Button>
              </Link>
              <Link href="/admin/roles">
                <Button variant="outline" intent="neutral" fullWidth>
                  View roles
                </Button>
              </Link>
              <Button variant="outline" intent="neutral" disabled fullWidth>
                Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
