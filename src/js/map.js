(function() {
    const lat = -41.2930263;
    const lng = 174.7796162;
    const map = L.map('map').setView([lat, lng ], 16);
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


})()