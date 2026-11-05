'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './NavbarPowa.module.css';

interface NavLinkItem {
  name: string;
  path: string;
}

export default function NavbarPowa() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMenu = () => setExpanded(false);

  // 🔥 ENLACES COMPACTOS PERO COMPLETOS
  const navLinks: NavLinkItem[] = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Apps', path: '/apps' },
    { name: 'Portafolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <Navbar
      expanded={expanded}
      onToggle={(nextExpand: boolean) => setExpanded(nextExpand)}
      expand="lg"
      fixed="top"
      variant="dark"
      suppressHydrationWarning
      className={`${styles.navbarBase} ${scrolled ? styles.navbarScrolled : styles.navbarTransparent}`}
    >
      <Container fluid className="px-3 px-xl-4">
        <Navbar.Brand
          as={Link}
          href="/"
          className="d-flex align-items-center text-decoration-none"
          onClick={closeMenu}
        >
          <div className={styles.logoWrapper}>
            <Image
              src="/logo-agenciadigitalpowa-redondo.png"
              alt="Powa Digital Logo"
              width={40}
              height={40}
              className={styles.logoImage}
              priority
              quality={85}
            />
          </div>
          <div className={styles.brandTextStack}>
            <span className={styles.brandName}>Powa</span>
            <span className={styles.brandTagline}>Agencia Digital</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={styles.toggle}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                href={link.path}
                className={`${styles.navLink} ${pathname === link.path ? styles.activeLink : ''}`}
                onClick={closeMenu}
              >
                {link.name}
              </Nav.Link>
            ))}

            <div className={styles.navDivider}></div>

            <Nav.Link
              as={Link}
              href="/lab"
              className={styles.navLinkLab}
              onClick={closeMenu}
            >
              Herramientas
            </Nav.Link>

            {session ? (
              <>
                <Nav.Link
                  as={Link}
                  href={session.user?.rol === 'admin' ? '/admin' : '/cliente'}
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  <span className={styles.userInfo}>
                    👤 {session.user?.name?.split(' ')[0] || 'Usuario'}
                  </span>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    window.location.href = '/logout';
                    closeMenu();
                  }}
                  className={`${styles.navLink} ${styles.logoutBtn}`}
                  style={{ cursor: 'pointer' }}
                >
                  Salir
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/contact"
                  className="ms-lg-1 p-0 text-decoration-none"
                  onClick={closeMenu}
                >
                  <span className={styles.contactBtn} role="button">
                    Solicitar propuesta
                  </span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  href="/login"
                  className={`${styles.navLink} ${styles.loginBtn}`}
                  onClick={closeMenu}
                >
                  Acceso clientes
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/contact"
                  className="ms-lg-1 p-0 text-decoration-none"
                  onClick={closeMenu}
                >
                  <span className={styles.contactBtn} role="button">
                    Solicitar propuesta
                  </span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}