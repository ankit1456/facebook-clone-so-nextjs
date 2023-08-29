import Image from "next/image";

const Contact = ({ src, name }: { src: string; name: string }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
      <Image
        className="rounded-full"
        objectFit="cover"
        src={src}
        width={50}
        height={50}
        layout="fixed"
        alt="contact image"
      />
      <p className="font-semibold ">{name}</p>
      <div className="absolute bottom-3 left-9 bg-green-500 h-3 w-3 rounded-full " />
    </div>
  );
};

export default Contact;
