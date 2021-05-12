module.exports =  {
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
  }