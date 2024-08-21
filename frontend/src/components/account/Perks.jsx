import React, { useEffect } from "react";

function Perks({  selected = [], setPerks}) {
  const handleCheckBoxChange = (perks) => {
    setPerks((prevPerks) => {
      if (prevPerks && prevPerks.includes(perks)) {
        return prevPerks.filter((selectedPerks) => selectedPerks!= perks)
      }else{
        return [...prevPerks, perks]
      }
    });
  };
  useEffect(() => {
     console.log(selected);
   }, [selected]);

  return (
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">Perks</label>
    <div className="grid grid-cols-2 gap-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected.includes("wifi")}
          onChange={() => handleCheckBoxChange("wifi")}
        />
        <span>WiFi</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected.includes("AC")}
          onChange={() => handleCheckBoxChange("AC")}
        />
        <span>AC</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected.includes("TV")}
          onChange={() => handleCheckBoxChange("TV")}
        />
        <span>TV</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected.includes("Parking")}
          onChange={() => handleCheckBoxChange("Parking")}
        />
        <span>Parking</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected.includes("Gym")}
          onChange={() => handleCheckBoxChange("Gym")}
        />
        <span>Gym</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected.includes("Pool")}
          onChange={() => handleCheckBoxChange("Pool")}
        />
        <span>Pool</span>
      </label>
    </div>
  </div>
  
  );
}

export default Perks;
