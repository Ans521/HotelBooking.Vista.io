import React from "react";
import {useParams } from "react-router-dom";
import AddPage from "./addAccom";
import HotelForm from "./HotelForm";
function Accom() {
  const { place } = useParams();
  return (
    <div>
      {place !== "new" && <AddPage />}
      {place === "new" && (
        <HotelForm />
      )}
    </div>
  );
}

export default Accom;
