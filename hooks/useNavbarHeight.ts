import { useEffect, useState } from 'react';

export function useNavbarHeight() {
    const [height, setHeight] = useState(80);

    useEffect(() => {
        const updateHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setHeight(navbar.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return height;
}