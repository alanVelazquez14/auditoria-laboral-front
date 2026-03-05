import PageTransition from "@/components/PageTransition";
import ProfileWizard from "@/components/profile-wizard/ProfileWizard";

export default function CompleteProfilePage() {
  return (
    <PageTransition>
      <main className="flex">
        <ProfileWizard />
      </main>
    </PageTransition>
  );
}
