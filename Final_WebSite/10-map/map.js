// Google Map Sample

const map = {}

map.simple = function () {
  var pos = {
    lat: 25.04,
    lng: 121.52
  };
  // 25.045273, 121.528968 可以從 google map 當中的座標去更改成以上的數值
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: pos
  });

  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}
