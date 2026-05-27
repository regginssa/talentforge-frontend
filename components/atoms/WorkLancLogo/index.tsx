import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logos/logo.png";

interface WorkLancLogoProps {
  className?: string;
  href?: string;
}

const WorkLancLogo: React.FC<WorkLancLogoProps> = ({
  className = "",
  href = "/",
}) => {
  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center gap-2 ${className}`}
    >
      <Image
        src={Logo}
        alt="WorkLanc logo"
        width={200}
        height={70}
        className="object-contain"
        priority
      />
    </Link>
  );
};

export default WorkLancLogo;
