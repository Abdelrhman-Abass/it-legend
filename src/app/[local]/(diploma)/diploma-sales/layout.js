import { Wrapper } from "@/layout";

const RootLayout = ({ children }) => {
  return <Wrapper hideHeader={true}>{children}</Wrapper>;
};

export default RootLayout;
