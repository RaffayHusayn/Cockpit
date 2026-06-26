import type { Plugin } from "../types";

function WeatherFat() {
  return (
    <box flexDirection="row" gap={4}>
      <text>London  <span fg="#89b4fa">14°C</span></text>
      <text fg="#585b70">│</text>
      <text>New York  <span fg="#fab387">22°C</span></text>
      <text fg="#585b70">│</text>
      <text>Tokyo  <span fg="#a6e3a1">19°C</span></text>
    </box>
  );
}

function WeatherTall() {
  const cities = [
    { name: "London",   temp: "14°C", desc: "Overcast"      },
    { name: "New York", temp: "22°C", desc: "Sunny"         },
    { name: "Tokyo",    temp: "19°C", desc: "Partly cloudy" },
    { name: "Sydney",   temp: "11°C", desc: "Rainy"         },
  ];
  return (
    <box flexDirection="column" gap={1}>
      {cities.map((c) => (
        <box key={c.name} flexDirection="column">
          <text fg="#89b4fa">{c.name}</text>
          <text fg="#cdd6f4">{c.temp}  <span fg="#585b70">{c.desc}</span></text>
        </box>
      ))}
    </box>
  );
}

function WeatherSquare() {
  return (
    <box flexDirection="column" alignItems="center" gap={1}>
      <text fg="#89b4fa">London</text>
      <text fg="#585b70">─────────────</text>
      <text fg="#cdd6f4">14°C</text>
      <text fg="#6c7086">Overcast</text>
      <text fg="#585b70">─────────────</text>
      <text fg="#6c7086">H: 16°  L: 9°</text>
    </box>
  );
}

export const weather: Plugin = {
  id: "weather",
  name: "Weather",
  description: "Live weather",
  variants: {
    fat:    WeatherFat,
    tall:   WeatherTall,
    square: WeatherSquare,
  },
};
