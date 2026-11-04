import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Sun,
  Moon,
  Menu,
  X,
  MapPin,
  Code2,
  MonitorSmartphone,
  PanelsTopLeft,
  UserRound,
  Figma,
  Sparkles,
  Bug,
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageCircle,
  Braces,
  Check,
  Plus,
  ChevronDown,
  Copy,
} from "lucide-react";
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiFreelancer,
} from "react-icons/si";
import { socialLinks } from "../data/portfolio.js";

const icons = {
  arrow: ArrowUpRight,
  right: ArrowRight,
  down: ArrowDown,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: X,
  location: MapPin,
  code: Code2,
  devices: MonitorSmartphone,
  layout: PanelsTopLeft,
  person: UserRound,
  figma: Figma,
  sparkles: Sparkles,
  bug: Bug,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
  message: MessageCircle,
  api: Braces,
  check: Check,
  plus: Plus,
  chevron: ChevronDown,
  copy: Copy,
  react: SiReact,
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  git: SiGit,
  githubBrand: SiGithub,
  freelancer: SiFreelancer,
};
export function Icon({ name, size = 20, ...props }) {
  const Component = icons[name] || Code2;
  return <Component aria-hidden="true" size={size} {...props} />;
}
export function Reveal({ children, className = "", delay = 0, distance = 20 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function SectionTitle({ number, label, title, description }) {
  return (
    <Reveal className="section-title">
      <p className="eyebrow">
        <span>{number} /</span>
        {label}
      </p>
      <div className="section-title-row">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </Reveal>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  external = false,
  className = "",
  ...props
}) {
  return (
    <a
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}
export function Socials({ compact = false }) {
  return (
    <div className={`socials ${compact ? "compact" : ""}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name} (opens in a new tab)`}
        >
          <Icon name={link.icon} size={18} />
          {!compact && link.name}
        </a>
      ))}
    </div>
  );
}
