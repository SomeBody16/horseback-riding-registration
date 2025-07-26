import { getSlots } from "@/action/slots";
import { CreateForm } from "./CreateForm";

export default async function CreateSlotPage() {
	const slots = await getSlots();

	return <CreateForm slots={slots} />;
}
