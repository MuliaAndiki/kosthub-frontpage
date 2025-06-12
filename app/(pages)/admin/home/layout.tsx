import HomeAdminLayoutChildren from "@/app/components/page/admin/home/layout";
export default function HomeAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeAdminLayoutChildren>{children}</HomeAdminLayoutChildren>;
}
