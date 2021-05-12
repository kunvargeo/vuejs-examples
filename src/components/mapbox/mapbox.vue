<template>
  <div>
    <div class="grid m-4 lg:grid-cols-4 sm:grid-cols-2">
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="loadDataToMap()"
      >
        Load Data to map
      </button>
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="loadIconToMap()"
      >
        Load Symbol/icons on map
      </button>
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="zoomToPolygon()"
      >
        Zoom To Polygon
      </button>
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="addLayerToMap()"
      >
        Add layer
      </button>
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="removeLayers()"
      >
        Remove layers
      </button>
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="changeColorOfLayer()"
      >
        Change color of layers
      </button>

      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="loadVectorLayers()"
      >
        Load Vector Layer
      </button>
      <button
        class="inline-flex items-center px-4 py-2 m-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="loadRasterLayers()"
      >
        Load Raster Layer
      </button>
      <div class="flex justify-start m-3">
        <label for="new-todo">Layer Filter : </label>
        <select
          v-model="filter"
          class="h-8 ml-2 border rounded"
          @change="onChange($event)"
        >
          <option disabled value="">
            Select
          </option>
          <option value="true">Show</option>
          <option value="false">Hide</option>
        </select>
      </div>
      <div class="flex justify-start m-3">
        <label for="new-todo">URL: </label>
        <input id="new-todo" v-model="url" class="h-8 ml-2 mr-2 border" />
        <button
          @click="loadDataFromUrl()"
          class="inline-flex items-center px-4 py-1 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
    <div id="map" class="w-auto mt-2" />
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import covid19States from "./covid19_states.json";
import iconFeatures from "./icon_features.js";
import axios from "axios";
export default {
  data: function() {
    return {
      filter: true,
      markers: [],
      marker: "",
      url:
        "https://gist.githubusercontent.com/kunvargeo/d705ee101ee9fa238b997dbaf36b934a/raw/557d4c404f35bbcb7b51f74d73e444da958584c2/map.geojson",
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
    map.on("click", function(e) {
      // The event object (e) contains information like the
      // coordinates of the point on the map that was clicked.
      // console.log('A click event has occurred at ' + e.lngLat);
      new Mapbox.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<input type='text' id="imageUrl" placeholder="put image url to load on map" style="border:1px solid black"/>`
        )
        .addTo(map)
        .getElement()
        .addEventListener("input", (e) => {
          const clickedElementId = e.target.id;
          switch (clickedElementId) {
            case "imageUrl":
              map.loadImage(
                e.target.value,
                // "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
                function(error, image) {
                  console.log("imagedasdasd", image);
                  if (error) throw error;
                  // Add the image to the map style.
                  if (!map.hasImage("cat")) {
                    map.addImage("cat", image);
                  } else {
                    map.removeImage("cat");
                    map.addImage("cat", image);
                  }
                  if (!map.getSource("point")) {
                    map.addSource("point", {
                      type: "geojson",
                      data: {
                        type: "FeatureCollection",
                        features: [
                          {
                            type: "Feature",
                            geometry: {
                              type: "Point",
                              coordinates: e.lngLat,
                            },
                          },
                        ],
                      },
                    });
                  } else {
                    map.getSource("point").setData({
                      type: "FeatureCollection",
                      features: [
                        {
                          type: "Feature",
                          geometry: {
                            type: "Point",
                            coordinates: e.lngLat,
                          },
                        },
                      ],
                    });
                  }
                  if (map.getLayer("points") === undefined) {
                    // Add a layer to use the image to represent the data.
                    map.addLayer({
                      id: "points",
                      type: "symbol",
                      source: "point", // reference the data source
                      layout: {
                        "icon-image": "cat", // reference the image
                        "icon-size": 0.25,
                      },
                    });
                  } else {
                    map.removeLayer("points");
                  }
                }
              );
              break;
          }
        });
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
      if (map.getLayer("custom-layer") === undefined) {
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
      }
    });
  },
  created() {},
  methods: {
    loadRasterLayers: function() {
      this.removeLayers();
      this.removeSource();
      this.flyToLatlong([-74.5, 40], 2);
      this.mapbox.addLayer({
        id: "simple-tiles",
        type: "raster",
        minzoom: 0,
        maxzoom: 22,
        source: {
          type: "raster",
          tiles: [
            "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
          ],
        },
      });
    },
    // Below code is for loading the vector layers
    loadVectorLayers: function() {
      this.removeLayers();
      this.removeSource();
      this.flyToLatlong([79.0193, 18.1124], 7);
      this.mapbox.addSource("mapillary", {
        type: "vector",
        tiles: ["https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt"],
      });
      this.mapbox.addLayer(
        {
          id: "mapillary",
          type: "line",
          source: "mapillary",
          "source-layer": "mapillary-sequences",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-opacity": 0.6,
            "line-color": "rgb(271, 41, 41)",
            "line-width": 2,
          },
        },
        "waterway-label"
      );
    },
    removeAllMarkers: function() {
      this.markers.forEach((marker) => {
        marker.remove();
      });
      this.markers = [];
    },
    loadDataFromUrl: function() {
      axios.get(this.url).then((res) => {
        if (this.mapbox.getSource("thisIsMySource")) {
          if (res.data && res.data.features && res.data.features.length) {
            this.mapbox.getSource("thisIsMySource").setData(res.data);
            res.data.features.forEach((feature, index) => {
              if (feature.geometry.type != "Point") {
                this.mapbox.addLayer({
                  id: "custom-layer" + index,
                  type: "fill",
                  source: "thisIsMySource", // reference the data source
                  layout: {},
                  paint: {
                    "fill-color": this.colors[index], // blue color fill
                    "fill-opacity": 0.2,
                  },
                });
              } else {
                new Mapbox.Marker()
                  .setLngLat(feature.geometry.coordinates)
                  .addTo(this.mapbox);
                // this.markers.push(this.marker);
              }
            });
          }
        }
      });
    },
    onChange: function() {
      if (this.mapbox.getLayer("custom-layer")) {
        this.removeLayers();
        this.addLayerToMap();
      }
      if (this.mapbox.getLayer("icon-layer")) {
        this.removeLayers();
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
      if (this.mapbox.getLayer("mapillary")) {
        this.mapbox.setPaintProperty(
          "mapillary",
          "line-color",
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
      if (this.mapbox.getLayer("mapillary")) {
        this.mapbox.removeLayer("mapillary");
      }
      if (this.mapbox.getLayer("simple-tiles")) {
        this.mapbox.removeLayer("simple-tiles");
      }
      for (let i = 0; i <= 10; i++) {
        if (this.mapbox.getLayer("custom-layer" + i)) {
          this.mapbox.removeLayer("custom-layer" + i);
        }
      }
      // custom - layer;
      // this.markers.forEach((marker) => {
      //   marker.remove();
      // });
      // this.markers = [];
    },
    removeSource: function() {
      if (this.mapbox.getSource("mapillary")) {
        this.mapbox.removeSource("mapillary");
      }
      if (this.mapbox.getSource("thisIsMySource")) {
        this.mapbox.removeSource("thisIsMySource");
      }
      if (this.mapbox.getSource("iconSource")) {
        this.mapbox.removeSource("iconSource");
      }
      if (this.mapbox.getSource("simple-tiles")) {
        this.mapbox.removeSource("simple-tiles");
      }
    },
    addLayerToMap: function() {
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
    addDynamicLayer: function(layerId, sourceId) {
      this.mapbox.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId, // reference the data source
        filter: ["==", "show_on_map", this.filter == "true" ? true : false],
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      });
    },
    loadDataToMap: function() {
      this.removeLayers();
      this.filter = false;
      if (this.mapbox.getSource("thisIsMySource")) {
        this.mapbox.getSource("thisIsMySource").setData(covid19States);
        if (this.mapbox.getLayer("custom-layer") === undefined) {
          this.addDynamicLayer("custom-layer", "thisIsMySource");
        }
      } else {
        this.mapbox.addSource("thisIsMySource", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: covid19States,
          },
        });
        this.addDynamicLayer("custom-layer", "thisIsMySource");
      }
    },
    loadIconToMap: function() {
      this.flyToLatlong([78.9629, 20.5937], 2);
      this.removeLayers();
      if (this.mapbox.getSource("iconSource")) {
        this.mapbox.getSource("iconSource").setData(iconFeatures);
        if (this.mapbox.getLayer("icon-layer") === undefined) {
          this.mapbox.addLayer({
            id: "icon-layer",
            type: "symbol",
            source: "iconSource", // reference the data source
            filter: ["==", "show_on_map", this.filter == "true" ? true : false],
            layout: {
              "icon-image": "{icon}",
            },
          });
        }
      } else {
        this.mapbox.addSource("iconSource", {
          type: "geojson",
          data: iconFeatures,
        });
        this.mapbox.addLayer({
          id: "icon-layer",
          type: "symbol",
          source: "iconSource", // reference the data source
          filter: ["==", "show_on_map", this.filter == "true" ? true : false],
          layout: {
            "icon-image": "{icon}",
          },
        });
      }
    },
    flyToLatlong: function(latlong, zoomLevel) {
      this.mapbox.flyTo({
        // These options control the ending camera position: centered at
        center: latlong,
        zoom: zoomLevel,
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.2, // make the flying slow
      });
    },
    zoomToPolygon: function() {
      this.flyToLatlong([78.9629, 20.5937], 5);
    },
  },
};
</script>
<style scoped>
#map {
  height: 280px;
}
</style>
