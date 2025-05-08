import React, { useEffect, useState } from "react";
import "./CardDeck.css";
import Card from "./Card";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  tripIds: string[];
  onClick: (idx: number) => void;
}

function CardDeck({ tripIds, onClick }: Props) {
  const CARD_WIDTH = 400; //px
  const CARDDECK_SIZE_RATIO = 0.6;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  // handle window resizing, TODO: add this for all other responsive ui
  useEffect(() => {
    console.log(window.innerWidth, tripIds.length, offset);
    if (tripIds.length === 0) {
      return;
    }

    getTrips();

    const handleResize = () => {
      const size = window.innerWidth < 600 ? 600 : window.innerWidth;
      setOffset(
        (CARDDECK_SIZE_RATIO * size - CARD_WIDTH) /
          (trips.length <= 1 ? 1 : trips.length - 1)
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getTrips() {
    console.log("getting trips");
    try {
      const q = query(
        collection(db, "trips"),
        where("__name__", "in", tripIds)
      );
      const snapshot = await getDocs(q);
      setTripsFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setTripsFromSnapshot(snapshot: QuerySnapshot) {
    console.log("setTripsFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      trip_name: doc.data().trip_name,
      image_url: doc.data().image_url,
      id: doc.id,
    }));
    console.log("trips: ", data);
    setTrips(data);
    setOffset(
      (CARDDECK_SIZE_RATIO * window.innerWidth - CARD_WIDTH) /
        (tripIds.length - 1)
    );
  }

  return (
    <div className="carddeck">
      {trips.map((c, idx) => (
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
