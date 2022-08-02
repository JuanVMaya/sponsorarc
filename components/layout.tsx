import Navbar from "./Navbar";

type Props = {
  children?: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
