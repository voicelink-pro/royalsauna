import { SiteShell } from "@/components/layout/SiteShell";
import { HtmlLang } from "@/components/layout/HtmlLang";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HtmlLang lang="en" />
      <SiteShell locale="en">{children}</SiteShell>
    </>
  );
}
