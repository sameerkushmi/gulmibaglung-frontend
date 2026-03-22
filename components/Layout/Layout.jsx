'use client';

import { usePathname } from 'next/navigation';
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import FloatingMessage from '../FloatingMessage/FloatingMessage';
import FloatingCurrencySelector from '../FloatingCurrencySelector/FloatingCurrencySelector';
import { AuthProvider } from '@/Context/AuthContext';

const Layout = ({ children }) => {
  const pathname = usePathname();

  const hiddenPaths = [
    '/login/',
    '/register/',
    '/forgot-password/',
    '/verify-otp/',
    '/profile/',
  ];

  const hideNavbarFooter =
    hiddenPaths.includes(pathname) ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/payment');

  const showNavbarFooter = !hideNavbarFooter;


  return (
    <>
      <AuthProvider>
        {
          showNavbarFooter && <Navbar />
        }
        {
          showNavbarFooter && <FloatingMessage />
        }
        {
          showNavbarFooter && <FloatingCurrencySelector />
        }

        {children}

        {
          showNavbarFooter && <Footer />
        }
      </AuthProvider>
    </>
  );
};

export default Layout;
