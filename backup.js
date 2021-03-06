
function init() {
  setupMarkers();
}

const registeredMarkers = {};
const selectedCities = [];
let infoWindow;

function getLocations(){
  return [
    {id:Math.random(), lat: 58.4374, lng: -129.9994, name: "Dease", cityCode: "bc-14" },
    {id:Math.random(), lat: 58.805, lng: -122.6972, name: "Fort Nelson", cityCode: "bc-83" },
    {id:Math.random(), lat: 54.5182, lng: -128.6032, name: "Terrace", cityCode: "bc-80" },
    {id:Math.random(), lat: 53.9171, lng: -122.7497, name: "Prince George", cityCode: "bc-79" },
    {id:Math.random(), lat: 50.1163, lng: -122.9574, name: "Whistler", cityCode: "bc-86" },
    {id:Math.random(), lat: 50.9981, lng: -118.1957, name: "Revelstoke", cityCode: "bc-65" },
    {id:Math.random(), lat: 49.0955, lng: -116.5135, name: "Creston", cityCode: "bc-26" }
  ];
}

function addOptions(locations){
  const select = document.getElementById("citySelect");
  locations.forEach(location => {
    const option = document.createElement("option");
    option.id= location.id;
    option.innerHTML = location.name;
    option.onclick= handleOptionOnClick
    select.appendChild(option)
  })
}

function getContentString(cityCode, size) {
  let width = "200px",
    height = "150px";
  if (size === "small") {
    height = "75px";
    width = "125px";
  }

  if (size === "medium") {
    height = "125px";
    width = "175px";
  }

  if (size === "large") {
    height = "175px";
    width = "225px";
  }
  return `<iframe title="Environment Canada Weather" 
  width=${width} height=${height} src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=${cityCode}&amp;lang=e"
   allowtransparency="true" frameborder="0"></iframe>`;
}


function setupMarkers() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 58.4374, lng: -129.9994 }
  });

  const locations = getLocations();
  addOptions(locations);

  locations.forEach(location => {
    geocdeMock(location.lat, location.lng).then(function(result) {
      const marker = new google.maps.Marker({
        position: result.data,
        map: map
      });
      registeredMarkers[location.id] = marker;
      infoWindow = new google.maps.InfoWindow({
        content: getContentString(location.cityCode, "large")
      });
      // infoWindow.open(map, marker)
      marker.addListener("click", () => infoWindow.open(map, marker));
    });
  });
}
console.log(map.getSelecconsole.log(map.getSelectedCities()))
function handleOptionOnClick(event){
  const id = event.target.id;
  if(!selectedCities.includes(id)){
    const marker = registeredMarkers[id];
    console.log(marker)
    infoWindow.open(document.getElementById("map"), marker)
  }
}



function geocdeMock(lat, lng) {
  return Promise.resolve({
    data: {
      lat,
      lng
    }
  });
}
