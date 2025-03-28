Module.register("weatherHeadlineWithEmoji", {
    // Default module config.
    defaults: {
        updateInterval: 60 * 60 * 1000, // Update every 1 hour
        apiKey: "YOUR_API_KEY",
        locationKey: "LOCATION_KEY",
    },

    // Function to start the module
    start: function () {
        Log.info("Starting module: " + this.name);
        this.getWeatherHeadline();
        setInterval(() => {
            this.getWeatherHeadline();
        }, this.config.updateInterval);
    },

    getStyles: function () {
        return ["weatherHeadlineWithEmoji.css"];
    },


    // Function to get weather data and display the headline with an emoji
    getWeatherHeadline: function () {
        const apiKey = this.config.apiKey;
        const locationKey = this.config.locationKey;
        const url = `http://dataservice.accuweather.com/alerts/v1/${locationKey}?apikey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data[0]) {
                    const headline = data[0]; // Get the first alert (headline)
                    const headlineWithEmoji = this.getWeatherHeadlineWithEmoji(headline);
                    this.updateDomWithHeadline(headlineWithEmoji);
                }
            })
            .catch(error => {
                console.error("Error fetching weather headline:", error);
            });
    },

    // Function to format the headline with an emoji
    getWeatherHeadlineWithEmoji: function (headline) {
        const weatherEmojis = {
            "Clear": "☀️",
            "Sunny": "☀️",
            "Partly sunny": "🌤️",
            "Mostly cloudy": "☁️",
            "Intermittent clouds": "🌥️",
            "Showers": "🌧️",
            "Thunderstorms": "⛈️",
            "Light rain": "🌦️",
            "Rain": "🌧️",
            "Snow": "❄️",
            "Fog": "🌫️",
            "Windy": "🌬️",
            "Hot": "🔥",
            "Cold": "🥶",
            "Warmer": "🌡️",
        };

        // Map the Category to an emoji or fall back to Text
        const emoji = weatherEmojis[headline.Category] || this.getWeatherEmoji(headline.Text);
        return `${headline.Text} ${emoji}`;
    },

    // Function to check for weather conditions and return emoji
    getWeatherEmoji: function (phrase) {
        const weatherEmojis = {
            "Clear": "☀️",
            "Sunny": "☀️",
            "Partly sunny": "🌤️",
            "Mostly cloudy": "☁️",
            "Intermittent clouds": "🌥️",
            "Showers": "🌧️",
            "Thunderstorms": "⛈️",
            "Light rain": "🌦️",
            "Rain": "🌧️",
            "Snow": "❄️",
            "Fog": "🌫️",
            "Windy": "🌬️",
            "Hot": "🔥",
            "Cold": "🥶",
            "Warmer": "🌡️",
        };

        for (let condition in weatherEmojis) {
            if (phrase.includes(condition)) {
                return weatherEmojis[condition];
            }
        }
        return "🌥️";  // Default to clouds if not found
    },

    // Function to update the DOM with the formatted headline
    updateDomWithHeadline: function (headlineWithEmoji) {
        const element = document.querySelector(".weather-headline");
        if (element) {
            element.textContent = headlineWithEmoji;
        }
    },

    // Get the DOM to show
    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "weather-headline";
        wrapper.textContent = "Fetching weather headline...";
        return wrapper;
    },
});
