# DepurApp Frontend

Convertir la búsqueda laboral en un proceso estratégico, medible y optimizable.

DepurApp no es solo una aplicación para cargar postulaciones. Es una herramienta pensada para transformar la forma en que las personas buscan trabajo.

Este repositorio contiene el frontend de la plataforma.

## El problema

La mayoría de las personas busca trabajo de forma reactiva:

- Envían CVs sin medir resultados
- No tienen claridad sobre su rendimiento
- No saben si el problema es volumen, perfil o estrategia
- No toman decisiones basadas en datos

La búsqueda se vuelve emocional e incierta.

## La solución

DepurApp convierte ese proceso en algo medible.

La plataforma permite:

- Registrar y organizar postulaciones
- Analizar métricas reales
- Obtener un score estratégico
- Recibir planes de acción basados en resultados

El foco no está solo en mostrar datos, sino en ayudar a tomar decisiones.

## Estado del proyecto

- MVP funcional
- En desarrollo activo
- Iterando en base a métricas reales
- En constante mejora de UX y lógica estratégica

Actualmente el sistema ya permite:

- Registro e inicio de sesión
- Gestión de perfil
- Creación y actualización de postulaciones
- Dashboard con métricas
- Sistema de score
- Generación de planes de acción

## Sistema de score estratégico

DepurApp incluye un sistema que evalúa el estado de la búsqueda laboral considerando:

- Volumen de postulaciones
- Ratio de entrevistas
- Conversión en etapas
- Distribución de estados

Este score ofrece una lectura clara y objetiva del momento actual del usuario.

No es una métrica decorativa. Es una herramienta de diagnóstico.

## Planes de acción inteligentes

Según los datos obtenidos, la plataforma sugiere acciones concretas, por ejemplo:

- Aumentar volumen de envíos
- Ajustar tipo de roles
- Revisar CV o perfil
- Optimizar estrategia de seguimiento

El objetivo es pasar de:

"Estoy buscando trabajo"

a

"Estoy ejecutando una estrategia"

## Stack tecnológico

- React
- Next.js
- Tailwind CSS
- NextAuth
- Consumo de API REST con backend en NestJS
- Arquitectura modular y escalable

El frontend está diseñado con foco en:

- Claridad visual
- Simplicidad
- Escalabilidad
- Experiencia centrada en el usuario

## Variables de entorno

Para levantar el frontend localmente o en Vercel se necesitan estas variables:

- `NEXT_PUBLIC_API_URL`
  Backend pÃºblico. Ejemplo local: `http://localhost:3001`
- `NEXTAUTH_URL`
  URL pÃºblica del frontend. En Vercel debe ser la URL final del deployment
- `NEXTAUTH_SECRET`
  Secreto de NextAuth. En producciÃ³n debe rotarse y no reutilizarse con local
- `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED`
  `true` o `false` para mostrar u ocultar login con Google en UI
- `GOOGLE_CLIENT_ID`
  Requerido solo si se usa login con Google
- `GOOGLE_CLIENT_SECRET`
  Requerido solo si se usa login con Google
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
  Requerido solo si se usa el flujo PayPal

En Vercel no deben versionarse secretos reales. `.env.example` deja la estructura mÃ­nima esperada.

## Modelo del proyecto

DepurApp es:

- 100% gratuita
- Independiente
- Sin bloqueos de funcionalidades

Acepta donaciones voluntarias para cubrir:

- Infraestructura
- Servidores
- Mantenimiento
- Evolución del producto

La prioridad es mantenerla accesible para cualquier persona que esté buscando trabajo.

## Roadmap

- Evolución histórica del score
- Insights avanzados
- Comparativas por industria
- Recordatorios inteligentes
- Métricas predictivas
- Sistema de recomendaciones más profundo

## Autor

Desarrollado por Alan Ariel Velazquez, Full Stack Developer.

Proyecto construido desde cero, con enfoque en producto real y potencial de impacto.
