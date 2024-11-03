import { Wrapper } from "@/layout";

const RootLayout = ({ children }) => {
  return <Wrapper isSticky={false}>{children}</Wrapper>;
};

export default RootLayout;
