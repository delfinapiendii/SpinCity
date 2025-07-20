# 🎵 SpinCity - App de Vinilos 🎶

SpinCity es una aplicación web para la gestión y visualización de vinilos. Permite a usuarios explorar productos musicales, y a administradores gestionar el stock, agregar nuevos vinilos y mantener el catálogo actualizado.

## 🚀 Tecnologías utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Security + JWT
- JPA + Hibernate
- MySQL
- CORS configurado para desarrollo
- Manejo de imágenes con `byte[]` en base de datos

### Frontend
- React.js
- Vite
- CSS custom
- Fetch API para consumo del backend

## 🔐 Funcionalidades principales

### Usuarios
- Registro e inicio de sesión con token JWT
- Visualización del catálogo de vinilos
- Búsqueda por título

### Admin
- Acceso restringido por rol (`ADMIN`)
- Agregar, editar y eliminar vinilos
- Cargar imagen desde formulario (guardado como base64)
- Autenticación y autorización por JWT

## 📦 Instalación

### Backend
```bash
cd TPO-api-grupo10
./mvnw spring-boot:run
