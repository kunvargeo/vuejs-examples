<template>
<div>
 <label for="new-todo">BaseMap : </label>
      <select v-model="filter" class="h-8 border" @change="onChange($event)">
        <option disabled value="">
          Select
        </option>
        <option value="Dark">Dark</option>
        <option value="Street">Street</option>
        <option value="Satellite">Satellite</option>
      </select>
    <div id="map" class="w-auto mt-2" />
</div>
</template>
<script>
import Mapbox from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import axios from "axios";
import * as turf from '@turf/turf';


export default {
  data: function() {
    return {
      filter: "Street",
    };
  },
  mounted() {
    Mapbox.accessToken =
      "pk.eyJ1Ijoia3VudmFyIiwiYSI6ImNrbzJ2MGF2djEzYjIycG9iaDliZGsxb3oifQ.7XZhAg0bhElHLnx3UXF7mg";
    const map = new Mapbox.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.5946, 12.9716], // starting position
      zoom: 12, // starting zoom
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new Mapbox.NavigationControl());
    var draw = new MapboxDraw({
    displayControlsDefault: true,
    controls: {
    polygon: true,
    trash: true
    },
    defaultMode: 'draw_polygon'
    });
    map.addControl(draw);
    map.on('draw.create', updateArea);
    function updateArea(e) {
        const features = e.features[0]
        var centroid = turf.centroid(features);
        var lon = centroid.geometry.coordinates[0];
        var lat = centroid.geometry.coordinates[1];
        const payload = {"operationName":"fetchNearbyRestaurants","variables":{"bound":1000,"lat":lat,"long":lon},"query":"query fetchNearbyRestaurants($bound: Int!, $lat: float8!, $long: float8!) {\n  get_nearby_restaurants(args: {bound: $bound, lat: $lat, long: $long}) {\n    name\n    lat\n    long\n    __typename\n  }\n}\n"}
        // const payload = {"operationName":"fetchNearbyRestaurants","variables":{"bound":1000,"lat":lat,"long":lon},"query":"query fetchNearbyRestaurants($bound: Int!, $lat: float8!, $long: float8!) {\n  get_nearby_restaurants(args: {bound: $bound, lat: $lat, long: $long}) {\n    name\n    lat\n    long\n    __typename\n  }\n}\n"}
              axios.post('https://api.geoql.in/v1/graphql',payload).then((res) => {
                  if(res.data && res.data.data && res.data.data.get_nearby_restaurants && res.data.data.get_nearby_restaurants.length){
                        res.data.data.get_nearby_restaurants.forEach((data)=>{
                         this.marker = new Mapbox.Marker()
                            .setLngLat([data.lat,data.long])
                            .setPopup(new Mapbox.Popup()
                            .setLngLat([data.lat,data.long])
                            .setHTML(data.name))
                            .addTo(map);
                             })
                        }
              })
    }
    this.mapbox = map;
    map.on("load", () => {
    });
  },
  created() {},
  methods: {
      onChange:function(event){
          var mapStyle = ''
          if(event.target.value==='Street') mapStyle='mapbox://styles/mapbox/streets-v11'
           if(event.target.value==='Satellite') mapStyle='mapbox://styles/kunvar/ckodw2d563dqm17oeio2l5q5s'
            if(event.target.value==='Dark') mapStyle='mapbox://styles/kunvar/ckodvr00f3fry17noagemspc7'
          this.mapbox.setStyle(mapStyle)
      },

  },
};
</script>
<style scoped>
#map {
  height: 350px;
}
</style>
