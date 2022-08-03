import Navbar from "./Navbar";

type Props = {
  children?: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center max-w-7xl m-auto h-screen">
      <Navbar />
      <main className="flex flex-grow w-full items-center px-8 pb-8 gap-6">
        {children}
      </main>
    </div>
  );
};
export default Layout;
