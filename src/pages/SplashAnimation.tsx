// SplashAnimation.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SplashProps {
  onComplete: () => void;
  onSkip: () => void;
}

const SplashAnimation = ({ onComplete, onSkip }: SplashProps) => {
  const [skipHover, setSkipHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600/95 to-violet-700/95 backdrop-blur-md flex items-center justify-center"
    >
      {/* Skip Button */}
      <motion.button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors flex items-center gap-1"
        onClick={onSkip}
        onHoverStart={() => setSkipHover(true)}
        onHoverEnd={() => setSkipHover(false)}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <X size={18} className={skipHover ? 'scale-110' : ''} />
        <span className="text-sm">Skip</span>
      </motion.button>

      {/* Animation Content */}
      <div className="text-center space-y-8">
        {/* Logo and Progress Bar */}
      </div>

      {/* Floating Elements */}
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
      )}
    </motion.div>
  );
};

export default SplashAnimation;
