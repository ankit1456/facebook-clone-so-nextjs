import { signIn } from "next-auth/react";
import Image from "next/image";
import { MouseEvent } from "react";

const Login = () => {
  const handleSignin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn();
  };

  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        alt="logo"
        width={400}
        height={400}
        objectFit="contain"
      />
      <button
        className="px-5 py-3 font-semibold bg-blue-500 text-white rounded-full"
        onClick={handleSignin}
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default Login;
