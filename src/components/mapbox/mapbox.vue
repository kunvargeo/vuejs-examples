<template>
  <div>
    <div class="mb-4">
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="loadDataToMap()"
      >
        Load Data to map
      </button>
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="loadIconToMap()"
      >
        Load Symbol/icons on map
      </button>
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="zoomToPloygon()"
      >
        Zoom To Polygon
      </button>
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="addLayer()"
      >
        Add layer
      </button>
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="removeLayers()"
      >
        Remove layers
      </button>
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="changeColorOfLayer()"
      >
        Change color of layers
      </button>
      <label for="new-todo">Layer Filter : </label>
      <select v-model="filter" class="h-8 border" @change="onChange($event)">
        <option disabled value="">
          Select
        </option>
        <option value="true">Show</option>
        <option value="false">Hide</option>
      </select>
    </div>
    <div id="map" class="w-auto" />
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import covid19States from "./covid19_states.json";
export default {
  data: function() {
    return {
      filter: "",
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
    };
  },
  mounted() {
    Mapbox.accessToken =
      "pk.eyJ1Ijoia3VudmFyIiwiYSI6ImNrbzJ2MGF2djEzYjIycG9iaDliZGsxb3oifQ.7XZhAg0bhElHLnx3UXF7mg";
    const map = new Mapbox.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.9629, 20.5937], // starting position
      zoom: 2, // starting zoom
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new Mapbox.NavigationControl());
    map.on("mouseenter", "icon-layer", (event) => {
      var description = event.features[0].properties.description;
      this.popup = new Mapbox.Popup()
        .setLngLat(event.lngLat)
        .setHTML(description)
        .addTo(map);
    });
    map.on("mouseleave", "icon-layer", () => {
      this.popup.remove();
    });
    map.on("click", "custom-layer", (e) => {
      var description = e.features[0].properties.description;
      new Mapbox.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
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
                show_on_map: true,
                description: `<strong>Popup</strong>
                <p>
                <a href="http://www.truckeroodc.com/www/" target="_blank">Popup</a>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                </p>`,
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
        filter: ["==", "show_on_map", true],
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      });
    });
  },
  created() {},
  methods: {
    onChange() {
      if (this.mapbox.getLayer("custom-layer")) {
        this.removeLayers();
        this.addLayer();
      } else {
        this.addLayer();
      }
      if (this.mapbox.getLayer("icon-layer")) {
        this.removeLayers();
        this.loadIconToMap();
      } else {
        this.loadIconToMap();
      }
    },
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
      if (this.mapbox.getLayer("icon-layer")) {
        this.mapbox.removeLayer("icon-layer");
      }
    },
    addLayer: function() {
      if (!this.mapbox.getLayer("custom-layer")) {
        this.mapbox.addLayer({
          id: "custom-layer",
          type: "fill",
          source: "thisIsMySource", // reference the data source
          filter: ["==", "show_on_map", this.filter == "true" ? true : false],
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 0.5,
          },
        });
      }
    },
    loadDataToMap: function() {
      if (this.mapbox.getSource("thisIsMySource")) {
        this.mapbox.getSource("thisIsMySource").setData(covid19States);
        this.mapbox.addLayer({
          id: "custom-layer",
          type: "fill",
          source: "thisIsMySource", // reference the data source
          filter: ["==", "show_on_map", this.filter == "true" ? true : false],
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 0.5,
          },
        });
      }
    },
    loadIconToMap: function() {
      if (this.mapbox.getSource("thisIsMySource")) {
        this.mapbox.getSource("thisIsMySource").setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                show_on_map: true,
                icon: "music-15",
                description: `<strong>Popup</strong>
                <p>
                <a href="http://www.truckeroodc.com/www/" target="_blank">Popup</a>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                </p>`,
              },
              geometry: {
                type: "Point",
                coordinates: [81.5185546875, 25.720735134412106],
              },
            },
            {
              type: "Feature",
              properties: {
                show_on_map: true,
                icon: "theatre-15",
                description: `<strong>Popup</strong>
                <p>
                <a href="http://www.truckeroodc.com/www/" target="_blank">Pakistan</a>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                </p>`,
              },
              geometry: {
                type: "Point",
                coordinates: [69.345116, 30.3753215],
              },
            },
            {
              type: "Feature",
              properties: {
                show_on_map: false,
                icon: "bar-15",
                description: `<strong>Popup</strong>
                <p>
                <a href="http://www.truckeroodc.com/www/" target="_blank">China</a>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                </p>`,
              },
              geometry: {
                type: "Point",
                coordinates: [104.195397, 35.86166],
              },
            },
          ],
        });
        this.mapbox.addLayer({
          id: "icon-layer",
          type: "symbol",
          source: "thisIsMySource", // reference the data source
          filter: ["==", "show_on_map", this.filter == "true" ? true : false],
          layout: {
            "icon-image": "{icon}",
          },
        });
      }
    },
    zoomToPloygon: function() {
      this.mapbox.flyTo({
        // These options control the ending camera position: centered at
        center: [78.9629, 20.5937],
        zoom: 5,
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.2, // make the flying slow
      });
    },
  },
};
</script>
<style scoped>
#map {
  height: 280px;
}
</style>
