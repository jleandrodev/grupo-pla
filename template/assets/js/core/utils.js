/**
 * Utilitários puros — formatadores, debounce, throttle.
 */

export function formatCurrency(value, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit = 200) {
  let inThrottle;
  return (...args) => {
    if (inThrottle) return;
    fn(...args);
    inThrottle = true;
    setTimeout(() => { inThrottle = false; }, limit);
  };
}
