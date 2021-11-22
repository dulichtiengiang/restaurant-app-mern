import React from "react";

const Testimonial = (props) => {
    const testimonial = props.testimonial;
    return (
        <div className="testimonial">
            <figure className="testimonial__shape">
                <div className="testimonial__caption">{testimonial.name}</div>
                <img src={testimonial.image} alt="" className="testimonial__img" />
            </figure>
            <div className="testimonial-wrapper">
                <div className="testimonial__quote content-primary">
                    <p>{testimonial.quote}</p>
                </div>
                <div className="testimonial__name">
                    <p>{testimonial.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
