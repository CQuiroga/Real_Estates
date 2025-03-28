(function() {
    const lat = 4.7574479;
    const lng = -74.1122502;
    const map = L.map('home-map').setView([lat, lng], 2);
    const markers = new L.FeatureGroup().addTo(map);

    let properties = [];

    // Filters
    const filters = {
        category: '', 
        price: ''
    }
    

    const categoriesSelect = document.querySelector('#categories');
    const pricesSelect = document.querySelector('#prices');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Filters by category and price
    categoriesSelect.addEventListener('change', e => {
        filters.category = +e.target.value;
        filterProperties();
    });

    pricesSelect.addEventListener('change', e => {
        filters.price = +e.target.value;
        filterProperties();
    });

    const getProperties = async () => {
        try {
            const url = '/api/properties'
            const response = await fetch(url);
            properties = await response.json();
            showProperties(properties);

        } catch (error) {
            console.log(error);
        }
    }

    const showProperties = properties => {
        // Clear previous markers
        markers.clearLayers();

        properties.forEach(property => {
            //Add Pines
            const marker = new L.marker([property?.lat, property?.lng], {
                autoPan: true
            }).addTo(map).bindPopup(`
                <strong class="text-violet-600 text-lg">${property.category.name}</strong>
                <h2 class="text-xl font-bold my-2 text-gray-500">${property?.title}</h2>
                <img src="/uploads/${property?.image}" alt="Image of property ${property.title}">
                <p class="text-fucsiaPalet1 font-bold block text-center">${property.price.name}</p>
                <a href="/property/${property.id}" class="bg-violet-600 block p-2 text-center rounded-md uppercase text-white">See property</a>
            `)
            markers.addLayer(marker)
        })
    }

    const filterProperties = () => {
        const result = properties.filter( filterCategory ).filter( filterPrices );
        showProperties(result);

    }

    const filterCategory = property => filters.category ? property.categoryId === filters.category : property;

    const filterPrices = property => filters.price ? property.priceId === filters.price : property

    getProperties();
})()