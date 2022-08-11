import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { tohumanReadableTime } from "../utils/humanReadableTime";

// Icons
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdPersonAdd } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

// Components
import BrandDealSideCard from "./BrandDealSideCard";
import NewBrandDeal from "./NewBrandDeal";
// Types
import { IUser } from "../@types/user";
import { IBrandDeal } from "../@types/brandDeal";
import { IDeliverable } from "../@types/deliverable";

const BrowseBrandDeals = () => {
  const { user } = useUser();
  const [brandDeals, setBrandDeals] = useState<IBrandDeal[]>([]);
  const [selectedBrandDealId, setSelectedBrandDealId] = useState<number>(1);
  const [brandDealDetails, setBrandDealDetails] = useState<IBrandDeal>();
  const [availableUsers, setAvailableUsers] = useState<IUser[]>([]);
  const [assignedCreatorId, setAssignedCreatorId] = useState<string>("0"); // Sets to "Select User" in the dropdown by default
  const [brandDealDeliverables, setBrandDealDeliverables] = useState<
    IDeliverable[]
  >([]);
  const [totalDeliverables, setTotalDeliverables] = useState<number>(0);
  const [totalDeliverablesCompleted, setTotalDeliverablesCompleted] =
    useState<number>(0);
  const [showNewBrandDeal, setShowNewBrandDeal] = useState<boolean>(false);
  const [showAssignCreatorNotice, setShowAssignCreatorNotice] =
    useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/branddeals")
      .then((response) => {
        setBrandDeals(response.data);
      })
      .catch((error) => {
        console.log("There was an error retrieving brand deals:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setAvailableUsers(response.data);
      })
      .catch((error) => {
        console.log("There was an error retrieving users deals:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/branddeals/" + selectedBrandDealId)
      .then((response) => {
        setBrandDealDetails(response.data);
        setAssignedCreatorId(response.data.active_creator_id);
        setBrandDealDeliverables(response.data.deliverables);
        setShowAssignCreatorNotice(false);

      })
      .catch((error) => {
        console.log("There was an error retrieving single brand deal:", error);
      });
  }, [selectedBrandDealId]);

  useEffect(() => {
    setTotalDeliverables(brandDealDeliverables.length);
    setTotalDeliverablesCompleted(
      brandDealDeliverables.filter((item) => {
        return item.completed === 100;
      }).length
    );
  }, [brandDealDeliverables]);

  const handleAssignCreator = () => {
    axios
      .put(`http://localhost:8080/branddeals/${selectedBrandDealId}/assign`, {
        active_creator_id: assignedCreatorId,
      })
      .then((response) => {
        console.log(response.data);
        return axios.get(
          "http://localhost:8080/branddeals/" + selectedBrandDealId
        );
      })
      .then((response) => {
        setShowAssignCreatorNotice(true);
        setBrandDealDeliverables(response.data.deliverables);
      })
      .catch((error) => {
        console.log("There was an error assigning creator: ", error);
      });
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Checkbox to toggle deliverable
    axios
      .put(
        `http://localhost:8080/branddeals/${selectedBrandDealId}/deliverable/${event.target.name}`,
        {
          completed: event.target.checked,
        }
      )
      .then(() => {
        return axios.get(
          `http://localhost:8080/deliverables/branddeals/${selectedBrandDealId}`
        );
      })
      .then((response) => {
        setBrandDealDeliverables(response.data);
      })
      .catch((error) => {
        console.log(
          "There was an error updating the deliverable creator: ",
          error
        );
      });
  };

  const handleSelectBrandDeal = (id: number) => {
    // Controlled select brand card to display details
    setSelectedBrandDealId(id);
    setShowNewBrandDeal(false);
  };

  const handleAssignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //Controlled assign creator select (dropdown)
    setAssignedCreatorId(event.target.value);
  };

  const handleAddBrandDeal = () => {
    // Controlled select brand card to display details
    setShowNewBrandDeal(!showNewBrandDeal);
  };

  const handleSaveBrandDeal = (id: number) => {
    setSelectedBrandDealId(id);
    setShowNewBrandDeal(false);
  };

  return user.loggedIn ? (
    <div className="self-start flex gap-8 flex-grow max-h-[85vh] max-w-full flex-col md:flex-row">
      <div className="card w-5/12 glass p-4 sm:p-8 gap-2 overflow-auto scrollbar min-w-[20rem]">
        {brandDeals
          ?.filter((brandDeal) => {
            if (user.represent === "Creator") {
              return brandDeal.active_creator_id === user.id;
            }
            return user.id === brandDeal.users_id;
          })
          .map((brandDeal) => (
            <BrandDealSideCard
              key={brandDeal.id}
              brandDeal={brandDeal}
              brandDealDetails={brandDealDetails}
              selectBrandDeal={handleSelectBrandDeal}
            />
          ))}
        {user.represent === "Brand" && (
          <button className="btn btn-outline" onClick={handleAddBrandDeal}>
            {showNewBrandDeal ? (
              <>
                <MdCancel />
                &nbsp;Cancel{" "}
              </>
            ) : (
              <>
                <AiFillFileAdd />
                &nbsp; New Brand Deal
              </>
            )}
          </button>
        )}
      </div>
      {showNewBrandDeal && selectedBrandDealId && (
        <div className="card flex-column w-full glass p-4 sm:p-8 gap-2 overflow-auto scrollbar">
          <NewBrandDeal saveBrandDeal={handleSaveBrandDeal} />
        </div>
      )}

      {brandDealDetails && selectedBrandDealId && !showNewBrandDeal && (
        <div className="card flex-column w-full glass p-4 sm:p-8 gap-2 overflow-auto scrollbar">
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
            <div className="card rounded-box">
              <h1 className="card-title mt-4">Progress</h1>
              <ul className="steps steps-vertical lg:steps-horizontal">
                {brandDealDeliverables?.map((deliverable) => {
                  if (deliverable.completed === 100) {
                    return (
                      <li
                        key={deliverable.id}
                        className="step step-success"
                        data-content="✓"
                      ></li>
                    );
                  }
                  return (
                    <li
                      key={deliverable.id}
                      className="step"
                      data-content="✕"
                    ></li>
                  );
                })}
              </ul>
              <p className="badge badge-lg">
                {totalDeliverablesCompleted} of {totalDeliverables} deliverables
                completed
              </p>
            </div>

            {user.represent == "Creator" && (
              <>
                <h1 className="card-title mt-4">Deliverables</h1>
                <div className="grid card bg-base-300 rounded-box p-8">
                  {brandDealDeliverables?.map((deliverable) => {
                    return (
                      <div className="form-control" key={deliverable.id}>
                        <label className="label cursor-pointer">
                          <div
                            className="tooltip tooltip-right"
                            data-tip={deliverable.description}
                          >
                            <span className="label-text">
                              {deliverable.title}
                            </span>
                          </div>
                          <input
                            name={String(deliverable.id)}
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            onChange={handleCheckboxChange}
                            defaultChecked={
                              deliverable.completed ? true : false
                            }
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {user.represent == "Brand" && (
              <div className="grid card bg-base-300 rounded-box p-4 mt-4 sm:p-8">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">
                      Pick the creator want to assign to this deal to:
                    </span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={assignedCreatorId}
                    onChange={handleAssignChange}
                  >
                    <option disabled selected>
                      Pick one
                    </option>
                    {availableUsers
                      .filter((creator) => creator.represent === "Creator")
                      .map((creator) => (
                        <option key={creator.id} value={creator.id}>
                          {creator.channel_name} ({creator.first_name}{" "}
                          {creator.last_name})
                        </option>
                      ))}
                    <option value="0">Select user</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="btn btn-success btn-sm sm:btn-md flex items-center gap-2 justify-self-end max-w-3/6"
                    onClick={handleAssignCreator}
                    disabled={
                      assignedCreatorId ===
                      String(brandDealDetails.active_creator_id)
                    } //Disable button if creator is already assigned to the existing one
                  >
                    <MdPersonAdd />
                    Assign Creator
                  </button>
                  <div
                    className="tooltip"
                    data-tip="Redirect to the payment page"
                  >
                    <button
                      className="btn btn-primary btn-sm sm:btn-md flex items-center gap-2 justify-self-end max-w-3/6"
                      disabled={
                        //Enable button if all deliverables are completed
                        !(
                          totalDeliverables !== 0 &&
                          totalDeliverablesCompleted / totalDeliverables === 1
                        )
                      }
                    >
                      <FaMoneyCheckAlt />
                      Pay Creator
                    </button>
                  </div>

                  {showAssignCreatorNotice && (
                    <div className="alert alert-success shadow-lg mb-auto">
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
                        <span>The creator has been assigned.</span>
                      </div>
                    </div>
                  )}
                </div>
                <h1 className="card-title mt-8 mb-4">Deliverables</h1>
                {brandDealDeliverables?.map((deliverable) => {
                  return (
                    <div className="form-control " key={deliverable.id}>
                      <label className="label cursor-pointer ">
                        <div
                          className="tooltip tooltip-right"
                          data-tip={deliverable.description}
                        >
                          <span className="label-text">
                            {deliverable.title}
                          </span>
                        </div>
                        <input
                          name={String(deliverable.id)}
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          onChange={handleCheckboxChange}
                          defaultChecked={deliverable.completed ? true : false}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="divider" />
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="card flex-column flex-grow w-full sm:w-3/6 bg-base-300 rounded-box p-8 gap-2">
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
                {user.represent == "Creator" && (
                  <a
                    href={`mailto:${brandDealDetails?.email}`}
                    className="btn btn-success flex items-center gap-2 justify-self-end"
                  >
                    <MdEmail />
                    Contact
                  </a>
                )}
              </div>
              <div className="card flex-column flex-grow w-full sm:w-3/6 bg-base-300 rounded-box p-8 gap-2">
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
      )}
      {!showNewBrandDeal && !selectedBrandDealId && (
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
