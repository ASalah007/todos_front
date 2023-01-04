import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

function ListsPage() {
  const [animate, setAnimate] = useState(false);
  const [style, api] = useSpring(
    () => ({
      from: { transform: "scale(1.0)", x: 0, y: 0 },
      to: {
        transform: animate ? "scale(2.5)" : "scale(1.0)",
        x: animate ? 1200 : 0,
        y: animate ? 200 : 0,
      },
    }),
    [animate]
  );
  return (
    <div className="bg-yellow-300 grow">
      <animated.div style={style} onClick={() => setAnimate((old) => !old)}>
        <div className="bg-white h-40 w-40">ListsPage</div>
      </animated.div>
    </div>
  );
}

export default ListsPage;
