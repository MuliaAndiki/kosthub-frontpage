"use client";

import Container from "../../../component/ui/Container";
export default function DynamicRouteChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
