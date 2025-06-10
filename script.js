
// Scroll to top
const scrollBtn = document.getElementById("scrollToTopBtn");
window.onscroll = () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// search
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.getElementById("searchInput").value.trim().toLowerCase();

    if (input === "western" || input === "Western") {
        window.location.href = "product1.html";
    } else if (input === "arabic" || input === "Arabic") {
        window.location.href = "product2.html";
    } else if (input === "oriental" || input === "Oriental") {
        window.location.href = "product3.html";
    } else if (input === "greek" || input === "Greek") {
      window.location.href = "product4.html";
  }  else if (input === "indic" || input === "Indic") {
    window.location.href = "product5.html";
}else {
        window.location.href = "notfound.html";
    }
});

// On Load Popup
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("entryForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for joining! We will contact you soon.");
          form.reset();
          closePopup(); // Close modal properly
        } else {
          alert("There was an issue with your submission. Please try again.");
        }
      })
      .catch(() => {
        alert("Submission failed. Please check your internet connection.");
      });
  });

  // Show popup on load
  window.addEventListener("load", () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("formPopup").style.display = "block";
    document.body.classList.add("popup-open");
  });
});

// Close popup and restore scroll
function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("formPopup").style.display = "none";
  document.body.classList.remove("popup-open");
}


     // Updated Store data for dropdowns
     const locationStoreData = {
      Punjab: {
        Lahore: ['DHA', 'Gulberg', 'Johar Town', 'Model Town'],
        Faisalabad: ['Clock Tower', 'Madina Town', 'D Ground'],
        Multan: ['Cantt', 'Shah Rukn-e-Alam', 'Boson Road'],
        Rawalpindi: ['Saddar', 'Peshawar Road', 'Chandni Chowk']
      },
      Sindh: {
        Karachi: ['Clifton', 'Gulshan-e-Iqbal', 'Malir', 'Nazimabad'],
        Hyderabad: ['Qasimabad', 'Latifabad', 'Auto Bhan'],
        Sukkur: ['Barrage Colony', 'Military Road']
      },
      Balochistan: {
        Quetta: ['Jinnah Road', 'Sariab Road', 'Satellite Town'],
        Gwadar: ['Marine Drive', 'New Town'],
        Khuzdar: ['College Road', 'Hospital Road']
      },
      KPK: {
        Peshawar: ['University Road', 'Saddar', 'Hayatabad'],
        Abbottabad: ['Mall Road', 'Supply Bazar'],
        Swat: ['Mingora', 'Saidu Sharif']
      }
    };
  
    const provinceDropdown = document.getElementById('province');
    const cityDropdown = document.getElementById('city');
    const townDropdown = document.getElementById('town');
    const resultsDiv = document.getElementById('store-results');
  
    // Populate provinces
    for (const province in locationStoreData) {
      const option = document.createElement('option');
      option.value = province;
      option.textContent = province;
      provinceDropdown.appendChild(option);
    }
  
    // Handle province change
    provinceDropdown.addEventListener('change', () => {
      const cities = locationStoreData[provinceDropdown.value];
      cityDropdown.innerHTML = '<option value="">Select</option>'; // Reset city dropdown
      townDropdown.innerHTML = '<option value="">Select</option>'; // Reset town dropdown
      townDropdown.disabled = true; // Disable town dropdown initially
  
      if (cities) {
        cityDropdown.disabled = false;
        for (const city in cities) {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          cityDropdown.appendChild(option);
        }
      } else {
        cityDropdown.disabled = true;
      }
    });
  
    // Handle city change
    cityDropdown.addEventListener('change', () => {
      const towns = locationStoreData[provinceDropdown.value]?.[cityDropdown.value];
      townDropdown.innerHTML = '<option value="">Select</option>'; // Reset town dropdown
  
      if (towns) {
        townDropdown.disabled = false;
        towns.forEach((town) => {
          const option = document.createElement('option');
          option.value = town;
          option.textContent = town;
          townDropdown.appendChild(option);
        });
      } else {
        townDropdown.disabled = true;
      }
    });
  
    // Handle search button click
    document.getElementById('search-store').addEventListener('click', () => {
      const province = provinceDropdown.value;
      const city = cityDropdown.value;
      const town = townDropdown.value;
  
      if (province && city && town) {
        resultsDiv.textContent = `Store found in ${town}, ${city}, ${province}!`;
      } else {
        resultsDiv.textContent = 'Please select all fields to search for a store.';
      }
    });
  
    // Store data for geolocation-based store search
    const geoStoreData = [
      { name: 'Store 1', latitude: 31.5204, longitude: 74.3587 }, // Lahore
      { name: 'Store 2', latitude: 24.8607, longitude: 67.0011 }, // Karachi
      { name: 'Store 3', latitude: 33.6844, longitude: 73.0479 }, // Islamabad
      { name: 'Store 4', latitude: 30.1798, longitude: 66.9750 }, // Quetta
      { name: 'Store 5', latitude: 34.0151, longitude: 71.5249 }  // Peshawar
    ];
  
    // Distance calculation function
    function getDistance(lat1, lon1, lat2, lon2) {
      const toRadians = (degrees) => degrees * (Math.PI / 180);
      const R = 6371; // Earth's radius in kilometers
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    }
  
    // Handle geolocation-based store search
    document.getElementById('locate-store').addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
  
            let nearestStore = null;
            let shortestDistance = Infinity;
  
            geoStoreData.forEach((store) => {
              const distance = getDistance(userLat, userLon, store.latitude, store.longitude);
              if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestStore = store;
              }
            });
  
            if (nearestStore) {
              resultsDiv.textContent = `The nearest store is ${nearestStore.name}, ${shortestDistance.toFixed(2)} km away.`;
            } else {
              resultsDiv.textContent = 'No stores found nearby.';
            }
          },
          (error) => {
            console.error('Error getting location:', error.message);
            resultsDiv.textContent = 'Unable to access your location.';
          }
        );
      } else {
        resultsDiv.textContent = 'Geolocation is not supported by this browser.';
      }
    });
