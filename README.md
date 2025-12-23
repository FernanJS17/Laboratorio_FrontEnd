# LaboratorioFrontEnd

Este es el FrontEnd del proyecto de Laboratorio. Es una app para manejar posts, comentarios y carga masiva de datos, con autenticación simple usando JWT.

-Tecnologías

---
Angular V18.2.21
---
---
Node.js v20.19.6
---
TypeScript

RxJS

TailwindCSS para estilos

JWT para autenticación básica

Node / API (se asume que ya está corriendo el backend)

-Instalación

Clona el repositorio:

git clone https://github.com/FernanJS17/Laboratorio_FrontEnd.git


Entra en la carpeta del proyecto:

cd Laboratorio_FrontEnd


Instala las dependencias:

npm install


Levanta la app:

ng serve


Abre el navegador en:

http://localhost:4200

- Funcionalidades principales

Listado de posts: ver todos los posts con paginación y búsqueda.

Detalle de post: ver el contenido completo y comentarios.

Crear / Editar posts: formularios con validaciones.

Eliminar posts y comentarios con modal de confirmación.

Carga masiva de posts: generar y cargar muchos posts de prueba.

Autenticación simple: login con JWT.

UI moderna: con botones, modales, toast y skeletons, estilos basadoss en la interfaz de Facebook y Reddit.

- Uso

Inicia sesión en la pantalla de login para acceder a la app.

Puedes crear nuevos posts, editarlos o eliminarlos.

Carga posts masivos usando la sección de “Carga masiva”.

Los toasts muestran mensajes de éxito o error en cada acción.

Skeletons indican cuando la app está cargando datos.

-Notas

El proyecto requiere que el backend esté corriendo para funcionar correctamente.

Los posts y comentarios se manejan con un backend simulado o real con endpoints REST.

La autenticación JWT es simple, no hay registro de usuarios, solo login básico.

Se puede personalizar la cantidad de posts en la carga masiva cambiando el generador de datos.

-GitHub: FernanJS17
