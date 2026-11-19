import { FormEvent, FunctionComponent, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useGigHubStore } from "../store/useGigHubStore";
import styles from "./FreelancerServices.module.css";

const CATEGORIES = [
  "Product design",
  "Brand identity",
  "Prototyping",
  "Presentation design",
];

const COVERS = [
  "/figma-assets/figma-07.jpeg",
  "/figma-assets/figma-09.jpeg",
  "/figma-assets/figma-12.jpeg",
];

const FreelancerServiceFormPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const addService = useGigHubStore((state) => state.addFreelancerService);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(COVERS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const titleError =
    title.trim().length < 15
      ? "Write at least 15 characters so clients know what they get."
      : null;
  const priceNumber = Number(price);
  const priceError =
    !Number.isInteger(priceNumber) || priceNumber < 5
      ? "Set a price of $5 or more."
      : null;

  const stepPrice = (delta: number) => {
    const current = Number.isFinite(priceNumber) ? Math.round(priceNumber) : 0;
    setPrice(String(Math.max(5, current + delta)));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (titleError) return titleRef.current?.focus();
    if (priceError) return priceRef.current?.focus();
    setSaving(true);
    const id = `service-${Date.now()}`;
    window.setTimeout(() => {
      addService({
        id,
        title: title.trim(),
        category,
        image: cover,
        price: priceNumber,
        rating: 0,
        orders: 0,
        status: "Draft",
        description: description.trim(),
      });
      navigate("/freelancer/services", { state: { added: id } });
    }, 400);
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
        <div className={styles.top}>
          <div>
            <h1>Add a service</h1>
            <p>Saved as a draft first, so nothing goes live by accident.</p>
          </div>
        </div>
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.card}>
            <div
              className={`${styles.field} ${
                submitted && titleError ? styles.invalid : ""
              }`}
            >
              <label htmlFor="service-title">Service title*</label>
              <input
                id="service-title"
                ref={titleRef}
                value={title}
                disabled={saving}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="I will design..."
                aria-invalid={Boolean(submitted && titleError)}
              />
              {submitted && titleError && (
                <span className={styles.error}>
                  <AlertCircle size={13} /> {titleError}
                </span>
              )}
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="service-category">Category</label>
                <select
                  id="service-category"
                  value={category}
                  disabled={saving}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {CATEGORIES.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div
                className={`${styles.field} ${
                  submitted && priceError ? styles.invalid : ""
                }`}
              >
                <label htmlFor="service-price">Starting price (USD) *</label>
                <div className={styles.priceInput}>
                  <span className={styles.currency} aria-hidden="true">
                    $
                  </span>
                  <input
                    id="service-price"
                    ref={priceRef}
                    inputMode="numeric"
                    value={price}
                    disabled={saving}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="150"
                    aria-invalid={Boolean(submitted && priceError)}
                  />
                  <div className={styles.stepper}>
                    <button
                      type="button"
                      aria-label="Decrease price"
                      disabled={saving}
                      onClick={() => stepPrice(-5)}
                    >
                      <Minus size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label="Increase price"
                      disabled={saving}
                      onClick={() => stepPrice(5)}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                {submitted && priceError && (
                  <span className={styles.error}>
                    <AlertCircle size={13} /> {priceError}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="service-description">What is included</label>
              <textarea
                id="service-description"
                value={description}
                disabled={saving}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.field}>
              <label>Cover image</label>
              <img className={styles.cover} src={cover} alt="" />
              <div className={styles.covers}>
                {COVERS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={cover === option}
                    aria-label="Use this cover"
                    disabled={saving}
                    onClick={() => setCover(option)}
                  >
                    <img src={option} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.footer}>
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={saving}
                onClick={() => navigate("/freelancer/services")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save draft"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </AppLayout>
  );
};

export default FreelancerServiceFormPage;
