// required modules
import React from "react";
// other
import Band from "./Band";

const BandsContainer = props => {
  return (
    <div>
      <ul>
        {props.bands.map(band => (
          <Band key={band.id} {...band} deleteBand={props.deleteBand} />
        ))}
      </ul>
    </div>
  );
};

export default BandsContainer;
