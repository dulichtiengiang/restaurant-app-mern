import "./style.scss";
import React, {useRef, useState} from "react";

const RippleButton = (props) => {
    // const [state, setstate] = useState("");
    const [state, setState] = useState(0);
    const [rippleStyle, setRippleStyle] = useState({});
    let timerId;
    const ripple = useRef(null);
    const button = useRef(null);
    
    const onMouseDown = e => {
        setState(""); //! rerender
        clearTimeout(timerId);
        const size = button.current.offsetWidth;
        const pos = button.current.getBoundingClientRect();
        //tọa độ của Ripple circle x 2
        const x = e.pageX - pos.x - size;
        const y = e.pageY - pos.y - size;
        // console.log(`x: `, x, `y: `, y);
        
        const newRippleStyle = {
            left: `${x}px`,
            top: `${y}px`,
            width: `${size * 2}px`,
            height: `${size * 2}px`,
        };

        setRippleStyle(newRippleStyle);
        setState("ripple-start ripple-active");
        timerId = setTimeout(() => {
            setState("");
        }, 500);
    }

    return (
        <button ref={button} className="ripple-button" onMouseDown={onMouseDown}>
            <span ref={ripple} style={rippleStyle} className={`ripple ${state}`}></span>
            <div className="ripple-button__primary">
                {props.children}
            </div>
        </button>
    )
};

export default RippleButton;