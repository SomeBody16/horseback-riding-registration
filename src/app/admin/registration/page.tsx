import { getAllSlots } from "@/action/slots";
import { RegistrationPage } from "./RegistrationPage";

export default async function AdminRegistrationPage() {
	const slots = await getAllSlots();
	
	return <RegistrationPage slots={slots} />;
}