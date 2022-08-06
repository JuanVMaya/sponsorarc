import { toHumanReadableNumbers } from "../utils/humanReadableNumbers";
import { tohumanReadableTime } from "../utils/humanReadableTime";

type AppProps = {
  creatorStartDate?: string;
  totalViews?: string;
  videoCount?: string;
};

const CreatorStats = ({
  creatorStartDate,
  totalViews,
  videoCount,
}: AppProps) => {
  return (
    <>
      <h1 className="card-title mb-4">Stats</h1>
      <div className="flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Experience</div>
            <div className="stat-value">
              {tohumanReadableTime(creatorStartDate)}
            </div>
            <div className="stat-desc">Time making content</div>
          </div>
          <div className="stat">
            <div className="stat-title">Channel Views</div>
            <div className="stat-value">
              {toHumanReadableNumbers(totalViews)}
            </div>
            <div className="stat-desc">Total video reproductions</div>
          </div>
          <div className="stat">
            <div className="stat-title">Videos Created</div>
            <div className="stat-value">
              {toHumanReadableNumbers(videoCount)}
            </div>
            <div className="stat-desc">Content created since start</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorStats;
