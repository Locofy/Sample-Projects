import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category = {
  id: string;
  label: string;
  icon: string;
};

export type UserMode = "employer" | "freelancer";

export type Gig = {
  id: string;
  image: string;
  avatar: string;
  seller: string;
  sellerRole: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  delivery: string;
  description: string;
  tags: string[];
};

export type Designer = {
  id: string;
  avatar: string;
  name: string;
  description: string;
  rating: number;
  location: string;
};

export type Review = {
  id: string;
  avatar: string;
  name: string;
  location: string;
  rating: number;
  text: string;
};

export type NotificationItem = {
  id: string;
  type: "message" | "brief" | "system" | "offer";
  title: string;
  body: string;
  time: string;
  avatar?: string;
};

export type MessageItem = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  avatar: string;
  unread: boolean;
};

export type FreelancerBrief = {
  id: string;
  client: string;
  clientAvatar: string;
  title: string;
  category: string;
  budget: string;
  posted: string;
  proposals: number;
  description: string;
  tags: string[];
  match: number;
};

export type FreelancerService = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  orders: number;
  status: "Live" | "Draft";
  description?: string;
};

export const categories: Category[] = [
  { id: "website", label: "Website", icon: "layout" },
  { id: "logos", label: "Logos", icon: "sparkles" },
  { id: "mobile", label: "Mobile App", icon: "mobile" },
  { id: "video", label: "Video & Animation", icon: "video" },
  { id: "poster", label: "Poster", icon: "image" },
  { id: "book", label: "Book Cover", icon: "book" },
  { id: "photo", label: "Photo Editing", icon: "pen" },
  { id: "social", label: "Social Media Banner", icon: "heart" },
];

const image = (name: string) => `/figma-assets/${name}`;

export const gigs: Gig[] = [
  {
    id: "website-starter",
    image: image("figma-02.jpeg"),
    avatar: image("figma-01.jpeg"),
    seller: "Esther Phang",
    sellerRole: "Web designer",
    title: "I will design a standard website at the best price",
    category: "Website",
    rating: 5,
    reviews: 28,
    price: 150,
    delivery: "5 days delivery",
    description:
      "A thoughtful, responsive website designed around your brand and audience.",
    tags: ["Responsive", "Figma", "Landing page"],
  },
  {
    id: "logo-foundation",
    image: image("figma-09.jpeg"),
    avatar: image("figma-11.jpeg"),
    seller: "John Wick",
    sellerRole: "Brand designer",
    title: "I will design the best logo for your business",
    category: "Logos",
    rating: 5,
    reviews: 41,
    price: 10,
    delivery: "2 days delivery",
    description:
      "A distinctive logo system with the polish and versatility your brand deserves.",
    tags: ["Branding", "Logo", "Vector"],
  },
  {
    id: "social-kit",
    image: image("figma-11.jpeg"),
    avatar: image("figma-12.jpeg"),
    seller: "LilianChow",
    sellerRole: "Social designer",
    title: "I will design pitch, badge and sticker sets",
    category: "Social Media Banner",
    rating: 5,
    reviews: 17,
    price: 50,
    delivery: "4 days delivery",
    description:
      "A scroll-stopping set of social visuals with reusable templates for your team.",
    tags: ["Social", "Templates", "Campaign"],
  },
  {
    id: "mobile-interface",
    image: image("figma-07.jpeg"),
    avatar: image("figma-14.jpeg"),
    seller: "ShadowMoon",
    sellerRole: "Product designer",
    title: "I will design a mobile app for your business",
    category: "Mobile App",
    rating: 5,
    reviews: 22,
    price: 200,
    delivery: "7 days delivery",
    description:
      "Clear product thinking and expressive mobile interfaces that make complex flows feel easy.",
    tags: ["Mobile", "UX/UI", "Prototype"],
  },
  {
    id: "video-editing",
    image: image("figma-15.jpeg"),
    avatar: image("figma-19.jpeg"),
    seller: "VideoGuy",
    sellerRole: "Motion designer",
    title: "I will edit your video with a 3-day turnaround",
    category: "Video & Animation",
    rating: 4.9,
    reviews: 35,
    price: 180,
    delivery: "3 days delivery",
    description:
      "Crisp edits, kinetic typography and a rhythm that keeps your audience watching.",
    tags: ["Editing", "Motion", "Reels"],
  },
  {
    id: "presentation-refresh",
    image: image("figma-20.jpeg"),
    avatar: image("figma-01.jpeg"),
    seller: "Lilac",
    sellerRole: "Presentation designer",
    title: "I will design a full powerpoint presentation for your project",
    category: "Website",
    rating: 4.5,
    reviews: 19,
    price: 100,
    delivery: "5 days delivery",
    description:
      "A clear, confident deck that makes your story easier to follow and harder to forget.",
    tags: ["Pitch deck", "Strategy", "Slides"],
  },
  {
    id: "poster-print",
    image: image("figma-17.jpeg"),
    avatar: image("figma-02.jpeg"),
    seller: "JunieC",
    sellerRole: "Graphic designer",
    title: "I will create a standout logo with full branding guidelines",
    category: "Poster",
    rating: 4.9,
    reviews: 31,
    price: 80,
    delivery: "4 days delivery",
    description:
      "Print-ready poster design and a small visual system that holds together across formats.",
    tags: ["Print", "Typography", "Campaign"],
  },
  {
    id: "book-cover",
    image: image("figma-19.jpeg"),
    avatar: image("figma-07.jpeg"),
    seller: "Willow",
    sellerRole: "Illustrator",
    title: "I will design the cover for your next book",
    category: "Book Cover",
    rating: 4.9,
    reviews: 26,
    price: 30,
    delivery: "3 days delivery",
    description:
      "A memorable cover concept with a strong shelf presence and production-ready files.",
    tags: ["Editorial", "Illustration", "Cover"],
  },
  {
    id: "illustration-pack",
    image: image("figma-12.jpeg"),
    avatar: image("figma-09.jpeg"),
    seller: "Asta",
    sellerRole: "Illustrator",
    title: "I will create beautiful illustrations for games and books",
    category: "Photo Editing",
    rating: 4.8,
    reviews: 15,
    price: 60,
    delivery: "6 days delivery",
    description:
      "Expressive, characterful artwork built to give your product a little more magic.",
    tags: ["Illustration", "Characters", "Art direction"],
  },
  {
    id: "exhibition-3d",
    image: image("figma-14.jpeg"),
    avatar: image("figma-11.jpeg"),
    seller: "Lyla",
    sellerRole: "3D designer",
    title: "I will create a 3D model for your exhibition or set design",
    category: "Mobile App",
    rating: 5,
    reviews: 12,
    price: 90,
    delivery: "8 days delivery",
    description:
      "A polished 3D concept to help you share the atmosphere before anything is built.",
    tags: ["3D", "Spatial", "Concept"],
  },
];

export const designers: Designer[] = [
  {
    id: "john-wick",
    avatar: image("figma-01.jpeg"),
    name: "John Wick",
    description: "Designs logos, book covers, posters and more",
    rating: 5,
    location: "United States",
  },
  {
    id: "esther-phang",
    avatar: image("figma-02.jpeg"),
    name: "Esther Phang",
    description: "Designs websites and mobile experiences",
    rating: 5,
    location: "Singapore",
  },
  {
    id: "lilian-chow",
    avatar: image("figma-11.jpeg"),
    name: "LilianChow",
    description: "Designs logos, badges and stickers",
    rating: 5,
    location: "Canada",
  },
  {
    id: "shadow-moon",
    avatar: image("figma-12.jpeg"),
    name: "ShadowMoon",
    description: "Designs mobile apps and dashboards",
    rating: 4.9,
    location: "United Kingdom",
  },
  {
    id: "video-guy",
    avatar: image("figma-14.jpeg"),
    name: "VideoGuy",
    description: "Edits video for social media and events",
    rating: 4.9,
    location: "Australia",
  },
  {
    id: "lilac",
    avatar: image("figma-19.jpeg"),
    name: "Lilac",
    description: "Designs powerpoint presentations",
    rating: 4.5,
    location: "France",
  },
  {
    id: "asta",
    avatar: image("figma-20.jpeg"),
    name: "Asta",
    description: "Creates beautiful illustrations for books",
    rating: 4.8,
    location: "Sweden",
  },
  {
    id: "chacha",
    avatar: image("figma-07.jpeg"),
    name: "Chacha",
    description: "Designs social media banners for businesses",
    rating: 5,
    location: "South Africa",
  },
];

export const reviews: Review[] = [
  {
    id: "review-1",
    avatar: image("figma-11.jpeg"),
    name: "Martina Simpson",
    location: "United States",
    rating: 5,
    text: "Working with Esther was an absolute pleasure! They took the time to understand my vision and brought it to life perfectly. The design was modern, responsive, and exceeded all my expectations.",
  },
  {
    id: "review-2",
    avatar: image("figma-19.jpeg"),
    name: "Jonas Lee",
    location: "Singapore",
    rating: 5,
    text: "Esther is a true professional. The entire process was smooth and efficient, from initial consultation to final delivery. Her attention to detail and creativity resulted in a stunning website that has already received great feedback.",
  },
  {
    id: "review-3",
    avatar: image("figma-20.jpeg"),
    name: "Julius Novachrono",
    location: "Italy",
    rating: 5,
    text: "I am thrilled with the website design provided by Esther. They were incredibly patient and accommodating with all my requests and revisions. The final product is beautiful, functional, and exactly what I needed.",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "notification-1",
    type: "offer",
    title: "New offer on your project brief",
    body: "Esther Phang sent you a proposal for “Brand refresh for Good Things”.",
    time: "12 min ago",
    avatar: image("figma-02.jpeg"),
  },
  {
    id: "notification-2",
    type: "message",
    title: "John Wick sent you a message",
    body: "I have a few directions in mind that could work well for the new identity.",
    time: "1 hour ago",
    avatar: image("figma-01.jpeg"),
  },
  {
    id: "notification-3",
    type: "brief",
    title: "Your brief is getting attention",
    body: "7 designers saved your brief. You can expect more offers soon.",
    time: "Yesterday",
    avatar: image("figma-11.jpeg"),
  },
  {
    id: "notification-4",
    type: "system",
    title: "Welcome to your new GigHub workspace",
    body: "Save your favorite gigs and keep every project conversation in one place.",
    time: "2 days ago",
  },
  {
    id: "notification-5",
    type: "offer",
    title: "LilianChow updated a proposal",
    body: "The estimated delivery date for your social campaign is now 4 days.",
    time: "4 days ago",
    avatar: image("figma-11.jpeg"),
  },
];

export const messages: MessageItem[] = [
  {
    id: "message-1",
    name: "Esther Phang",
    role: "Web designer",
    preview:
      "Happy to help shape the first direction. I’ve attached a few references…",
    time: "12 min ago",
    avatar: image("figma-02.jpeg"),
    unread: true,
  },
  {
    id: "message-2",
    name: "John Wick",
    role: "Brand designer",
    preview:
      "I have a few directions in mind that could work well for the new identity.",
    time: "1 hour ago",
    avatar: image("figma-01.jpeg"),
    unread: true,
  },
  {
    id: "message-3",
    name: "LilianChow",
    role: "Social designer",
    preview: "The first batch of social templates is ready for your review.",
    time: "Yesterday",
    avatar: image("figma-11.jpeg"),
    unread: false,
  },
  {
    id: "message-4",
    name: "ShadowMoon",
    role: "Product designer",
    preview: "Would you like the dashboard to include a compact dark mode too?",
    time: "Mon",
    avatar: image("figma-12.jpeg"),
    unread: false,
  },
];

export const freelancerProfile = {
  name: "Rachel Morgan",
  avatar: image("figma-02.jpeg"),
  role: "Product & brand designer",
  location: "Singapore",
  rating: 4.9,
  reviews: 48,
  responseTime: "within 2 hours",
  completionRate: 98,
  profileStrength: 85,
  bio: "I help early-stage teams turn big ideas into clear, confident digital products.",
  skills: ["Product design", "Brand identity", "Design systems", "Prototyping"],
};

export const freelancerBriefs: FreelancerBrief[] = [
  {
    id: "brief-aurora-health",
    client: "Aurora Health",
    clientAvatar: image("figma-11.jpeg"),
    title: "Design a calm, trustworthy onboarding flow for a health app",
    category: "Product design",
    budget: "$1,200 – $1,800",
    posted: "2 hours ago",
    proposals: 8,
    description:
      "We are looking for a product designer to make our first-time user journey feel simple, warm, and reassuring.",
    tags: ["UX research", "Mobile", "Figma"],
    match: 96,
  },
  {
    id: "brief-northstar",
    client: "Northstar Studio",
    clientAvatar: image("figma-19.jpeg"),
    title: "Build a flexible visual identity for a new creative platform",
    category: "Brand identity",
    budget: "$900 – $1,400",
    posted: "5 hours ago",
    proposals: 14,
    description:
      "We have the strategy and name. Now we need a distinctive identity that can grow from launch into a full brand system.",
    tags: ["Branding", "Art direction", "Launch"],
    match: 91,
  },
  {
    id: "brief-pinecone",
    client: "Pinecone Labs",
    clientAvatar: image("figma-20.jpeg"),
    title: "Refresh our SaaS dashboard without losing its technical edge",
    category: "Web design",
    budget: "$1,600 – $2,400",
    posted: "Yesterday",
    proposals: 22,
    description:
      "Help us bring more clarity and personality to a powerful analytics product used by growing teams.",
    tags: ["SaaS", "Dashboard", "Design system"],
    match: 88,
  },
];

export const freelancerServices: FreelancerService[] = [
  {
    id: "mobile-interface",
    title: "I will design a thoughtful product experience in Figma",
    category: "Product design",
    image: image("figma-07.jpeg"),
    price: 320,
    rating: 5,
    orders: 18,
    status: "Live",
  },
  {
    id: "logo-foundation",
    title: "I will create a polished visual identity for your startup",
    category: "Brand identity",
    image: image("figma-09.jpeg"),
    price: 450,
    rating: 4.9,
    orders: 11,
    status: "Live",
  },
  {
    id: "presentation-refresh",
    title: "I will turn your idea into a clickable prototype",
    category: "Prototyping",
    image: image("figma-12.jpeg"),
    price: 180,
    rating: 4.8,
    orders: 7,
    status: "Draft",
  },
];

type GigHubState = {
  mode: UserMode;
  search: string;
  selectedCategory: string;
  favoriteIds: string[];
  freelancerSavedBriefIds: string[];
  freelancerAppliedBriefIds: string[];
  freelancerAvailability: "available" | "away";
  briefOpen: boolean;
  toast: string | null;
  readNotificationIds: string[];
  services: FreelancerService[];
  addFreelancerService: (service: FreelancerService) => void;
  removeFreelancerService: (serviceId: string) => void;
  restoreFreelancerService: (service: FreelancerService, index: number) => void;
  setMode: (mode: UserMode) => void;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  toggleFavorite: (gigId: string) => void;
  toggleFreelancerBriefSaved: (briefId: string) => void;
  applyToBrief: (briefId: string) => void;
  toggleFreelancerAvailability: () => void;
  openBrief: () => void;
  closeBrief: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
};

export const useGigHubStore = create<GigHubState>()(
  persist(
    (set) => ({
      mode: "employer",
      search: "",
      selectedCategory: "All",
      favoriteIds: [],
      freelancerSavedBriefIds: [],
      freelancerAppliedBriefIds: [],
      freelancerAvailability: "available",
      briefOpen: false,
      toast: null,
      readNotificationIds: [],
      services: freelancerServices,
      addFreelancerService: (service) =>
        set((state) => ({ services: [service, ...state.services] })),
      removeFreelancerService: (serviceId) =>
        set((state) => ({
          services: state.services.filter((service) => service.id !== serviceId),
        })),
      restoreFreelancerService: (service, index) =>
        set((state) => {
          if (state.services.some((item) => item.id === service.id)) return state;
          const services = [...state.services];
          services.splice(Math.min(index, services.length), 0, service);
          return { services };
        }),
      setMode: (mode) => set({ mode }),
      setSearch: (search) => set({ search }),
      setCategory: (selectedCategory) => set({ selectedCategory }),
      toggleFavorite: (gigId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(gigId)
            ? state.favoriteIds.filter((id) => id !== gigId)
            : [...state.favoriteIds, gigId],
          toast: state.favoriteIds.includes(gigId)
            ? "Removed from your saved gigs"
            : "Saved to your shortlist",
        })),
      toggleFreelancerBriefSaved: (briefId) =>
        set((state) => ({
          freelancerSavedBriefIds: state.freelancerSavedBriefIds.includes(
            briefId,
          )
            ? state.freelancerSavedBriefIds.filter((id) => id !== briefId)
            : [...state.freelancerSavedBriefIds, briefId],
          toast: state.freelancerSavedBriefIds.includes(briefId)
            ? "Removed from your saved briefs"
            : "Brief saved to your workspace",
        })),
      applyToBrief: (briefId) =>
        set((state) => ({
          freelancerAppliedBriefIds: state.freelancerAppliedBriefIds.includes(
            briefId,
          )
            ? state.freelancerAppliedBriefIds
            : [...state.freelancerAppliedBriefIds, briefId],
          toast: state.freelancerAppliedBriefIds.includes(briefId)
            ? "You already sent a proposal for this brief"
            : "Proposal saved — add your details in Messages",
        })),
      toggleFreelancerAvailability: () =>
        set((state) => ({
          freelancerAvailability:
            state.freelancerAvailability === "available" ? "away" : "available",
          toast:
            state.freelancerAvailability === "available"
              ? "Availability set to away"
              : "You are now available for work",
        })),
      openBrief: () => set({ briefOpen: true }),
      closeBrief: () => set({ briefOpen: false }),
      showToast: (toast) => set({ toast }),
      clearToast: () => set({ toast: null }),
      markNotificationRead: (notificationId) =>
        set((state) => ({
          readNotificationIds: state.readNotificationIds.includes(
            notificationId,
          )
            ? state.readNotificationIds
            : [...state.readNotificationIds, notificationId],
        })),
      markAllNotificationsRead: () =>
        set({
          readNotificationIds: notifications.map(
            (notification) => notification.id,
          ),
        }),
    }),
    {
      name: "gighub-preferences",
      partialize: (state) => ({
        mode: state.mode,
        favoriteIds: state.favoriteIds,
        freelancerSavedBriefIds: state.freelancerSavedBriefIds,
        freelancerAppliedBriefIds: state.freelancerAppliedBriefIds,
        freelancerAvailability: state.freelancerAvailability,
        readNotificationIds: state.readNotificationIds,
        services: state.services,
      }),
    },
  ),
);
