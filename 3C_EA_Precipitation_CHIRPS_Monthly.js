var Australia = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata("cc","equals","AS")
Map.addLayer(Australia);
Map.centerObject(Australia, 4);

// Daily total precipitation sums
var CHIRPS = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
    .f