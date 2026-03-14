import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ContactLinkForm from "@/components/admin/ContactLinkForm";

export default async function NewContactLinkPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/devFaiq/login");

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">New Contact Link</h1>
      <ContactLinkForm mode="new" />
    </div>
  );
}
