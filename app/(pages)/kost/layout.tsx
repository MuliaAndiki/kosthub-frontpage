import DynamicRouteChildrenLayout from "@/app/components/page/kost/layout";

export default function DynamicRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DynamicRouteChildrenLayout>{children}</DynamicRouteChildrenLayout>;
}
