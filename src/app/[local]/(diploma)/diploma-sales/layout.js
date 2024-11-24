import { Wrapper } from "@/layout";

const RootLayout = ({ children }) => {
  return <Wrapper hideHeader={false}>{children}</Wrapper>;
};

export default RootLayout;
