import { useUser } from "../context/userContext";
import Link from "next/link";

const Home = () => {
  const { user, logIn } = useUser();

  return (
    <>
      <div className="flex flex-col gap-4 w-5/12">
        <h1 className="font-sans font-bold text-xl">
          Streamlining business between brands and content creators
        </h1>
        <p>
          Your customers drive your business, which is why it’s so important to
          reach the right audience for your products and services!
        </p>
        <Link href="/profile" onClick={() => logIn(user)}>
          <a>
            <button className="btn btn-primary">Get Started</button>
          </a>
        </Link>
      </div>
      <img
        className="w-7/12"
        src="/images/social_dashboard.svg"
        alt="social dashboard positioning illustration"
      />
    </>
  );
};

export default Home;
