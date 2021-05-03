<template>
  <div id="map">
    <button v-on:click="removeLayers()">Remove layers</button>
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle">
      <MglGeojsonLayer
        :sourceId="geoJsonSource.data.id"
        :source="geoJsonSource"
        layerId="somethingSomething"
        :layer="geoJsonLayer"
      />
    </MglMap>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { onMounted } from "vue";
import { MglMap, MglGeojsonLayer } from "vue-mapbox";
export default {
  components: {
    MglMap,
    MglGeojsonLayer,
  },
  setup() {
    onMounted(() => {
      Mapbox.accessToken = "pk.eyJ1Ijoia3VudmFyIiwiYSI6ImNrbzJ2MGF2djEzYjIycG9iaDliZGsxb3oifQ.7XZhAg0bhElHLnx3UXF7mg"
      const map = new Mapbox.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
      });
      map.on('mouseenter', 'custom-layer', (event) => {
        console.log('simpleee',event)
      })

      map.on("click", "custom-layer", (e) => {
        console.log("mainemainemaine", e);
      });
    });
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1Ijoia3VudmFyIiwiYSI6ImNrbzJ2MGF2djEzYjIycG9iaDliZGsxb3oifQ.7XZhAg0bhElHLnx3UXF7mg", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
      geoJsonSource: {
        type: "geojson",
        data: {
          id: "thisIsMySource",
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description: "Hey! I am kunvar singh",
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [81.5185546875, 25.720735134412106],
                    [78.44238281249999, 24.287026865376436],
                    [79.56298828125, 21.820707853875017],
                    [84.39697265625, 22.187404991398775],
                    [85.8251953125, 24.56710835257599],
                    [81.5185546875, 25.720735134412106],
                  ],
                ],
              },
            },
          ],
        },
      },
      geoJsonLayer: {
        id: "custom-layer",
        type: "fill",
        source: "thisIsMySource", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      },
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    removeLayers: function() {
      this.mapbox.map.removeLayer("somethingSomething");
    },
  },
};
</script>
<style scoped>
#map {
  height: 250px;
}
</style>
