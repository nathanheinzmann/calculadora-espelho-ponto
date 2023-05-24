import HomePage from '@/components/HomePage';
import { gtmHandler } from '@/utils/';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    gtmHandler.initialize();
  }, []);

  return <HomePage />;
};

export default Home;