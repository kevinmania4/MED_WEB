const hbs = require('hbs');


//helpers
hbs.registerHelper('mostraEnfermedad', (enfermedades) => {
    const enfermedad = JSON.stringify(enfermedades);
    const vectorEnfermedad = JSON.parse(enfermedad);

    console.log(vectorEnfermedad);
    vectorEnfermedad.forEach(e => console.log(e.descripcion));
    return "<p>PARRAFOA</p>";
});
hbs.registerHelper('capitalizar', (texto) => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });

    return palabras.join(' ');
});

hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('getId_Enfermedad', (id) => {
    return id
});