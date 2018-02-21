import chroma from "chroma-js";

const completeBranding = branding => {
    let calculated = {};
    if (branding.primaryColor) {
        calculated.primaryColorHighlight = chroma(branding.primaryColor).brighten();
    }
    if (branding.backgroundColor) {
        branding.footerColor = chroma(branding.backgroundColor).luminance() > 0.5
            ? '#111' : '#eee';
    }
    return {...branding, ...calculated};
}

export default completeBranding;
