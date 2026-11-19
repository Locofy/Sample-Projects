import { FunctionComponent, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Compass,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import { useGigHubStore } from "../store/useGigHubStore";
import styles from "./InformationPage.module.css";

type InformationPageProps = { variant: "about" | "how" };

const principles = [
  {
    icon: HeartHandshake,
    title: "Human first",
    text: "Great work starts with respect, clear expectations, and room for people to do their best thinking.",
  },
  {
    icon: Sparkles,
    title: "Craft matters",
    text: "We make space for the details that turn a deliverable into something people are proud to share.",
  },
  {
    icon: Zap,
    title: "Momentum, together",
    text: "A good process should create energy. We help teams move from idea to done without the usual friction.",
  },
];

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Tell us what you’re making",
    text: "Share the context, goal, budget, timeline, and references that will help a creative partner understand the brief.",
  },
  {
    number: "02",
    icon: Users,
    title: "Meet your shortlist",
    text: "Browse tailored gigs, compare portfolios, and start conversations with designers who match your direction.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Make the work together",
    text: "Give feedback in one place, keep decisions clear, and watch your project take shape with a trusted partner.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch with confidence",
    text: "Receive polished files, keep your source assets, and return to the same creative partner whenever you need them.",
  },
];

const faqs = [
  {
    question: "How do I choose the right designer?",
    answer:
      "Start with the work. Look for a portfolio that feels close to your desired direction, then use the first conversation to check communication style, timing, and availability.",
  },
  {
    question: "Can I bring my own brief and references?",
    answer:
      "Absolutely. The more context you share, the easier it is for a designer to give you a focused, useful proposal. You can attach files directly to your brief.",
  },
  {
    question: "What happens after I hire someone?",
    answer:
      "Your project moves into a shared conversation where you can align on milestones, review concepts, and keep every decision close to the work.",
  },
  {
    question: "Is GigHub only for design teams?",
    answer:
      "No. GigHub is built for anyone who needs thoughtful creative work — from a first-time founder to an established team launching something new.",
  },
];

const InformationPage: FunctionComponent<InformationPageProps> = ({
  variant,
}) => {
  const openBrief = useGigHubStore((state) => state.openBrief);
  const showToast = useGigHubStore((state) => state.showToast);
  const [openFaq, setOpenFaq] = useState(0);
  const isAbout = variant === "about";

  return (
    <AppLayout className={styles.page}>
      <main>
        <section className={styles.companyHero}>
          <div className={styles.companyHeroCopy}>
            <span className={styles.kicker}>
              {isAbout
                ? "A little more about us"
                : "A clearer way to work together"}
            </span>
            <h1>
              {isAbout ? (
                <>
                  Good work is <span>better together.</span>
                </>
              ) : (
                <>
                  From first idea to <span>final delivery.</span>
                </>
              )}
            </h1>
            <p>
              {isAbout
                ? "GigHub connects ambitious teams with independent creatives who bring care, curiosity, and a point of view to every project."
                : "A simple, human workflow for finding the right creative partner, getting aligned, and making something you’re proud of."}
            </p>
            <div className={styles.heroActions}>
              <button
                className={styles.primaryButton}
                onClick={
                  isAbout
                    ? () => showToast("Thanks for being curious about GigHub")
                    : openBrief
                }
              >
                {isAbout ? "Meet the community" : "Start a project"}{" "}
                <ArrowRight size={16} />
              </button>
              <Link
                className={styles.secondaryButton}
                to={isAbout ? "/how-it-works" : "/about"}
              >
                {isAbout ? "How it works" : "About GigHub"}
              </Link>
            </div>
          </div>
          <div className={styles.companyHeroVisual}>
            <div className={styles.visualGlow} />
            <img
              src="/figma-assets/figma-03.png"
              alt="GigHub mascot illustration"
            />
            <div className={styles.heroStat}>
              <strong>2,400+</strong>
              <span>projects delivered with care</span>
            </div>
          </div>
        </section>

        {isAbout ? (
          <>
            <section className={styles.storyGrid}>
              <div>
                <span className={styles.sectionLabel}>Why we exist</span>
                <h2>
                  Creative work is personal. The process should feel that way
                  too.
                </h2>
              </div>
              <div className={styles.storyCopy}>
                <p>
                  GigHub started with a simple frustration: finding a great
                  creative partner shouldn’t feel like searching through a sea
                  of generic listings. Teams deserve a place where the work is
                  visible, the people are real, and the next step is always
                  clear.
                </p>
                <p>
                  We’re building a marketplace where independent designers can
                  show what they do best — and where ambitious people can find
                  the creative energy to make their next idea real.
                </p>
              </div>
            </section>
            <section className={styles.statsRow}>
              <div>
                <strong>4.9/5</strong>
                <span>average client rating</span>
              </div>
              <div>
                <strong>128</strong>
                <span>designers online today</span>
              </div>
              <div>
                <strong>38</strong>
                <span>creative disciplines</span>
              </div>
              <div>
                <strong>96%</strong>
                <span>repeat collaboration</span>
              </div>
            </section>
            <section className={styles.principles}>
              <div className={styles.sectionHeading}>
                <span className={styles.sectionLabel}>What guides us</span>
                <h2>Small principles, big difference.</h2>
              </div>
              <div className={styles.principleGrid}>
                {principles.map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <span className={styles.principleIcon}>
                      <Icon size={21} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className={styles.imageStory}>
              <img
                src="/figma-assets/figma-07.jpeg"
                alt="Colorful product design work"
              />
              <div>
                <span className={styles.sectionLabel}>
                  Made for the messy middle
                </span>
                <h2>Because the best ideas get better with a little help.</h2>
                <p>
                  Whether you’re still shaping the first thought or polishing
                  the last detail, GigHub gives you the people and the structure
                  to keep going.
                </p>
                <Link to="/how-it-works" className={styles.textLink}>
                  See how it works <ArrowRight size={15} />
                </Link>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={styles.stepsSection}>
              <div className={styles.sectionHeading}>
                <span className={styles.sectionLabel}>
                  A simple four-step flow
                </span>
                <h2>Less back-and-forth. More getting somewhere.</h2>
                <p>
                  We’ve kept the process focused so you can spend your time
                  making decisions that matter.
                </p>
              </div>
              <div className={styles.stepsGrid}>
                {steps.map(({ number, icon: Icon, title, text }, index) => (
                  <motion.article
                    key={number}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <span className={styles.stepNumber}>{number}</span>
                    <span className={styles.stepIcon}>
                      <Icon size={20} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {index < steps.length - 1 && (
                      <span className={styles.stepLine} />
                    )}
                  </motion.article>
                ))}
              </div>
            </section>
            <section className={styles.trustSection}>
              <div className={styles.trustVisual}>
                <div className={styles.trustOrb}>
                  <ShieldCheck size={38} />
                </div>
                <span className={styles.trustChip}>
                  <BadgeCheck size={15} /> Verified creatives
                </span>
                <span className={styles.trustChip}>
                  <Check size={15} /> Protected payments
                </span>
              </div>
              <div>
                <span className={styles.sectionLabel}>Built for trust</span>
                <h2>A smoother process makes better work possible.</h2>
                <p>
                  Keep the brief, feedback, files, and next steps in one place.
                  GigHub gives both sides the clarity to collaborate confidently
                  from the first hello to the final handoff.
                </p>
                <ul>
                  <li>
                    <Check size={15} /> Clear project expectations from day one
                  </li>
                  <li>
                    <Check size={15} /> Source files and usage rights stay
                    transparent
                  </li>
                  <li>
                    <Check size={15} /> A human support team when you need a
                    hand
                  </li>
                </ul>
              </div>
            </section>
            <section className={styles.faqSection}>
              <div className={styles.sectionHeading}>
                <span className={styles.sectionLabel}>Questions, answered</span>
                <h2>Everything you need to get started.</h2>
              </div>
              <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                  <div
                    className={[
                      styles.faqItem,
                      openFaq === index ? styles.faqOpen : "",
                    ].join(" ")}
                    key={faq.question}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={17} />
                    </button>
                    {openFaq === index && <p>{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <section className={styles.companyCta}>
          <div>
            <span className={styles.kicker}>
              {isAbout
                ? "Ready when you are"
                : "Your next good idea is waiting"}
            </span>
            <h2>
              {isAbout
                ? "Make something meaningful with us."
                : "Let’s make the next step feel easy."}
            </h2>
          </div>
          <button className={styles.outlineButton} onClick={openBrief}>
            {isAbout ? "Start a project" : "Create your brief"}{" "}
            <ArrowRight size={15} />
          </button>
        </section>
      </main>
    </AppLayout>
  );
};

export default InformationPage;
