import NewsDetailClient from "./Client";

export function generateStaticParams() {
  return [
    { slug: "tahfizh-akbar-2026" },
    { slug: "rpl-juara-web" },
    { slug: "tata-boga-praktik" },
  ];
}

export default function Page() {
  return <NewsDetailClient />;
}
