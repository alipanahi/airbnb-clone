import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from '../styles/Home.module.css'
import Router from 'next/router'

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhaWRvbjgyIiwiYSI6ImNsYjZka3FwOTAwMzAzb21tZ3FkYTlvcXQifQ.SUHlwDjcQVZOPIsevWhYrA'


export default function Map({flats}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12.4964);
    const [lat, setLat] = useState(41.9028);
    const [zoom, setZoom] = useState(5);

    const handleClick = id=>{
      Router.push(`/flats/${id}`)
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
        });
      },[]);
      useEffect(() => {
        if (!map.current) return; // wait for map to initialize
       
        map.current.on('load', () => { // when the map is loaded
          if(flats){
            flats.forEach(flat => {
              let url = 'https://res.cloudinary.com/dc24zff14/image/upload/v1670164426/xstrgjeyl5jf73zxtgpo.jpg'
              if(flat.Images.length>0){
                url = flat.Images[0].path
              }
              // Create a DOM element for each marker.
              const el = document.createElement('div');
              const width = 50;
              const height = 50;
              el.className = 'marker';
              el.style.backgroundImage = `url(${url})`;
              el.style.width = `${width}px`;
              el.style.height = `${height}px`;
              el.style.backgroundSize = 'cover';
              el.onclick = ()=>handleClick(flat.id);
              
              
              if (flat.lon && flat.lat) {
                new mapboxgl.Marker(el)
                  .setLngLat([flat.lon, flat.lat])
                  .addTo(map.current);
              }
            })
         
          }else{
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

          }
          })
        },[]);


      return (
        <div>
<div className={styles.sidebarStyle}> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>

<div ref={mapContainer} className={styles.mapContainer} />
        </div>
        );


}
