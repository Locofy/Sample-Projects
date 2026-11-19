import { FunctionComponent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Trash2 } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useGigHubStore } from "../store/useGigHubStore";
import styles from "./FreelancerServices.module.css";

const FreelancerServiceDetailPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const services = useGigHubStore((state) => state.services);
  const removeService = useGigHubStore((state) => state.removeFreelancerService);
  const [confirming, setConfirming] = useState(false);
  const keepRef = useRef<HTMLButtonElement>(null);
  const index = services.findIndex((item) => item.id === serviceId);
  const service = services[index];

  useEffect(() => {
    if (!confirming) return;
    keepRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirming(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirming]);

  if (!service) return <Navigate to="/freelancer/services" replace />;

  const remove = () => {
    removeService(service.id);
    navigate("/freelancer/services", { state: { deleted: service, index } });
  };

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <button
          className={styles.back}
          onClick={() => navigate("/freelancer/services")}
        >
          <ArrowLeft size={13} /> Your services
        </button>
        <div className={styles.detail}>
          <div className={styles.card}>
            <img className={styles.hero} src={service.image} alt="" />
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
            <h2>{service.title}</h2>
            {service.description && <p>{service.description}</p>}
          </div>
          <div className={styles.card}>
            <div className={styles.stats}>
              <div>
                <strong>${service.price}</strong>
                <span>From</span>
              </div>
              <div>
                <strong>{service.orders}</strong>
                <span>Orders</span>
              </div>
              <div>
                <strong>{service.orders > 0 ? service.rating : "None"}</strong>
                <span>Rating</span>
              </div>
            </div>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate(`/gig/${service.id}`)}
            >
              <ArrowUpRight size={14} /> View as client
            </button>
            <button
              className={`${styles.secondaryButton} ${styles.dangerText}`}
              style={{ marginTop: "auto" }}
              onClick={() => setConfirming(true)}
            >
              <Trash2 size={14} /> Delete service
            </button>
          </div>
        </div>
        {confirming && (
          <div className={styles.scrim} onClick={() => setConfirming(false)}>
            <div
              className={styles.dialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="delete-title">Delete this service?</h3>
              <p>
                "{service.title}" leaves your profile and search.
                {service.orders > 0 &&
                  ` Its ${service.orders} past orders and reviews stay in your history.`}
              </p>
              <div className={styles.footer}>
                <button
                  ref={keepRef}
                  className={styles.secondaryButton}
                  onClick={() => setConfirming(false)}
                >
                  Keep it
                </button>
                <button
                  className={`${styles.primaryButton} ${styles.dangerButton}`}
                  onClick={remove}
                >
                  <Trash2 size={14} /> Delete service
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default FreelancerServiceDetailPage;
