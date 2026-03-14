import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProfile } from "@/lib/queries/profile";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function ProfileEditPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/devFaiq/login");

  const profile = await getProfile();
  if (!profile) {
    return (
      <div>
        <h1 className="text-xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No profile exists. Please create one in the database first.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Edit Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
