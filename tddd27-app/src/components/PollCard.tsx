import React from "react";
import Card from "./Card";

interface Props {
  poll: any;
  pollsCollectionRef: any;
}

function PollCard({ poll, pollsCollectionRef }: Props) {
  return (
    <div>
      <Card className="poll-card" height={"100%"} width={"100%"} margin={0}>
        <h4>{poll.name}</h4>
      </Card>
    </div>
  );
}

export default PollCard;
