'use client';

import React from 'react';

const Footer: React.FC = () => {
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
                        © 2025. DayСalсulator
                    </div>
                    <div className="footer-top" onClick={scrollToTop}>
                        Наверх
                    </div>
                </div>
            </div>
        </footer>
    ); 
};

export default Footer;
