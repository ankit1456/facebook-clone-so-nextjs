import SidebarRow from "./SidebarRow";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="md:p-2 mt-7 max-w-[600px] xl:min-w-[300px]  md:h-[fit-content] z-20 fixed top-10 ">
      {session?.user?.image && session.user.name && (
        <SidebarRow src={session.user.image} title={session.user.name} />
      )}
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={ComputerDesktopIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
};

export default Sidebar;
