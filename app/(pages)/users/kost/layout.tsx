import DynamicRouteChildrenLayout from "@/app/components/page/users/kost/layout";

export default function DynamicRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DynamicRouteChildrenLayout>{children}</DynamicRouteChildrenLayout>;
}
