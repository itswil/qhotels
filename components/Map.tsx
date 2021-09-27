import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { HOTELS } from '../data/hotels';

const hkLat = 22.3193;
const hkLon = 114.1694;
const placeMarker = icon({
  iconUrl: '/pin.png',
  iconSize: [28, 39]
})

const Map = () => {
  return (
    <MapContainer
      center={[hkLat, hkLon]}
      style={{height: '100%', width: '100%'}}
      zoom={12}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="topright" />
      {HOTELS.map(hotel => (
        <Marker
          key={`${hotel.coordinates.lat},${hotel.coordinates.lon}`}
          icon={placeMarker}
          position={[hotel.coordinates.lat, hotel.coordinates.lon]}
        >
          <Tooltip
            direction="top"
            offset={[0, -20]}
          >
            <Name>{hotel.name}</Name>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map