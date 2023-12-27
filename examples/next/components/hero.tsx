type HeroProps = {
  title: string;
};

export const Hero = (props: HeroProps) => {
  return (
    <div className="flex items-center justify-center min-h-[350px] relative">
      <h1 className="text-3xl font-bold text-center">{props.title}</h1>
    </div>
  );
};
