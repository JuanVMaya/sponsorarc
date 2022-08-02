import * as React from "react";
import { useUser } from "../context/userContext";

const Home = () => {
  const { user, logIn } = useUser();
  return user.loggedIn ? (
    <div className="card w-3/12 glass">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Life hack</h2>
        <p>How to park your car at your garage?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn now!</button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-4 w-5/12">
        <h1 className="font-sans font-bold text-lg">
          Streamlining business between brands and content creators
        </h1>
        <p>
          Your customers drive your business, which is why it’s so important to
          reach the right audience for your products and services!
        </p>
        <a onClick={() => logIn(user)}>
          <button className="btn btn-primary">Get Started</button>
        </a>
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
