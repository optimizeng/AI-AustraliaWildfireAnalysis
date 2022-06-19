//Purpose: Thesis - Burned Area in Australia;
//AUthor: Andrea Sulova;
//Date: March 2020;

//______Import SHP Australian's States__________________________________________
var Australia_shp = ee.FeatureCollection("users/sulovaandrea/Australia_Polygon");
var Australia_shp_geometry = Australia_shp.geometry();


//______Import States in Australia____________________________________________
var Capital_AUS = Australia_shp.filterMetadata("name","equals","Australian Capital Territory");
var Northen_AUS = Australia_shp.filterMetadata("cc","equals","Northern Territory")
var Queensland = Australia_shp.filterMetadata("name","equals","Queensland")
var South_AUS = Australia_shp.filterMetadata("name","equals","South Australia")
var Tasmania = Australia_shp.filterMetadata("name","equals","Tasmania")
var Victoria = Australia_shp.filterMetadata("name","equals","Victoria")
var Western_AUS = Australia_shp.filterMetadata("name","equals","Western Australia")
var NewSouthWales = Australia_shp.filterMetadata("name","equals","New South Wales")

//______AOI_____________________________________________________________________
var Australia = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata("cc","equals","AS")
Map.centerObject(Australia,4);   

//______VARIABLES_______________________________________________________________
// 1 LandCover
// COPERNICUS LAND COVER forest_type Class Table: 
//https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_Landcover_100m_Proba-V_Global#bands
var LandCover =ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global")
var LandCover = LandCover.select('discrete_classification').mosaic().clip(Australia);
var Classes ='<RasterSymbolizer>'+
      '<ColorMap type = "intervals" extended="false" >' +
      '<ColorMapEntry color="#0779e4" quantity="11" label="11 - Irrigated croplands"/>' +
      '<ColorMapEntry color="#f6f578" quantity="14" label="14 - Rainfed croplands"/>' +  
      '<ColorMapEntry color="#f6d743" quantity="20" label="20 - Mosaic Croplands/Vegetation"/>' +  
      '<ColorMapEntry color="#fcbf1e" quantity="30" label="30 - Mosaic Vegetation/Croplands"/>' +    
      '<ColorMapEntry color="#06623b" quantity="40" label="40 - Closed to open broadleaved evergreen or semi-deciduous forest"/>' +    
      '<ColorMapEntry color="#b7efcd" quantity="50" label="50 - Closed broadleaved deciduous forest "/>' +    
       '<ColorMapEntry color="#94fc13" quantity="60" label="60 - Open broadleaved deciduous forest"/>' +    
      '<ColorMapEntry color="#75b79e" quantity="70" label="70 - Closed needleleaved evergreen forest"/>' +  
      '<ColorMapEntry color="#a7e9af" quantity="90" label="90 - Open neepdleleaved deciduous or evergreen forest"/>' +
      '<ColorMapEntry color="#698474" quantity="100" labe