import { useUser } from "../context/userContext";
import { tohumanReadableTime } from "../utils/humanReadableTime";

const BrandDeals = () => {
  const { user } = useUser();

  return (
    <>
      <h2 className="font-semibold text-lg mb-4">Brand Deals</h2>
      <section className="flex max-w-full justify-between">
        {user.brandDeals?.map((deal) => {
          return (
            <div
              className="card card-compact w-[32%] bg-base-100 shadow-xl"
              key={deal.id}
            >
              <div className="card-body">
                <h2 className="card-title">{deal.title}</h2>
                <p>{deal.description}</p>
                <p className="stat-title">Industry</p>
                <div className="badge badge-secondary font-semibold">
                  {deal.subject}
                </div>
                <p className="stat-title">Compensation</p>
                <div className="badge badge-success font-semibold">
                  $ {deal.pay}
                </div>
                <p className="stat-title">Posted</p>
                <div className="badge">
                  {tohumanReadableTime(deal.updated_at)} ago
                </div>
                <div className="card-actions justify-end">
                  <a className="btn btn-primary">Edit</a>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default BrandDeals;
