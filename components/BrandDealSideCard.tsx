import { tohumanReadableTime } from "../utils/humanReadableTime";
import { IBrandDeal } from "../@types/brandDeal";

type AppProps = {
  brandDeal: IBrandDeal;
  brandDealDetails?: IBrandDeal;
  selectBrandDeal: (id: number) => void;
};

const BrandDealSideCard = ({
  brandDeal,
  brandDealDetails,
  selectBrandDeal,
}: AppProps) => {
  const handleSelectBrandDeal = () => {
    selectBrandDeal(brandDeal.id);
  };
  return (
    <div
      className={`grid card bg-base-300 rounded-box p-8 gap-2 overflow-visible ${
        brandDeal.id === brandDealDetails?.id ? "border-r-4 border-primary" : ""
      }`}
      onClick={handleSelectBrandDeal}
    >
      <h1 className="card-title">{brandDeal.title}</h1>
      <div className="badge badge-primary">Pay: $ {brandDeal.pay}</div>
      <div className="badge badge-secondary">Industry: {brandDeal.subject}</div>
      <p className="badge">
        Posted {tohumanReadableTime(brandDeal.updated_at)} ago
      </p>
    </div>
  );
};

export default BrandDealSideCard;
