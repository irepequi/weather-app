module.exports = {
  presets: [
    "@babel/preset-env", // Transforma las características modernas de JS
    "@babel/preset-typescript", // Para transformar TypeScript
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Para evitar la duplicación de código
  ],
};
