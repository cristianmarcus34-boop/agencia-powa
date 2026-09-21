'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../blog.module.css';

interface PostContentProps {
    html: string;
}

export default function PostContent({ html }: PostContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Añadir botones de copiado dinámico a todos los bloques pre/code
        const preBlocks = containerRef.current.querySelectorAll('pre');
        preBlocks.forEach((pre) => {
            if (pre.querySelector(`.${styles.codeCopyButton}`)) return;

            const button = document.createElement('button');
            button.className = styles.codeCopyButton;
            button.setAttribute('aria-label', 'Copiar código');
            button.innerText = 'Copiar';

            button.addEventListener('click', async () => {
                const codeText = pre.querySelector('code')?.innerText || pre.innerText;
                try {
                    await navigator.clipboard.writeText(codeText.trim());
                    button.innerText = '¡Copiado!';
                    button.classList.add(styles.codeCopied);
                    setTimeout(() => {
                        button.innerText = 'Copiar';
                        button.classList.remove(styles.codeCopied);
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar código:', err);
                }
            });

            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }, [html]);

    return (
        <div
            ref={containerRef}
            className={styles.postDynamicContent}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
