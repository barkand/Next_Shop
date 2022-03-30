import Link from "next/link";
import Image from "next/image";

import UseGlobalContext from "/src/context/global";
import { LogoPictures } from "/src/static/image";

export default function LogoIcon() {
  const globalContext = UseGlobalContext();

  return (
    <Link href="/" passHref>
      <a style={{ paddingTop: "10px" }}>
        <Image
          src={LogoPictures[globalContext.theme.color]}
          alt="Logo"
          width={92}
          height={22}
        />
      </a>
    </Link>
  );
}
