import Link from "next/link";
import { Icon } from "@iconify/react";

export default function SocialGroup() {
  return (
    <div className="flex items-center gap-6">
      <Link href="#">
        <Icon icon="mdi:facebook" width={24} className="hover:text-slate-400" />
      </Link>
      <Link href="#">
        <Icon icon="mdi:linkedin" width={24} className="hover:text-slate-400" />
      </Link>
      <Link href="#">
        <Icon icon="mdi:twitter" width={24} className="hover:text-slate-400" />
      </Link>
      <Link href="#">
        <Icon icon="mdi:youtube" width={24} className="hover:text-slate-400" />
      </Link>
      <Link href="#">
        <Icon
          icon="mdi:instagram"
          width={24}
          className="hover:text-slate-400"
        />
      </Link>
    </div>
  );
}
