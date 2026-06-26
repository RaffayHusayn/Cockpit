import type { Plugin } from "../types";

function SportsFat() {
  return (
    <box flexDirection="row" gap={2}>
      <text>Arsenal <span fg="#a6e3a1">2</span> – <span fg="#f38ba8">1</span> Chelsea</text>
      <text fg="#585b70">│</text>
      <text>Man City <span fg="#a6e3a1">1</span> – <span fg="#a6e3a1">1</span> Liverpool</text>
    </box>
  );
}

function SportsTall() {
  const matches = [
    { home: "Arsenal",   homeScore: 2, away: "Chelsea",   awayScore: 1 },
    { home: "Man City",  homeScore: 1, away: "Liverpool",  awayScore: 1 },
    { home: "Tottenham", homeScore: 0, away: "Man Utd",    awayScore: 3 },
    { home: "Newcastle", homeScore: 2, away: "Everton",    awayScore: 0 },
  ];
  return (
    <box flexDirection="column" gap={1}>
      {matches.map((m, i) => (
        <box key={i} flexDirection="column">
          <text fg="#cdd6f4">{m.home}  <span fg="#a6e3a1">{m.homeScore}</span></text>
          <text fg="#cdd6f4">{m.away}  <span fg={m.awayScore > m.homeScore ? "#a6e3a1" : "#f38ba8"}>{m.awayScore}</span></text>
        </box>
      ))}
    </box>
  );
}

function SportsSquare() {
  return (
    <box flexDirection="column" alignItems="center" gap={1}>
      <text fg="#89b4fa">Premier League</text>
      <text fg="#585b70">─────────────</text>
      <text fg="#cdd6f4">Arsenal</text>
      <text fg="#a6e3a1">2  –  1</text>
      <text fg="#cdd6f4">Chelsea</text>
      <text fg="#585b70">─────────────</text>
      <text fg="#6c7086">72'  · Live</text>
    </box>
  );
}

export const sports: Plugin = {
  id: "sports",
  name: "Sports",
  description: "Live scores & standings",
  variants: {
    fat:    SportsFat,
    tall:   SportsTall,
    square: SportsSquare,
  },
};
