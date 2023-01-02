var Australia = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata("cc","equals","AS")
Map.addLayer(Australia);
Map.centerObject(Australia, 4);

// Daily total precipitation sums
var CHIRPS = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
    .filter(ee.Filter.date('2019-09-01','2020-02-29'));
var CHIRPS_AUS = CHIRPS.map(function(Landsat) { return Landsat.clip(Australia); });

var monchart=ui.Chart.image.series(CHIRPS_AUS, Australia, ee.Reducer.mean())
  .setOptions({
    title: "Daily Percipitation for Australia",
    hAxis: {title: 'Date'},
    vAxis: {title: 'Mean Precipitation  (mm/day)'},
    pointSize: 3});
//print(monchar