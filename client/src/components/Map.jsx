import React, { useState, useRef, useEffect } from 'react';
// // import useSwr from"swr";
// import GoogleMapReact from 'google-map-react';
// // import useSupercluster from"use-supercluster";
import {
  GoogleMap,
  useLoadScript
} from '@react-google-maps/api';

const {
  withScriptjs,
  withGoogleMap,
  Marker,
} = require('react-google-maps');
const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');

import '../styles.css';
const libraries = ['places'];
const center = {
  lat: 29.951439,
  lng: -90.081970
};
const mapContainerStyle = {
  paddingTop: '4rem',
  width: '50vw',
  height: '50vh'
};

let service;
let infoWindow;
let map;

const Map = () => {

  const initialize = () => {
    
    const superdome = new google.maps.LatLng(center.lat, center.lng);
  
    map = new google.maps.Map(document.getElementById('map'), {
      mapContainerStyle: mapContainerStyle,
      center: superdome,
      zoom: 12
    });
  
    const request = {
      location: superdome,
      radius: '24140.16',
      type: ['book_store']
    };
  
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  };
  
  const callback = (results, status) => { 
    console.log(results);
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position, 'POSOISIDSOFN');
    });
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  };
  //1)map setup
  //2)load and format data
  //3)get clusters
  //4)render map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });
  if (loadError) { return 'Error loading maps'; } 
  if (!isLoaded) { return 'Loading Maps'; }
  // const [stores, setStores] = React.useState([]); 
  // initialize();
  const createMarker = (place) => {
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent([place.name, place.vicinity, place.rating]);
      infoWindow.open(map, this);
    });
  };
  return (
    <div style={{paddingTop: '4rem', width: '50vw', height: '50vh'}}>
      <div id='map' style={{paddingTop: '4rem', width: '50vw', height: '50vh'}}>
        <GoogleMap
          onTilesLoaded={initialize}
          mapContainerStyle={mapContainerStyle}
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          center={ center }
          zoom={12}
        >
          {/*markers*/}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

