
//Purpose: Thesis - Creating training dataset for ML algorithms;
//Author: Andrea Sulova;
//Date: Feb 2020 - May 2020;

//______Import SHP Australian's States__________________________________________
var Australia_shp = ee.FeatureCollection("users/sulovaandrea/Australia_Polygon");

//______Import States in Australia____________________________________________
var Capital_AUS = Australia_shp.filterMetadata("name","equals","Australian Capital Territory");
var Victoria = Australia_shp.filterMetadata("name","equals","Victoria")
var NewSouthWales = Australia_shp.filterMetadata("name","equals","New South Wales")
var Queensland = Australia_shp.filterMetadata("name","equals","Queensland")
var South_AUS = Australia_shp.filterMetadata("name","equals","South Australia")
var Northen_AUS = Australia_shp.filterMetadata("name","equals","Northern Territory")
var Western_AUS = Australia_shp.filterMetadata("name","equals","Western Australia")

var Australia_Mainland= Capital_AUS.merge(Victoria).merge(NewSouthWales).merge(South_AUS).merge(Queensland)
                        .merge(Western_AUS).merge(Northen_AUS)
Map.addLayer(Australia_Mainland,{pallete: '00000', strokeWidth: 2}, 'Australia Mainland',1);

//Part1
var Australia = Capital_AUS.merge(Victoria).merge(NewSouthWales)
//Part2
//var Australia = South_AUS.merge(Queensland)
//Part3
//var Australia = Northen_AUS.merge(Western_AUS)
//var Australia = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata("cc","equals","AS")

Map.centerObject(Australia,5) 

//______Before Fire____After Fire____________________________

var Start_I = ee.Date('2019-08-28');   
var End_I =  ee.Date('2019-09-15');  

///_____FIRMS MONTHLY_________________________________________________

var FIRMS = ee.ImageCollection('FIRMS').select('T21').filterBounds(Australia)
var FIRMS = FIRMS.filterDate(Start_I,End_I);
var FIRMScount = ee.Image(FIRMS.count())
Map.addLayer(FIRMScount,{pallete: '937d14', strokeWidth: 2}, 'FIRMS Monthly Hotspot-Raster',0);

var FIRMSbinary = FIRMScount.eq(FIRMScount).rename('FIRMS_binary_alert')
var FIRMS_vector = FIRMSbinary.reduceToVectors({
  geometry: Australia,
  scale: 1000,
  geometryType: 'polygon',
  eightConnected: false,});

Map.addLayer(FIRMS_vector,{pallete: '937d14', strokeWidth: 2}, 'FIRMS Monthly Hotspot-Vector',0);

//______Sentinel-2____________________________________________________

var S2_Collection = ee.ImageCollection('COPERNICUS/S2');
var S2_Collection_Date = ee.ImageCollection(S2_Collection.filterDate(Start_I,End_I)
                  .filterBounds(Australia).sort('CLOUD_COVER',false)); 
var S2_Collection_Clip = S2_Collection_Date.mosaic().clip(Australia);                  
var vis = {"bands": ["B12", "B8", "B4"],"min": 500,"max": 4000, gamma: 1.5, scale: 10}                  
Map.addLayer(S2_Collection_Clip , vis , "Collection for active fire",0)

//____CLOUD MASK_________________________________________________________________
