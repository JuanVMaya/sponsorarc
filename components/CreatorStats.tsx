import { useUser } from "../context/userContext";
import { toHumanReadableNumbers } from "../utils/humanReadableNumbers";
import { tohumanReadableTime } from "../utils/humanReadableTime";

const CreatorStats = () => {
  const { user } = useUser();

  return (
    <>
      <h1 className="card-title mb-4">Stats</h1>
      <div className="flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Experience</div>
            <div className="stat-value">
              {tohumanReadableTime(user.creatorStartDate)}
            </div>
            <div className="stat-desc">Time making content</div>
          </div>
          <div className="stat">
            <div className="stat-title">Channel Views</div>
            <div className="stat-value">
              {toHumanReadableNumbers(user.totalViews)}
            </div>
            <div className="stat-desc">Video reproductions</div>
          </div>
          <div className="stat">
            <div className="stat-title">Videos Created</div>
            <div className="stat-value">
              {toHumanReadableNumbers(user.videoCount)}
            </div>
            <div className="stat-desc">Content created since start</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorStats;
