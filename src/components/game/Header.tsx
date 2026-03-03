import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-card/80 backdrop-blur-sm shadow-lg rounded-b-2xl p-4 flex-shrink-0"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="text-3xl">🧮</span>
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-center text-primary"
        >
          Tartan Xisaabeed
        </motion.h1>
        <span className="text-3xl">🪢</span>
      </div>
      <p className="text-center text-muted-foreground text-sm mt-1">Math Tug-of-War</p>
    </motion.header>
  );
}
