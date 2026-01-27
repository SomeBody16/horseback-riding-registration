import { getAllSlots } from "@/action/slots";
import { CreateForm } from "./CreateForm";

export default async function CreateSlotPage() {
	const slots = await getAllSlots();

	return <CreateForm slots={slots} />;
}
