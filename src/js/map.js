(function() {
    const lat = document.querySelector('#lat').value || 4.7574479;
    const lng = document.querySelector('#lng').value || -74.1122502;
    const map = L.map('map').setView([lat, lng ], 16);
    let marker;

    // Provider & Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add PIN
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(map)

    // Detecting marker movement

    marker.on('moveend', function(e){
        marker = e.target
        const position = marker.getLatLng();
        map.panTo(new L.LatLng(position.lat, position.lng))

        // Get info for streets after drop the pin
        geocodeService.reverse().latlng(position, 10).run(function(error, result) {
            // console.log(result);
            marker.bindPopup(result.address.LongLabel)
            // Fill the labels
            document.querySelector('.street').textContent = result?.address?.Address ?? '';
            document.querySelector('#street').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        })

    })

})()