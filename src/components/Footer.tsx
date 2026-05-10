import Image from "next/image";

const logos = [
  { src: "/images/logos/OS slatine transparent.png", alt: "OŠ Slatine" },
  { src: "/images/logos/STEaM logo transparent.png", alt: "STEaM" },
  { src: "/images/logos/MZO transparent.png", alt: "Ministarstvo znanosti, obrazovanja i mladih" },
  { src: "/images/logos/IDIZ logo transparent.png", alt: "Institut za društvena istraživanja" },
  { src: "/images/logos/split transparent.png", alt: "Grad Split" },
  { src: "/images/logos/A1_red_logo transparent.png", alt: "A1 Hrvatska" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.07)]">
      <div className="px-4 md:px-12 lg:px-60 flex flex-col md:flex-row items-center gap-6 md:gap-0 md:justify-between">

        {/* Left */}
        <div className="text-xs lg:text-s text-gray-500 tracking-wide leading-5 text-center md:text-left">
          <p className="font-semibold text-gray-700">OŠ Slatine</p>
          <p>Put Lovreta 1</p>
          <p>21224 Slatine, Čiovo</p>
        </div>

        {/* Center (logos) */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {logos.map((logo) => (
            <div key={logo.alt} className="relative h-6 w-10 md:h-8 md:w-14 lg:h-10 lg:w-16">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="text-xs lg:text-s text-gray-500 tracking-wide leading-5 text-center md:text-right">
          <p className="font-semibold text-gray-700">&ldquo;STeam&rdquo; STEM femme junior projekt</p>
          <p>Institut za društvena istraživanja</p>
          <p>Grad Split &amp; A1 Hrvatska</p>
        </div>

      </div>
    </footer>
  );
}
