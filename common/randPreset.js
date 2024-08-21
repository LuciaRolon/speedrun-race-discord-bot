module.exports = (wheelPreset) => {
    let maybePresets = [
        "aperture",
        "leg-day",
        "crash-course",
        "beyond",
        "magic-mirror"
    ];

    wheelPreset = maybePresets[Math.floor(Math.random() * Math.floor(maybePresets.length - 1))];

    return wheelPreset;
};
