import { Nav } from './../models/nav';
const histogram = new Nav("Histogram");
const dystrybuanta = new Nav("Dystrybuanta Empiryczna");
const dixon = new Nav("Test Dixona");
const grubbs = new Nav("Test Grubbsa");
const sigma = new Nav("Reguła 3 Sigm");
sigma.href="regula_3_sigm";
const momentkwantyl = new Nav("Momenty centralne, zwykle, kwantyl");
const pearson = new Nav("Współczynnik korelacji");
pearson.href = "pearson";
momentkwantyl.href = "moment";
const shapiroWilka = new Nav("Test Shapiro-Wilka");
shapiroWilka.href = "shapiro-wilka";
// const kolmogorow = new Nav("Test Kołmogorowa-Lillieforsa");
// kolmogorow.href = "kolmogorow";
const zakresHistogramu = new Nav("Rozszerzenie zakresu histogramu");
zakresHistogramu.href = "zakres_histogramu";
export const ARR = [
  histogram,
  dystrybuanta,
  dixon,
  grubbs,
  sigma,
  momentkwantyl,
  pearson,
  shapiroWilka,
  // kolmogorow,
  zakresHistogramu
]