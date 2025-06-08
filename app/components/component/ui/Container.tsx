import { ContainerType } from "@/app/components/types/ui";
export default function Container({
  children,
  className,
  as: Tag = "div",
  ...props
}: ContainerType) {
  return <div className={className}>{children}</div>;
}
