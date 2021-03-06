import { Map, View } from 'ol';
import { Point } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { useEffect } from 'react';
import { Koordinaatti, muunnaOlKoordinaatti } from './apu/geometria';
import { annettu } from './apu/yleiset';
import { Mittauspiste } from './yhteiset';

export interface KarttaProps {
  pisteenLisays: boolean
  onLisaaPiste: (k: Koordinaatti) => void
  onValitsePiste: (piste: Mittauspiste) => void
}

const pisteSource = new VectorSource({ wrapX: false });

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: pisteSource
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
})

export const Kartta = (props: KarttaProps) => {
  useEffect(() => {
    map.setTarget('kartta')
  })

  console.log('pisteenlisäys?: ' + props.pisteenLisays)
  useEffect(
    () => {
      if (props.pisteenLisays) {
        const draw = new Draw({
          source: pisteSource,
          type: 'Point',
        });
        map.addInteraction(draw)
        draw.on('drawend', (drawend) => {
          console.log('drawend')
          const olPiste = annettu(drawend.feature.getGeometry()) as Point
          const koordinaatti = muunnaOlKoordinaatti(olPiste.getCoordinates())

          map.removeInteraction(draw)

          props.onLisaaPiste(koordinaatti)
        })
      }
    },
    [props.pisteenLisays])

  return (<div id="kartta" />)
}
