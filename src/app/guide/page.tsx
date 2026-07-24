import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
	Anchor,
	Badge,
	Button,
	Container,
	Divider,
	Group,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import {
	IconArrowLeft,
	IconCalendar,
	IconDownload,
	IconFileDescription,
	IconMapPin,
	IconPhone,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "New Participant Guide | Horseback Riding",
};

const REGULATIONS_PATH = "/kkjk_horseback_riding_regulations.docx";

interface GuideSectionProps {
	readonly icon: ReactNode;
	readonly title: string;
	readonly children: ReactNode;
}

function GuideSection({ icon, title, children }: GuideSectionProps) {
	return (
		<Paper p="xl" radius="md" shadow="sm" withBorder>
			<Stack gap="lg">
				<Group gap="sm">
					<ThemeIcon size={40} radius="md" variant="light">
						{icon}
					</ThemeIcon>
					<Title order={2}>{title}</Title>
				</Group>
				{children}
			</Stack>
		</Paper>
	);
}

interface MapLocationProps {
	readonly marker: string;
	readonly title: string;
	readonly description: ReactNode;
}

function MapLocation({ marker, title, description }: MapLocationProps) {
	return (
		<Paper p="md" radius="md" withBorder bg="var(--mantine-color-default-hover)">
			<Group align="flex-start" wrap="nowrap" gap="md">
				<ThemeIcon
					size={36}
					radius="xl"
					variant="filled"
					style={{ flexShrink: 0 }}
				>
					<Text fw={700} size="sm" lh={1}>
						{marker}
					</Text>
				</ThemeIcon>
				<Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
					<Text fw={600}>{title}</Text>
					<Text size="sm" c="dimmed">
						{description}
					</Text>
				</Stack>
			</Group>
		</Paper>
	);
}

function BulletList({ items }: { readonly items: ReactNode[] }) {
	return (
		<Stack gap="xs" component="ul" style={{ margin: 0, paddingLeft: "1.25rem" }}>
			{items.map((item, index) => (
				<Text key={index} component="li" size="sm">
					{item}
				</Text>
			))}
		</Stack>
	);
}

export default function NewParticipantGuidePage() {
	return (
		<Container size="md" py="xl">
			<Stack gap="xl">
				<Stack align="center" gap="md" ta="center">
					<Badge size="lg" variant="light">
						First time at KKJK?
					</Badge>
					<Title order={1}>New Participant Guide</Title>
					<Text maw={560} c="dimmed" size="lg">
						Everything you need before your first lesson — from signing the
						regulations to finding your way around the stable.
					</Text>
				</Stack>

				<Paper p="lg" radius="md" withBorder>
					<Text fw={600} mb="sm">
						Before your first class
					</Text>
					<BulletList
						items={[
							"Download, sign, and return the regulations",
							"Create your Redini account",
							"Familiarize yourself with the stable layout below",
						]}
					/>
				</Paper>

				<GuideSection
					icon={<IconFileDescription size={22} stroke={1.5} />}
					title="Regulations"
				>
					<Text>
						Every new rider must sign the participation regulations before
						joining classes. The document covers safety rules, liability, and
						club policies at Krakowski Klub Jazdy Konnej (KKJK).
					</Text>

					<Stack gap="xs">
						<Text fw={600} size="sm">
							What to do
						</Text>
						<BulletList
							items={[
								"Download and print the regulations document",
								"Sign it by hand, or use a digital signature if you have one",
								<>
									Email a scan to{" "}
									<Anchor href="mailto:fnowakow@cisco.com">
										fnowakow@cisco.com
									</Anchor>{" "}
									and{" "}
									<Anchor href="mailto:apowrozn@cisco.com">
										apowrozn@cisco.com
									</Anchor>
								</>,
								<>
									Deliver the signed original to the HR room (shelf marked
									&quot;N&quot;), or hand it to us in person.
								</>,
							]}
						/>
					</Stack>

					<Button
						component="a"
						href={REGULATIONS_PATH}
						download
						leftSection={<IconDownload size={18} />}
						w="fit-content"
					>
						Download regulations
					</Button>
				</GuideSection>

				<GuideSection
					icon={<IconCalendar size={22} stroke={1.5} />}
					title="Redini account"
				>
					<Text>
						The stable uses Redini to schedule and manage lessons. If you
						haven&apos;t already, create an account there — you&apos;ll need it
						to book classes and find contact details like your instructor&apos;s
						phone number.
					</Text>
				</GuideSection>

				<GuideSection
					icon={<IconMapPin size={22} stroke={1.5} />}
					title="Stable map & locations"
				>
					<Text>
						Your first visit to a new stable can feel confusing. Use this map
						and the legend below to find your way around KKJK before your
						lesson starts.
					</Text>

					<Paper p="xs" radius="md" withBorder>
						<Image
							src="/kkjk-map.png"
							alt="KKJK stable map showing parking, saddle room, stable, and riding areas"
							width={2748}
							height={1920}
							style={{ width: "100%", height: "auto", borderRadius: 8 }}
						/>
					</Paper>

					<Stack gap="md">
						<MapLocation
							marker="P"
							title="Parking"
							description="Leave your car here when you arrive."
						/>
						<MapLocation
							marker="1"
							title="Saddle room"
							description={
								<>
									Collect your gear here before saddling: saddle, saddle pad,
									bridle, chestrack, and helmet. Saddles, pads, and bridles are
									assigned to specific horses — look for signed hangers.
									Chestracks are shared, so pick any you like. Group class
									riders are expected to saddle their horse before class, unless
									the horse is still in a previous session. Ask a fellow rider
									if you need help.
								</>
							}
						/>
						<MapLocation
							marker="2"
							title="Stable entrance & assembly point"
							description={
								<>
									Meet here after saddling to mount and adjust tack. For
									individual lessons, your instructor will usually wait here.
									If not, check areas 4, 5, or 6 — she may be finishing a
									previous class. You can also call Marta at{" "}
									<Anchor href="tel:+48662785840">662 785 840</Anchor> (also
									listed in Redini).
								</>
							}
						/>
						<MapLocation
							marker="3"
							title="Stable"
							description="Your horse waits in its stall here (unless still riding in a prior class). Brush, hoof pick, halter, and lead rope should be hanging on the stall door."
						/>
						<MapLocation
							marker="4"
							title="Kwarc"
							description='Most group classes and some individual lessons take place here. Listed as "Kwarc" in Redini.'
						/>
						<MapLocation
							marker="5"
							title="Duży Plac"
							description='Some individual lessons are held here. Listed as "Duży Plac" in Redini.'
						/>
						<MapLocation
							marker="6"
							title="Hala"
							description='Indoor arena for some individual lessons. Listed as "Hala" in Redini.'
						/>
					</Stack>

					<Paper p="md" radius="md" withBorder>
						<Group gap="sm" wrap="nowrap">
							<ThemeIcon size={36} radius="md" variant="light">
								<IconPhone size={18} stroke={1.5} />
							</ThemeIcon>
							<Stack gap={2}>
								<Text fw={600} size="sm">
									Instructor contact
								</Text>
								<Text size="sm" c="dimmed">
									Marta —{" "}
									<Anchor href="tel:+48662785840">662 785 840</Anchor>
								</Text>
							</Stack>
						</Group>
					</Paper>
				</GuideSection>

				<Divider />

				<Group justify="center">
					<Button
						component={Link}
						href="/registration"
						variant="light"
						leftSection={<IconArrowLeft size={18} />}
					>
						Back to registration
					</Button>
				</Group>
			</Stack>
		</Container>
	);
}
