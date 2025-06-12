"use client";
import UserChildrenLayout from "@/app/components/page/users/layout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserChildrenLayout>{children}</UserChildrenLayout>;
}
