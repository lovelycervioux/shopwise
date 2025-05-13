import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FirstVisitSplash } from './FirstVisitSplash';
import Welcome from './Welcome';

export const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      <FirstVisitSplash />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/welcome" element={<Welcome />} />
          {/* Other routes */}
        </Routes>
      </AnimatePresence>
    </>
  );
};
