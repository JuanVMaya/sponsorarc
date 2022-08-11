import { useUser } from "../context/userContext";
import Link from "next/link";

const Home = () => {
  const { user, logIn } = useUser();

  return (
    <>
      <div className="flex-col items-center">
        <div className="flex items-center justify-center sm:justify-between">
          <div className="flex flex-col gap-4 w-5/12 sm:gap-8">
            <h1 className="font-sans font-bold text-xl">
              Streamlining business between brands and content creators
            </h1>
            <p>
              Your customers drive your business, which is why it’s so important
              to reach the right audience for your products and services!
            </p>
            <Link href="/profile" onClick={() => logIn(user)}>
              <a>
                <button className="btn btn-primary">Get Started</button>
              </a>
            </Link>
          </div>
          <img
            className="hidden sm:block sm:w-7/12"
            src="/images/social-dashboard.svg"
            alt="social dashboard positioning illustration"
          />
        </div>
        <div className="flex flex-col items-center sm:justify-between gap-y-4 sm:flex-row sm:mt-12">
          <div className="flex items-center flex-col w-full sm:w-3/12 ">
            <img
              className="w-6/12"
              src="/images/improve-ROI.svg"
              alt="tachometer pointing to 2o'clock position to represent measurement of ROI"
            />
            <h1 className="text-semibold text-center">
              Improve your brand awareness, engagement and ROI
            </h1>
          </div>
          <div className="flex items-center flex-col w-full sm:w-3/12">
            <img
              className="w-6/12"
              src="/images/shine-light.svg"
              alt="tachometer pointing to 2o'clock position to represent measurement of ROI"
            />
            <h1 className="text-semibold text-center">
              Attract the correct audience to relevant focus points
            </h1>
          </div>
          <div className="flex items-center flex-col w-full sm:w-3/12">
            <img
              className="w-6/12"
              src="/images/seed-growth.svg"
              alt="tachometer pointing to 2o'clock position to represent measurement of ROI"
            />
            <h1 className="text-semibold text-center">
              Grow your business with organic customers
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
