const COLORS = {
    indigo: "#193967",
    blue: "#4c8dca",
    magenta: "#e12f51",
    cyan: "#77e6eb",
    orange: "#ef6a04",
    green: "#6eb600",
};

export default {
    COLORS: COLORS,
    KEYS: Object.keys(COLORS),
    getKey: (key) => Object.keys(COLORS)[key] || key,
};