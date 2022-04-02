
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

function DeleteClouds(image) {
  var   QA60Band = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = QA60Band.bitwiseAnd(cloudBitMask).eq(0).and(QA60Band.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).copyProperties(image, ["system:time_start"]);}

//Pre-Post Fire applying Cloud/Cirrus mask_____________________________________
var Collection_CloudMask = S2_Collection_Date.map(DeleteClouds).mosaic().clip(Australia);
Map.addLayer(Collection_CloudMask , vis , "Active Fire Cloud Mask",0)

//____WATER MASK_________________________________________________________________

//S2 collection and create MNDWI from a median of the filtered collection
var s2 = ee.ImageCollection('COPERNICUS/S2').filterDate(Start_I,End_I)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(DeleteClouds)
                  .median()
                  .clip(Australia)
                  .select("B3","B11");
var mndwi = s2.normalizedDifference(['B3', 'B11']).rename('mndwi');
var mndwiThreshold = 0.6;
var Water_Mask_Value = mndwi.gt(mndwiThreshold);
var WaterMask= Water_Mask_Value.updateMask(Water_Mask_Value.eq(1))
var S2_Masks = Collection_CloudMask.updateMask(Water_Mask_Value.eq(0));
Map.addLayer(S2_Masks, vis , "Active Fire Cloud Water Mask",0)

//___FIRES  AREAS SWIR2 (B12 & B5)____________________________________

var ActiveFire_threshold = 2;

var S2function = function(image){
  var ActiveFire = image.expression("SWIR2/Redge",{
          Redge: image.select("B5"), 
          SWIR2: image.select("B12")}).rename('ActiveFire').gt(ActiveFire_threshold)
  image = ActiveFire.updateMask(ActiveFire.eq(1));
  return image.reduce(ee.Reducer.count());};

var ActiveFire = S2_Collection_Date.map(S2function).mosaic();
var ActiveFire = FIRMScount.updateMask(ActiveFire.eq(1));
//Map.addLayer(ActiveFire, {palette: 'red'}, 'Active Fire S2',0);

//______NBR__________________________________________________

var Start_NBR = Start_I.advance(+6,'day');
var End_NBR = End_I.advance(-6,'day');

var S2 = ee.ImageCollection('COPERNICUS/S2');
var S2_prefire = ee.ImageCollection(S2.filterDate(Start_I,Start_NBR).filterBounds(Australia).sort('CLOUD_COVER',false));    
var S2_postfire = ee.ImageCollection(S2.filterDate(End_NBR,End_I).filterBounds(Australia).sort('CLOUD_COVER',false));

var S2_prefire_CM = S2_prefire.map(DeleteClouds).mosaic().clip(Australia);
var S2_postfire_CM = S2_postfire.map(DeleteClouds).mosaic().clip(Australia);

var S2_prefire_CM_WM = S2_prefire_CM.updateMask(Water_Mask_Value.eq(0));
var S2_postfire_CM_WM = S2_postfire_CM.updateMask(Water_Mask_Value.eq(0));

Map.addLayer(S2_prefire_CM_WM , vis , "Pre-Fire for RGB",0)
Map.addLayer(S2_postfire_CM_WM , vis , "Post-Fire for RGB",0)

var preNBR = S2_prefire_CM_WM.normalizedDifference(['B8','B12']);
var postNBR = S2_postfire_CM_WM.normalizedDifference(['B8','B12']);

var dNBR = preNBR.subtract(postNBR);
var dNBR = dNBR.multiply(1000);

var Classes ='<RasterSymbolizer>'+
      '<ColorMap type = "intervals" extended="false" >' +
      '<ColorMapEntry color="#7d5e2a" quantity="-500" label="High post-fire regrowth" opacity="0"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-251" label="High post-fire regrowth"/>' +  
      '<ColorMapEntry color="#acbe4d" quantity="-101" label="Low post-fire regrowth"/>' +  
      '<ColorMapEntry color="#0ae042" quantity="99" label="Unburned"/>' +    
      '<ColorMapEntry color="#fff70b" quantity="269" label="Low-severity burn"/>' +    
      '<ColorMapEntry color="#ffaf38" quantity="439" label="Moderate–low severity"/>' +    
      '<ColorMapEntry color="#ff641b" quantity="659" label="Moderate–high severity burn"/>' +    
      '<ColorMapEntry color="#a41fd6" quantity="1300" label="High Severity"/>' +  
      '<ColorMapEntry color="#100303" quantity="2000" label="High Severity" opacity="0"/>' + 
    '</ColorMap>' +
  '</RasterSymbolizer>';
  
var dNB_map = dNBR.sldStyle(Classes)
Map.addLayer(dNB_map, {}, 'dNBR',0);
var preNBR = preNBR.multiply(1000);
var postNBR = postNBR.multiply(1000);
Map.addLayer(preNBR.sldStyle(Classes),{} , "Pre-Fire for NBR",0)
Map.addLayer(postNBR.sldStyle(Classes),{} , "Post-Fire for NBR",0)

//__ Vector mask of burnt areas_________________________________

// NBR value less than which is considered a burnt Areas
var BurnedValue = 440;
var burned_mask = dNBR.gt(BurnedValue);
var burned_mask = burned_mask.updateMask(burned_mask.eq(1));
var burned_mask = burned_mask.eq(burned_mask).rename('S2_alert')

var burnt_vectors = burned_mask.addBands(dNBR).reduceToVectors({
  geometry: FIRMS_vector,
  crs: dNBR.projection(),
  scale: 10,
  geometryType: 'polygon',
  eightConnected: false,
  reducer: ee.Reducer.mean(),
  maxPixels: 50000000000});
  
Map.addLayer(burnt_vectors.draw({color: 'red', strokeWidth: 1}), {},'Threshold Areas dNBR', 0);

var areas = function(feature) {var area = feature.geometry().area(10);
  return feature.set('area', area);};
  
var BurntAreas = burnt_vectors.map(areas);  
var BurntAreasFilter= BurntAreas.filter(ee.Filter.gt('area', 250000));
Map.addLayer(FIRMS_vector,{color: '000839', strokeWidth: 3}, 'FIRMS Monthly vector',0);
Map.addLayer(BurntAreasFilter.draw({color: 'blue', strokeWidth: 1}), {},'Burn Areas Filter 250000', 0);  
 
var FireRandomPoints = ee.FeatureCollection.randomPoints(BurntAreasFilter,300);

var getProperties = function(feature) {var point = feature.geometry();
  return ee.Feature(point).set('Start_Date',Start_I).set('fire',1)};

var FireRandomPointsPro = FireRandomPoints.map(getProperties); 
//Map.addLayer(FireRandomPointsPro, {color: 'red', strokeWidth: 1},'Fire Random Points',0);

//__Vector mask of No fire areas_________________________________
var FIRMS_season = ee.ImageCollection('FIRMS').select('T21').filterBounds(Australia)
var FIRMS_season = FIRMS_season.filterDate('2019-09-01','2020-02-22');
var FIRMS_season_count = ee.Image(FIRMS_season.count())