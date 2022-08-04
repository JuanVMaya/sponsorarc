import FeaturedVideos from "./FeaturedVideos";
import { useUser } from "../context/userContext";
import { useEffect } from "react";
import axios from "axios";
import { toHumanReadableNumbers } from "../utils/humanReadableNumbers";
import CreatorStats from "./CreatorStats";
import { RiSettings3Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { tohumanReadableTime } from "../utils/humanReadableTime";
import BrandDeals from "./BrandDeals";

const Home = () => {
  const { user, logIn } = useUser();

  return user.loggedIn ? (
    <div className="self-start flex gap-8 flex-grow h-full max-w-full">
      <div className="card w-3/12 glass pt-8 self-start">
        <figure>
          <img
            className="rounded-full w-24 m-auto"
            src={user.profilePicture}
            alt={user.first_name + " " + user.last_name}
          />
        </figure>
        <div className="card-body p-8">
          <h2 className="card-title">
            {user.first_name} {user.last_name}
          </h2>
          <p className="font-semibold">
            {user.represent}: {user?.channel_name}
            {user?.company_name}
          </p>
          {user.subscriberCount && (
            <p>
              Subscribers:{" "}
              {user.subscriberCount &&
                toHumanReadableNumbers(user.subscriberCount)}
            </p>
          )}
          <p>Industry: {user.industry}</p>
          <p>Location: {user.location}</p>
          <div className="card-actions flex flex-col">
            <button className="btn btn-primary mt-8">
              <RiSettings3Fill />
              &nbsp;Edit Profile
            </button>
            <button className="btn btn-secondary mt-4">
              <AiFillFileAdd />
              &nbsp;New Brand Deal
            </button>
          </div>
        </div>
      </div>
      <div className="card w-full glass p-8 gap-2 overflow-auto scrollbar">
        <div className="flex flex-col w-full border-opacity-50">
          <div className="grid card bg-base-300 rounded-box p-8">
            <h1 className="card-title">
              Hello {user.first_name}{" "}
              {user.company_name && `from ${user.company_name}`}
            </h1>
            <p>Description: {user.description}</p>
          </div>
          <div className="divider" />
          {user.represent === "Brand" && <BrandDeals />}
          {user.represent === "Creator" && (
            <>
              <FeaturedVideos />
              <div className="divider" />
              <CreatorStats
                creatorStartDate={user.creatorStartDate}
                totalViews={user.totalViews}
                videoCount={user.videoCount}
              />
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-4 w-5/12">
        <h1 className="font-sans font-bold text-xl">
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
        className="w-7/12"
        src="/images/social_dashboard.svg"
        alt="social dashboard positioning illustration"
      />
    </>
  );
};

export default Home;
