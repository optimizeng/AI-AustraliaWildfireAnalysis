var Australia = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata("cc","equals","AS")
Map.addLayer(Australia);
Map.centerObject(Australia, 4);

var startyear = 2018; //Your start year
var endyear = 2020; //Your end ye