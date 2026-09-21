'use client';

import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaCopy, FaCheck } from 'react-icons/fa';
import styles from '../blog.module.css';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return `https://www.agenciadigitalpowa.com.ar/blog/${slug}`;
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error('Error al copiar enlace:', err);
        }
    };

    const handleShare = (platform: 'twitter' | 'linkedin') => {
        const url = encodeURIComponent(getShareUrl());
        const text = encodeURIComponent(`${title} — Powa Insights`);

        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };

        window.open(urls[platform], '_blank', 'width=600,height=450,noopener,noreferrer');
    };

    return (
        <div className={styles.shareSection}>
            <span className={styles.shareLabel}>Compartir artículo</span>
            <div className={styles.shareButtons}>
                <button
                    className={styles.shareButton}
                    onClick={() => handleShare('twitter')}
                    aria-label="Compartir en X / Twitter"
                    title="Compartir en X / Twitter"
                >
                    <FaTwitter />
                </button>
                <button
                    className={styles.shareButton}
                    onClick={() => handleShare('linkedin')}
                    aria-label="Compartir en LinkedIn"
                    title="Compartir en LinkedIn"
                >
                    <FaLinkedin />
                </button>
                <button
                    className={`${styles.shareButton} ${copied ? styles.copied : ''}`}
                    onClick={handleCopyLink}
                    aria-label="Copiar enlace"
                    title={copied ? '¡Copiado!' : 'Copiar enlace'}
                >
                    {copied ? <FaCheck /> : <FaCopy />}
                </button>
            </div>
        </div>
    );
}
