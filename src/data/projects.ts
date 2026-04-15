export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  color: string;
  // For Netflix-style preview: use a gradient or image URL
  // Replace previewImage with an actual screenshot URL for best results
  previewImage?: string;
  previewGradient: string;
  featured?: boolean;
}

// ─── EDIT YOUR PROJECTS HERE ────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "01",
    title: "Ten-Fingers Bakery",
    category: "Frontend / Development",
    year: "2026",
    description:
      "Complete transition from design to a fully responsive frontend implementation for a modern bakery brand.",

    longDescription:
      "This project turns an existing UI design into a responsive React and Next.js frontend with reusable components and consistent layouts across all devices.",

    tags: ["Tanstack-Query", "React", "Next.js", "Frontend Development"],
    liveUrl: "https://tenfingersbakeryandpastry.org/",
    githubUrl: "https://github.com",
    color: "#e8ff47",
    previewGradient:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    previewImage: "/ten-fingers.png",
    featured: true,
  },
  {
    id: "02",
    title: "Tee-Tees Event",
    category: "Full Stack / Event Management",
    year: "2026",
    description:
      "Full-stack event booking platform for halls, canopies, chairs, and event rentals.",
    longDescription:
      "A complete event management system that allows users to book event halls and rent equipment such as canopies, chairs, and other event essentials. Built with a responsive frontend, dynamic booking flows, admin management tools, and scalable backend functionality.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Full Stack",
      "Booking System",
      "Prisma",
      "Cloudinary",
      "PostgreSQL",
    ],
    liveUrl: "https://teetees.vercel.app/",
    color: "#ff6b6b",
    previewGradient:
      "linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #4a1010 100%)",
    previewImage: "/tee-tees-event.png",
    featured: true,
  },
  {
    id: "03",
    title: "Hairs By Funky",
    category: "Frontend / E-Commerce",
    year: "2025",
    description:
      "E-commerce website for selling human hair, wigs, and beauty accessories.",
    longDescription:
      "A modern e-commerce platform built for a beauty brand to showcase and sell human hair products and accessories. Features include responsive product pages, smooth shopping experience, and manual e-transfer payment integration for seamless customer orders.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "E-Commerce",
      "Payment Integration",
      "Frontend Development",
    ],
    liveUrl: "https://www.hairsbyfunky.com/",
    githubUrl: "https://github.com",
    color: "#a8edea",
    previewGradient:
      "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a2e4a 100%)",
    previewImage: "/Hbf.png",
  },
  {
    id: "04",
    title: "KorrEdge HRMS",
    category: "Web App / HRMS",
    year: "2026",
    description:
      "Human Resource Management System for managing employees, workflows, and operations.",
    longDescription:
      "A modern HRMS platform built to streamline employee management, internal workflows, and organizational processes. Developed with Next.js, TanStack Query, Zustand, ShadCN UI, and Tailwind CSS for a fast, scalable, and responsive user experience.",
    tags: [
      "Next.js",
      "TanStack Query",
      "Zustand",
      "ShadCN",
      "Tailwind CSS",
      "HRMS",
      "Web App",
    ],
    liveUrl: "https://hrms.aetdevops.com/",
    color: "#c77dff",
    previewGradient:
      "linear-gradient(135deg, #12001f 0%, #1a0030 50%, #2a0050 100%)",
    previewImage: "/hrms.png",
  },
  {
    id: "05",
    title: "Sync Finance",
    category: "Mobile App / Fintech",
    year: "2026",
    description:
      "Mobile fintech app for investments, loans, and buy now pay later services.",
    longDescription:
      "A modern finance mobile app designed for users to invest, apply for loans, and access buy now pay later options for e-commerce purchases. Built with a smooth mobile experience, secure financial flows, and scalable architecture for digital finance services.",
    tags: [
      "React Native",
      "Expo",
      "Fintech",
      "Mobile App",
      "Loans",
      "Investment",
      "BNPL",
    ],
    liveUrl: "#",
    color: "#43e97b",
    previewGradient:
      "linear-gradient(135deg, #001a0a 0%, #002d12 50%, #004a1e 100%)",
  },
  {
    id: "06",
    title: "Introspec Bank Reconciliation",
    category: "Fintech / Web App",
    year: "2026",
    description:
      "Bank reconciliation platform for matching transactions, statements, and financial records.",
    longDescription:
      "A financial reconciliation system built to automate transaction matching, manage statements, resolve disputes, and improve reporting accuracy for banking operations. Designed with scalable workflows, clean dashboards, and efficient data handling for finance teams.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Fintech",
      "Bank Reconciliation",
      "Dashboard",
      "Web App",
    ],
    liveUrl: "https://estaging.aetdevops.com/",
    githubUrl: "https://github.com",
    color: "#ffd700",
    previewGradient:
      "linear-gradient(135deg, #1a1400 0%, #2d2200 50%, #4a3800 100%)",
    featured: true,
  },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Figma",
  "GSAP",
  "Three.js",
  "TailwindCSS",
  "PostgreSQL",
  "Framer Motion",
  "GraphQL",
  "Python",
  "WebGL",
  "React Native",
  "Design Systems",
];
