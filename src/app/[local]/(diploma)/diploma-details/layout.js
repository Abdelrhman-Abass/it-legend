import { Wrapper } from "@/layout";

const RootLayout = ({ children }) => {
  return (
    <Wrapper no_top_bar={true} isSticky={true} hideFooter={true}>
      {children}
    </Wrapper>
  );
};

export default RootLayout;
