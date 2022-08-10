import FeaturedVideos from "./FeaturedVideos";
import { useUser } from "../context/userContext";
import { toHumanReadableNumbers } from "../utils/humanReadableNumbers";
import CreatorStats from "./CreatorStats";
import { RiSettings3Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import BrandDeals from "./BrandDeals";

const Profile = () => {
  const { user } = useUser();
  return user.loggedIn ? (
    <div className="self-start flex gap-8 flex-grow h-full max-w-full flex-col md:flex-row">
      <div className="card glass items-center pt-8 self-start w-full md:w-4/12 md:items-left">
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
            {user.represent === "Brand" && (
              <button className="btn btn-secondary mt-4">
                <AiFillFileAdd />
                &nbsp;New Brand Deal
              </button>
            )}
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
            {user.represent === "Creator" && (
              <p>Description: {user.description}</p>
            )}
            {user.represent === "Brand" && (
              <p>
                About {user.company_name}: {user.description}
              </p>
            )}
          </div>
          <div className="divider" />
          {user.represent === "Brand" && <BrandDeals />}
          {user.represent === "Creator" && (
            <>
              {user.featuredVideos && (
                <FeaturedVideos featuredVideos={user.featuredVideos} />
              )}
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
    <h1>Please click on sign in</h1>
  );
};

export default Profile;
