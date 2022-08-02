type Props = {
  children?: React.ReactNode;
};
const NestedLayout = ({ children }: Props) => {
  return <div className="flex">{children}</div>;
};
export default NestedLayout;
