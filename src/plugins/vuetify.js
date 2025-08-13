import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#0097A7", // Cyan
          primaryContainer: "#00BCD4", // Light Cyan
          secondary: "#80CBC4", // Teal Lighten 3
          background: "#FFFFFF", // White
          surface: "#FFFFFF", // White
          error: "#B00020", // Red
          onPrimary: "#fa0b0b", // White text on primary
          onPrimaryContainer: "#000000", // Black text on primaryContainer (for contrast)
          onSecondary: "#000000", // Black text on secondary
          onBackground: "#000000", // Black text on background
          onSurface: "#000000", // Black text on surface
          onError: "#FFFFFF", // White text on error

          // Additional colors
          border: "#000000", // Pure Black (for light theme)
          divider: "#BDBDBD", // Grey 400
          outline: "#BDBDBD", // Grey 400
          surfaceVariant: "#F5F5F5", // Grey 100
          inverseSurface: "#303030", // Dark Grey
          inverseOnSurface: "#FFFFFF", // White
          success: "#4CAF50", // Green
          warning: "#FFC107", // Amber
          info: "#2196F3", // Blue
          onSurfaceVariant: "#000000", // Black
          onInverseSurface: "#000000", // Black
          teksKirim: "#000000", // White text for "teks-kirim"
          test: "#dd00ba",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#4DD0E1", // Cyan Lighten 2
          primaryContainer: "#0097A7", // Cyan
          secondary: "#80CBC4", // Teal Lighten 3
          background: "#121212", // Dark Grey (Material You standard)
          surface: "#1E1E1E", // Slightly lighter Dark Grey (Material You standard)
          error: "#CF6679", // Red (for dark theme)
          onPrimary: "#d90303", // Black text on primary
          onPrimaryContainer: "#FFFFFF", // White text on primaryContainer
          onSecondary: "#000000", // Black text on secondary
          onBackground: "#FFFFFF", // White text on background
          onSurface: "#FFFFFF", // White text on surface
          onError: "#000000", // Black text on error

          // Additional colors
          border: "#FFFFFF", // Pure White (for dark theme)
          divider: "#616161", // Grey 700
          outline: "#616161", // Grey 700
          surfaceVariant: "#2C2C2C", // Slightly darker than surface
          inverseSurface: "#E0E0E0", // Light Grey
          inverseOnSurface: "#000000", // Black
          success: "#81C784", // Green Lighten 3
          warning: "#FFD54F", // Amber Lighten 3
          info: "#64B5F6", // Blue Lighten 3
          onSurfaceVariant: "#FFFFFF", // White
          onInverseSurface: "#000000", // Black
          teksKirim: "#000000", // White text for "teks-kirim"
          test: "#dd00ba",
        },
      },
    },
  },
});

export default vuetify;
