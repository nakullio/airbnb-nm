import { useState } from 'react';
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})


    // Transform the search results object into the  
    // {latitude: 52.516272, longitude: 13.377722 } 
    // object
    const coordinates = searchResults.map((result) => ({
        // this will return an object everytime its loop through
        longitude: result.long,
        latitude: result.lat,
    }))
    // create the center of coordinate
    // The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates)

    // create viwport fucntion sets
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })


    console.log(selectedLocation)


    return <ReactMapGL
    // pass in the Syle URL and access token
    mapStyle="mapbox://styles/nakula/ckwas9t1a651j15qj0yt9vyqv"
    mapboxApiAccessToken={process.env.mapbox_key}
    // set the view port, that tells the map the size of it
    {...viewport}
    onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
    // create the markers
    {searchResults.map(result => (
       <div key={result.long}>
           <Marker 
                longitude={result.long}
                latitude={result.lat}
                // using offset to pin the location
                offsetLeft={-20}
                offsetTop={-10}
           >
               
               <FontAwesomeIcon onClick={() => setSelectedLocation(result)} className="cursor-pointer animate-bounce" aria-label="push-pin" icon={faMapPin} size="lg" color="#FD5861"/>

           </Marker>
           {/* The popup that should show if we click on a marker */}
           {/* if the selected location matched with the result.location, then render something, which to popup marker */}
           {selectedLocation.long === result.long ? (
               <Popup
               onClose={() => setSelectedLocation({})}
               closeOnClick={true}
               latitude={result.lat}
               longitude={result.long}
               >
                   {result.title}
               </Popup>
           ): (false
           )}
       </div>
        
        ))}



    </ReactMapGL>
}

export default Map
