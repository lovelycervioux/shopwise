import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';

const SplashAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const navigate = useNavigate();
  const [skipHover, setSkipHover] = useState(false);

  // Animation cleanup
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600/95 to-violet-700/95 backdrop-blur-md flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Skip Button */}
      <motion.button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors flex items-center gap-1"
        onClick={() => {
          localStorage.setItem('visited', 'true');
          navigate('/');
        }}
        onHoverStart={() => setSkipHover(true)}
        onHoverEnd={() => setSkipHover(false)}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <X size={18} className={skipHover ? 'scale-110' : ''} />
        <span className="text-sm">Skip</span>
      </motion.button>

      {/* Main Content */}
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <motion.div className="relative mx-auto w-fit" variants={itemVariants}>
          <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <motion.div
            className="p-6 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="text-white" size={64} />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.h1
            className="text-5xl font-bold text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            variants={itemVariants}
          >
            ShopWise
          </motion.h1>
          <motion.p
            className="text-white/80 text-lg"
            variants={itemVariants}
          >
            Smart Grocery Management
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="relative h-1 bg-white/20 rounded-full overflow-hidden mx-auto max-w-xs"
          variants={itemVariants}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-white to-indigo-100"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </motion.div>
      </div>

      {/* Floating Food Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-2xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['🥦', '🥑', '🍎', '🥕', '🍞', '🥩'][i]}
        </motion.div>
      ))}
    </motion.div>
  );
};

export const FirstVisitSplash = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const visited = localStorage.getItem('visited');
    return !visited;
  });

  const handleComplete = () => {
    localStorage.setItem('visited', 'true');
    setShowSplash(false);
  };

  return (
    <AnimatePresence>
      {showSplash && <SplashAnimation onComplete={handleComplete} />}
    </AnimatePresence>
  );
};
