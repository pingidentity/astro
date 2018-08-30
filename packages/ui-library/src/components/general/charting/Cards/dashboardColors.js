const COLORS = {
    indigo: "#193967",
    blue: "#4c8dca",
    cyan: "#77e6eb",
    magenta: "#e12f51",
};
const KEYS = ["indigo", "magenta", "blue", "cyan"];

export default {
    COLORS: COLORS,
    KEYS: KEYS,
    getKey: (key) => KEYS[key] || key,
};