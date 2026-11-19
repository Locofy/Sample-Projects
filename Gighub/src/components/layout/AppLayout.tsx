import { FunctionComponent, ReactNode } from "react";
import BriefModal from "../BriefModal";
import Footer from "../Footer";
import Header from "../Header";
import { useGigHubStore } from "../../store/useGigHubStore";

type AppLayoutProps = {
  children: ReactNode;
  className?: string;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({
  children,
  className = "",
}) => {
  const briefOpen = useGigHubStore((state) => state.briefOpen);

  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
      {briefOpen && <BriefModal />}
    </div>
  );
};

export default AppLayout;
