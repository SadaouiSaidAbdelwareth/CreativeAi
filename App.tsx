import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import GeneratorPage from './pages/GeneratorPage';
import { useLocalization } from './hooks/useLocalization';

const App: React.FC = () => {
  const { language } = useLocalization();

  return (
    <div className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/generator" element={<GeneratorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;