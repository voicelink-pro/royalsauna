import { SiteShell } from "@/components/layout/SiteShell";

export default function PlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell locale="pl">{children}</SiteShell>;
}
