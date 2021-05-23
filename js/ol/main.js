function pushpinsmap(lon,lat,msg){
        var attribution = new ol.control.Attribution({
            collapsible: false
        });

        var map = new ol.Map({
            controls: ol.control.defaults({ attribution: false }).extend([attribution]),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM({
                        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        attributions: [ol.source.OSM.ATTRIBUTION, 'Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>'],
                        maxZoom: 20
                    })
                })
            ],
            target: 'map',
            view: new ol.View({
                center: ol.proj.fromLonLat([lon,lat]),
                maxZoom: 20,
                zoom: 16
            })
        });

        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon,lat]))
                    })
                ]
            })
        });
        map.addLayer(layer);

        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');

        var overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        map.addOverlay(overlay);

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        map.on('singleclick', function (event) {
            if (map.hasFeatureAtPixel(event.pixel) === true) {
                var coordinate = event.coordinate;

                content.innerHTML = '<b>Innobayt Innovative Solutions</b><br>' + msg;
                overlay.setPosition(coordinate);
            } else {
                overlay.setPosition(undefined);
                closer.blur();
            }
        });

        content.innerHTML = '<b>Innobayt Innovative Solutions</b><br>' + msg;
        overlay.setPosition(ol.proj.fromLonLat([lon,lat]));
}
