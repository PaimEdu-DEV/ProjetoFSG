import { motion } from "framer-motion";

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
  once = true,
  ...rest
}) {
  const Tag = typeof as === "string" ? motion[as] : as;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({ children, className, stagger = 0.08, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 24, ...rest }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
