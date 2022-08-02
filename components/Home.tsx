import * as React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-5/12">
        <h1 className="font-sans font-bold text-lg">
          Streamlining business between brands and content creators
        </h1>
        <p>
          Your customers drive your business, which is why it’s so important to
          note connect to the right audience for your brand
        </p>
        <Link href="/discover">
          <a>
            <button className="btn btn-primary">Get Started</button>
          </a>
        </Link>
      </div>
      <img
        className="w-6/12"
        src="/images/social_dashboard.svg"
        alt="social dashboard positioning illustration"
      />
    </>
  );
};

export default Home;
