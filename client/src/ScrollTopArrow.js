import React, { useState } from 'react';
import './scrollTop.css';
import Arrow from "./chevron.svg"


const ScrollTopArrow = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="scrollTop" onClick={scrollTop} style={{ height: 40, width: 40, display: showScroll ? 'flex' : 'none' }}>
            <img src={Arrow} alt="arrow" style={{ width: "30px" }} />
        </div>
    );
}

export default ScrollTopArrow;