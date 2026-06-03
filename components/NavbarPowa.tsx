'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './NavbarPowa.module.css';

// Definimos la interfaz para los links
interface NavLinkItem {
  name: string;
  path: string;
}

export default function NavbarPowa() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  // Optimizamos el scroll con useCallback para evitar recrear la función
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
      onToggle={(nextExpand) => setExpanded(nextExpand)}
      expand="lg"
      fixed="top"
      variant="dark"
      className={`${styles.navbarBase} ${scrolled ? styles.navbarScrolled : styles.navbarTransparent}`}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          href="/" 
          className="d-flex align-items-center"
          onClick={closeMenu}
        >
          <div className={styles.logoWrapper}>
            <Image
              src="/logo-agenciadigitalpowa-cuadrado.jpg"
              alt="Powa Digital Logo"
              width={40}
              height={40}
              className={styles.logoImage}
              priority
              quality={85} // Un poquito más de calidad para el logo
            />
          </div>
          <span className={styles.brandText}>
            Powa <span className="text-gradient">Digital</span>
          </span>
        </Navbar.Brand>

        {/* Custom Hamburger Icon (opcional para más estilo) */}
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

            <Link 
              href="/contact" 
              className="ms-lg-2 text-decoration-none"
              onClick={closeMenu}
            >
              <button className={styles.contactBtn}>
                Empezar Proyecto
              </button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}