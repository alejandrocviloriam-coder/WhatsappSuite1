# WhatsApp Suite

Proyecto web móvil responsive creado para Android e iPhone. 

## Características iniciales

- Pantalla de bienvenida inspirada en la estética de WhatsApp
- Logo en círculo tipo perfil con botón secreto
- Entrada de código de acceso y botón de ingreso
- Pantalla de inicio tras autenticación
- Pantalla de acceso admin tras 10 toques en el logo
- Código admin: `270493`

## Archivos

- `index.html` - Estructura principal
- `style.css` - Diseño y estilo móvil
- `script.js` - Navegación y lógica de botón secreto

## Cómo probar en dispositivos móviles

1. **Vía Wi-Fi:**
   - Obtener la IP local de la PC (`ipconfig` en la terminal).
   - Abrir en el navegador del móvil: `http://[TU_IP]:5500` (asegurarse de que ambos estén en la misma red).
2. **Vía VS Code Ports (Recomendado):**
   - Abrir pestaña **Ports** en VS Code.
   - Reenviar puerto 5500.
   - Cambiar visibilidad a **Public**.
   - Copiar la URL generada y abrirla en el móvil.
3. **Vía USB:** Habilitar Port Forwarding en `chrome://inspect/#devices`.
