import Image from "next/image";

type HeroProps = {
  title: string;
  background?: string;
};

export const Hero = (props: HeroProps) => {
  return (
    <div className="flex items-center justify-center min-h-[350px] relative">
      {props.background && (
        <Image
          src={props.background}
          alt=""
          fill
          className="absolute inset-0 object-cover -z-[1]"
        />
      )}
      <h1 className="text-3xl font-bold text-center">{props.title}</h1>
    </div>
  );
};
