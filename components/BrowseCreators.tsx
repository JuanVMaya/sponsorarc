import FeaturedVideos from "./FeaturedVideos";
import CreatorStats from "./CreatorStats";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../@types/user";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { toHumanReadableNumbers } from "../utils/humanReadableNumbers";

const BrowseCreators = () => {
  const { user } = useUser();
  const [creators, setCreators] = useState<IUser[]>([]);
  const [selectedCreatorId, setSelectedCreatorId] = useState<number>(1);
  const [creatorDetails, setCreatorDetails] = useState<IUser>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        const filteredCreators = response.data.filter(
          (userAPI: IUser) => userAPI.represent === "Creator"
        );
        setCreators(filteredCreators);
      })
      .catch((error) => {
        console.log("There was an error retrieving creators:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/" + selectedCreatorId)
      .then((response) => {
        console.log(response.data);
        setCreatorDetails(response.data);
      })
      .catch((error) => {
        console.log("There was an error retrieving brand deals:", error);
      });
  }, [selectedCreatorId]);

  const handleSelectCreator = (id: number) => {
    setSelectedCreatorId(id);
  };

  return user.loggedIn ? (
    <div className="self-start flex gap-8 flex-grow max-h-[85vh] max-w-full">
      <div className="card w-5/12 glass p-8 gap-2 overflow-auto scrollbar">
        {creators
          ?.filter((creator) => creator.id !== user.id)
          .map((creator) => (
            <div
              className={`grid card bg-base-300 rounded-box p-8 gap-2 overflow-visible ${
                selectedCreatorId === creator?.id
                  ? "border-r-4 border-primary"
                  : ""
              }`}
              key={creator.id}
              onClick={() => handleSelectCreator(creator.id)}
            >
              <h1 className="card-title">{creator.channel_name}</h1>
              <div className="badge badge-primary">
                Industry: {creator.industry}
              </div>
              <p className="badge badge-secondary">
                Creator: {creator.first_name} {creator.last_name}
              </p>
            </div>
          ))}
      </div>
      {selectedCreatorId && creatorDetails ? (
        <div className="card flex-column w-full glass p-8 gap-2 overflow-auto scrollbar">
          <div className="flex flex-col w-full border-opacity-50 gap-2">
            <div className="card flex flex-row bg-base-300 rounded-box p-8 gap-8">
              <img
                className="rounded-full w-24 m-auto"
                src={creatorDetails.profilePicture}
                alt={creatorDetails.first_name + " " + creatorDetails.last_name}
              />
              <h1 className="card-title flex-grow max-w-8/12">
                {creatorDetails?.channel_name}
              </h1>
            </div>
            <div className="divider" />
            <div className="grid card bg-base-300 rounded-box p-8">
              <p>
                <span className="font-bold">Description:</span>{" "}
                {creatorDetails?.description}{" "}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="card flex-column flex-grow w-3/6 bg-base-300 rounded-box p-8 gap-2">
                <h1 className="card-title mb-2">Contact Information:</h1>
                <div className="flex items-center gap-2">
                  <FaUser />
                  {creatorDetails.first_name} {creatorDetails.last_name}
                </div>
                <a
                  href={`mailto:${creatorDetails.email}`}
                  className="flex items-center gap-2"
                >
                  <MdEmail /> {creatorDetails.email}
                </a>
                <div className="flex items-center gap-2">
                  <HiLocationMarker />
                  {creatorDetails.location}
                </div>
                {user.id !== creatorDetails.id ? (
                  <a
                    href={`mailto:${creatorDetails.email}`}
                    className="btn btn-success flex items-center gap-2 justify-self-end"
                  >
                    <MdEmail />
                    Contact
                  </a>
                ) : (
                  <p className="badge badge-lg">This is you!</p>
                )}
              </div>
              <div className="card flex-column flex-grow w-3/6 bg-base-300 rounded-box p-8 gap-2">
                <h1 className="card-title">Details:</h1>

                <p className="stat-title">Industry</p>
                <div className="badge badge-primary font-semibold">
                  {creatorDetails.industry}
                </div>
                <p className="stat-title">Subscriber Count</p>
                <div className="badge badge-secondary font-semibold">
                  {toHumanReadableNumbers(creatorDetails.subscriberCount)}
                </div>
                <p className="stat-title">Location</p>
                <div className="badge">{creatorDetails.location}</div>
              </div>
            </div>
          </div>
          <CreatorStats
            creatorStartDate={creatorDetails.creatorStartDate}
            totalViews={creatorDetails.totalViews}
            videoCount={creatorDetails.videoCount}
          />
          {creatorDetails.featuredVideos && (
            <FeaturedVideos featuredVideos={creatorDetails.featuredVideos} />
          )}
        </div>
      ) : (
        <div className="alert alert-info shadow-lg mb-auto">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Please select a creator.</span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <h1>Please sign in</h1>
  );
};

export default BrowseCreators;
