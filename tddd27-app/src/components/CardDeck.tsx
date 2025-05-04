import React from "react";
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
  return (
    <div className="carddeck">
      {contents.map((c, idx) => (
        <Card key={idx} className="carddeck-card-container" padding={0}>
          <img src={c.imageUrl}></img>
          <div className="carddeck-title-container">
            <h5>{c.name}</h5>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CardDeck;
