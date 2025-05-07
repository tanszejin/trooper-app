import React, { useEffect, useState } from "react";
import "./CardDeck.css";
import Card from "./Card";

interface Props {
  content: any[];
  onClick: (idx: number) => void;
}

function CardDeck({ content, onClick }: Props) {
  const CARD_WIDTH = 400; //px
  const CARDDECK_SIZE_RATIO = 0.6;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(
    (CARDDECK_SIZE_RATIO * window.innerWidth - CARD_WIDTH) /
      (content.length - 1)
  );

  // handle window resizing, TODO: add this for all other responsive ui
  useEffect(() => {
    const handleResize = () => {
      const size = window.innerWidth < 800 ? 800 : window.innerWidth;
      setOffset(
        (CARDDECK_SIZE_RATIO * size - CARD_WIDTH) /
          (content.length<=1 ? 1 : content.length - 1)
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="carddeck">
      {content.map((c, idx) => (
        <div
          key={c.id}
          className="carddeck-card-container"
          style={{
            zIndex: 900 - idx,
            transform: `translateX(${
              (hoveredIndex && idx < hoveredIndex ? -170 : 0) +
              (hoveredIndex && idx >= hoveredIndex ? 120 : 0) +
              offset * idx
            }px)`,
          }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onClick(idx)}
        >
          <Card
            key={idx}
            className="carddeck-card"
            padding={0}
            height={"23rem"}
            width={"25rem"}
            margin={0}
          >
            <img src={c.image_url}></img>
            <div className="img-cover"></div>
            <div className="carddeck-title-container">
              <h5>{c.trip_name}</h5>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CardDeck;
