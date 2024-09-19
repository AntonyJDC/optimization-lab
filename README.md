# Optimization Lab

**Optimization Lab** es una herramienta educativa interactiva que te permite resolver problemas de optimización mediante la visualización gráfica de la región factible y comparaciones de diferentes métodos de optimización. El frontend está desplegado en Vercel, mientras que el backend puede ser ejecutado localmente.

## Características

- Visualización de regiones factibles de optimización.
- Comparación de métodos de optimización sin restricciones: BFGS, Newton-CG, Powell.
- Expansión en series de Taylor para diferentes funciones matemáticas.
- Interfaz interactiva para definir restricciones y variables de optimización.

## Instalación

### Requisitos

- Python 3.8 o superior
- Flask
- Matplotlib
- NumPy
- Next.js (para el frontend)
- Node.js

### Pasos para la instalación

#### Backend (API con Python y Flask)

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/AntonyJDC/optimization-lab.git
   cd optimization-lab/backend
   ```

2. Instala los requisitos:
   ```bash
   pip install -r requirements.txt
   ```

3. Ejecuta el servidor de Flask:
  ```bash
   python app.py
  ```

El backend estará corriendo en http://localhost:5000.

#### Frontend (Next.js)

1. Accede al directorio del frontend:
   ```bash
   cd ../frontend
   ```

2. Instala las dependencias de Node.js:
   ```bash
   npm install
   ```

3. Si deseas correr el frontend localmente, ejecuta:
   ```bash
   npm run dev
   ```

El frontend estará disponible en http://localhost:3000, aunque ya está desplegado en [Vercel](https://optimization-lab.vercel.app).

## Uso

1. Abre tu navegador en http://localhost:3000 si has desplegado el frontend localmente o en el enlace de Vercel mencionado.
2. Configura los parámetros de optimización o las restricciones en la interfaz gráfica.
3. Visualiza los resultados de la optimización y compara diferentes algoritmos en tiempo real.

## Estructura del Proyecto

- **backend/**: Código fuente de la API escrita en Python y Flask.
- **frontend/**: Código fuente del frontend en Next.js.
- **assets/**: Imágenes y recursos estáticos.

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
