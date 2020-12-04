import React from "react";
import "./ImageLinkForm.css";
import { useState } from "react";
import AuthService from "../../services/authService";
import axios from "axios";
import { useGoogleMap } from "@react-google-maps/api";
import hotelName from "../hotelName/hotelName";
import { render } from "react-dom";

const ImageLinkForm = (props) => {
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageDisplayUrl, setImageDisplayUrl] = useState("");
  const [resultImgDisplayUrl, setResultImageDisplayUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hotelName, setHotelName] = useState("");

  const fileSelectedHandler = (event) => {
    setSelectedFiles(event.target.files);
  };

  const fileUploadHandler = () => {
    console.log("Uploading files to backend...");

    const formData = new FormData();

    // Add files to form data
    for (const index in selectedFiles) {
      const file = selectedFiles[index];
      formData.append("photos", file);
    }

    const user = JSON.parse(localStorage.getItem("user"));

    let headers = { "Content-Type": "multipart/form-data" };
    if (user && user.jwtToken) {
      // for Node.js Express back-end
      headers["Authorization"] = "Bearer: " + user.jwtToken;
    }
    //const url = "https://cse-backend.herokuapp.com";
    axios({
      method: "POST",
      url: "/investigate",
      data: formData,
      headers: headers,
    }).then((resp) => {
      // I will use the resp here when the model is working
      //let hotel_id = resp.data.results.hotel_id;
      // this.state = {
      //   hotel_name: resp.data.hotel_name,
      // };
      // const data = {
      //   hotel_id: resp.data.hotel_id,
      //   hotel_name: resp.data.hotel_name,
      //   chain_id: resp.data.chain_id,
      // };
      // hotelName({ data });

      let hotel_name = resp.data.results.hotel_name;
      // let chain_id = resp.data.results.chain_id;
      let latitude = resp.data.results.latitude;
      let longitude = resp.data.results.longitude;
      setHotelName(hotel_name);
      console.log(hotel_name);
      props.setMarkers({ lat: latitude, lng: longitude });
      props.map.panTo({ lat: latitude, lng: longitude });
      props.map.setZoom(5);
    });
  };

  const handleSubmit = (event) => {
    setImageDisplayUrl(imageUrlInput);
    // Send the url to the backend
    fetch("/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: imageUrlInput }),
    }).then((resp) => {
      console.log(resp);
      // if image found from backend - setResultImageDisplayUrl(resp.url)
    });
  };

  // //hotel_name
  // var hotel = this.hotel_name || "";

  return (
    <div>
      <p className="f3">
        {imageDisplayUrl ? (
          <img src={imageDisplayUrl} class=""></img>
        ) : (
          "Insert Hotel Image Here"
        )}

        <img src={resultImgDisplayUrl}></img>
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          {/* <input
            value={imageUrlInput}
            onChange={(event) => setImageUrlInput(event.target.value)}
            className="f4 pa2 w-70 center"
            type="tex"
          /> */}
          {/* <button
            onClick={handleSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-black"
          >
            Find Room
          </button> */}
          <div>
            <input type="file" onChange={fileSelectedHandler} multiple />
            <button onClick={fileUploadHandler}>Upload</button>
          </div>
        </div>
      </div>
      <div className="center">
        <h3>{hotelName}</h3>
      </div>
    </div>
  );
};

export default ImageLinkForm;
