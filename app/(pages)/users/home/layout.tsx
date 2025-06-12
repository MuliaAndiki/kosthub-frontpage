import HomeUserLayoutChildren from "@/app/components/page/users/home/layout";

export default function HomeUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeUserLayoutChildren>{children}</HomeUserLayoutChildren>;
}
