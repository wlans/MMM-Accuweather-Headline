# MMM-Accuweather-Headline

📰 A MagicMirror² module that displays the **AccuWeather headline forecast** for your configured location, complete with relevant **weather condition emojis**.

---

## ✨ Features

- Pulls top AccuWeather **headline forecasts** for your location.
- Refreshes automatically every hour (customizable).
- Adds **weather-related emojis** based on the headline’s category.
- Simple and clean layout that fits neatly into your MagicMirror setup.

---

## 📦 Installation

1. Navigate to your MagicMirror `modules` directory:

   ```bash
   cd ~/MagicMirror/modules
   ```

2. Clone this repository:

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/MMM-Accuweather-Headline.git
   ```

3. Navigate into the new module directory:

   ```bash
   cd MMM-Accuweather-Headline
   ```

4. (Optional) If your module needs additional dependencies (e.g., if you add a `package.json`), run:

   ```bash
   npm install
   ```

---

## ⚙️ Configuration

Add the module to your `config.js` in your MagicMirror config:

```js
{
  module: "MMM-Accuweather-Headline",
  position: "top_bar", // or any other position
  config: {
    apiKey: "YOUR_ACCUWEATHER_API_KEY",
    locationKey: "YOUR_LOCATION_KEY", // Find it from AccuWeather location search
    updateInterval: 60 * 60 * 1000 // (optional) in ms, default: 1 hour
  }
}
```

### How to get your `locationKey`:

1. Go to [AccuWeather Locations](https://www.accuweather.com/)
2. Search your city, click on it.
3. Copy the alphanumeric part in the URL.  
   Example:  
   `https://www.accuweather.com/en/us/fairfield/06824/weather-forecast/338832`  
   → `locationKey` is `338832`.

---

## 🧠 How It Works

1. The module sends a request to the Node helper asking for the current AccuWeather "Headline".
2. The Node helper fetches the data using your API key and location.
3. The module processes the headline category and appends an appropriate emoji.
4. The headline is then shown on your MagicMirror.

---

## 🧪 Example Output

> "Rain and thunderstorms expected this evening 🌧️"

---

## 🛠️ To-Do / Ideas

- Add support for multilingual headlines
- Fade effect or animation transitions
- Clickable headlines linking to full forecast

---

## 🧑‍💻 Contributing

Feel free to fork and open PRs to improve the emoji matching, UI styling, or even add full weather forecast support.

---

## 📄 License

MIT © Wyatt Lansdale

---
