<a name='inicio'></a>

# Near Bites: Your Nearby Restaurant Guide

![Near Bites Logo](./src/assets/images/cabecera-readme.png)

**Near Bites** es una aplicación web dinámica que utiliza geolocalización para ayudar a los usuarios a encontrar restaurantes cercanos. Además de ofrecer la posibilidad de filtrar resultados y gestionar reservas, **Near Bites** integra funciones de interacción como añadir restaurantes a favoritos, gestionar roles de usuarios (incluyendo propietarios y administradores), y un sistema completo de comentarios y valoraciones.

[Visítanos aquí](https://github.com/as-Solo/Near-Bites)

---

## 📝 Tabla de Contenidos

- [📍 Funcionalidades Principales](#funcionalidades-principales)
- [🚀 Tecnologías Utilizadas](#tecnologías-utilizadas)
- [🛠️ Estructura del Proyecto](#estructura-del-proyecto)
- [🔍 Lógica de la Aplicación](#lógica-de-la-aplicación)
- [🎯 Retos Técnicos y Soluciones](#retos-técnicos-y-soluciones)
- [👨‍💻 Habilidades Adquiridas](#habilidades-adquiridas)
- [❤️ Agradecimientos](#agradecimientos)
- [🤝 Contribuciones](#contribuciones)

---
<a name='funcionalidades-principales'></a>
## 📍 Funcionalidades Principales

- **Geolocalización en Tiempo Real**: La aplicación detecta la ubicación del usuario para mostrar los restaurantes cercanos, con posibilidad de ajustar el radio de búsqueda.
- **Comentarios y Valoraciones**: Los usuarios pueden dejar reseñas en los restaurantes, ayudando a otros a tomar decisiones informadas.
- **Favoritos y Lista de Deseos**: Guarda los restaurantes favoritos y agrega otros a tu lista de deseos para reservas futuras.
- **Reservas Dinámicas**: Permite realizar reservas en tiempo real, gestionando horarios y disponibilidad automáticamente.
- **Gestión de Roles**: Los usuarios pueden tener roles especiales como `owner`, con acceso a herramientas de administración para gestionar la apariencia y datos de su restaurante, y `admin` que gestiona y administra las distintas cuentas y sus permisos.
- **Panel de Control para Propietarios y Administradores**: Los propietarios tienen un panel donde pueden modificar fácilmente los datos de su restaurante (imágenes, turnos, ofertas, etc.), mientras que los administradores pueden gestionan usuarios y permisos con un solo click.

---

<a name='tecnologías-utilizadas'></a>
## 🚀 Tecnologías Utilizadas

Este proyecto ha sido desarrollado utilizando una combinación de tecnologías modernas que permiten una experiencia de usuario ágil y dinámica:

- **[React](https://reactjs.org/)**: Para la construcción de la interfaz de usuario, utilizando componentes reutilizables y un enfoque modular.
- **[Vite](https://vitejs.dev/)**: Como el *bundler* para ofrecer una experiencia de desarrollo rápida y eficiente.
- **[Express](https://expressjs.com/)**: Manejo del backend, con un enfoque RESTful en las APIs.
- **[MongoDB](https://www.mongodb.com/)** y **[Mongoose](https://mongoosejs.com/)**: Base de datos NoSQL utilizada para gestionar la información de usuarios, restaurantes, comentarios, y reservas.
- **[Leaflet](https://leafletjs.com/)**: Librería para la integración de mapas interactivos y geolocalización.
- **[Cloudinary](https://cloudinary.com/)**: Servicio utilizado para la gestión y almacenamiento de imágenes.
- **[React Spinners](https://www.davidhu.io/react-spinners/)**: Para la integración de *loaders* y mejorar la experiencia de usuario mientras se cargan los datos.

---

<a name='estructura-del-proyecto'></a>
## 🛠️ Estructura del Proyecto

El proyecto está dividido en dos repositorios para organizar mejor las responsabilidades del frontend y backend:

- **[Frontend (Este Repositorio)](https://github.com/as-Solo/Near-Bites)**: Contiene todo el código relacionado con la interfaz de usuario y la experiencia del cliente, construido con **React**, **Vite** y otras herramientas de desarrollo frontend.
    - `/src/components`: Componentes reutilizables de React como las tarjetas de restaurantes, formularios de comentarios, y el panel de control de usuarios.
    - `/src/pages`: Vistas principales de la aplicación como la página de inicio, la página de favoritos y el panel de administración.
    - `/src/services`: Configuración de Axios para gestionar las solicitudes HTTP al backend.
    - `/src/context`: Manejadores de estado globales (como el de autenticación y roles) que permiten compartir datos y funciones entre componentes.
    - `/src/assets`: Imágenes y recursos estáticos utilizados en la interfaz.
  
- **[Backend (Repositorio Separado)](https://github.com/as-Solo/Near-Bites-server)**: Toda la lógica del servidor, incluyendo las rutas de la API, la configuración de **MongoDB** y la gestión de roles, se encuentra en este repositorio.
    - En este repositorio se manejan las conexiones con la base de datos, la autenticación de usuarios, las reservas, los comentarios, la gestión de restaurantes y el control de acceso basado en roles (usuarios, propietarios y administradores).
    - Integración de servicios de terceros como **Cloudinary** para el manejo de imágenes y **Leaflet** para los mapas y geolocalización.

---

<a name='lógica-de-la-aplicación'></a>
## 🔍 Lógica de la Aplicación

La aplicación está diseñada para ser completamente interactiva y adaptable a las necesidades de cada usuario:

- **Geolocalización Dinámica**: A través de la API de geolocalización del navegador, Near Bites obtiene la ubicación actual del usuario y le muestra los restaurantes más cercanos.
- **Sistema de Filtrado**: Los usuarios pueden ajustar el radio de búsqueda y aplicar filtros adicionales como disponibilidad, tipo de comida, y calificación.
- **Gestión de Reservas**: Near Bites controla la disponibilidad de cada restaurante, integrando un sistema de turnos dinámico que permite gestionar las reservas en tiempo real.
- **Gestión de Roles**: Implementa un sistema de autorización basado en roles, permitiendo que los propietarios gestionen la información de sus restaurantes y los administradores supervisen y editen roles de usuarios.

---

<a name='retos-técnicos-y-soluciones'></a>
## 🎯 Retos Técnicos y Soluciones

Durante el desarrollo del proyecto, se presentaron varios desafíos técnicos, algunos de los más importantes fueron:

- **Gestión de Geolocalización y Mapa**: Sincronizar la posición del usuario con los datos de los restaurantes cercanos en tiempo real fue un reto resuelto mediante el uso de **[Leaflet](https://leafletjs.com/)**.
- **Gestión Compleja de Estados**: El uso de **Context API** y hooks de React permitió gestionar de forma eficiente estados complejos, como las reservas en tiempo real y la autenticación basada en roles.
- **Optimización de Consultas a la Base de Datos**: Se implementaron consultas eficientes en MongoDB para manejar el filtrado de restaurantes y gestionar la disponibilidad en tiempo real sin sobrecargar el servidor.

---

<a name='habilidades-adquiridas'></a>
## 👨‍💻 Habilidades Adquiridas

Este proyecto ha sido una excelente oportunidad para mejorar mis habilidades en:

- **React y Gestión de Estados**: Amplio manejo de hooks y Context API para la creación de una aplicación dinámica y escalable.
- **Desarrollo Fullstack**: Integración fluida entre un frontend moderno basado en React y un backend robusto con Express y MongoDB.
- **Optimización de Rendimiento**: Reducción del tiempo de carga mediante una planificación cuidadosa de las consultas al servidor y la adaptación de las peticiones a las necesidades específicas de cada momento, garantizando una mayor eficiencia en la interacción con la base de datos y el servidor.
- **Control de Acceso y Roles**: Desarrollo de un sistema de roles robusto que permite la personalización de la experiencia según el tipo de usuario.

---

<a name='agradecimientos'></a>
## ❤️ Agradecimientos

A mi profesor y mentor en el camino del desarrollo web, que en dos meses de guía, apoyo, consejos y una abrumadora transmisión de conocimientos, ha hecho posible que yo pueda hacer este proyecto en menos de dos semanas:
* [Jorge Berrizbeitia](https://github.com/jorgeberrizbeitia)

Mención especial para quien ya desde el primer proyecto de este bootcamp siempre dijo, **adelante**, aun sabiendo que eso significaría que le enterrase en dudas y que le pidiese a cada paso que "auditase" mi web. De todo corazón: muchas gracias!:
* [Jesús Suaste](https://github.com/suastech)

---

<a name='contribuciones'></a>
## 🤝 Contribuciones

Cualquier contribución a este proyecto es más que bienvenida. Si tienes ideas para nuevas funcionalidades, o deseas mejorar el código actual, no dudes en enviar un *pull request* o abrir una *issue*.

---

[🔝 Subir](#inicio)