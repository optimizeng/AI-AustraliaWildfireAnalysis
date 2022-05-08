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

//______AOI_