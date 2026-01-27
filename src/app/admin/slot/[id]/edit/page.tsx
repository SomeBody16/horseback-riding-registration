import { notFound } from "next/navigation";
import { getSlot } from "@/action/slots";
import { EditForm } from "./EditForm";

interface EditSlotPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditSlotPage({ params }: EditSlotPageProps) {
	const { id } = await params;
	const slot = await getSlot(id);

	if (!slot) {
		notFound();
	}

	return <EditForm slot={slot} />;
}
