import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from '../styles/Home.module.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhaWRvbjgyIiwiYSI6ImNsYjZka3FwOTAwMzAzb21tZ3FkYTlvcXQifQ.SUHlwDjcQVZOPIsevWhYrA'


export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(9.15);
    const [lat, setLat] = useState(45.46);
    const [zoom, setZoom] = useState(12.5);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
        });
      });



      useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });




        map.current.on('load', () => { // when the map is loaded
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition((position) => {
                 map.current.flyTo({
                   center: [position.coords.longitude, position.coords.latitude],
                   zoom: 12
                 })
               })
             } else {
               console.log("Geolocation is not supported by this browser.")
             }
          })
        
        
    

        
        });


      return (
        <div>
<div className={styles.sidebarStyle}> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>

<div ref={mapContainer} className={styles.mapContainer} />
        </div>
        );


}
