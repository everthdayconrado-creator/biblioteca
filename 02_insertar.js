// =============================================================
// Proyecto: Biblioteca Digital
// Script 02 - Insertar datos de ejemplo
// Ejecutar después de 01_crear_bd.js:  load("02_insertar.js")
// Fecha de referencia del proyecto ("hoy"): 2026-10-12
// Los ISBN son ilustrativos; úsalos solo como dato de práctica.
// =============================================================

db = db.getSiblingDB("biblioteca");

// ------------------------- USUARIOS -------------------------
db.usuarios.insertMany([
  { _id: "U001", nombre: "María José López", email: "mjlopez@uni.edu.ni", tipo: "estudiante", carrera: "Ingeniería en Sistemas", fechaRegistro: new Date("2024-02-12"), activo: true },
  { _id: "U002", nombre: "Carlos Andrés Pérez", email: "caperez@uni.edu.ni", tipo: "estudiante", carrera: "Ingeniería en Sistemas", fechaRegistro: new Date("2024-02-15"), activo: true },
  { _id: "U003", nombre: "Ana Lucía Martínez", email: "almartinez@uni.edu.ni", tipo: "estudiante", carrera: "Derecho", fechaRegistro: new Date("2023-08-03"), activo: true },
  { _id: "U004", nombre: "José Daniel Rivas", email: "jdrivas@uni.edu.ni", tipo: "estudiante", carrera: "Medicina", fechaRegistro: new Date("2025-02-10"), activo: true },
  { _id: "U005", nombre: "Valeria Gutiérrez", email: "vgutierrez@uni.edu.ni", tipo: "estudiante", carrera: "Administración de Empresas", fechaRegistro: new Date("2023-02-20"), activo: true },
  { _id: "U006", nombre: "Luis Fernando Chavarría", email: "lfchavarria@uni.edu.ni", tipo: "estudiante", carrera: "Ingeniería Industrial", fechaRegistro: new Date("2024-08-05"), activo: true },
  { _id: "U007", nombre: "Daniela Sofía Morales", email: "dsmorales@uni.edu.ni", tipo: "estudiante", carrera: "Ingeniería en Sistemas", fechaRegistro: new Date("2025-02-11"), activo: true },
  { _id: "U008", nombre: "Kevin Antonio Espinoza", email: "kaespinoza@uni.edu.ni", tipo: "estudiante", carrera: "Ingeniería Industrial", fechaRegistro: new Date("2023-08-07"), activo: false },
  { _id: "U009", nombre: "Gabriela Castillo", email: "gcastillo@uni.edu.ni", tipo: "estudiante", carrera: "Medicina", fechaRegistro: new Date("2024-02-19"), activo: true },
  { _id: "U010", nombre: "Roberto Carlos Úbeda", email: "rcubeda@uni.edu.ni", tipo: "estudiante", carrera: "Derecho", fechaRegistro: new Date("2025-08-04"), activo: true },
  { _id: "U011", nombre: "Fernanda Isabel Ruiz", email: "firuiz@uni.edu.ni", tipo: "estudiante", carrera: "Administración de Empresas", fechaRegistro: new Date("2025-08-06"), activo: true },
  { _id: "U012", nombre: "Jorge Luis Mendoza", email: "jlmendoza@uni.edu.ni", tipo: "estudiante", carrera: "Ingeniería en Sistemas", fechaRegistro: new Date("2023-02-14"), activo: true },
  { _id: "U013", nombre: "Dra. Patricia Solórzano", email: "psolorzano@uni.edu.ni", tipo: "docente", carrera: "Medicina", fechaRegistro: new Date("2020-01-15"), activo: true },
  { _id: "U014", nombre: "Ing. Marvin Téllez", email: "mtellez@uni.edu.ni", tipo: "docente", carrera: "Ingeniería en Sistemas", fechaRegistro: new Date("2019-03-01"), activo: true },
  { _id: "U015", nombre: "Lic. Silvia Obando", email: "sobando@uni.edu.ni", tipo: "docente", carrera: "Derecho", fechaRegistro: new Date("2021-07-12"), activo: true }
]);

// -------------------------- LIBROS --------------------------
db.libros.insertMany([
  {
    _id: "L001", titulo: "Cien años de soledad", autores: ["Gabriel García Márquez"],
    isbn: "978-0307474728", anio: 1967,
    editorial: { nombre: "Sudamericana", pais: "Argentina" },
    generos: ["Novela", "Realismo mágico"],
    ejemplares: { total: 5, disponibles: 4 }
  },
  {
    _id: "L002", titulo: "Don Quijote de la Mancha", autores: ["Miguel de Cervantes"],
    isbn: "978-8424116033", anio: 1605,
    editorial: { nombre: "Francisco de Robles", pais: "España" },
    generos: ["Novela", "Clásico"],
    ejemplares: { total: 3, disponibles: 3 }
  },
  {
    _id: "L003", titulo: "La ciudad y los perros", autores: ["Mario Vargas Llosa"],
    isbn: "978-8466333863", anio: 1963,
    editorial: { nombre: "Seix Barral", pais: "España" },
    generos: ["Novela"],
    ejemplares: { total: 2, disponibles: 1 }
  },
  {
    _id: "L004", titulo: "Azul...", autores: ["Rubén Darío"],
    isbn: "978-8437617084", anio: 1888,
    editorial: { nombre: "Imprenta Excelsior", pais: "Chile" },
    generos: ["Poesía", "Modernismo"],
    ejemplares: { total: 4, disponibles: 4 }
  },
  {
    _id: "L005", titulo: "Clean Code", autores: ["Robert C. Martin"],
    isbn: "978-0132350884", anio: 2008,
    editorial: { nombre: "Prentice Hall", pais: "Estados Unidos" },
    generos: ["Programación", "Ingeniería de software"],
    ejemplares: { total: 3, disponibles: 2 }
  },
  {
    _id: "L006", titulo: "Fundamentos de bases de datos", autores: ["Abraham Silberschatz", "Henry F. Korth", "S. Sudarshan"],
    isbn: "978-8448190330", anio: 2014,
    editorial: { nombre: "McGraw-Hill", pais: "España" },
    generos: ["Bases de datos", "Informática"],
    ejemplares: { total: 6, disponibles: 5 }
  },
  {
    _id: "L007", titulo: "MongoDB: The Definitive Guide", autores: ["Shannon Bradshaw", "Eoin Brazil", "Kristina Chodorow"],
    isbn: "978-1491954461", anio: 2019,
    editorial: { nombre: "O'Reilly", pais: "Estados Unidos" },
    generos: ["Bases de datos", "NoSQL"],
    ejemplares: { total: 2, disponibles: 0 }
  },
  {
    _id: "L008", titulo: "Introducción a los algoritmos", autores: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"],
    isbn: "978-0262033848", anio: 2009,
    editorial: { nombre: "MIT Press", pais: "Estados Unidos" },
    generos: ["Algoritmos", "Informática"],
    ejemplares: { total: 3, disponibles: 2 }
  },
  {
    _id: "L009", titulo: "Pedro Páramo", autores: ["Juan Rulfo"],
    isbn: "978-8437604183", anio: 1955,
    editorial: { nombre: "Fondo de Cultura Económica", pais: "México" },
    generos: ["Novela"],
    ejemplares: { total: 3, disponibles: 3 }
  },
  {
    _id: "L010", titulo: "El principito", autores: ["Antoine de Saint-Exupéry"],
    isbn: "978-8498381498", anio: 1943,
    editorial: { nombre: "Reynal & Hitchcock", pais: "Estados Unidos" },
    generos: ["Infantil", "Clásico"],
    ejemplares: { total: 4, disponibles: 3 }
  },
  {
    _id: "L011", titulo: "1984", autores: ["George Orwell"],
    isbn: "978-8499890944", anio: 1949,
    editorial: { nombre: "Secker & Warburg", pais: "Reino Unido" },
    generos: ["Novela", "Distopía"],
    ejemplares: { total: 3, disponibles: 2 }
  },
  {
    _id: "L012", titulo: "Rayuela", autores: ["Julio Cortázar"],
    isbn: "978-8466331920", anio: 1963,
    editorial: { nombre: "Sudamericana", pais: "Argentina" },
    generos: ["Novela"],
    ejemplares: { total: 2, disponibles: 2 }
  },
  {
    _id: "L013", titulo: "Sapiens: De animales a dioses", autores: ["Yuval Noah Harari"],
    isbn: "978-8499926223", anio: 2011,
    editorial: { nombre: "Debate", pais: "España" },
    generos: ["Historia", "Divulgación"],
    ejemplares: { total: 3, disponibles: 1 }
  },
  {
    _id: "L014", titulo: "Breve historia del tiempo", autores: ["Stephen Hawking"],
    isbn: "978-8484323686", anio: 1988,
    editorial: { nombre: "Crítica", pais: "España" },
    generos: ["Ciencia", "Divulgación"],
    ejemplares: { total: 2, disponibles: 2 }
  },
  {
    _id: "L015", titulo: "Python Crash Course", autores: ["Eric Matthes"],
    isbn: "978-1593279288", anio: 2019,
    editorial: { nombre: "No Starch Press", pais: "Estados Unidos" },
    generos: ["Programación", "Python"],
    ejemplares: { total: 4, disponibles: 2 }
  },
  {
    _id: "L016", titulo: "Ficciones", autores: ["Jorge Luis Borges"],
    isbn: "978-8420633114", anio: 1944,
    editorial: { nombre: "Sur", pais: "Argentina" },
    generos: ["Cuentos"],
    ejemplares: { total: 2, disponibles: 2 }
  },
  {
    _id: "L017", titulo: "NoSQL Distilled", autores: ["Pramod J. Sadalage", "Martin Fowler"],
    isbn: "978-0321826626", anio: 2012,
    editorial: { nombre: "Addison-Wesley", pais: "Estados Unidos" },
    generos: ["Bases de datos", "NoSQL"],
    ejemplares: { total: 2, disponibles: 1 }
  },
  {
    _id: "L018", titulo: "Cantos de vida y esperanza", autores: ["Rubén Darío"],
    isbn: "978-8437602912", anio: 1905,
    editorial: { nombre: "Tipografía de la Revista de Archivos", pais: "España" },
    generos: ["Poesía", "Modernismo"],
    ejemplares: { total: 2, disponibles: 2 }
  },
  {
    _id: "L019", titulo: "Castigo divino", autores: ["Sergio Ramírez"],
    isbn: "978-8420428406", anio: 1988,
    editorial: { nombre: "Mondadori", pais: "España" },
    generos: ["Novela"],
    ejemplares: { total: 2, disponibles: 1 }
  },
  {
    _id: "L020", titulo: "Inteligencia artificial: un enfoque moderno", autores: ["Stuart Russell", "Peter Norvig"],
    isbn: "978-8420540030", anio: 2020,
    editorial: { nombre: "Pearson", pais: "Estados Unidos" },
    generos: ["Inteligencia artificial", "Informática"],
    ejemplares: { total: 3, disponibles: 3 }
  }
]);

// ------------------------- PRÉSTAMOS ------------------------
// Plazo: 14 días. Multa: C$ 10 por día de atraso al devolver.
db.prestamos.insertMany([
  { libroId: "L006", usuarioId: "U001", fechaPrestamo: new Date("2026-08-10"), fechaLimite: new Date("2026-08-24"), fechaDevolucion: new Date("2026-08-22"), estado: "devuelto", multa: 0.0 },
  { libroId: "L007", usuarioId: "U001", fechaPrestamo: new Date("2026-09-28"), fechaLimite: new Date("2026-10-12"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L005", usuarioId: "U002", fechaPrestamo: new Date("2026-08-12"), fechaLimite: new Date("2026-08-26"), fechaDevolucion: new Date("2026-08-28"), estado: "devuelto", multa: 20.0 },
  { libroId: "L006", usuarioId: "U002", fechaPrestamo: new Date("2026-09-01"), fechaLimite: new Date("2026-09-15"), fechaDevolucion: new Date("2026-09-11"), estado: "devuelto", multa: 0.0 },
  { libroId: "L015", usuarioId: "U002", fechaPrestamo: new Date("2026-09-25"), fechaLimite: new Date("2026-10-09"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L001", usuarioId: "U003", fechaPrestamo: new Date("2026-08-15"), fechaLimite: new Date("2026-08-29"), fechaDevolucion: new Date("2026-08-29"), estado: "devuelto", multa: 0.0 },
  { libroId: "L002", usuarioId: "U003", fechaPrestamo: new Date("2026-09-05"), fechaLimite: new Date("2026-09-19"), fechaDevolucion: new Date("2026-09-25"), estado: "devuelto", multa: 60.0 },
  { libroId: "L011", usuarioId: "U003", fechaPrestamo: new Date("2026-10-01"), fechaLimite: new Date("2026-10-15"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L013", usuarioId: "U004", fechaPrestamo: new Date("2026-08-20"), fechaLimite: new Date("2026-09-03"), fechaDevolucion: new Date("2026-08-29"), estado: "devuelto", multa: 0.0 },
  { libroId: "L014", usuarioId: "U004", fechaPrestamo: new Date("2026-09-10"), fechaLimite: new Date("2026-09-24"), fechaDevolucion: new Date("2026-09-23"), estado: "devuelto", multa: 0.0 },
  { libroId: "L005", usuarioId: "U005", fechaPrestamo: new Date("2026-08-25"), fechaLimite: new Date("2026-09-08"), fechaDevolucion: new Date("2026-09-08"), estado: "devuelto", multa: 0.0 },
  { libroId: "L013", usuarioId: "U005", fechaPrestamo: new Date("2026-09-15"), fechaLimite: new Date("2026-09-29"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L008", usuarioId: "U006", fechaPrestamo: new Date("2026-08-18"), fechaLimite: new Date("2026-09-01"), fechaDevolucion: new Date("2026-09-08"), estado: "devuelto", multa: 70.0 },
  { libroId: "L006", usuarioId: "U006", fechaPrestamo: new Date("2026-09-20"), fechaLimite: new Date("2026-10-04"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L001", usuarioId: "U007", fechaPrestamo: new Date("2026-09-02"), fechaLimite: new Date("2026-09-16"), fechaDevolucion: new Date("2026-09-13"), estado: "devuelto", multa: 0.0 },
  { libroId: "L017", usuarioId: "U007", fechaPrestamo: new Date("2026-09-22"), fechaLimite: new Date("2026-10-06"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L007", usuarioId: "U007", fechaPrestamo: new Date("2026-09-30"), fechaLimite: new Date("2026-10-14"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L003", usuarioId: "U008", fechaPrestamo: new Date("2026-08-05"), fechaLimite: new Date("2026-08-19"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L009", usuarioId: "U009", fechaPrestamo: new Date("2026-08-22"), fechaLimite: new Date("2026-09-05"), fechaDevolucion: new Date("2026-08-29"), estado: "devuelto", multa: 0.0 },
  { libroId: "L001", usuarioId: "U009", fechaPrestamo: new Date("2026-09-29"), fechaLimite: new Date("2026-10-13"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L012", usuarioId: "U010", fechaPrestamo: new Date("2026-09-03"), fechaLimite: new Date("2026-09-17"), fechaDevolucion: new Date("2026-09-18"), estado: "devuelto", multa: 10.0 },
  { libroId: "L019", usuarioId: "U010", fechaPrestamo: new Date("2026-09-26"), fechaLimite: new Date("2026-10-10"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L010", usuarioId: "U011", fechaPrestamo: new Date("2026-09-08"), fechaLimite: new Date("2026-09-22"), fechaDevolucion: new Date("2026-09-13"), estado: "devuelto", multa: 0.0 },
  { libroId: "L010", usuarioId: "U011", fechaPrestamo: new Date("2026-10-02"), fechaLimite: new Date("2026-10-16"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L005", usuarioId: "U012", fechaPrestamo: new Date("2026-09-12"), fechaLimite: new Date("2026-09-26"), fechaDevolucion: new Date("2026-09-30"), estado: "devuelto", multa: 40.0 },
  { libroId: "L005", usuarioId: "U012", fechaPrestamo: new Date("2026-10-05"), fechaLimite: new Date("2026-10-19"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L015", usuarioId: "U012", fechaPrestamo: new Date("2026-10-06"), fechaLimite: new Date("2026-10-20"), fechaDevolucion: null, estado: "activo", multa: 0.0 },
  { libroId: "L008", usuarioId: "U014", fechaPrestamo: new Date("2026-09-14"), fechaLimite: new Date("2026-09-28"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L020", usuarioId: "U014", fechaPrestamo: new Date("2026-08-28"), fechaLimite: new Date("2026-09-11"), fechaDevolucion: new Date("2026-09-22"), estado: "devuelto", multa: 110.0 },
  { libroId: "L011", usuarioId: "U015", fechaPrestamo: new Date("2026-09-18"), fechaLimite: new Date("2026-10-02"), fechaDevolucion: new Date("2026-09-30"), estado: "devuelto", multa: 0.0 },
  { libroId: "L013", usuarioId: "U013", fechaPrestamo: new Date("2026-09-21"), fechaLimite: new Date("2026-10-05"), fechaDevolucion: null, estado: "vencido", multa: 0.0 },
  { libroId: "L004", usuarioId: "U013", fechaPrestamo: new Date("2026-08-11"), fechaLimite: new Date("2026-08-25"), fechaDevolucion: new Date("2026-08-17"), estado: "devuelto", multa: 0.0 }
]);

print("Usuarios:", db.usuarios.countDocuments());
print("Libros:", db.libros.countDocuments());
print("Préstamos:", db.prestamos.countDocuments());
