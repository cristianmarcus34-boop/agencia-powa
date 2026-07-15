'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
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

  const navLinks: NavLinkItem[] = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Portafolio', path: '/portfolio' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre Nosotros', path: '/about' },
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
      <Container>
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
              width={50}
              height={50}
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
              Lab
              <span className={styles.badgeSoon}>Beta</span>
            </Nav.Link>

            {/* 🔥 BOTÓN DE LOGIN / LOGOUT */}
            {session ? (
              // Usuario logueado
              <>
                <Nav.Link
                  as={Link}
                  href={session.user?.rol === 'admin' ? '/admin' : '/cliente'}
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  <span className={styles.userInfo}>
                    👤 {session.user?.name}
                  </span>
                </Nav.Link>
                {/* 🔥 CERRAR SESIÓN - REDIRIGE A /logout */}
                <Nav.Link
                  onClick={() => {
                    window.location.href = '/logout';
                    closeMenu();
                  }}
                  className={`${styles.navLink} ${styles.logoutBtn}`}
                  style={{ cursor: 'pointer' }}
                >
                  Cerrar sesión
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/contact"
                  className="ms-lg-2 p-0 text-decoration-none"
                  onClick={closeMenu}
                >
                  <span className={styles.contactBtn} role="button">
                    Empezar Proyecto
                  </span>
                </Nav.Link>
              </>
            ) : (
              // Usuario NO logueado
              <>
                <Nav.Link
                  onClick={() => {
                    signIn();
                    closeMenu();
                  }}
                  className={`${styles.navLink} ${styles.loginBtn}`}
                  style={{ cursor: 'pointer' }}
                >
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/contact"
                  className="ms-lg-2 p-0 text-decoration-none"
                  onClick={closeMenu}
                >
                  <span className={styles.contactBtn} role="button">
                    Empezar Proyecto
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