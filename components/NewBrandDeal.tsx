import Link from "next/link";
import { useUser } from "../context/userContext";
import { useState } from "react";
import axios from "axios";

const NewBrandDeal = () => {
  const { user } = useUser();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [pay, setPay] = useState<string>("0");
  const [timeframe, setTimeframe] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "subject") {
      setSubject(value);
    } else if (name === "pay") {
      setPay(value);
    } else if (name === "timeframe") {
      setTimeframe(value);
    }
  };
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handleSaveBrandDeal = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:8080/branddeals`, {
      users_id: user.id,
      title,
      description,
      subject,
      pay,
      timeframe,
    });
    console.log(response);
  };

  return (
    <>
      <h1 className="card-title">New Brand Deal</h1>
      <form onSubmit={handleSaveBrandDeal}>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            onChange={handleInputChange}
            value={title}
            name="title"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            name="description"
            onChange={handleTextareaChange}
            value={description}
            placeholder="Type here"
          ></textarea>
        </div>
        <h1 className="label-text font-semibold uppercase mt-8">Details</h1>
        <div className="flex flex-wrap gap-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Industry</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="subject"
              onChange={handleInputChange}
              value={subject}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Compensation ($USD)</span>
            </label>
            <input
              type="text"
              name="pay"
              placeholder="Type here"
              onChange={handleInputChange}
              value={pay}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <button className="btn btn-success">Save</button>
        </div>
      </form>
    </>
  );
};

export default NewBrandDeal;
