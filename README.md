# MobileTheme

Plugin para FacturaScripts que adapta el menú principal y algunos elementos de marca para facilitar su uso en dispositivos móviles y tablets.

## Requisitos

- FacturaScripts 2025.5 o posterior.
- No requiere otros plugins ni dependencias adicionales.

## Instalación

1. Copiar la carpeta `MobileTheme` dentro de `Plugins/`.
2. Activar **MobileTheme** desde la administración de plugins de FacturaScripts.
3. Recargar la aplicación. Si el navegador conserva recursos anteriores, hacer una recarga forzada.

## Comportamiento

En pantallas de hasta 1199,98 px de ancho, incluidas tablets en horizontal:

- Muestra el botón hamburguesa a la izquierda del logo.
- Mantiene visible el logo y el nombre corto de la empresa; el nombre se trunca si no cabe.
- El logo y el nombre enlazan a la página de inicio configurada para el usuario.
- Abre el menú principal en un panel lateral con fondo de cierre.
- Despliega las categorías y submenús al pulsarlos, en lugar de abrirlos por hover.
- Cierra el panel al pulsar una opción de navegación, el fondo o la tecla Escape.
- Evita el desplazamiento del contenido de fondo mientras el panel está abierto.

A partir de 1200 px se conserva la navegación de escritorio de FacturaScripts. El plugin utiliza el navbar estándar de la plantilla principal.

## Estructura

- `Assets/CSS/MobileMenu.css`: estilos responsive del panel y la marca.
- `Assets/JS/MobileMenu.js`: apertura, cierre y expansión de submenús.
- `Extension/View/MenuTemplate_CssAfter_50.html.twig`: carga de estilos.
- `Extension/View/MenuTemplate_JsFooter_50.html.twig`: carga del script.
- `Init.php`: inicializador del plugin.

## Autor

Serguei Vicario
[sergueivm.es](https://sergueivm.es)
[serguei.vicario@gmail.com](mailto:serguei.vicario@gmail.com)
