'use client';

import { AppShell, Burger, Group, Title, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconDashboard, IconCalendarTime } from '@tabler/icons-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: IconDashboard,
      active: pathname === '/admin',
    },
    {
      label: 'Slots Management',
      href: '/admin/slot',
      icon: IconCalendarTime,
      active: pathname.startsWith('/admin/slot'),
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>Admin Dashboard</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Title order={4} mb="md">Navigation</Title>
        </AppShell.Section>
        
        <AppShell.Section grow>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              component={Link}
              href={item.href}
              label={item.label}
              leftSection={<item.icon size="1.2rem" stroke={1.5} />}
              active={item.active}
              mb="xs"
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
