import { ForwardRefExoticComponent, SVGProps } from "react";

type HeaderIconProps = {
  Icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  active?: boolean;
};
const HeaderIcon = ({ Icon, active }: HeaderIconProps) => {
  return (
    <div className="flex items-center rounded-xl cursor-pointer md:px-8 sm:h-14 md:hover:bg-gray-100 active:border-b-2 border-blue-500 group">
      <Icon
        className={`h-5 text-gray-500 sm:h-7 group-hover:text-blue-500 ${
          active && "text-blue-500"
        }`}
      />
    </div>
  );
};

export default HeaderIcon;
