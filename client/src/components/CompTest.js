import React from "react";
import eco1 from "../assets/images/eco-1.jpg";
import eco2 from "../assets/images/eco-2.jpg";
import eco3 from "../assets/images/eco-3.jpg";

//! components
import RippleButton from "./Button/RippleButton";
import Testimonial from "./Testimonial";
const CompTest = () => {
    const flipCardObj =  [
        {
            color: ["#ef3e36", "#800302"],
            background: eco1,
            heading: ["make", "creative"],
            details: ["10 nations", "3000 companies", "250% performance"],
            price: "250.000đ",
        }, 
        {
            color: ["#6282bf", "#a164aa"],
            background: eco2,
            heading: ["share", "advantage"],
            details: ["Supply Chain", "Block Chain"],
            price: "450.000đ",
        }, 
        {
            color: ["#76c26a", "#7fcab5"],
            background: eco3,
            heading: ["share", "advantage"],
            details: ["Supply Chain", "Block Chain"],
            price: "450.000đ",
        }, 
    ]

    const cardObj = [
        {
            icon: "fas fa-globe-americas",
            name: "100% Doanh Nghiệp tăng trưởng",
            content: "Tăng trưởng doanh thu đạt 150% với lợi nhuận tăng 40%.",
        },
        {
            icon: "fas fa-cloud-upload-alt",
            name: "Phát triển 60% khách hàng tiềm năng",
            content: "Phát triển khách hàng tiềm năng, gia tăng tỷ lệ chuyển đổi.",
        },
        {
            icon: "fas fa-bullhorn",
            name: "Tăng 23% lưu lượng truy cập",
            content: "Tiếp thị đa kênh mang lại kết quả tìm kiếm cao, bền vững.",
        },
        {
            icon: "far fa-window-restore",
            name: "Cải thiện 150% ROI",
            content: "Cải thiện 150% ROI",
        },
    ];

    const listFlipCard = flipCardObj.map((card, index) => (
        <div className="col-1-of-3" key={index}>
            <div className="flip-card">
                <div className="flip-card__side flip-card__side--front">
                    <div
                        className="flip-card__picture flip-card__picture--1"
                        style={{ backgroundImage: `linear-gradient(45deg, ${card.color[0]}, ${card.color[1]}), url("${card.background}")` }}
                    ></div>
                    <h4
                        className="flip-card__heading flip-card__heading-span"
                        style={{ backgroundImage: `linear-gradient(to right bottom,
                            ${card.color[0]},
                            ${card.color[1]})`}}
                    >
                        <span className="flip-card__heading-span">
                            {card.heading[0]} <br />
                            {card.heading[1]}
                        </span>
                    </h4>
                    <div className="flip-card__details">
                        <ul>
                            {card.details.map((x, index) => (
                                <li key={index}>{x}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    className="flip-card__side flip-card__side--back"
                    style={{ backgroundImage: `linear-gradient(to right, ${card.color[0]}, ${card.color[1]})` }}
                >
                    <div className="flip-card__cta">
                        <div className="flip-card__price-box">
                            <p className="flip-card__price-only">Only</p>
                            <p className="flip-card__price-value">{card.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    const testimonialObj = [
        {
            image: eco1,
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aperiam quo consectetur quis error accusamus possimus nostrum hic modi provident unde deleniti fuga nihil rerum ratione natus",
            name: "Victorpi Nguyen",
        },
        {
            image: eco2,
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aperiam quo consectetur quis error accusamus possimus nostrum hic modi provident unde deleniti fuga nihil rerum ratione natus",
            name: "Tai Pham",
        },
        {
            image: eco3,
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aperiam quo consectetur quis error accusamus possimus nostrum hic modi provident unde deleniti fuga nihil rerum ratione natus",
            name: "Tri Ninh Quoc",
        },
    ]

    return (
        <div className="component-test">
            Inside in Component Test
            <section className="section-header">
                <div className="banner-content">
                    <h2 className="">ECOMMERCE SHOP</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aperiam quo consectetur quis error accusamus possimus
                        nostrum hic modi provident unde deleniti fuga nihil rerum ratione natus, a perspiciatis dignissimos est itaque repellendus,
                        repellat vero! Consequatur libero sapiente harum reiciendis nisi odit! Amet dolorum quos magnam corporis aperiam eaque at eos
                        dolores minus fuga ex distinctio ad repudiandae, veritatis explicabo est. Rerum consequuntur deserunt commodi doloremque
                        ratione quo velit quis quos aliquam, sit nisi iste eaque placeat obcaecati pariatur at repellat repudiandae corrupti
                        aspernatur est modi. Beatae labore eveniet molestias impedit neque, officia optio dolor.
                    </p>
                </div>
            </section>
            <section className="section-about">
                <div className="row">
                    <div className="col-1-of-2">
                        <div className="heading-secondary">STORY ABOUT US</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa voluptatem esse est ut ab eveniet praesentium asperiores
                        reprehenderit dignissimos ullam tempore aliquam, nesciunt ipsum rem eius, voluptate debitis laborum. Accusamus, veritatis
                        repellendus quam impedit adipisci placeat sit, et asperiores minima explicabo consectetur voluptatum natus ullam fugiat culpa
                        neque magnam. Numquam, maiores atque placeat a ducimus ea alias? Magni, minima. Molestias adipisci id fugit quia vero,
                        perferendis nulla nemo eos maxime doloremque ullam animi doloribus vel sunt cumque expedita nobis reiciendis ad, inventore
                        aliquid est, eaque odio! Itaque, reiciendis dicta! Inventore illum blanditiis, odio ad eum adipisci est optio, doloribus
                        placeat exercitationem provident officia amet. Maiores rem et tempore omnis sed corrupti ut atque recusandae cumque minus.
                        Beatae, perspiciatis dolor. Quasi quam doloremque natus a in non itaque repudiandae deleniti. Inventore, id saepe. Delectus,
                        totam natus soluta voluptatem itaque assumenda quia, ea sequi quas neque, distinctio deserunt perspiciatis vel eligendi?
                        Voluptatem cum natus eos, architecto facilis quae? Delectus dignissimos, ipsa similique, earum ipsam, necessitatibus aliquid
                        perferendis temporibus ea repudiandae dolor nam maiores natus corporis dolore minima exercitationem cumque eius est. Dolorum
                        iure, rerum sequi amet necessitatibus excepturi beatae magnam, in suscipit hic sint animi doloremque, optio cum facilis a
                        ducimus nihil ipsa expedita debitis deserunt earum fugiat. At, sint voluptates. Tenetur architecto quo et soluta nisi a
                        corrupti, incidunt aliquid neque sed! Asperiores dolor natus perferendis tenetur ducimus voluptas, eos, culpa quae corrupti
                        deleniti adipisci tempora distinctio minus debitis quos? Dicta quam hic pariatur. Deleniti dolores est sed iste, nisi in
                        officia minus repellat voluptate nam ex sit excepturi, consectetur fugiat pariatur quaerat numquam placeat aliquam alias
                        similique nemo consequuntur. Quis ab et nisi asperiores numquam deserunt aliquid sunt, dicta cupiditate reiciendis pariatur
                        excepturi a nemo accusantium fugit esse? Aliquam non provident adipisci laborum minima accusamus placeat explicabo suscipit
                        dolorem.
                    </div>
                    <div className="col-1-of-2">
                        <div className="composition">
                            <img className="composition__photo position-photo-1" src={`/uploads/productImage-1636508085000.png`} alt="" />
                            <img className="composition__photo position-photo-2" src={`/uploads/productImage-1636612069336.png`} alt="" />
                            <img className="composition__photo position-photo-3" src={`/uploads/productImage-1636645449314.png`} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-card">
                <div className="section-container">
                    <div className="section-card__title">chúng tôi xem trọng kết quả hơn lời nói</div>
                    <div className="row">
                        {cardObj.map((obj, index) => (
                            <div className="col-1-of-4" key={index}>
                                <div className="card-box">
                                    <i className={`card-box__icon ${obj.icon} u-mb-1rem`}></i>
                                    <h3 className="card-box__name u-mb-1rem">{obj.name}</h3>
                                    <div className="card-box__text">{obj.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section-flip-card">
                <div className="section-container">
                    <div className="row">{listFlipCard}</div>
                </div>
            </section>
            <section className="section-testimonials">
                <div className="bg-video">
                    <video className="bg-video__content  " autoPlay muted loop>
                        <source src="/assets/images/stock_market_bg.mp4" type="mp4" />
                    </video>
                </div>
                <div className="section-container">
                    {testimonialObj.map((x, index) => (
                        <Testimonial testimonial={x} key={index} />
                    ))}
                </div>
            </section>
            <section className="section-footer"></section>
        </div>
    );
};

export default CompTest;
