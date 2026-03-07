import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FreeMap({ initialRegion, markers = [], polyline = [], style }) {
    const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { padding: 0; margin: 0; background-color: #f0f0f0; } 
        #map { width: 100vw; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var initialLat = ${initialRegion?.latitude || 19.2333};
        var initialLng = ${initialRegion?.longitude || 72.8633};
        var map = L.map('map', { zoomControl: false, attributionControl: false }).setView([initialLat, initialLng], 14);
        
        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);

        var markersList = ${JSON.stringify(markers)};
        markersList.forEach(function(m) {
          L.marker([m.latitude, m.longitude]).addTo(map);
        });

        var polylinePoints = ${JSON.stringify(polyline)};
        if (polylinePoints.length > 0) {
          var latlngs = polylinePoints.map(p => [p.latitude, p.longitude]);
          var routeLines = L.polyline(latlngs, {color: '#1A73E8', weight: 5}).addTo(map);
          map.fitBounds(routeLines.getBounds(), { padding: [50, 50] });
        }
      </script>
    </body>
    </html>
  `;

    return (
        <View style={[styles.container, style]}>
            <WebView
                originWhitelist={['*']}
                source={{ html: mapHtml }}
                style={{ flex: 1, backgroundColor: 'transparent' }}
                scrollEnabled={false}
                javaScriptEnabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#f5f5dc'
    }
});
