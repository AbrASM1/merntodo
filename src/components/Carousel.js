import React, { useState } from "react";
import Image1 from "../icons/Help 1.png"
import Image2 from "../icons/Help2.jpg"
import Image3 from "../icons/Help3.png"
import Image4 from "../icons/Help4.png"


const CarouselItem = ({ item, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      <div></div>
      <img className="carousel-img" src={item.icon} />
      <div className="carousel-item-text">{item.description}</div>
    </div>
  );
};

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      title: "Image1",
      description:
        "Only the field next to red arrow is needed to creat a to-do. Although setting a description may come handy when having multiple to-do with similair titles and adding a deadline with time will give you the remaining time",
      icon: Image1,
    },
    {
      title: "image2",
      description:
        "Customize your to-do by picking a color. ",
      icon: Image2,
    },
    {
      title: "image4",
      description:
        "To edit your to-do just click on where you want to edit like the shown exmple.",
      icon: Image4,
    },
    {
      title: "Weights",
      description:
        "To specify the importance of your to-do the color choosing function gives you more freedom instead of limiting you to preselected colors. like in the exmple shown here red is for school related to-do and green is for others",
      icon: Image3,
    },
    
  ];
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };
  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)`
     }}
      >
        {items.map((item) => {
          return <CarouselItem item={item} width={"100%"} />;
        })}
      </div>

      <div className="carousel-buttons">
        <button
          className="button-arrow"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
        </button>
        <div className="indicators">
          {items.map((item, index) => {
            return (
              <button
                className="indicator-buttons"
                onClick={() => {
                  updateIndex(index);
                }}
              >
                <span
                  className={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  radio_button_checked
                </span>
              </button>
            );
          })}
        </div>
        <button
          className="button-arrow"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};