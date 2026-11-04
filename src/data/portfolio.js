export const profile = {
  name: "Nirmik Ukani",
  title: "Frontend Developer",
  email: "ukaninirmik65@gmail.com",
  phone: "+91 9714558126",
  whatsapp: "919714558126",
  location: "Gujarat, India",
  photo: "/images/nirmik-ukani.png",
  photoWidth: 1122,
  photoHeight: 1402,
  resume: null,
  about:
    "I am a passionate Frontend Developer from Gujarat, India, with professional experience in building responsive and user-friendly web applications. I enjoy working with React.js, JavaScript, and modern frontend technologies.",
  approach:
    "I focus on clean code, pixel-perfect designs, responsive layouts, and smooth user experiences. I continuously learn new technologies and aim to create modern, high-quality digital experiences for clients.",
};

export const socialLinks = [
  {
    name: "GitHub",
    icon: "github",
    href: "https://github.com/ukaninirmik65-hash",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/nirmik-ukani-a14a3334b/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/nirmik_ukani_/",
  },
  {
    name: "Freelancer",
    icon: "freelancer",
    href: "https://www.freelancer.in/u/nirmikukani",
  },
];

export const navigation = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "experience", name: "Experience" },
  { id: "projects", name: "Projects" },
  { id: "services", name: "Services" },
  { id: "process", name: "Work process" },
  { id: "contact", name: "Contact" },
];

export const skills = [
  { name: "HTML5", icon: "html", category: "Foundations" },
  { name: "CSS3", icon: "css", category: "Foundations" },
  { name: "JavaScript", icon: "javascript", category: "Foundations" },
  { name: "React.js", icon: "react", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwind", category: "Styling" },
  { name: "Bootstrap", icon: "bootstrap", category: "Styling" },
  { name: "Git", icon: "git", category: "Workflow" },
  { name: "GitHub", icon: "githubBrand", category: "Workflow" },
  { name: "REST API integration", icon: "api", category: "Integration" },
  { name: "TypeScript", icon: "typescript", category: "Beginner" },
  { name: "Next.js", icon: "next", category: "Beginner" },
];

export const experience = [
  {
    role: "React Developer",
    company: "Shivvilon Solutions",
    date: "September 2026 — Present",
    meta: "Full-time · Remote · Rajkot",
    current: true,
    details: [],
  },
  {
    role: "Web POC / Web Designer",
    company: "md impex.ai",
    date: "June 2026 · 1 month",
    meta: "Internship · On-site · India",
    details: [],
  },
  {
    role: "Frontend Developer",
    company: "Cuelix IT",
    date: "January 2025 — March 2025",
    meta: "Full-time · Surat, Gujarat",
    details: [
      "Built responsive web components using HTML, CSS, and JavaScript.",
      "Ensured cross-browser compatibility and pixel-perfect designs.",
      "Performed QA testing and debugging.",
      "Collaborated with the development team to improve website features and user experience.",
    ],
  },
  {
    role: "Intern",
    company: "Cuelix IT",
    date: "October 2024 — December 2024",
    meta: "Internship · India",
    details: [],
  },
];

const github = "https://github.com/ukaninirmik65-hash/";
// Completion labels were explicitly confirmed by the owner. Scope notes retain
// frontend limitations; no client relationship is inferred from repository names.
export const projects = [
  {
    id: "erp",
    name: "ERP Management System",
    category: "React",
    status: "Completed",
    type: "Dashboard frontend",
    repo: github + "ERP-App",
    live: "https://erp-app-khaki.vercel.app",
    color: "blue",
    description:
      "A modular React dashboard frontend for customer management, product listings, inventory information, and reporting.",
    technologies: ["React", "JavaScript", "CSS", "Material UI", "Recharts"],
    note: "Completed within its frontend scope. Some modules remain Coming Soon, and local/static data is used. This is not a complete production ERP.",
  },
  {
    id: "anita",
    name: "Anita Jewellery",
    category: "Websites",
    status: "Completed",
    type: "Storefront interface",
    repo: github + "Anitajewellerys",
    live: "https://anitajewellerys-k56t.vercel.app/",
    image: "/images/projects/anita.jpg",
    color: "rose",
    description:
      "A jewellery storefront interface with promotional imagery, product showcases, collection sections, and responsive styling.",
    technologies: ["HTML", "CSS", "JavaScript"],
    note: "Frontend showcase with placeholder copy and links. Checkout and payment processing are not implemented.",
  },
  {
    id: "school",
    name: "Neelmadhav Public School",
    category: "Websites",
    status: "Completed",
    type: "School website",
    repo: github + "Neelmadhav-Public-School",
    live: "https://neelmadhav-public-school.vercel.app",
    image: "/images/projects/school.jpg",
    color: "sage",
    description:
      "An informational school website with academic sections, responsive navigation, and scroll-triggered interactions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    note: "Completed within its website scope. Some school information and imagery remain marked as placeholders.",
  },
  {
    id: "tetris",
    name: "Tetris Game",
    category: "JavaScript",
    status: "Completed",
    type: "Interactive browser game",
    repo: github + "Tetris-Game",
    live: null,
    color: "purple",
    description:
      "A Canvas-based falling-block game with keyboard movement, rotation, collision detection, line clearing, sounds, and saved high scores.",
    technologies: ["JavaScript", "Canvas API", "HTML", "CSS"],
    note: "Browser-local high-score storage. The previously configured live deployment was unavailable; source code is linked.",
  },
  {
    id: "agency",
    name: "Digital Marketing Agency",
    category: "React",
    status: "Completed",
    type: "Marketing website",
    repo: github + "demo",
    live: null,
    color: "sand",
    description:
      "A component-based marketing interface with services, case study, about, and contact sections.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    note: "The repository credits a Figma design source. No marketing results or client relationship are claimed. The previous demo deployment was unavailable.",
    credit:
      "https://www.figma.com/design/mZd5TC8N9zjukCaMBZNlKp/Digital-Marketing-Agency-Website",
  },
  {
    id: "atal",
    name: "Atal Kriya",
    category: "React",
    status: "In Progress",
    type: "Employee self-service prototype",
    repo: github + "atakKriya-2.O",
    live: "https://atak-kriya-2-o.vercel.app",
    color: "blue",
    description:
      "An employee self-service frontend prototype for attendance, leave requests, expenses, and mock field-location workflows.",
    technologies: ["React", "Tailwind CSS", "React Router", "Leaflet"],
    note: "Mock authentication and localStorage data. Backend integration, real tracking, and some screens remain pending.",
  },
  {
    id: "motiwala",
    name: "Motiwala Perfumes Clone",
    category: "Websites",
    status: "In Progress",
    type: "Practice clone",
    repo: github + "motiwalaperfumes-clone",
    live: null,
    color: "sand",
    description:
      "A perfume website recreation featuring a custom image slider, product showcase grid, and responsive styling.",
    technologies: ["HTML", "CSS", "JavaScript"],
    note: "An in-progress practice recreation of Motiwala Perfumes. Not an original brand or claimed client engagement.",
  },
];

export const services = [
  {
    id: "react",
    name: "React.js development",
    icon: "code",
    description:
      "Reusable components and thoughtful interfaces for your next web application.",
  },
  {
    id: "responsive",
    name: "Responsive websites",
    icon: "devices",
    description:
      "Carefully considered layouts that adapt from the smallest screen to the widest display.",
  },
  {
    id: "landing",
    name: "Landing pages",
    icon: "layout",
    description:
      "Focused pages that introduce your business and give visitors a clear next step.",
  },
  {
    id: "portfolio",
    name: "Portfolio websites",
    icon: "person",
    description:
      "A distinctive home for your work, experience, and professional story.",
  },
  {
    id: "figma",
    name: "Figma to React",
    icon: "figma",
    description:
      "Detail-oriented implementation of your supplied designs as responsive React components.",
  },
  {
    id: "redesign",
    name: "Website redesign",
    icon: "sparkles",
    description:
      "A fresh frontend with clearer hierarchy, refined interactions, and a better mobile experience.",
  },
  {
    id: "bugs",
    name: "Frontend bug fixing",
    icon: "bug",
    description:
      "Targeted fixes for layout problems, browser inconsistencies, and broken interactions.",
  },
];

export const process = [
  {
    title: "Understand",
    text: "We discuss your goals, audience, pages, and the problem your website needs to solve.",
  },
  {
    title: "Plan",
    text: "We agree on the scope, design direction, personal quotation, and delivery milestones.",
  },
  {
    title: "Build",
    text: "I develop responsive components and share progress for focused feedback.",
  },
  {
    title: "Refine",
    text: "Layouts, interactions, and different screen sizes get a careful review.",
  },
  {
    title: "Hand over",
    text: "You receive the agreed frontend, source code, and clear setup guidance.",
  },
];

export const faqs = [
  {
    question: "How do you decide the project price?",
    answer:
      "I personally review your requirements, pages, design complexity, and integrations, then communicate a custom quotation. This website does not generate prices or fixed packages.",
  },
  {
    question: "Can you work with my Figma designs or existing API?",
    answer:
      "Yes. I offer Figma-to-React implementation and REST API integration. Share your design files and API documentation with your brief. Backend development is outside these frontend services.",
  },
  {
    question: "What should I provide before we start?",
    answer:
      "A short brief, your desired pages and features, any design references, and your preferred timeline. Please provide the final text, logo, and any images you have permission to use.",
  },
  {
    question: "How are timing, revisions, and support agreed?",
    answer:
      "We agree on the start date, delivery milestones, revisions, and any support after reviewing your brief. Domains, hosting, paid assets, and third-party services are separate from frontend development.",
  },
];
