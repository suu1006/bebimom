const { APP_COLORS } = require("../shared/src/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: APP_COLORS.primary,
        background: APP_COLORS.background,
        "input-bg": APP_COLORS.inputBg,
        border: APP_COLORS.border,
        foreground: APP_COLORS.foreground,
        subtle: APP_COLORS.subtle,
        placeholder: APP_COLORS.placeholder,
        "report-green": APP_COLORS.reportGreen,
        "report-green-dark": APP_COLORS.reportGreenDark,
        "report-green-soft": APP_COLORS.reportGreenSoft,
        "report-neutral-pill": APP_COLORS.reportNeutralPill,
        "report-neutral-text": APP_COLORS.reportNeutralText,
        "report-segment": APP_COLORS.reportSegmentBg,
      },
    },
  },
  plugins: [],
};
