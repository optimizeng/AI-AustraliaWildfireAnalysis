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
//print(monchart);

var visPer = {min: 0, max:30, palette: ['f4f4f4', '6983aa','00bcd4','0000FF']};
var CHIRPS_AUS_date = CHIRPS_AUS.filter(ee.Filter.date('2020-01-01','2020-02-29')).sum();
Map.addLayer(CHIRPS_AUS_date, visPer,'Precipitation Jan-Feb');

var CHIRPS_AUS_date = CHIRPS_AUS.filter(ee.Filter.date('2019-09-01','2019-12-31')).sum();
Map.addLayer(CHIRPS_AUS_date, visPer,'Precipitation Sep-Dec');

var CHIRPS_AUS_date = CHIRPS_AUS.filter(ee.Filter.date('2020-01-01','2020-01-31')).sum();
Map.addLayer(CHIRPS_AUS_date, visPer,'Precipitation Jan');

var CHIRPS_AUS_date = CHIRPS_AUS.filter(ee.Filter.date('2020-02-01','2020-02-29')).sum();
Map.addLayer(CHIRPS_AUS_date, visPer,'Precipitation Feb');

//____________FIRMS_______________________________________

var dataset_2 = ee.ImageCollection('FIRMS').select('T21').filterDate('2020-02-01','2020-02-29');
var FIRMS_AUS = dataset_2.map(function(firms) { return firms.clip(Australia); });
var FIRMS_AUS_Total = FIRMS_AUS.count();
var visTp = {min: 1, max:5, palette: ['ff1e56']};
Map.addLayer(FIRMS_AUS_Total, visTp,'Total fire Jan-Feb',0);


//_________________LEGEND_____________________________________________
var legend = ui.Panel({style: {position: 'middle-right',padding: '8px 10px'}});
var legendTitle = ui.Label({value: 'Precipitation (mm/day)',style: {fontWeight: 'bold',fontSize: '15px',margin: '5 0 9px 0',padding: '10'}});
legend.add(legendTitle);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visPer.max-v