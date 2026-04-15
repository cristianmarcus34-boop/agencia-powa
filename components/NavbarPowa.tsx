'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importación necesaria
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './NavbarPowa.module.css';

export default function NavbarPowa() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true }); // Mejora performance
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setExpanded(false);

  const navLinks = [
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
            {/* SOLUCIÓN AL LOGO: Next.js optimiza el tamaño y el formato aquí */}
            <Image
              src="/logo-agenciadigitalpowa-cuadrado.jpg"
              alt="Logo Powa Digital"
              width={40} // Tamaño visual real
              height={40} // Tamaño visual real
              className={styles.logoImage}
              priority // Carga esta imagen primero (LCP)
              quality={75}
            />
          </div>
          <span className={styles.brandText}>
            Agencia Digital <span className="text-gradient">Powa</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          className={styles.toggle}
          aria-label="Abrir menú de navegación" // Mejora Accesibilidad
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center gap-1">
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

            <Nav.Link
              as={Link}
              href="/lab"
              className={styles.navLinkLab}
              onClick={closeMenu}
            >
              Powa Lab
              <span className={styles.badgeSoon}>Nuevo</span>
            </Nav.Link>

            <Link 
              href="/contact" 
              className="ms-lg-3 text-decoration-none"
              onClick={closeMenu}
            >
              <button className={styles.contactBtn}>
                Contacto
              </button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}