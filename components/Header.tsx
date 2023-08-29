import Image from "next/image";
import {
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ChatBubbleOvalLeftIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";
import {
  FlagIcon,
  PlayIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 bg-white flex items-center p-2 px-3 lg:px-5 shadow-md">
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          alt="logo"
          width={40}
          height={40}
          layout="fixed"
        />

        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <MagnifyingGlassIcon className="h-5 text-gray-600" />
          <input
            type="text"
            className="hidden lg:inline-flex ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink"
            placeholder="Search facebook"
          />
        </div>
      </div>

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-1">
          <HeaderIcon active={true} Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        {session?.user?.image && (
          <Image
            onClick={() => signOut()}
            src={session.user.image}
            width={40}
            height={40}
            layout="fixed"
            className="rounded-full cursor-pointer"
            alt="user avatar"
          />
        )}

        <p className="hidden md:inline-flex font-semibold whitespace-nowrap pr-3">
          {session?.user?.name}
        </p>
        <RectangleGroupIcon className="icon" />
        <BellIcon className="icon" />
        <ChatBubbleOvalLeftIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </header>
  );
};

export default Header;
