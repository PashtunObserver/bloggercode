/* ============================================
   WEATHER WIDGET - BLOGGER SAFE JS
   All variables scoped inside IIFE
   No global namespace pollution
   ============================================ */
(function() {
    'use strict';

    // Scoped variables - no globals
    const weatherApiKey = 'b56d79dc3aa5418699182727262705';
    const weatherApiUrl = 'https://api.weatherapi.com/v1/current.json?key=';
    let currentCity = 'Lahore';

    // Find all widget containers on the page
    const containers = document.querySelectorAll('.kw-weather-widget-container');

    if (containers.length === 0) {
        console.warn('Kimi Weather Widget: No .kw-weather-widget-container found on page.');
        return;
    }

    // Initialize each widget instance
    containers.forEach(function(container) {
        initWidget(container);
    });

    function initWidget(container) {
        const card = container.querySelector('.kw-weather-card');
        if (!card) {
            console.warn('Kimi Weather Widget: .kw-weather-card not found inside container.');
            return;
        }

        // Show loading state
        card.innerHTML = `
            <div class="kw-loading">
                <div class="kw-spinner"></div>
                <p>Loading weather...</p>
            </div>
        `;

        loadWeather(currentCity, card);
    }

    async function loadWeather(city, card) {
        card.innerHTML = `
            <div class="kw-loading">
                <div class="kw-spinner"></div>
                <p>Loading ${city}...</p>
            </div>
        `;

        try {
            const currentUrl = `${weatherApiUrl}${weatherApiKey}&q=${encodeURIComponent(city)}&aqi=no`;
            const response = await fetch(currentUrl);

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Weather fetch failed');
            }

            const data = await response.json();
            render(data, card);

        } catch (error) {
            console.error('Kimi Weather Widget API Error:', error);
            card.innerHTML = `
                <div class="kw-error-msg">
                    ⚠️ ${error.message}<br><br>
                    <small>Click city name to try another location</small>
                </div>
            `;
        }
    }

    function render(data, card) {
        const { location, current } = data;
        currentCity = location.name;

        card.innerHTML = `
            <div class="kw-weather-badge">Weather</div>

            <div class="kw-main-weather">
                <div class="kw-weather-icon-main">
                    <img src="https:${current.condition.icon}" alt="${current.condition.text}">
                </div>
                <div class="kw-temperature">
                    <span>${Math.round(current.temp_c)}</span><span class="kw-degree"><sup>°C</sup></span>
                </div>
            </div>

            <div class="kw-location-details">
                <div class="kw-location-info">
                    <div class="kw-city-input" contenteditable="true">${location.name}</div>
                    <div class="kw-condition-text">${current.condition.text}</div>
                </div>
                <div class="kw-details-col">
                    <div class="kw-temp-range-row">
                        <span class="kw-arrow-up">↑</span>
                        <span class="kw-temp-high">${Math.round(current.temp_c + 2)}°</span>
                        <span class="kw-temp-separator">_</span>
                        <span class="kw-arrow-down">↓</span>
                        <span class="kw-temp-low">${Math.round(current.temp_c - 2)}°</span>
                    </div>
                    <div class="kw-detail-row">
                        <span class="kw-detail-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#42a5f5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                            </svg>
                        </span>
                        <span>${current.humidity}%</span>
                    </div>
                    <div class="kw-detail-row">
                        <span class="kw-detail-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                            </svg>
                        </span>
                        <span>${Math.round(current.wind_kph)} km/h</span>
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to the editable city name
        const cityInput = card.querySelector('.kw-city-input');

        cityInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                cityInput.blur();
                const newCity = cityInput.textContent.trim();
                if (newCity && newCity !== currentCity) {
                    loadWeather(newCity, card);
                }
            }
        });

        cityInput.addEventListener('blur', function() {
            const newCity = cityInput.textContent.trim();
            if (newCity && newCity !== currentCity) {
                loadWeather(newCity, card);
            } else {
                cityInput.textContent = currentCity;
            }
        });
    }
})();
