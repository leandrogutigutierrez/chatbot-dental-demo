# Project Intelligence

## Stack
- React 18 + Vite
- Tailwind CSS v3
- Anthropic SDK (latest)
- Express.js para backend

---

# SKILL: Diseño UI/UX Profesional
> Claude debe seguir estas reglas en CADA componente que cree

## Principios visuales
- Visual hierarchy clara: fuentes 12/14/16/20/24/32px únicamente
- Espaciado: múltiplos de 4px (p-2, p-4, p-6, p-8, p-12, p-16)
- Máximo 2 colores de acento + escala de grises
- Bordes: rounded-xl cards, rounded-lg botones, rounded-full pills/avatars
- Sombras: shadow-sm superficies, shadow-md cards elevadas, shadow-lg modales
- Nunca colores hardcodeados — siempre clases Tailwind

## Componentes obligatorios en todo proyecto
- SIEMPRE incluir estado hover en elementos clickeables (hover:bg-* hover:scale-*)
- SIEMPRE incluir estado focus para accesibilidad (focus:ring-2 focus:outline-none)
- SIEMPRE incluir estado disabled cuando aplique (disabled:opacity-50 disabled:cursor-not-allowed)
- SIEMPRE incluir estado loading con skeleton o spinner contextual
- SIEMPRE incluir empty state — nunca pantalla en blanco
- SIEMPRE incluir error state con mensaje útil al usuario

## Tipografía
- Headings: font-semibold o font-bold
- Labels y subtítulos: font-medium
- Body y descripciones: font-normal
- Captions y metadata: text-sm text-gray-500

## Animaciones permitidas
- transition-all duration-200 en botones e inputs
- transition-colors duration-150 en hover states
- animate-pulse para skeleton loaders
- animate-spin para spinners de carga
- NO usar animaciones complejas que distraigan

## Layout y responsividad
- Mobile first siempre: diseñar base para móvil, luego md: lg: xl:
- Containers: max-w-sm (móvil), max-w-2xl (contenido), max-w-6xl (layouts completos)
- Grid: preferir CSS Grid para layouts, Flexbox para alineación de elementos

---

# SKILL: React Best Practices
> Aplicar en cada archivo .jsx que se cree

## Estructura de componentes
- Máximo 150 líneas por componente — si supera, dividir
- Un componente = una responsabilidad única
- Orden interno: imports → tipos/constantes → hooks → handlers → render

## Hooks
- Custom hooks para toda lógica reutilizable
- Nombrar siempre con "use": useChat, useDocuments, useForm
- useCallback en funciones pasadas como props a hijos
- useMemo para listas filtradas o cálculos costosos
- useEffect con dependencias explícitas — nunca array vacío sin justificación

## Naming conventions
- Componentes: PascalCase (ChatBubble, MessageInput)
- Hooks: camelCase con "use" (useChat, useApiKey)
- Handlers: "handle" + evento (handleSubmit, handleKeyDown, handleChange)
- Props booleanas: "is" o "has" (isLoading, hasError, isVisible)
- Constantes: UPPER_SNAKE_CASE (MAX_MESSAGES, API_URL)

## Estructura de carpetas obligatoria
```
src/
  components/     # Componentes UI puros
    ui/           # Componentes base reutilizables (Button, Input, Card)
    features/     # Componentes de features específicas
  hooks/          # Custom hooks
  services/       # Llamadas a API y lógica externa
  utils/          # Helpers y funciones puras
  constants/      # Constantes y configuración
```

## API y async
- Todas las llamadas API van en /services — NUNCA directo en componentes
- try/catch en todas las funciones async sin excepción
- Estados obligatorios para cada llamada: loading, data, error
- Cancelar requests en cleanup de useEffect cuando aplique

## Performance
- Keys únicas y estables en listas (NUNCA index como key si la lista cambia)
- Lazy loading para componentes pesados con React.lazy + Suspense
- Imágenes con loading="lazy" siempre

---

# Context7 Usage
- Consultar documentación actualizada ANTES de usar cualquier librería
- Obligatorio para: Anthropic SDK, Tailwind v3, React 18, Express

---

# Code Quality
- Variables de entorno: siempre import.meta.env (Vite) o process.env (Node)
- Console.log solo en desarrollo, nunca en producción
- Error boundaries en componentes que hacen llamadas a API
- Comentarios solo cuando el "por qué" no es obvio — el código debe ser autodocumentado