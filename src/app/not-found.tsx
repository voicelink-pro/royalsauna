import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-6xl text-clay-500">404</p>
      <h1 className="mt-4 font-serif text-3xl text-bark-700">
        Nie znaleźliśmy tej strony
      </h1>
      <p className="mt-3 max-w-md text-bark-500">
        Strona, której szukasz, nie istnieje lub została przeniesiona. – The
        page you are looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Strona główna</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/en">Home (EN)</Link>
        </Button>
      </div>
    </div>
  );
}
