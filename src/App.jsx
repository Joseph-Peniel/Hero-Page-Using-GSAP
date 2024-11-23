import "./App.scss";
import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap";

import imgGirl from "./assets/images/fashion-model-in-fur.jpg";
import imgBoy from "./assets/images/boy.jpg";

const App = () => {
    const appRef = useRef(null);
    const imagesRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!imagesRef.current || !contentRef.current) {
            console.error("Refs not attached correctly");
            return;
        }

        const girlImage = imagesRef.current.children[0];
        const boyImage = imagesRef.current.children[1];

        // Verify that the children structure matches your component layout
        const headlineFirst = contentRef.current.children[0].children[0];
        const headlineSecond = contentRef.current.children[0].children[1];
        const headlineThird = contentRef.current.children[0].children[2];
        const paragraph = contentRef.current.children[1];
        const button = contentRef.current.children[2];

        // Ensure the app is visible
        gsap.set(appRef.current, { css: { visibility: "visible" } });

        const tl = gsap.timeline();

        // Images Animation - Ensuring no repeat
        tl.fromTo(
            boyImage,
            { y: 1200 }, // Start position
            { duration: 1.2, y: 0, ease: Power3.easeOut }
        )
            .fromTo(
                boyImage.firstElementChild,
                { scale: 1.6 },
                { duration: 1.6, scale: 1, ease: Power3.easeOut },
                "-=1.2"
            )
            .fromTo(
                girlImage,
                { y: 1200 }, // Start position
                { duration: 1.2, y: 0, ease: Power3.easeOut },
                "-=1.2"
            )
            .fromTo(
                girlImage.firstElementChild,
                { scale: 1.6 },
                { duration: 2, scale: 1, ease: Power3.easeOut },
                "-=1.2"
            );

        // Staggered Text Animation
        tl.from(
            [headlineFirst, headlineSecond, headlineThird],
            {
                duration: 1,
                y: 44,
                opacity: 0,
                ease: Power3.easeOut,
                stagger: 0.12,
            },
            "-=1.8"
        )
            .to([headlineFirst, headlineSecond, headlineThird], { opacity: 1 }) // Ensure opacity goes to 1
            .from(paragraph, { duration: 1, y: 20, opacity: 0, ease: Power3.easeOut }, "-=1.8")
            .to(paragraph, { opacity: 1 }) // Ensure opacity goes to 1
            .from(button, { duration: 1, y: 20, opacity: 0, ease: Power3.easeOut }, "-=2")
            .to(button, { opacity: 1 }); // Ensure opacity goes to 1

        tl.eventCallback("onStart", () => console.log("Animation Started"));
    }, []);

    return (
        <div className='hero' ref={appRef}>
            <div className='container'>
                <div className='hero-inner'>
                    <div className='hero-content'>
                        <div className='hero-content-inner' ref={contentRef}>
                            <h1>
                                <div className='hero-content-line'>
                                    <div className='hero-content-line-inner'>
                                        Relieving the burden
                                    </div>
                                </div>
                                <div className='hero-content-line'>
                                    <div className='hero-content-line-inner'>of disease caused</div>
                                </div>
                                <div className='hero-content-line'>
                                    <div className='hero-content-line-inner'>by behavior.</div>
                                </div>
                            </h1>
                            <p>
                                Better treat serious cardiometabolic diseases to transform lives and
                                reduce healthcare utilization through the use of digital
                                therapeutics.
                            </p>
                            <div className='btn-row'>
                                <button className='explore-btn'>
                                    explore
                                    <div className='arrow-icon'>
                                        <i className='fa-solid fa-chevron-right'></i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='hero-images'>
                        <div className='hero-images-inner' ref={imagesRef}>
                            <div className='hero-image girl'>
                                <img className='pageImg1' src={imgGirl} alt='girl' />
                            </div>
                            <div className='hero-image boy'>
                                <img src={imgBoy} alt='boy' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
