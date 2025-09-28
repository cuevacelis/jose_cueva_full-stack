# 🎵 Music App - Aplicación Full-Stack con Spotify API

Una aplicación web moderna desarrollada con **Next.js 15** que integra la **API de Spotify** para ofrecer una experiencia musical completa. Los usuarios pueden explorar artistas, gestionar álbumes guardados y navegar por una interfaz intuitiva y responsive.

## ✨ Características Principales

- 🔐 **Autenticación con Spotify**: OAuth 2.0 para acceso seguro
- 🔍 **Búsqueda de Artistas**: Explora y descubre nuevos artistas
- 💾 **Gestión de Álbumes**: Guarda y organiza tus álbumes favoritos
- 📱 **Diseño Responsive**: Optimizado para dispositivos móviles y desktop
- ⚡ **Rendimiento Optimizado**: Utilizando Turbopack y React 19
- 🎨 **UI Moderna**: Componentes personalizados con Tailwind CSS

## 🛠️ Stack Técnico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Framework de estilos utilitarios
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconografía moderna

### Estado y Datos
- **TanStack Query v5** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **pnpm** - Gestor de paquetes
- **Turbopack** - Bundler ultra-rápido

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado)
- Cuenta de desarrollador de Spotify

### 1. Clona el repositorio
```bash
git clone https://github.com/cuevacelis/jose_cueva_full-stack.git
cd jose_cueva_full-stack
```

### 2. Instala las dependencias
```bash
pnpm install
```

### 3. Configuración de Spotify API

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crea una nueva aplicación
3. Configura las URIs de redirección:
   - `http://localhost:3000/api/auth/spotify/callback` (desarrollo)
   - `https://tu-dominio.com/api/auth/spotify/callback` (producción)

### 4. Variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Spotify API
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_key_segura
```

### 5. Ejecuta el servidor de desarrollo
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── (auth)/                   # Rutas autenticadas
│   │   ├── callback/             # Manejo de callback OAuth
│   │   └── dashboard/            # Panel principal
│   │       ├── albums/           # Gestión de álbumes
│   │       └── artist/           # Información de artistas
│   ├── (not-auth)/               # Rutas públicas
│   └── api/                      # API Routes
├── components/                   # Componentes reutilizables
│   └── ui/                       # Componentes base de UI
├── context/                      # Contextos de React
│   ├── auth/                     # Contexto de autenticación
│   └── tanstack/                 # Configuración de TanStack Query
├── hooks/                        # Custom hooks
├── lib/                          # Utilidades y configuraciones
│   ├── api/                      # Cliente API de Spotify
│   └── utils/                    # Funciones auxiliares
└── types/                        # Definiciones de tipos TypeScript
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo con Turbopack
pnpm dev

# Construcción para producción
pnpm build

# Inicio del servidor de producción
pnpm start

# Linting del código
pnpm lint
```

## 🎯 Funcionalidades Implementadas

### Autenticación
- ✅ OAuth 2.0 con Spotify
- ✅ Gestión de tokens de acceso
- ✅ Renovación automática de tokens
- ✅ Estados de loading y error

### Dashboard
- ✅ Búsqueda de artistas en tiempo real
- ✅ Paginación de resultados
- ✅ Navegación entre artistas
- ✅ Información detallada de artistas

### Gestión de Álbumes
- ✅ Visualización de álbumes guardados
- ✅ Guardar/eliminar álbumes
- ✅ Estados de carga optimizados
- ✅ Persistencia de datos

## 🚀 Deploy en Vercel

1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Configura las variables de entorno en el panel de Vercel
3. Actualiza `SPOTIFY_REDIRECT_URI` con tu dominio de producción
4. El deploy se realizará automáticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cuevacelis/jose_cueva_full-stack)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**José Cueva**
- GitHub: [@cuevacelis](https://github.com/cuevacelis)
- LinkedIn: [José Cueva](https://linkedin.com/in/jose-cueva)

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!
