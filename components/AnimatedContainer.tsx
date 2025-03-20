// components/AnimatedContainer.tsx
import { FC, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedContainerProps {
  children: ReactNode;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

export const AnimatedContainer: FC<AnimatedContainerProps> = ({ children }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem: FC<AnimatedContainerProps> = ({ children }) => {
  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
};
