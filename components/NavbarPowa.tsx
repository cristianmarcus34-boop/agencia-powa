'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './NavbarPowa.module.css';

export default function NavbarPowa() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // Estado para controlar el colapso
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para cerrar el menú
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
      expanded={expanded} // Sincronizamos con el estado
      onToggle={(nextExpand) => setExpanded(nextExpand)} // Permite abrir/cerrar manual
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
          onClick={closeMenu} // Cierra al hacer clic en el logo
        >
          <div className={styles.logoWrapper}>
            <img
              src="/logo-agenciadigitalpowa-cuadrado.png"
              alt="Powa Logo"
              className={styles.logoImage}
            />
          </div>
          <span className={styles.brandText}>
            Agencia Digital <span className="text-gradient">Powa</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          className={styles.toggle} 
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center gap-1">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                href={link.path}
                className={`${styles.navLink} ${pathname === link.path ? styles.activeLink : ''}`}
                onClick={closeMenu} // Cierra al navegar
              >
                {link.name}
              </Nav.Link>
            ))}

            {/* Link Especial: Powa Lab */}
            <Nav.Link
              as={Link}
              href="/lab"
              className={styles.navLinkLab}
              onClick={closeMenu} // Cierra al navegar
            >
              Powa Lab
              <span className={styles.badgeSoon}>Nuevo</span>
            </Nav.Link>

            {/* Botón de Contacto Destacado */}
            <Link 
              href="/contact" 
              className="ms-lg-3 text-decoration-none"
              onClick={closeMenu} // Cierra al navegar
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