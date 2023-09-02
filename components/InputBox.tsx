import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  CameraIcon,
  VideoCameraIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import toast from "react-hot-toast";
import {
  StorageError,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

const InputBox = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState<ArrayBuffer | string>("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<File | undefined>(undefined);

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const addPost = async (e: FormEvent) => {
    e.preventDefault();

    if (!image && message) {
      await addDoc(collection(db, "posts"), {
        message,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        timestamp: serverTimestamp(),
      });
    }

    try {
      if (image) {
        const storageRef = ref(storage, `posts/${preview?.name}`);
        let promise: Promise<any>;
        promise = uploadString(storageRef, image as string, "data_url");

        toast.promise(promise, {
          success: "Post Created",
          error: "Something Went wrong",
          loading: "Creating Post",
        });

        const uploadTask = uploadBytesResumable(
          storageRef,
          image as ArrayBuffer
        );

        try {
          await promise;
          uploadTask.on(
            "state_changed",
            null,
            (err: StorageError) => {
              console.log(err);

              toast.error("Something went wrong. Please try after some time");
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);

              await addDoc(collection(db, "posts"), {
                message,
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
                timestamp: serverTimestamp(),
                postImage: url,
              });
            }
          );
          removeImage();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong. Please try after some time");
        }
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong");
    }
    setMessage("");
  };

  const addImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setPreview(file);
      const reader = new FileReader();
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent.target?.result) {
          setImage(readerEvent.target.result.toString());
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage("");
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 ">
      <div className="flex space-x-4 p-2 md:p-4 items-center">
        {session?.user?.image && (
          <Image
            className="rounded-full"
            src={session.user.image}
            alt="avatar"
            layout="fixed"
            width={40}
            height={40}
          />
        )}
        <form className="flex flex-1" onSubmit={addPost}>
          <div className="flex rounded-full bg-gray-100 w-full items-center">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-sm md:text-base font-normal h-10 md:h-12 bg-transparent flex-grow px-3 md:px-5  focus:outline-none"
              type="text"
              placeholder={`What's on your mind, ${
                session?.user?.name?.split(" ")[0]
              }?`}
            />
            <button
              disabled={!message && !(image as string)}
              type="submit"
              className="bg-blue-500 text-white rounded-full p-1 mr-2 px-2 text-xs md:text-base md:px-4 disabled:bg-blue-300"
            >
              Post
            </button>
            <button hidden type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      {image && (
        <div className=" p-2 flex justify-center w-full ">
          <div className="relative filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
            <Image
              className="rounded-lg"
              height={150}
              width={250}
              src={image as string}
              alt="image preview"
            />
            <XCircleIcon
              onClick={removeImage}
              className="h-7 text-red-600 absolute  -top-4 -right-[0.9rem] z-10 cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="flex  justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-5 md:h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live </p>
        </div>
        <div
          onClick={() => filePickerRef.current?.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-5 md:h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input ref={filePickerRef} hidden onChange={addImage} type="file" />
        </div>
        <div className="inputIcon">
          <FaceSmileIcon className="h-5 md:h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
