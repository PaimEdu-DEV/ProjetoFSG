import { motion } from "framer-motion";

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 16,
  className,
  once = true,
  ...rest
}) {
  const Tag = typeof as === "string" ? motion[as] : as;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({ children, className, stagger = 0.06, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 16, ...rest }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
