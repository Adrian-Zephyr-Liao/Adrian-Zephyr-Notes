import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home",
  description: "Adrian Zephyr Notes – get started and explore.",
};

const TEMPLATES_URL =
  "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app";
const LEARN_URL =
  "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app";
const DEPLOY_URL =
  "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app";
const DOCS_URL =
  "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app";

const NAV_LINKS = [
  {
    href: DEPLOY_URL,
    label: "Deploy Now",
    icon: "vercel" as const,
    variant: "default" as const,
  },
  { href: DOCS_URL, label: "Documentation", variant: "outline" as const },
] satisfies Array<{
  href: string;
  label: string;
  icon?: "vercel";
  variant: "default" | "outline";
}>;

const LINK_CLASS = "font-medium text-primary underline-offset-4 hover:underline";
const EXTERNAL_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-between bg-background font-sans sm:items-start">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between bg-background px-16 py-32 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
          sizes="100px"
        />
        <section
          className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
          aria-labelledby="home-heading"
        >
          <h1
            id="home-heading"
            className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground"
          >
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            Looking for a starting point or more instructions? Head over to{" "}
            <a href={TEMPLATES_URL} className={LINK_CLASS} {...EXTERNAL_LINK_PROPS}>
              Templates
            </a>{" "}
            or the{" "}
            <a href={LEARN_URL} className={LINK_CLASS} {...EXTERNAL_LINK_PROPS}>
              Learning
            </a>{" "}
            center.
          </p>
        </section>
        <nav
          className="flex flex-col gap-4 sm:flex-row"
          aria-label="Quick actions"
        >
          {NAV_LINKS.map(({ href, label, icon, variant }) => (
            <Button
              key={href}
              asChild
              variant={variant}
              size="lg"
              className="w-full rounded-full md:w-[158px]"
            >
              <a href={href} {...EXTERNAL_LINK_PROPS}>
                {icon === "vercel" ? (
                  <Image
                    className="dark:invert"
                    src="/vercel.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                    sizes="16px"
                  />
                ) : null}
                {label}
              </a>
            </Button>
          ))}
        </nav>
      </div>
    </main>
  );
}
