import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[50vh] min-h-[320px] overflow-hidden rounded-b-[3rem]">
      <img src={heroBanner} alt="Sweet treats display" width={1920} height={640} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 text-center px-4">
        <h1 className="font-heading text-4xl md:text-6xl text-primary drop-shadow-lg mb-2">
          Sweet Treats Bakery
        </h1>
        <p className="font-body text-lg md:text-xl text-foreground/80 font-medium">
          Homemade with love Brownies · Cakes · Sundaes & more
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
