import ProfileChildrenLayout from "@/app/components/page/profile/layout";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileChildrenLayout>{children}</ProfileChildrenLayout>;
}
