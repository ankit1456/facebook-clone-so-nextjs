import Image from "next/image";

type StoryCardProps = {
  story: {
    name: string;
    src: string;
    profile: string;
  };
};

const StoryCard = ({ story }: StoryCardProps) => {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-100 transform ease-in hover:scale-105 md:hover:animate-pulse">
      <Image
        className="absolute opacity-0  lg:opacity-100 rounded-full z-50 top-10 shadow-lg"
        src={story.profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
        alt="avatar"
      />

      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-2xl"
        src={story.src}
        layout="fill"
        alt="story image"
      />
      <p className="absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate">
        {story.name}
      </p>
    </div>
  );
};

export default StoryCard;
