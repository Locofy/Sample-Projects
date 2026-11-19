import { FunctionComponent, useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Heart,
  Image as ImageIcon,
  LayoutTemplate,
  Smartphone,
  PenTool,
  Sparkles,
  Star,
  Video,
  WandSparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import DesignerCard from "../components/DesignerCard";
import GigCard from "../components/GigCard";
import {
  categories,
  designers,
  gigs,
  useGigHubStore,
} from "../store/useGigHubStore";
import styles from "./HomePage.module.css";

const categoryIcon = (icon: string) => {
  const props = { size: 16, strokeWidth: 1.8 };
  switch (icon) {
    case "layout":
      return <LayoutTemplate {...props} />;
    case "sparkles":
      return <Sparkles {...props} />;
    case "mobile":
      return <Smartphone {...props} />;
    case "video":
      return <Video {...props} />;
    case "image":
      return <ImageIcon {...props} />;
    case "book":
      return <BookOpen {...props} />;
    case "pen":
      return <PenTool {...props} />;
    default:
      return <Heart {...props} />;
  }
};

const HomePage: FunctionComponent = () => {
  const search = useGigHubStore((state) => state.search);
  const selectedCategory = useGigHubStore((state) => state.selectedCategory);
  const setCategory = useGigHubStore((state) => state.setCategory);
  const openBrief = useGigHubStore((state) => state.openBrief);
  const showToast = useGigHubStore((state) => state.showToast);

  const filteredGigs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return gigs.filter((gig) => {
      const matchesCategory =
        selectedCategory === "All" || gig.category === selectedCategory;
      const matchesQuery =
        !query ||
        [gig.title, gig.seller, gig.category, ...gig.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [search, selectedCategory]);

  return (
    <AppLayout className={styles.page}>
      <main>
        <div className={styles.content}>
          <section className={styles.hero}>
            <motion.div
              className={styles.heroCopy}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className={styles.eyebrow}>
                <WandSparkles size={15} /> The creative marketplace for
                ambitious teams
              </span>
              <h1>
                Hire the best <span>freelancers</span> for your design projects
              </h1>
              <p>
                Bring your next idea to life with independent creatives who care
                about the details.
              </p>
              <div className={styles.heroActions}>
                <button
                  className={styles.primaryButton}
                  onClick={() =>
                    document
                      .getElementById("discover")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore services <ArrowRight size={16} />
                </button>
                <button className={styles.secondaryButton} onClick={openBrief}>
                  Post a project
                </button>
              </div>
              <div className={styles.trustRow}>
                <span>
                  <Star size={13} fill="currentColor" /> 4.9/5 average rating
                </span>
                <span>
                  <BriefcaseBusiness size={13} /> 2,400+ projects delivered
                </span>
              </div>
            </motion.div>
            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className={styles.heroGlow} />
              <img
                src="/figma-assets/figma-03.png"
                alt="GigHub illustrated mascot"
              />
              <div className={styles.floatingCard}>
                <span className={styles.pulse} />
                <div>
                  <strong>Designers online</strong>
                  <span>Ready to collaborate</span>
                </div>
                <span className={styles.floatingNumber}>128</span>
              </div>
            </motion.div>
          </section>

          <section className={styles.quickActions} aria-label="Quick actions">
            <button className={styles.quickCard} onClick={openBrief}>
              <span className={[styles.quickIcon, styles.purpleIcon].join(" ")}>
                <BriefcaseBusiness size={22} />
              </span>
              <span>
                <strong>Start a project</strong>
                <small>
                  Create a brief to get custom offers from great designers
                </small>
              </span>
              <ArrowRight size={18} />
            </button>
            <button
              className={styles.quickCard}
              onClick={() =>
                showToast("Your business profile is ready to set up")
              }
            >
              <span className={[styles.quickIcon, styles.tealIcon].join(" ")}>
                <Sparkles size={22} />
              </span>
              <span>
                <strong>Enhanced visibility</strong>
                <small>Attract more highly-rated designers to your brief</small>
              </span>
              <ArrowRight size={18} />
            </button>
          </section>

          <section className={styles.discovery} id="discover">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.kicker}>
                  Find your creative partner
                </span>
                <h2>What do you need help with?</h2>
              </div>
              <span className={styles.resultCount}>
                {filteredGigs.length} services available
              </span>
            </div>
            <div className={styles.categoryScroller}>
              <button
                className={[
                  styles.categoryPill,
                  selectedCategory === "All" ? styles.categoryActive : "",
                ].join(" ")}
                onClick={() => setCategory("All")}
              >
                <Sparkles size={16} /> All services
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={[
                    styles.categoryPill,
                    selectedCategory === category.label
                      ? styles.categoryActive
                      : "",
                  ].join(" ")}
                  onClick={() => setCategory(category.label)}
                >
                  {categoryIcon(category.icon)} {category.label}
                </button>
              ))}
            </div>
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.kicker}>Fresh from the community</span>
                <h2>Gigs people are loving</h2>
              </div>
              <button
                className={styles.textButton}
                onClick={() => setCategory("All")}
              >
                View all gigs <ArrowRight size={15} />
              </button>
            </div>
            {filteredGigs.length > 0 ? (
              <div className={styles.gigGrid}>
                {filteredGigs.map((gig, index) => (
                  <motion.div
                    key={gig.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                  >
                    <GigCard gig={gig} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Sparkles size={22} />
                <strong>No gigs found</strong>
                <span>Try another search or browse all services.</span>
                <button
                  onClick={() => {
                    setCategory("All");
                    useGigHubStore.getState().setSearch("");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          <section className={styles.portfolioSection}>
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.kicker}>A little inspiration</span>
                <h2>Projects that made us pause</h2>
              </div>
              <button
                className={styles.textButton}
                onClick={() =>
                  showToast("More project inspiration is on its way")
                }
              >
                View all projects <ArrowRight size={15} />
              </button>
            </div>
            <div className={styles.portfolioGrid}>
              {[
                "figma-07.jpeg",
                "figma-09.jpeg",
                "figma-11.jpeg",
                "figma-12.jpeg",
                "figma-14.jpeg",
                "figma-17.jpeg",
              ].map((asset, index) => (
                <button
                  key={asset}
                  className={styles.portfolioTile}
                  onClick={() =>
                    showToast("Project inspiration saved to your board")
                  }
                >
                  <img src={`/figma-assets/${asset}`} alt="" />
                  <span>
                    {
                      [
                        "Product stories",
                        "Brand refresh",
                        "Good things grow",
                        "Montréal winter",
                        "The weekend edit",
                        "Made for momentum",
                      ][index]
                    }
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.designersSection} id="designers">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.kicker}>People behind the pixels</span>
                <h2>Pick from highly-rated designers</h2>
              </div>
              <button
                className={styles.textButton}
                onClick={() => showToast("Designer directory is coming soon")}
              >
                View all designers <ArrowRight size={15} />
              </button>
            </div>
            <div className={styles.designerGrid}>
              {designers.map((designer, index) => (
                <motion.div
                  key={designer.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <DesignerCard designer={designer} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className={styles.proBanner}>
            <img src="/figma-assets/figma-06.png" alt="" />
            <div>
              <span className={styles.kicker}>
                For teams that are moving fast
              </span>
              <h2>
                <strong>Hire faster</strong> and manage payments with dedicated
                tools
              </h2>
              <p>
                Keep your projects moving with a simple workflow built for
                repeat collaboration.
              </p>
              <button
                className={styles.outlineButton}
                onClick={() => showToast("GigHub Pro is coming soon")}
              >
                Convert to Pro <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </AppLayout>
  );
};

export default HomePage;
