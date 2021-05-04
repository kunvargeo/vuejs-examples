<template>
  <div>
    <div class="mb-4">
      <button v-on:click="addLayers()"  class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700">Add layers</button>
      <button v-on:click="removeLayers()"  class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700">Remove layers</button>
      <button v-on:click="changeColorOfLayer()"  class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700">Change color of layers</button>
    </div>
    <div id="map" class="w-auto"></div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
export default {
  data: function() {
    return {
      colors: [
        "#ffffcc",
        "#a1dab4",
        "#41b6c4",
        "#2c7fb8",
        "#253494",
        "#fed976",
        "#feb24c",
        "#fd8d3c",
        "#f03b20",
        "#bd0026",
      ],
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
  setup() {},
  methods: {
    changeColorOfLayer: function() {
      if (this.mapbox.getLayer("custom-layer")) {
        this.mapbox.setPaintProperty(
          "custom-layer",
          "fill-color",
          this.colors[Math.floor(Math.random() * 10)]
        );
      }
    },
     removeLayers: function() {
      if (this.mapbox.getLayer("custom-layer")) {
        this.mapbox.removeLayer("custom-layer");
      }
    },
    addLayers: function() {
       if (!this.mapbox.getLayer("custom-layer")) {
         this.mapbox.addLayer({
          id: "custom-layer",
          type: "fill",
          source: "thisIsMySource", // reference the data source
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 0.5,
          },
        });
       }
    },
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    setTimeout(() => {
      Mapbox.accessToken =
        "pk.eyJ1Ijoia3VudmFyIiwiYSI6ImNrbzJ2MGF2djEzYjIycG9iaDliZGsxb3oifQ.7XZhAg0bhElHLnx3UXF7mg";
      const map = new Mapbox.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
      });

      // map.on("mouseenter", "custom-layer", (event) => {
      //   console.log("simpleee", event);
      // });
      map.on("click", "custom-layer", (e) => {
        new Mapbox.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<div id="popup-content">kkk</div>')
          .addTo(map);
      });
      this.mapbox = map;
      map.on("load", () => {
        map.addSource("thisIsMySource", {
          type: "geojson",
          data: {
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
        });
        map.addLayer({
          id: "custom-layer",
          type: "fill",
          source: "thisIsMySource", // reference the data source
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 0.5,
          },
        });
      });
    }, 5000);
  },
};
</script>
<style scoped>
#map {
  height: 280px;
}
</style>
