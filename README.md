#  Tabla de Posiciones de Fútbol

##  Descripción del proyecto

Este proyecto consiste en una aplicación web desarrollada con React que permite registrar partidos de fútbol, consultar resultados y visualizar una tabla de posiciones que se actualiza automáticamente.

La aplicación cuenta con seis equipos de fútbol y permite llevar el control de sus estadísticas durante los partidos registrados.

## Funcionalidades

- Registro de partidos entre dos equipos.
- Validación para evitar seleccionar el mismo equipo como local y visitante.
- Validación de los goles ingresados.
- Cálculo automático de puntos y estadísticas.
- Tabla de posiciones ordenada por puntos, diferencia de goles y goles a favor.
- Historial de partidos registrados.
- Filtro del historial por equipo.
- Eliminación de partidos con confirmación.
- Guardado de los resultados en el navegador mediante `localStorage`.
- Interfaz adaptable a computadores y dispositivos móviles.

##  Tecnologías utilizadas

- **React:** desarrollo de la interfaz y manejo de estados.
- **JavaScript:** lógica de la aplicación y cálculos.
- **HTML:** estructura de la página.
- **CSS:** diseño visual y adaptación a diferentes pantallas.
- **Vite:** herramienta para ejecutar el proyecto durante el desarrollo.
- **localStorage:** almacenamiento de los partidos en el navegador.

## Sistema de puntuación

La tabla de posiciones utiliza las siguientes reglas:

- Victoria: 3 puntos.
- Empate: 1 punto para cada equipo.
- Derrota: 0 puntos.

También se calculan los partidos jugados, ganados, empatados, perdidos, goles a favor, goles en contra y diferencia de goles.

Los equipos se ordenan según los puntos obtenidos, la diferencia de goles y los goles a favor.

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js instalado.
- npm, incluido normalmente con Node.js.
- Un navegador web moderno.

##  Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanvx54/tabla-futbol.git
```

### 2. Entrar a la carpeta del proyecto

```bash
cd tabla-futbol
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

### 5. Abrir la aplicación

Abre en tu navegador la dirección local que aparece en la terminal, normalmente:

`http://localhost:5173/`

##  Integrantes

- Integrante : JUAN PABLO VARELA PADILLA
-

##  Información académica

- Universidad: Universidad de la costa
- Programa académico: Ingeniería de sistemas
- Asignatura: Desarrollo web
- Docente: TOSCANO CASTILLA LUIS

## Estado del proyecto

Proyecto académico desarrollado como práctica de React, manejo de estados, validación de datos, cálculos dinámicos y diseño adaptable.

##  Repositorio

[Ver el proyecto en GitHub](https://github.com/juanvx54/tabla-futbol)


