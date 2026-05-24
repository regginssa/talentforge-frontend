import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo.png";

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
        width={60}
        height={60}
        className="object-contain"
        priority
      />
      <span className="text-2xl font-bold">WorkLanc</span>
    </Link>
  );
};

export default WorkLancLogo;
