import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getContactLinkById } from "@/lib/queries/contact-links";
import ContactLinkForm from "@/components/admin/ContactLinkForm";

export default async function EditContactLinkPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/devFaiq/login");

  const link = await getContactLinkById(params.id);
  if (!link) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Edit Contact Link</h1>
      <ContactLinkForm link={link} mode="edit" />
    </div>
  );
}
