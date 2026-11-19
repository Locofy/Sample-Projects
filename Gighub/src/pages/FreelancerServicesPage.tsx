import { FunctionComponent, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, Plus, Star, Trash2, Undo2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { FreelancerService, useGigHubStore } from "../store/useGigHubStore";
import styles from "./FreelancerServices.module.css";

type ListNotice =
  | { added: string }
  | { deleted: FreelancerService; index: number };

type Filter = "All" | "Live" | "Draft";

const FreelancerServicesPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const services = useGigHubStore((state) => state.services);
  const removeService = useGigHubStore((state) => state.removeFreelancerService);
  const restoreService = useGigHubStore(
    (state) => state.restoreFreelancerService,
  );
  const [notice, setNotice] = useState<ListNotice | null>(
    (location.state as ListNotice | null) ?? null,
  );
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 6000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const live = services.filter((service) => service.status === "Live").length;
  const shown =
    filter === "All"
      ? services
      : services.filter((service) => service.status === filter);

  const remove = (service: FreelancerService) => {
    const index = services.findIndex((item) => item.id === service.id);
    removeService(service.id);
    setNotice({ deleted: service, index });
  };

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <button className={styles.back} onClick={() => navigate("/freelancer")}>
          <ArrowLeft size={13} /> Dashboard
        </button>
        <div className={styles.top}>
          <div>
            <h1>Your services</h1>
            <p>
              {services.length} services, {live} live. Clients see live
              services on your public profile.
            </p>
          </div>
          {services.length > 0 && (
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/freelancer/services/new")}
            >
              <Plus size={14} /> Add a service
            </button>
          )}
        </div>

        {notice && "added" in notice && (
          <div className={styles.notice} role="status">
            <CheckCircle2 size={16} color="#6be1a0" /> Saved as a draft.
            Publish it when the gallery is ready.
          </div>
        )}
        {notice && "deleted" in notice && (
          <div className={styles.notice} role="status">
            <Trash2 size={15} /> "{notice.deleted.title}" was deleted.
            <button
              className={styles.secondaryButton}
              onClick={() => {
                restoreService(notice.deleted, notice.index);
                setNotice(null);
              }}
            >
              <Undo2 size={13} /> Undo
            </button>
          </div>
        )}

        {services.length === 0 ? (
          <div className={`${styles.list} ${styles.empty}`}>
            <h3>No services yet</h3>
            <p>
              A service is what clients buy from you. Add your first one and it
              appears on your public profile once published.
            </p>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/freelancer/services/new")}
            >
              <Plus size={14} /> Add your first service
            </button>
          </div>
        ) : (
          <>
            <div className={styles.tabs}>
              {(["All", "Live", "Draft"] as Filter[]).map((option) => (
                <button
                  key={option}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option === "Draft" ? "Drafts" : option}{" "}
                  {option === "All"
                    ? services.length
                    : option === "Live"
                      ? live
                      : services.length - live}
                </button>
              ))}
            </div>
            <div className={styles.list}>
              {shown.map((service) => (
                <div
                  key={service.id}
                  className={`${styles.item} ${
                    notice && "added" in notice && notice.added === service.id
                      ? styles.newItem
                      : ""
                  }`}
                >
                  <img src={service.image} alt="" />
                  <div style={{ minWidth: 0 }}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{service.category}</span>
                      <span
                        className={`${styles.pill} ${
                          service.status === "Draft" ? styles.draft : ""
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                    <h3>{service.title}</h3>
                    <div className={styles.meta}>
                      {service.orders > 0 ? (
                        <span>
                          <Star size={11} fill="currentColor" /> {service.rating}
                        </span>
                      ) : (
                        <span>No reviews yet</span>
                      )}
                      <span>{service.orders} orders</span>
                      <b>From ${service.price}</b>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.iconButton}
                      aria-label={`View ${service.title}`}
                      onClick={() =>
                        navigate(`/freelancer/services/${service.id}`)
                      }
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className={styles.iconButton}
                      aria-label={`Delete ${service.title}`}
                      onClick={() => remove(service)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </AppLayout>
  );
};

export default FreelancerServicesPage;
