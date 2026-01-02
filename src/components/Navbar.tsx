
import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={icon}
            alt="Macaw logo"
            width={24}
            height={24}
            priority
          />
          <span>Macaw</span>
        </Link>
      </div>

      {/* Center */}
      <div className="hidden"></div>

      {/* Right */}
      <div className=""></div>
    </div>
  );
};

export default Navbar;
