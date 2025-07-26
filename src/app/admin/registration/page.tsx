import { getSlots } from "@/action/slots";
import { RegistrationPage } from "./RegistrationPage";

export default async function AdminRegistrationPage() {
	const slots = await getSlots();
	
	return <RegistrationPage slots={slots} />;
}