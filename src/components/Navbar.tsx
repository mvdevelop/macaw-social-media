
import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={icon}
            alt="Macaw logo"
            width={35}
            height={35}
            priority
          />
          <span>Macaw</span>
        </Link>
      </div>

      {/* Center */}
      <div className="hidden"></div>

      {/* Right */}
      <div className="">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
