import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Marker = () => <LocationOnIcon style={{fontSize: '40px', color: '#f44336'}} />

const EventDetailsMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
      >
        <Marker
          lat={lat}
          lng={lng}
        />
      </GoogleMapReact>
    </div>
  )
}

export default EventDetailsMap;