var training = table.merge(table2).merge(table3).merge(table4).merge(table5).merge(table6).merge(table7).merge(table8).merge(table9)
            .merge(table10).merge(table11).merge(table12).merge(table13).merge(table14).merge(table15).merge(table16).merge(table17).merge(table18)
           
Export.table.toDrive({
  collection: training,
  description: 'test',
  fileFormat: 'CSV'});              

var active = training.filterMetadata("fire","equals",1)
var nofire = training.filterMetadata("fire","equals",0)
Map.addLayer(active,{color: 'red', strokeWidth: 2}, 'active',1);
print('N