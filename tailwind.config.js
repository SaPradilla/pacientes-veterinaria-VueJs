/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    //Scanea todo lo que tiene la carpeta src y busca los archivos con esas extensiones
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'sky': '#0ea5e9'
      },
      backgroundImage: {
        'fondo': "url('/src/img/fondo.jpg')",
        
      }
    },
  },
  plugins: [],
}

