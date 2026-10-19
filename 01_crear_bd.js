// =============================================================
// Proyecto: Biblioteca Digital
// Script 01 - Crear la base de datos y las colecciones con validación
// Ejecutar en mongosh:  load("01_crear_bd.js")
// =============================================================

db = db.getSiblingDB("biblioteca");

// Empezar desde cero (útil para volver a ejecutar el script)
db.dropDatabase();

// -------------------------------------------------------------
// Colección: usuarios
// -------------------------------------------------------------
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "email", "tipo", "activo"],
      properties: {
        _id:    { bsonType: "string", description: "Código del usuario, ej. U001" },
        nombre: { bsonType: "string" },
        email:  { bsonType: "string", pattern: "^.+@.+\\..+$" },
        tipo:   { enum: ["estudiante", "docente"] },
        carrera:{ bsonType: "string" },
        fechaRegistro: { bsonType: "date" },
        activo: { bsonType: "bool" }
      }
    }
  }
});

// -------------------------------------------------------------
// Colección: libros
// - autores y generos son arreglos
// - editorial y ejemplares son subdocumentos (embebidos)
// -------------------------------------------------------------
db.createCollection("libros", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "titulo", "autores", "anio", "ejemplares"],
      properties: {
        _id:     { bsonType: "string", description: "Código del libro, ej. L001" },
        titulo:  { bsonType: "string" },
        autores: { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
        isbn:    { bsonType: "string" },
        anio:    { bsonType: "number", minimum: 1450, maximum: 2026 },
        editorial: {
          bsonType: "object",
          properties: {
            nombre: { bsonType: "string" },
            pais:   { bsonType: "string" }
          }
        },
        generos: { bsonType: "array", items: { bsonType: "string" } },
        ejemplares: {
          bsonType: "object",
          required: ["total", "disponibles"],
          properties: {
            total:       { bsonType: "number", minimum: 0 },
            disponibles: { bsonType: "number", minimum: 0 }
          }
        }
      }
    }
  }
});

// -------------------------------------------------------------
// Colección: prestamos
// - referencia a libros (libroId) y a usuarios (usuarioId)
// -------------------------------------------------------------
db.createCollection("prestamos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["libroId", "usuarioId", "fechaPrestamo", "fechaLimite", "estado"],
      properties: {
        libroId:         { bsonType: "string" },
        usuarioId:       { bsonType: "string" },
        fechaPrestamo:   { bsonType: "date" },
        fechaLimite:     { bsonType: "date" },
        fechaDevolucion: { bsonType: ["date", "null"] },
        estado:          { enum: ["activo", "devuelto", "vencido"] },
        multa:           { bsonType: "number", minimum: 0 }
      }
    }
  }
});

print("Base de datos 'biblioteca' creada con colecciones:", db.getCollectionNames());
