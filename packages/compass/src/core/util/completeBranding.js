import chroma from 'chroma-js';

const completeBranding = (branding) => {
    const calculated = {};
    if (branding.primaryColor) {
        calculated.primaryColorHighlight = chroma(branding.primaryColor).brighten();
    }
    if (branding.backgroundColor) {
        calculated.footerColor = chroma(branding.backgroundColor).luminance() > 0.5 ? '#111' : '#eee';
    }
    return { ...branding, ...calculated };
};

export default completeBranding;
