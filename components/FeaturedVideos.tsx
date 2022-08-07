import { AiFillLike } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { toHumanReadableNumbers } from "../utils/humanReadableNumbers";

type AppProps = {
  featuredVideos: [
    {
      id?: string;
      title?: string;
      likeCount?: string;
      viewCount?: string;
    }
  ];
};

const FeaturedVideos = ({ featuredVideos }: AppProps) => {
  return (
    <>
      <h2 className="font-semibold text-lg mb-4">Featured Videos</h2>
      <section className="flex max-w-full justify-between">
        {featuredVideos?.map((video) => {
          return (
            <div
              className="card card-compact w-[32%] bg-base-100 shadow-xl"
              key={video.id}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                height="170"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <h2 className="card-title">{video.title}</h2>
                <div className="flex flex-grow items-end">
                  <p className="flex items-center gap-2">
                    <BsEyeFill />
                    {video.likeCount && toHumanReadableNumbers(video.likeCount)}
                  </p>
                  <p className="flex items-center gap-2">
                    <AiFillLike />
                    {video.viewCount && toHumanReadableNumbers(video.viewCount)}
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <a
                    href="https://www.youtube.com/watch?v=AxV0_1Y4zl0&ab_channel=MarquesBrownlee"
                    target="_blank"
                    className="btn btn-sm btn-primary"
                  >
                    Open Youtube
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default FeaturedVideos;
