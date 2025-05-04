import React, { useEffect, useState } from "react";
import "./CardDeck.css";
import Card from "./Card";

type content = {
  name: string;
  imageUrl: string;
};

interface Props {
  contents: content[];
  onClick: (idx: number) => void;
}

function CardDeck({ contents, onClick }: Props) {
  const CARD_WIDTH = 400; //px
  const CARDDECK_SIZE_RATIO = 0.6;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(
    (CARDDECK_SIZE_RATIO * window.innerWidth - CARD_WIDTH) /
      (contents.length - 1)
  );

  // handle window resizing, TODO: add this for all other responsive ui
  useEffect(() => {
    const handleResize = () => {
      setOffset(
        (CARDDECK_SIZE_RATIO * window.innerWidth - CARD_WIDTH) /
          (contents.length - 1)
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
      {contents.map((c, idx) => (
        <div
          className="carddeck-card-container"
          style={{
            zIndex: 900 - idx,
            transform: `translateX(${
              (hoveredIndex && idx < hoveredIndex ? -150 : 0) +
              (hoveredIndex && idx >= hoveredIndex ? 100 : 0) +
              offset * idx
            }px)`,
          }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card
            key={idx}
            className="carddeck-card"
            padding={0}
            height={"23rem"}
            width={"25rem"}
          >
            <img src={c.imageUrl}></img>
            <div className="carddeck-title-container">
              <h5>{c.name}</h5>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CardDeck;
