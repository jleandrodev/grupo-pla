/**
 * whatsapp.js — Seleciona aleatoriamente um número de WhatsApp.
 * Números cadastrados em: template/assets/data/whatsapp.js
 */

import { WHATSAPP_NUMBERS } from '../../data/whatsapp.js';

/**
 * Retorna a URL de WhatsApp com um número aleatório da lista.
 * @param {string} message - Mensagem pré-preenchida (não encodada)
 * @returns {string}
 */
function getWhatsAppUrl(message = '') {
  const random = WHATSAPP_NUMBERS[Math.floor(Math.random() * WHATSAPP_NUMBERS.length)];
  const url = `https://wa.me/${random.number}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

export { getWhatsAppUrl };
