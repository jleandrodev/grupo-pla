/**
 * DOM helpers — seleção e manipulação segura.
 */

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export function show(el) {
  el?.removeAttribute('hidden');
}

export function hide(el) {
  el?.setAttribute('hidden', '');
}

export function toggle(el) {
  el?.hasAttribute('hidden') ? show(el) : hide(el);
}
