import Image from 'next/image';
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import Leaflet from 'leaflet'
import styled from 'styled-components';
import { HOTELS } from '../data/hotels';
import IconInfo from '../public/info.svg';

import 'leaflet/dist/leaflet.css'

const Name = styled.div`
  font-weight: bold;
`;
const About = styled.div`
  background-color: #fff;
  border-radius: 50%;
  bottom: 25px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  height: 40px;
  padding-top: 5px;
  position: absolute;
  right: 10px;
  text-align: center;
  width: 40px;
  z-index: 400;
`;

const hkLat = 22.3193;
const hkLon = 114.1694;
const placeMarker = Leaflet.icon({
  iconUrl: '/pin.png',
  iconSize: [28, 39]
})

const Map = () => {
  return (
    <>
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
      <About>
        <Image
          src={IconInfo}
          alt="Information"
          height="30"
          width="30"
        />
      </About>
    </>
  )
}

export default Map