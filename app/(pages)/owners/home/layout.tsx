import HomeOwnerLayoutChildren from "@/app/components/page/owners/layout";

export default function HomeOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeOwnerLayoutChildren>{children}</HomeOwnerLayoutChildren>;
}
