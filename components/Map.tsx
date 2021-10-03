import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import Image from 'next/image';
import Leaflet from 'leaflet'
import styled from 'styled-components';
import { HOTELS } from '../data/hotels';
import IconInfo from '../public/info.svg';
import Modal from './Modal';

import 'leaflet/dist/leaflet.css'

const Name = styled.p`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 14px;
  margin: 0;
`;
const Rating = styled.p`
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  margin: 0;
`;
const About = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;

  background-color: #fff;
  border-radius: 50%;
  bottom: 25px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  height: 44px;
  padding-top: 3px;
  position: absolute;
  right: 10px;
  text-align: center;
  width: 44px;
  z-index: 1000;
`;

const hkLat = 22.3193;
const hkLon = 114.1694;
const placeMarker = Leaflet.icon({
  iconUrl: '/pin.png',
  iconSize: [28, 39]
})

const Map = () => {
  const [showModal, setShowModal] = useState(false);

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
              <Rating>Google rating: {hotel.rating}</Rating>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <About onClick={() => setShowModal(true)}>
        <Image
          src={IconInfo}
          alt="Information"
          height="30"
          width="30"
        />
      </About>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="About"
      >
        <p>Mapping the hotels available for quarantine in Hong Kong for the Facebook HK Quarantine Support Group.</p>

        <strong>Disclaimer</strong>
        <p>Whilst every effort is made to provide accurate, up-to-date information, we cannot be held responsible for any errors or omissions.</p>
        <p>Please always check against the data on the
          <a href="https://www.coronavirus.gov.hk/eng/designated-hotel.html" target="_blank" rel="noreferrer"> HK Government Coronavirus website</a>
        .</p>
      </Modal>
    </>
  )
}

export default Map