import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { tohumanReadableTime } from "../utils/humanReadableTime";
import { IBrandDeal } from "../@types/brandDeal";
import BrandDealSideCard from "./BrandDealSideCard";

const BrowseBrandDeals = () => {
  const { user } = useUser();
  const [brandDeals, setBrandDeals] = useState<IBrandDeal[]>([]);
  const [selectedBrandDealId, setSelectedBrandDealId] = useState<number>(1);
  const [brandDealDetails, setBrandDealDetails] = useState<IBrandDeal>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/branddeals")
      .then((response) => {
        const filteredBrandDeals = response.data.filter(
          //Filter out the brand deals that the user posted
          (brandDeal: IBrandDeal) => {
            if (user.represent === "Brand") {
              return brandDeal.users_id !== user.id;
            }
            return brandDeal;
          }
        );
        setSelectedBrandDealId(filteredBrandDeals[0].id);
        setBrandDeals(filteredBrandDeals);
      })
      .catch((error) => {
        console.log("There was an error retrieving brand deals:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/branddeals/" + selectedBrandDealId)
      .then((response) => {
        setBrandDealDetails(response.data);
      })
      .catch((error) => {
        console.log("There was an error retrieving brand deals:", error);
      });
  }, [selectedBrandDealId]);

  const handleSelectBrandDeal = (id: number) => {
    // Controlled select brand card to display details
    setSelectedBrandDealId(id);
  };

  return user.loggedIn ? (
    <div className="self-start flex gap-8 flex-grow max-h-[85vh] max-w-full">
      <div className="card w-5/12 glass p-8 gap-2 overflow-auto scrollbar">
        {brandDeals?.map((brandDeal) => {
          return (
            <BrandDealSideCard
              key={brandDeal.id}
              brandDeal={brandDeal}
              brandDealDetails={brandDealDetails}
              selectBrandDeal={handleSelectBrandDeal}
            />
          );
        })}
      </div>
      {selectedBrandDealId && brandDealDetails ? (
        <div className="card flex-column w-full glass p-8 gap-2 ">
          <div className="flex flex-col w-full border-opacity-50 gap-2">
            <div className="grid card bg-base-300 rounded-box p-8">
              <h1 className="card-title">{brandDealDetails?.title}</h1>
            </div>
            <div className="divider" />
            <div className="grid card bg-base-300 rounded-box p-8">
              <p>
                <span className="font-bold">Description:</span>{" "}
                {brandDealDetails?.description}{" "}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="card flex-column flex-grow w-3/6 bg-base-300 rounded-box p-8 gap-2">
                <h1 className="card-title mb-2">Contact Information:</h1>
                <div className="flex items-center gap-2">
                  <FaUser />
                  {brandDealDetails?.first_name} {brandDealDetails?.last_name}
                </div>
                <a
                  href={`mailto:${brandDealDetails?.email}`}
                  className="flex items-center gap-2"
                >
                  <MdEmail /> {brandDealDetails?.email}
                </a>
                <div className="flex items-center gap-2">
                  <HiLocationMarker />
                  {brandDealDetails?.location}
                </div>
                <a
                  href={`mailto:${brandDealDetails?.email}`}
                  className="btn btn-success flex items-center gap-2 justify-self-end"
                >
                  <MdEmail />
                  Contact
                </a>
              </div>
              <div className="card flex-column flex-grow w-3/6 bg-base-300 rounded-box p-8 gap-2">
                <h1 className="card-title">Details:</h1>
                <p className="stat-title">Industry</p>
                <div className="badge badge-secondary font-semibold">
                  {brandDealDetails?.subject}
                </div>
                <p className="stat-title">Compensation</p>
                <div className="badge badge-primary font-semibold">
                  $ {brandDealDetails?.pay}
                </div>
                <p className="stat-title">Posted</p>
                <div className="badge">
                  {tohumanReadableTime(brandDealDetails?.updated_at)} ago
                </div>
              </div>
            </div>
          </div>
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
            <span>Please select a brand deal.</span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <h1>Please click on sign in</h1>
  );
};

export default BrowseBrandDeals;
