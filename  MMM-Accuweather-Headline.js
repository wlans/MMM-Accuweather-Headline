Module.register("MMM-Accuweather-Headline", {
    // Default configuration
    defaults: {
        updateInterval: 60 * 60 * 1000, // Update every hour
    },

    // Start the module
    start: function () {
        Log.info("Starting module: " + this.name);
        this.updateHeadline();
        setInterval(() => {
            this.updateHeadline();
        }, this.config.updateInterval);
    },

    // Request weather headline from the Node helper
    updateHeadline: function () {
        // Send socket notification to request the weather headline
        const apiKey = this.config.apiKey;
        const locationKey = this.config.locationKey;

        Log.debug("Requesting weather headline from Node helper...");
        this.sendSocketNotification("FETCH_WEATHER_HEADLINE", { apiKey: apiKey, locationKey: locationKey });
    },

    // Handle the data received from the Node helper
    socketNotificationReceived: function (notification, payload) {
        if (notification === "WEATHER_HEADLINE") {
            Log.debug("Received weather headline:", payload.headline);
            const transformedHeadline = this.transformHeadline(payload.headline);
            this.updateDom(transformedHeadline);
        }
    },

    // Create the DOM element for the module (Only once)
    getDom: function () {
        Log.debug("Creating DOM element for weather headline.");
        if (!this.wrapper) {
            this.wrapper = document.createElement("div");
            this.wrapper.className = "weather-headline";
            this.wrapper.textContent = "Fetching weather headline...";  // Initial message
        }
        return this.wrapper;
    },

    // Update the DOM with the fetched headline
    updateDom: function (transformedHeadline) {
        Log.debug("Updating DOM with the weather headline:", transformedHeadline);
        const wrapper = this.getDom();  // Get the existing DOM element
        wrapper.textContent = transformedHeadline || "No headline available.";  // Update the text content
    },

    // Transform the headline and add emojis
    transformHeadline: function (headline) {
        const weatherEmojis = [
            { condition: "Clear", emoji: "☀️" },
            { condition: "Sunny", emoji: "☀️" },
            { condition: "Partly sunny", emoji: "🌤️" },
            { condition: "Mostly cloudy", emoji: "☁️" },
            { condition: "Intermittent clouds", emoji: "🌥️" },
            { condition: "Showers", emoji: "🌧️" },
            { condition: "Thunderstorm", emoji: "⛈️" },
            { condition: "Light rain", emoji: "🌦️" },
            { condition: "Rain", emoji: "🌧️" },
            { condition: "Snow", emoji: "❄️" },
            { condition: "Fog", emoji: "🌫️" },
            { condition: "Windy", emoji: "🌬️" },
            { condition: "Hot", emoji: "🔥" },
            { condition: "Cold", emoji: "🥶" },
            { condition: "Cooler", emoji: "🥶" },
            { condition: "Warmer", emoji: "🌡️" },
            { condition: "Mild", emoji: "🌿" },
            { condition: "Blizzard", emoji: "🌨️" },
            { condition: "Chilly", emoji: "🥶" }
        ];

        // Map the weatherEmojis array to lowercase the conditions
        const normalizedWeatherEmojis = weatherEmojis.map(entry => ({
            condition: entry.condition.toLowerCase(),
            emoji: entry.emoji
        }));

        // Normalize the headline category to lowercase
        const headlineCategoryLower = headline.Category ? headline.Category.toLowerCase() : "";

        // Check if any condition in normalizedWeatherEmojis matches the headline.Category
        const match = normalizedWeatherEmojis.find(entry => headlineCategoryLower.includes(entry.condition));

        // If a match is found, return the headline with emoji
        if (match) {
            return `${headline.Text} ${match.emoji}`;
        }

        // If no match was found, log it and return the headline without an emoji
        Log.debug("No matching weather condition found for headline:", headline.Category);
        return headline.Text;  // Return the headline without emoji if no match is found
    }




});
