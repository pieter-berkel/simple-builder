import Link from "next/link";

type HeroProps = {
  title: string;
  link: {
    label: string;
    href: string;
  }[];
};

export const Hero = (props: HeroProps) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[350px] relative">
      <h1 className="text-3xl font-bold text-center">{props.title}</h1>
      {(props.link || []).map((link) => (
        <Link href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};
