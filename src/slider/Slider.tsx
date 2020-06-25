import * as React from "react";

import "./styles.css";

interface SliderState {
    start: number
    active: number
    width: number
    left: number
}

export const Slider = () => {
    const [state, setState] = React.useState<SliderState>({
        left: 0,
        active: 1,
        width: 0,
        start: 0,
    });

    const {left, active} = state;

    React.useEffect(() => {
        const slider = document.getElementsByClassName("slider")[0].getBoundingClientRect().width
        setState(prev => ({
            ...prev,
                width: slider,
        }));
        console.log(slider);
    }, []);

    const touchMove = (e: React.TouchEvent<HTMLUListElement>) => {
        const now = e.changedTouches[0].clientX;

        setState(prev => ({
            ...prev,
            left: now - prev.start,
        }));
    };

    const touchStart = (e: React.TouchEvent<HTMLUListElement>) => {
        const start = e.changedTouches[0].clientX;

        setState(prev => ({
          ...prev,
          start: start - prev.left,
        }));
    };

    const list = [
        ["Вы оплатили", "25%"],
        ["До конца срока", "15 дней"],
        ["Уровень:", "4"],
        ["Просрочка:", "4 дня"],
    ];

    const blockWidth = state.width / list.length;
    const halfBlock = blockWidth / 2;

    const touchEnd = () => {
        if (left >= -halfBlock) setState({...state, left: 0, active: 1});
        else if (left <= -halfBlock && left >= -blockWidth * 1.5) setState({...state, left: -blockWidth, active: 2});
        else if (left <= -blockWidth * 1.5 && left >= -blockWidth * 2.5) setState({...state, left: -(blockWidth * 2), active: 3});
        else if (left <= -blockWidth * 2.5) setState({...state, left: -(blockWidth * 3), active: 4});
    };

    return(
        <>
            <div className="container">
                <ul
                    className="slider"
                    onTouchMove={touchMove}
                    onTouchStart={touchStart}
                    onTouchEnd={touchEnd}
                    style={{transform: `translate(${left}px, -50%)`}}
                >
                    {list.map(([title, num], i) => {
                        return (
                            <li key={i}>
                                <span>{title}</span>
                                <span>{num}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="dots">
                    <span className={active === 1 ? "active" : ""}/>
                    <span className={active === 2 ? "active" : ""}/>
                    <span className={active === 3 ? "active" : ""}/>
                    <span className={active === 4 ? "active" : ""}/>
                </div>
            </div>
        </>
    )
};
