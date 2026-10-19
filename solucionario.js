// =============================================================
// Proyecto: Biblioteca Digital — SOLUCIONARIO (solo para el docente)
// Ejecutar después de 01_crear_bd.js y 02_insertar.js:
//   load("solucionario.js")
// Requiere MongoDB 5.0 o superior (usa $dateDiff).
// Fecha de referencia del proyecto ("hoy"): 2026-10-12
// =============================================================

db = db.getSiblingDB("biblioteca");
const HOY = new Date("2026-10-12");

function titulo(t) { print("\n==== " + t + " ===="); }

// =============================================================
// PARTE 1 — Validación de esquema
// =============================================================
titulo("1.2 Usuario con tipo inválido (debe fallar)");
try {
  db.usuarios.insertOne({ _id: "U999", nombre: "Prueba", email: "prueba@uni.edu.ni", tipo: "administrativo", activo: true });
} catch (e) { print("Rechazado:", e.message); }

titulo("1.3 Libro sin autores (debe fallar)");
try {
  db.libros.insertOne({ _id: "L999", titulo: "Libro sin autor", autores: [], anio: 2020, ejemplares: { total: 1, disponibles: 1 } });
} catch (e) { print("Rechazado:", e.message); }

titulo("1.4 Ver el validador de libros");
printjson(db.getCollectionInfos({ name: "libros" })[0].options.validator);

// =============================================================
// PARTE 2 — Inserción
// =============================================================
titulo("2.2 insertOne: usuario nuevo");
db.usuarios.insertOne({
  _id: "U016", nombre: "Estudiante de Prueba", email: "eprueba@uni.edu.ni",
  tipo: "estudiante", carrera: "Ingeniería en Sistemas",
  fechaRegistro: HOY, activo: true
});

titulo("2.3 insertOne: libro nuevo");
db.libros.insertOne({
  _id: "L021", titulo: "Bases de datos NoSQL en la práctica", autores: ["Autor Ficticio"],
  isbn: "978-0000000000", anio: 2024,
  editorial: { nombre: "Editorial Universitaria", pais: "Nicaragua" },
  generos: ["Bases de datos", "NoSQL"],
  ejemplares: { total: 2, disponibles: 2 }
});

titulo("2.4 insertMany: dos préstamos del usuario nuevo");
db.prestamos.insertMany([
  { libroId: "L021", usuarioId: "U016", fechaPrestamo: HOY, fechaLimite: new Date("2026-10-26"), fechaDevolucion: null, estado: "activo", multa: 0 },
  { libroId: "L017", usuarioId: "U016", fechaPrestamo: HOY, fechaLimite: new Date("2026-10-26"), fechaDevolucion: null, estado: "activo", multa: 0 }
]);
db.libros.updateMany({ _id: { $in: ["L021", "L017"] } }, { $inc: { "ejemplares.disponibles": -1 } });

// =============================================================
// PARTE 3 — Consultas
// =============================================================
titulo("3.1 Libros publicados después de 2000 (título y año, más recientes primero)");
db.libros.find({ anio: { $gt: 2000 } }, { _id: 0, titulo: 1, anio: 1 }).sort({ anio: -1 }).forEach(printjson);

titulo("3.2 Libros del género Novela");
db.libros.find({ generos: "Novela" }, { titulo: 1 }).forEach(printjson);

titulo("3.3 Libros de Bases de datos Y NoSQL");
db.libros.find({ generos: { $all: ["Bases de datos", "NoSQL"] } }, { titulo: 1 }).forEach(printjson);

titulo("3.4 Libros de Rubén Darío");
db.libros.find({ autores: "Rubén Darío" }, { titulo: 1, anio: 1 }).forEach(printjson);

titulo("3.5 Libros con más de un autor");
db.libros.find({ "autores.1": { $exists: true } }, { titulo: 1, autores: 1 }).forEach(printjson);

titulo("3.6 Libros sin ejemplares disponibles");
db.libros.find({ "ejemplares.disponibles": 0 }, { titulo: 1, ejemplares: 1 }).forEach(printjson);

titulo("3.7 Libros de editoriales de Argentina o México");
db.libros.find({ "editorial.pais": { $in: ["Argentina", "México"] } }, { titulo: 1, "editorial.pais": 1 }).forEach(printjson);

titulo("3.8 Usuarios cuyo nombre empieza con J");
db.usuarios.find({ nombre: { $regex: "^J" } }, { nombre: 1 }).forEach(printjson);

titulo("3.9 Préstamos vencidos o con multa");
db.prestamos.find({ $or: [{ estado: "vencido" }, { multa: { $gt: 0 } }] }, { _id: 0, libroId: 1, usuarioId: 1, estado: 1, multa: 1 }).forEach(printjson);

titulo("3.10 Los 3 préstamos más recientes");
db.prestamos.find({}, { _id: 0, libroId: 1, usuarioId: 1, fechaPrestamo: 1 }).sort({ fechaPrestamo: -1 }).limit(3).forEach(printjson);

titulo("3.11 Estudiantes activos de Ingeniería en Sistemas");
print(db.usuarios.countDocuments({ tipo: "estudiante", carrera: "Ingeniería en Sistemas", activo: true }));

// =============================================================
// PARTE 4 — Actualizar y eliminar
// =============================================================
titulo("4.1 Registrar la devolución del préstamo vencido de U008 (L003)");
const p = db.prestamos.findOne({ usuarioId: "U008", libroId: "L003", estado: "vencido" });
const diasAtraso = Math.max(0, Math.round((HOY - p.fechaLimite) / 86400000));
db.prestamos.updateOne(
  { _id: p._id },
  { $set: { estado: "devuelto", fechaDevolucion: HOY, multa: diasAtraso * 10 } }
);
db.libros.updateOne({ _id: "L003" }, { $inc: { "ejemplares.disponibles": 1 } });
print("Días de atraso:", diasAtraso, "| Multa C$:", diasAtraso * 10);   // 54 días -> C$ 540

titulo("4.2 Agregar el género 'Literatura latinoamericana' a L001 y L012");
printjson(db.libros.updateMany({ _id: { $in: ["L001", "L012"] } }, { $addToSet: { generos: "Literatura latinoamericana" } }));

titulo("4.3 Quitar 'Clásico' de El principito");
printjson(db.libros.updateOne({ _id: "L010" }, { $pull: { generos: "Clásico" } }));

titulo("4.4 La biblioteca compra 2 ejemplares más de L007");
printjson(db.libros.updateOne({ _id: "L007" }, { $inc: { "ejemplares.total": 2, "ejemplares.disponibles": 2 } }));

titulo("4.5 Desactivar al usuario U016");
printjson(db.usuarios.updateOne({ _id: "U016" }, { $set: { activo: false } }));

titulo("4.6 Eliminar los préstamos de U016 y devolver los ejemplares");
db.libros.updateMany({ _id: { $in: ["L021", "L017"] } }, { $inc: { "ejemplares.disponibles": 1 } });
printjson(db.prestamos.deleteMany({ usuarioId: "U016" }));

titulo("4.7 Eliminar al usuario U016 y el libro L021");
printjson(db.usuarios.deleteOne({ _id: "U016" }));
printjson(db.libros.deleteOne({ _id: "L021" }));
// Nota para discusión: MongoDB NO impide borrar un usuario que aún tiene
// préstamos (no hay llaves foráneas). La integridad la cuida la aplicación.

// =============================================================
// PARTE 5 — Agregaciones
// =============================================================
titulo("5.1 Préstamos por estado");
db.prestamos.aggregate([
  { $group: { _id: "$estado", cantidad: { $sum: 1 } } },
  { $sort: { cantidad: -1 } }
]).forEach(printjson);

titulo("5.2 Top 5 libros más prestados");
db.prestamos.aggregate([
  { $group: { _id: "$libroId", vecesPrestado: { $sum: 1 } } },
  { $sort: { vecesPrestado: -1, _id: 1 } },
  { $limit: 5 },
  { $lookup: { from: "libros", localField: "_id", foreignField: "_id", as: "libro" } },
  { $unwind: "$libro" },
  { $project: { _id: 0, titulo: "$libro.titulo", vecesPrestado: 1 } }
]).forEach(printjson);

titulo("5.3 Total de multas por usuario (solo quienes deben)");
db.prestamos.aggregate([
  { $match: { multa: { $gt: 0 } } },
  { $group: { _id: "$usuarioId", totalMultas: { $sum: "$multa" } } },
  { $lookup: { from: "usuarios", localField: "_id", foreignField: "_id", as: "usuario" } },
  { $unwind: "$usuario" },
  { $project: { _id: 0, nombre: "$usuario.nombre", totalMultas: 1 } },
  { $sort: { totalMultas: -1 } }
]).forEach(printjson);

titulo("5.4 Cantidad de libros por género");
db.libros.aggregate([
  { $unwind: "$generos" },
  { $group: { _id: "$generos", libros: { $sum: 1 } } },
  { $sort: { libros: -1, _id: 1 } }
]).forEach(printjson);

titulo("5.5 Reporte de préstamos vencidos con días de atraso");
db.prestamos.aggregate([
  { $match: { estado: "vencido" } },
  { $lookup: { from: "usuarios", localField: "usuarioId", foreignField: "_id", as: "usuario" } },
  { $lookup: { from: "libros", localField: "libroId", foreignField: "_id", as: "libro" } },
  { $unwind: "$usuario" },
  { $unwind: "$libro" },
  { $project: {
      _id: 0,
      usuario: "$usuario.nombre",
      email: "$usuario.email",
      libro: "$libro.titulo",
      fechaLimite: 1,
      diasAtraso: { $dateDiff: { startDate: "$fechaLimite", endDate: HOY, unit: "day" } }
  } },
  { $sort: { diasAtraso: -1 } }
]).forEach(printjson);

titulo("5.6 Préstamos por carrera");
db.prestamos.aggregate([
  { $lookup: { from: "usuarios", localField: "usuarioId", foreignField: "_id", as: "usuario" } },
  { $unwind: "$usuario" },
  { $group: { _id: "$usuario.carrera", prestamos: { $sum: 1 } } },
  { $sort: { prestamos: -1 } }
]).forEach(printjson);

titulo("5.7 Promedio de días que tardan en devolver un libro");
db.prestamos.aggregate([
  { $match: { estado: "devuelto" } },
  { $project: { dias: { $dateDiff: { startDate: "$fechaPrestamo", endDate: "$fechaDevolucion", unit: "day" } } } },
  { $group: { _id: null, promedioDias: { $avg: "$dias" }, maximo: { $max: "$dias" }, minimo: { $min: "$dias" } } },
  { $project: { _id: 0, promedioDias: { $round: ["$promedioDias", 1] }, maximo: 1, minimo: 1 } }
]).forEach(printjson);

// =============================================================
// PARTE 6 — Índices
// =============================================================
titulo("6.1 Generar 5 000 préstamos históricos para medir índices");
const libros = db.libros.distinct("_id");
const usuarios = db.usuarios.distinct("_id");
const historicos = [];
for (let i = 0; i < 5000; i++) {
  const inicio = new Date(2020, 0, 1 + (i % 2000));
  const limite = new Date(inicio.getTime() + 14 * 86400000);
  historicos.push({
    libroId: libros[i % libros.length],
    usuarioId: usuarios[(i * 7) % usuarios.length],
    fechaPrestamo: inicio, fechaLimite: limite, fechaDevolucion: limite,
    estado: "devuelto", multa: 0, historico: true
  });
}
db.prestamos.insertMany(historicos);
print("Total de préstamos:", db.prestamos.countDocuments());

titulo("6.2 Consulta SIN índice");
function resumen(plan) {
  const usaIndice = JSON.stringify(plan.queryPlanner.winningPlan).includes("IXSCAN");
  print(usaIndice ? "Etapa: IXSCAN (usa índice)" : "Etapa: COLLSCAN (recorre toda la colección)",
        "| Documentos examinados:", plan.executionStats.totalDocsExamined,
        "| Devueltos:", plan.executionStats.nReturned);
}
resumen(db.prestamos.find({ usuarioId: "U007" }).explain("executionStats"));

titulo("6.3 Crear índice en usuarioId y repetir");
db.prestamos.createIndex({ usuarioId: 1 });
resumen(db.prestamos.find({ usuarioId: "U007" }).explain("executionStats"));

titulo("6.4 Índice compuesto para buscar vencidos por fecha");
db.prestamos.createIndex({ estado: 1, fechaLimite: 1 });
print(db.prestamos.countDocuments({ estado: "vencido", fechaLimite: { $lt: HOY } }));

titulo("6.5 Índice de texto en el título");
db.libros.createIndex({ titulo: "text" }, { default_language: "spanish" });
db.libros.find({ $text: { $search: "bases datos" } }, { titulo: 1 }).forEach(printjson);

titulo("6.6 Índice único en email (el duplicado debe fallar)");
db.usuarios.createIndex({ email: 1 }, { unique: true });
try {
  db.usuarios.insertOne({ _id: "U998", nombre: "Duplicado", email: "mjlopez@uni.edu.ni", tipo: "estudiante", activo: true });
} catch (e) { print("Rechazado:", e.message); }

titulo("6.7 Listar índices de préstamos");
printjson(db.prestamos.getIndexes());

// Limpieza opcional de los datos históricos:
// db.prestamos.deleteMany({ historico: true });
