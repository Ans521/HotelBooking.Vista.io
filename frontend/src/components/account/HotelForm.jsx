import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
function HotelForm() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const[price, setPrice]=useState(0);
  const [existingImages, setExistingImages] = useState([]);
  const [picLinks, setPicLinks] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const[activeimg,setActiveimg]=useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/auth/hotel/${id}`).then(({ data }) => {
      console.log("lalala", data.hotel)
      setTitle(data.hotel.title);
      setAddress(data.hotel.address);
      setDescription(data.hotel.description);
      setPrice(data.hotel.price);
      setExistingImages(data.hotel.images);
      setPerks(data.hotel.perks);
      setCheckin(data.hotel.checkin);
      setCheckout(data.hotel.checkout);
      setMaxGuests(data.hotel.maxGuests);
    });
  }, [id])

  async function addImgLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/auth/imgurl", {
      imgurl: picLinks,
    });

    if (!picLinks) {
      alert("enter pic link");
    }
    const { picName } = filename; // filename mei se picName nikal liya
    setExistingImages((prev) => {
      return [...prev, picName];
    });
    setPicLinks("");
  }

  async function handleImageUpload(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let file of files) {
      data.append("photos", file);
    }
    const { data: filename } = await axios.post("/auth/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(filename.uploadedImages[0][0]);
    setExistingImages((prev) => {
      return [...prev, filename.uploadedImages[0][0]];
    });
  }

  async function handleInput(e) {
    e.preventDefault();
    if (!id) {
      try {
        const { data } = await axios.post("/auth/data", {
          title,
          address,
          description,
          price,
          images: existingImages,
          perks,
          checkin,
          checkout,
          maxGuests,
        });
        if (data) {
          navigate("/account/accom");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.put("/auth/update", {
          id,
          title,
          address,
          description,
          price,
          images: existingImages,
          perks,
          checkin,
          checkout,
          maxGuests,
        });
        if (data) {
          navigate("/account/accom");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function removeImage(e, img) {
    e.preventDefault();
    setExistingImages((prev) => {
      return prev.filter((p) => p !== img);
    });
  }

  async function saveImage(e, img) {
    e.preventDefault();
    setExistingImages((previmg) => {
      const mainImg = previmg.filter((p) => p != img);
      return [img, ...mainImg];
    });
    setActiveimg(img);
    
  }
  return (
    <div>
      <div className="w-full flex justify-center mx-auto p-6 bg-white">
        <form
          className="lg:w-1/2 sm:w-full md:w-full w-full shadow-lg p-6 flex flex-col justify-center"
          onSubmit={handleInput}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter a title (10 words)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Photos
            </label>
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center space-x-4">
              <input
                type="text"
                id="photos"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mb-3 sm:mb-1 md:mb-0 lg:mb-0"
                value={picLinks}
                onChange={(e) => setPicLinks(e.target.value)}
              />
              <button
                type="button"
                onClick={addImgLink}
                className="flex gap-1 items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Add Photo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {existingImages && existingImages.length > 0 &&
              existingImages.map((existingImage, index) => (
                <div className="relative" key={index}>
                  <img
                    className="w-full h-full rounded-xl mr-2"
                    src={"http://localhost:3000/uploads/" + existingImage}
                    alt="#"/>
                  <button
                    onClick={(e) => removeImage(e, existingImage)}
                    className="absolute bottom-1 right-0 bg-red-200 hover:bg-red-600 text-white rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button onClick={(e) => saveImage(e, existingImage)}
                    className="absolute top-1 text-gray-400 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                    {activeimg === existingImage ? (
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                   </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}

            <label className="inline-flex items-center gap-1 font-semibold text-black rounded-xl border border-gray-600 px-10 py-6 cursor-pointer">
              <input type="file" hidden onChange={handleImageUpload} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                />
              </svg>
              Upload
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Detailed Description
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter a detailed description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input type="text"  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter a Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}/>
          </div>

          <Perks selected={perks} setPerks={setPerks} />

          <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="checkin"
              >
                Check-in
              </label>
              <input
                type="date"
                id="checkin"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="checkout"
              >
                Check-out
              </label>
              <input
                type="date"
                id="checkout"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="maxGuests"
              >
                Max Guests
              </label>
              <input
                type="number"
                id="maxGuests"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter max guests"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            {id ? "Update" : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HotelForm;
