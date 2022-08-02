import Navbar from "./Navbar";

type Props = {
  children?: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center max-w-7xl m-auto">
      <Navbar />
      <main className="flex w-full justify-between items-center px-8 gap-6">
        {children}
      </main>
    </div>
  );
};
export default Layout;
