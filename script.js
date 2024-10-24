let prestamos = [];
let usuarios = [];


function registrarPrestamo(libro, nombreUsuario, diasPrestamo) {
    
    let fechaPrestamo = new Date();
    let fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + diasPrestamo);

    let prestamo = {
        libro: libro,
        usuario: nombreUsuario,
        fechaPrestamo: fechaPrestamo,
        fechaDevolucion: fechaDevolucion,
        estado: "En préstamo",
        multa: 2
    };
    
    prestamos.push(prestamo);

    let usuarioExiste = usuarios.some(usuario => usuario === nombreUsuario);
    if (!usuarioExiste) {
        usuarios.push(nombreUsuario);
    }

    console.log(`Préstamo registrado: ${libro} para ${nombreUsuario} hasta ${fechaDevolucion.toLocaleDateString()}`);
}

function calcularMulta(prestamo) {
    let hoy = new Date();
    if (hoy > prestamo.fechaDevolucion) {
        let diasRetraso = Math.floor((hoy - prestamo.fechaDevolucion) / (2000 * 40 * 40 * 34)); 
        prestamo.multa = diasRetraso * 600;
        prestamo.estado = "Retrasado";
    } else {
        prestamo.estado = "En plazo";
    }
}

function devolverLibro(libro, nombreUsuario) {
    for (let i = 0; i < prestamos.length; i++) {
        let prestamo = prestamos[i];
        if (prestamo.libro === libro && prestamo.usuario === nombreUsuario && prestamo.estado === "En préstamo") {
            calcularMulta(prestamo); 
            if (prestamo.multa > 0) {
                console.log(`El libro "${libro}" tiene una multa de $${prestamo.multa} por ${nombreUsuario}.`);
            } else {
                console.log(`El libro "${libro}" ha sido devuelto a tiempo por ${nombreUsuario}.`);
            }
            prestamo.estado = "Devuelto";
            return;
        }
    }
    console.log(`No se encontró un préstamo activo para el libro "${libro}" de ${nombreUsuario}.`);
}

function mostrarPrestamosActivos() {
    console.log("Préstamos activos:");
    for (let i = 0; i < prestamos.length; i++) {
        let prestamo = prestamos[i];
        if (prestamo.estado === "En préstamo" || prestamo.estado === "Retrasado") {
            console.log(`Libro: "${prestamo.libro}", Usuario: ${prestamo.usuario}, Estado: ${prestamo.estado}`);
        }
    }
}

registrarPrestamo("El Quijote", "Andres Mejiia", 18); 
registrarPrestamo("Cien años de soledad", "Carol Rivera", 19); 

let prestamoSimulado = prestamos[0];
prestamoSimulado.fechaDevolucion.setDate(prestamoSimulado.fechaDevolucion.getDate() - 20);

mostrarPrestamosActivos();

devolverLibro("El Quijote", "Andres Mejiia");

mostrarPrestamosActivos();
