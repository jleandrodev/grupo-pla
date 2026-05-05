# Referencias Visuais — Prints de Layout

Esta pasta contém os prints de referência visual do template e dos clientes.

## Como usar

Antes de implementar qualquer página ou componente novo, consulte os prints aqui presentes para garantir fidelidade ao layout aprovado.

## Convenção de nomenclatura

```
[cliente]_[pagina]_[dispositivo]_[versao].png
```

### Exemplos

```
template_home_desktop_v1.png
template_home_mobile_v1.png
template_product_desktop_v1.png
template_catalog_desktop_v1.png
template_cart_desktop_v1.png
template_checkout_desktop_v1.png

cliente-abc_home_desktop_v1.png
cliente-abc_home_mobile_v1.png
```

### Dispositivos

| Sufixo | Largura de referência |
|---|---|
| `_mobile` | 375px |
| `_tablet` | 768px |
| `_desktop` | 1280px |

## Páginas esperadas

Para cada cliente, idealmente ter prints de:

- [ ] Home (`_home`)
- [ ] Listagem de produtos (`_catalog`)
- [ ] Detalhe de produto (`_product`)
- [ ] Carrinho (`_cart`)
- [ ] Checkout (`_checkout`)
- [ ] Área do cliente (`_account`)

## Observações

- Formatos aceitos: `.png`, `.jpg`, `.webp`
- Resolução mínima sugerida: tela cheia capturada em 1x (sem retina scale)
- Para fluxos animados ou interativos, um GIF ou vídeo curto é bem-vindo
