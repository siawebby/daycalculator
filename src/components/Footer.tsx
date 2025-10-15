'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
    const t = useTranslations('footer');
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer>
            <div className="container">
                <div className="footer-container d-flex align-items-center justify-content-between">
                    <div className="footer-copyright">
                        {t('copyright')}
                    </div>
                    <div className="footer-top" onClick={scrollToTop}>
                        {t('backToTop')}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
