import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import {
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

type PostProps = {
  post: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-white flex flex-col rounded-xl border bottom-1 border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Image
            className="rounded-full"
            src={post.data().image}
            width={40}
            height={40}
            alt="avatar"
          />
          <div>
            <p className="font-medium">{post.data().name}</p>
            {post.data().timestamp ? (
              <p className="text-xs text-gray-400">
                {new Date(post.data().timestamp?.toDate()).toLocaleString()}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Loading</p>
            )}
          </div>
        </div>

        <p className="p-4 py-3 -mb-2">{post.data().message}</p>
      </div>

      <div className="relative h-56 md:h-96 bg-white">
        <Image
          src={post.data().postImage}
          alt="post image"
          objectFit="cover"
          layout="fill"
        />
      </div>

      <div className="bg-white flex justify-between items-centertext-gray-400 rounded-b-xl">
        <div className="inputIcon space-x-2">
          <HandThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon space-x-2">
          <ChatBubbleOvalLeftIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon space-x-2">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
