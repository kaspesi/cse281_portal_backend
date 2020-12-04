import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 39.5,
  lng: -98.35,
};

function Map(props) {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    //const bounds = new window.google.maps.LatLngBounds();
    //map.fitBounds(bounds);
    setMap(map);
    props.setMapRef(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAef0NgwborHdaOX4uKFiSCqd_hRipYgW4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        id="mapDiv"
        center={center}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {props.markers.map((marker) => {
          return <Marker position={{ lat: marker.lat, lng: marker.lng }} />;
        })}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
