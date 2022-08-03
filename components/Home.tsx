import * as React from "react";
import { useUser } from "../context/userContext";
import { RiSettings3Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import {AiFillEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const { user, logIn } = useUser();

  return user.loggedIn ? (
    <div className="self-start flex gap-8 flex-grow h-full">
      <div className="card w-3/13 glass pt-8 self-start">
        <figure>
          <img
            className="rounded-full max-w-xs"
            src="https://yt3.ggpht.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK0qOST7fiA=s88-c-k-c0x00ffffff-no-rj"
            alt="Marques Brownlee"
          />
        </figure>
        <div className="card-body p-8">
          <h2 className="card-title">
            {user.first_name} {user.last_name}
          </h2>
          <p className="font-semibold">
            {user.represent} {user?.subscriber_count}
          </p>
          <p>Industry: {user.industry}</p>
          <p>Location: {user.location}</p>
          <div className="card-actions flex flex-col">
            <button className="btn btn-primary mt-8">
              <RiSettings3Fill />
              &nbsp; Edit Profile
            </button>
            <button className="btn btn-secondary mt-4">
              <AiFillFileAdd />
              &nbsp; New Brand Deal
            </button>
          </div>
        </div>
      </div>
      <article className="flex flex-grow ">
        <div className="card w-full glass px-8 pt-8 gap-2">
          <div className="flex flex-col w-full border-opacity-50">
            <div className="grid card bg-base-300 rounded-box p-8">
              <h1 className="card-title">Hello {user.first_name}</h1>
              <p>Description: {user.description}</p>
            </div>
            <div className="divider"></div>
            <h2 className="font-semibold text-lg">Featured Videos</h2>
            <div className="card card-compact w-4/12 bg-base-100 shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/AxV0_1Y4zl0"
                height="200"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>                    
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p><AiFillEye/></p>
                <div className="card-actions justify-end">
                  <a
                    href="https://www.youtube.com/watch?v=AxV0_1Y4zl0&ab_channel=MarquesBrownlee"
                    target="_blank"
                    className="btn btn-primary"
                  >
                   Go to Youtube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
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
