var Australia = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata("cc","equals","AS")
Map.addLayer(Australia);
Map.centerObject(Australia, 4);

var startyear = 2018; //Your start year
var endyear = 2020; //Your end year
var startmonth = 1;
var endmonth = 12;
var startdate = ee.Date.fromYMD(startyear, startmonth, 1);
var enddate =  ee.Date.fromYMD(endyear, endmonth, 1);  
var years = ee.List.sequence(startyear, endyear);
var months = ee.List.sequence(1, 12);

var sm= ee.ImageCollection('NASA_USDA/HSL/soil_moisture').select('ssm')
                          .filterDate(startdate, enddate)
                          .sort('system:time_start