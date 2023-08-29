import Image from "next/image";
import { ForwardRefExoticComponent, SVGProps } from "react";

type SidebarRowProps = {
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  src?: string;
  title: string;
};

const SidebarRow = ({ Icon, src, title }: SidebarRowProps) => {
  return (
    <div className="flex justify-center md:justify-start items-center md:space-x-3 p-2 h-full md:p-4 hover:bg-gray-200 rounded-xl">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={35}
          height={35}
          layout="fixed"
          alt="icon"
        />
      )}

      {Icon && <Icon className="h-5 w-5 md:h-7 md:w-7 text-blue-500" />}

      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SidebarRow;
