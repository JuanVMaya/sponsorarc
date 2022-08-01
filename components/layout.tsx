import Navbar from "./Navbar";

type Props = {
  children?: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
