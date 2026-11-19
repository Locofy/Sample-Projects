import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import GigDetailsPage from "./pages/GigDetailsPage";
import InboxPage from "./pages/InboxPage";
import InformationPage from "./pages/InformationPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SavedGigsPage from "./pages/SavedGigsPage";
import ProfilePage from "./pages/ProfilePage";
import FreelancerDashboardPage from "./pages/FreelancerDashboardPage";
import FreelancerProfilePage from "./pages/FreelancerProfilePage";
import FreelancerServicesPage from "./pages/FreelancerServicesPage";
import FreelancerServiceFormPage from "./pages/FreelancerServiceFormPage";
import FreelancerServiceDetailPage from "./pages/FreelancerServiceDetailPage";
import { useGigHubStore } from "./store/useGigHubStore";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const toast = useGigHubStore((state) => state.toast);
  const clearToast = useGigHubStore((state) => state.clearToast);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "GigHub — Find your next creative partner";
        metaDescription =
          "A focused marketplace for finding exceptional freelance designers.";
        break;
      case "/notifications":
        title = "GigHub — Notifications & messages";
        metaDescription =
          "Keep up with your project activity and conversations on GigHub.";
        break;
      case "/search":
        title = "GigHub — Search results";
        metaDescription =
          "Search independent creatives and find the right service for your next project.";
        break;
      case "/saved":
        title = "GigHub — Saved gigs";
        metaDescription = "Review your saved creative services on GigHub.";
        break;
      case "/profile":
        title = "GigHub — Your profile";
        metaDescription =
          "Manage your GigHub workspace, activity, and preferences.";
        break;
      case "/freelancer":
        title = "GigHub — Freelancer workspace";
        metaDescription =
          "Find better briefs, manage your services, and grow your freelance business on GigHub.";
        break;
      case "/freelancer/profile":
        title = "GigHub — Freelancer profile";
        metaDescription =
          "Keep your freelancer profile polished and ready for the right opportunities.";
        break;
      case "/about":
        title = "GigHub — About us";
        metaDescription =
          "Learn why GigHub exists and what guides the marketplace.";
        break;
      case "/how-it-works":
        title = "GigHub — How it works";
        metaDescription =
          "See how GigHub helps teams find creative partners and move projects forward.";
        break;
      default:
        title = "GigHub — Creative services marketplace";
        metaDescription = "Discover and hire independent creatives on GigHub.";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gig/:gigId" element={<GigDetailsPage />} />
        <Route path="/notifications" element={<InboxPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/saved" element={<SavedGigsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/freelancer" element={<FreelancerDashboardPage />} />
        <Route path="/freelancer/profile" element={<FreelancerProfilePage />} />
        <Route path="/freelancer/services" element={<FreelancerServicesPage />} />
        <Route
          path="/freelancer/services/new"
          element={<FreelancerServiceFormPage />}
        />
        <Route
          path="/freelancer/services/:serviceId"
          element={<FreelancerServiceDetailPage />}
        />
        <Route path="/about" element={<InformationPage variant="about" />} />
        <Route
          path="/how-it-works"
          element={<InformationPage variant="how" />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            role="status"
          >
            <CheckCircle2 size={18} />
            <span>{toast}</span>
            <button aria-label="Dismiss notification" onClick={clearToast}>
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default App;
