var AUS = ee.Geometry.Polygon(
        [[[127.3689462855952, -13.491075137327103],[123.8533212855952, -16.29372317317216],[121.5681650355952, -17.638732215007032], [120.4255869105952, -19.637359606938393],
          [116.1189462855952, -20.627589346224404],[113.3943369105952, -23.316982594400656],[113.6580087855952, -25.55725738666083],[114.8884775355952, -30.216305297255722],
          [114.6248056605952, -33.64658749466065],[116.7341806605952, -34.95344585475264],[120.0740244105952, -34.66479312507612],[122.8865244105952, -34.30255856657303],
          [126.2263681605952, -32.69019447983865],[130.4451181605952, -31.798174980040457],[133.5212900355952, -32.542133943536214],[135.2791025355952, -35.169270873633344],
          [137.6521494105952, -34.22992311043601],[139.4978525355952, -37.43556659275122],[145.5623056605952, -39.02340657205664],[149.5173837855952, -38.061021987992696],
          [152.1541025355952, -34.66479312507612],[153.2087900355952, -25.319148988654078],[146.6169931605952, -18.640985563798928],[142.2224619105952, -11.086718680136846],
          [141.3435556605952, -15.617690983472107],[140.1130869105952, -17.387282126561526],[136.0701181605952, -14.769515119489446],[137.0369150355952, -12.033891737255088],
          [132.2908212855952, -11.259168237228634],[129.2146494105952, -14.088573349609213]]]);
var AUS_comp = ee.FeatureCollection("USDOS/LSIB/2013").filt