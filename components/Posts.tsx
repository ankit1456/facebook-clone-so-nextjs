import {
  DocumentData,
  QuerySnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [realTimeposts] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  return (
    <div className="mt-5">
      {realTimeposts?.docs.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
