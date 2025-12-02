const modulesData = {
    'plano-cartesiano': {
        title: 'Plano Cartesiano',
        icon: '📍',
        teoria: `
            <h2>📍 El Plano Cartesiano</h2>
            
            <h3>¿Qué es el plano cartesiano?</h3>
            <p>El plano cartesiano es como un mapa matemático que nos ayuda a ubicar puntos usando dos números llamados <strong>coordenadas</strong>. Fue inventado por el matemático René Descartes para unir la geometría con el álgebra.</p>
            
            <h3>Partes del plano cartesiano</h3>
            <ul>
                <li><strong>Eje X (horizontal):</strong> Es la línea que va de izquierda a derecha.</li>
                <li><strong>Eje Y (vertical):</strong> Es la línea que va de abajo hacia arriba.</li>
                <li><strong>Origen (0,0):</strong> Es el punto donde se cruzan los dos ejes.</li>
                <li><strong>Coordenadas (x, y):</strong> El primer número indica qué tan lejos está el punto en el eje X, y el segundo en el eje Y.</li>
            </ul>
            
            <h3>¿Cómo ubicar un punto?</h3>
            <p>Para ubicar el punto (3, 2):</p>
            <ol>
                <li>Desde el origen, muévete 3 unidades hacia la derecha (eje X).</li>
                <li>Luego, muévete 2 unidades hacia arriba (eje Y).</li>
                <li>¡Ahí está tu punto!</li>
            </ol>
            
            <h3>Los cuatro cuadrantes</h3>
            <p>El plano se divide en cuatro partes llamadas cuadrantes:</p>
            <ul>
                <li><strong>Cuadrante I:</strong> x positivo, y positivo (+, +)</li>
                <li><strong>Cuadrante II:</strong> x negativo, y positivo (-, +)</li>
                <li><strong>Cuadrante III:</strong> x negativo, y negativo (-, -)</li>
                <li><strong>Cuadrante IV:</strong> x positivo, y negativo (+, -)</li>
            </ul>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Baldor, A. (2020). <em>Álgebra</em>. Grupo Editorial Patria. https://www.editorialpatria.com.mx</p>
                <p>Stewart, J., Redlin, L., & Watson, S. (2012). <em>Precálculo: Matemáticas para el cálculo</em> (6ª ed.). Cengage Learning.</p>
                <p>National Council of Teachers of Mathematics. (2022). <em>Principles and Standards for School Mathematics</em>. NCTM. https://www.nctm.org</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            const usedCoords = new Set();
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 3);
                
                if (type === 0) {
                    // Identificar coordenadas
                    let x, y;
                    do {
                        x = Math.floor(Math.random() * 11) - 5;
                        y = Math.floor(Math.random() * 11) - 5;
                    } while (usedCoords.has(`${x},${y}`));
                    usedCoords.add(`${x},${y}`);
                    
                    const wrongOptions = [];
                    while (wrongOptions.length < 3) {
                        const wx = Math.floor(Math.random() * 11) - 5;
                        const wy = Math.floor(Math.random() * 11) - 5;
                        const wrong = `(${wx}, ${wy})`;
                        if (!wrongOptions.includes(wrong) && wrong !== `(${x}, ${y})`) {
                            wrongOptions.push(wrong);
                        }
                    }
                    
                    questions.push({
                        question: `¿Cuáles son las coordenadas del punto ubicado en ${x} en el eje X y ${y} en el eje Y?`,
                        options: [`(${x}, ${y})`, ...wrongOptions].sort(() => Math.random() - 0.5),
                        correct: `(${x}, ${y})`
                    });
                } else if (type === 1) {
                    // Identificar cuadrante
                    const scenarios = [
                        { coords: '(3, 4)', answer: 'Cuadrante I' },
                        { coords: '(-2, 5)', answer: 'Cuadrante II' },
                        { coords: '(-4, -3)', answer: 'Cuadrante III' },
                        { coords: '(5, -2)', answer: 'Cuadrante IV' }
                    ];
                    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                    
                    questions.push({
                        question: `¿En qué cuadrante se encuentra el punto ${scenario.coords}?`,
                        options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'].sort(() => Math.random() - 0.5),
                        correct: scenario.answer
                    });
                } else {
                    // Origen
                    questions.push({
                        question: '¿Cuáles son las coordenadas del origen en el plano cartesiano?',
                        options: ['(0, 0)', '(1, 1)', '(0, 1)', '(1, 0)'].sort(() => Math.random() - 0.5),
                        correct: '(0, 0)'
                    });
                }
            }
            
            return questions;
        }
    },
    
    'porcentajes': {
        title: 'Porcentajes',
        icon: '📊',
        teoria: `
            <h2>📊 Porcentajes</h2>
            
            <h3>¿Qué es un porcentaje?</h3>
            <p>Un porcentaje es una forma de expresar una parte de un todo usando el número 100 como referencia. El símbolo del porcentaje es <strong>%</strong>. Por ejemplo, 50% significa "50 de cada 100".</p>
            
            <h3>¿Para qué sirven los porcentajes?</h3>
            <p>Los porcentajes nos ayudan en muchas situaciones de la vida diaria:</p>
            <ul>
                <li>Calcular descuentos en las tiendas</li>
                <li>Entender las calificaciones escolares</li>
                <li>Comparar datos y estadísticas</li>
                <li>Calcular propinas e impuestos</li>
            </ul>
            
            <h3>¿Cómo calcular un porcentaje?</h3>
            <p>Para calcular el porcentaje de un número, seguimos estos pasos:</p>
            <ol>
                <li>Divide el porcentaje entre 100</li>
                <li>Multiplica el resultado por el número total</li>
            </ol>
            <p><strong>Ejemplo:</strong> ¿Cuánto es el 25% de 80?</p>
            <p>25 ÷ 100 = 0.25</p>
            <p>0.25 × 80 = 20</p>
            <p>Respuesta: 25% de 80 es 20</p>
            
            <h3>Porcentajes comunes</h3>
            <ul>
                <li><strong>100%</strong> = Todo, el total completo</li>
                <li><strong>50%</strong> = La mitad</li>
                <li><strong>25%</strong> = Una cuarta parte</li>
                <li><strong>10%</strong> = Una décima parte</li>
            </ul>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Tussy, A. S., & Gustafson, R. D. (2013). <em>Matemáticas básicas</em> (4ª ed.). Cengage Learning.</p>
                <p>Ministerio de Educación de España. (2021). <em>Currículo de Matemáticas para Educación Primaria</em>. BOE.</p>
                <p>Parker, T. H., & Baldridge, S. J. (2019). <em>Elementary Mathematics for Teachers</em>. Sefton-Ash Publishing.</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 3);
                
                if (type === 0) {
                    const total = [20, 40, 50, 80, 100, 200][Math.floor(Math.random() * 6)];
                    const percent = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
                    const correct = (percent / 100) * total;
                    
                    const wrongOptions = [
                        correct + 5,
                        correct - 5,
                        correct * 2
                    ].filter(n => n > 0 && n !== correct);
                    
                    questions.push({
                        question: `¿Cuánto es el ${percent}% de ${total}?`,
                        options: [correct, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 1) {
                    const part = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
                    const total = part * [2, 4, 5][Math.floor(Math.random() * 3)];
                    const correct = Math.round((part / total) * 100);
                    
                    questions.push({
                        question: `Si tienes ${total} caramelos y comes ${part}, ¿qué porcentaje comiste?`,
                        options: [correct + '%', (correct + 10) + '%', (correct - 10) + '%', (correct + 5) + '%'].sort(() => Math.random() - 0.5),
                        correct: correct + '%'
                    });
                } else {
                    questions.push({
                        question: '¿Qué porcentaje representa la mitad de algo?',
                        options: ['50%', '25%', '100%', '75%'].sort(() => Math.random() - 0.5),
                        correct: '50%'
                    });
                }
            }
            
            return questions;
        }
    },
    
    'angulos': {
        title: 'Ángulos y Transportador',
        icon: '📐',
        teoria: `
            <h2>📐 Ángulos y Transportador</h2>
            
            <h3>¿Qué es un ángulo?</h3>
            <p>Un ángulo es la abertura que se forma cuando dos líneas se encuentran en un punto llamado <strong>vértice</strong>. Los ángulos se miden en grados (°).</p>
            
            <h3>Tipos de ángulos</h3>
            <ul>
                <li><strong>Ángulo agudo:</strong> Mide menos de 90° (es pequeño y cerrado)</li>
                <li><strong>Ángulo recto:</strong> Mide exactamente 90° (forma una esquina perfecta)</li>
                <li><strong>Ángulo obtuso:</strong> Mide más de 90° pero menos de 180° (es más abierto)</li>
                <li><strong>Ángulo llano:</strong> Mide exactamente 180° (forma una línea recta)</li>
                <li><strong>Ángulo completo:</strong> Mide 360° (da una vuelta completa)</li>
            </ul>
            
            <h3>El transportador</h3>
            <p>El transportador es una herramienta semicircular que nos ayuda a medir ángulos con precisión. Tiene marcas desde 0° hasta 180°.</p>
            
            <h3>¿Cómo medir un ángulo?</h3>
            <ol>
                <li>Coloca el centro del transportador en el vértice del ángulo</li>
                <li>Alinea la línea base (0°) con uno de los lados del ángulo</li>
                <li>Lee el número donde el otro lado del ángulo cruza el transportador</li>
                <li>¡Ese es el valor del ángulo en grados!</li>
            </ol>
            
            <h3>Ángulos en la vida diaria</h3>
            <p>Los ángulos están en todas partes: en las manecillas del reloj, las esquinas de los libros, cuando abres una puerta, ¡y hasta cuando haces un giro en bicicleta!</p>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Serra, M. (2008). <em>Discovering Geometry: An Investigative Approach</em> (4ª ed.). Key Curriculum Press.</p>
                <p>Van de Walle, J. A., Karp, K. S., & Bay-Williams, J. M. (2019). <em>Elementary and Middle School Mathematics: Teaching Developmentally</em> (10ª ed.). Pearson.</p>
                <p>Ministerio de Educación Nacional de Colombia. (2020). <em>Estándares Básicos de Competencias en Matemáticas</em>. MEN.</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 4);
                
                if (type === 0) {
                    const angles = [30, 45, 60, 75, 120, 135, 150];
                    const angle = angles[Math.floor(Math.random() * angles.length)];
                    let correct;
                    
                    if (angle < 90) correct = 'Agudo';
                    else if (angle === 90) correct = 'Recto';
                    else if (angle < 180) correct = 'Obtuso';
                    else correct = 'Llano';
                    
                    questions.push({
                        question: `Un ángulo que mide ${angle}° es un ángulo:`,
                        options: ['Agudo', 'Recto', 'Obtuso', 'Llano'].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 1) {
                    questions.push({
                        question: '¿Cuántos grados mide un ángulo recto?',
                        options: ['90°', '45°', '180°', '360°'].sort(() => Math.random() - 0.5),
                        correct: '90°'
                    });
                } else if (type === 2) {
                    questions.push({
                        question: '¿Cuántos grados tiene una vuelta completa?',
                        options: ['360°', '180°', '90°', '270°'].sort(() => Math.random() - 0.5),
                        correct: '360°'
                    });
                } else {
                    const angle = [20, 35, 50, 70, 85][Math.floor(Math.random() * 5)];
                    questions.push({
                        question: `¿Qué tipo de ángulo es uno que mide ${angle}°?`,
                        options: ['Agudo', 'Obtuso', 'Recto', 'Llano'].sort(() => Math.random() - 0.5),
                        correct: 'Agudo'
                    });
                }
            }
            
            return questions;
        }
    },
    
    'fracciones': {
        title: 'Fracciones Equivalentes',
        icon: '🍕',
        teoria: `
            <h2>🍕 Fracciones Equivalentes</h2>
            
            <h3>¿Qué es una fracción?</h3>
            <p>Una fracción representa una parte de un todo. Tiene dos partes:</p>
            <ul>
                <li><strong>Numerador:</strong> El número de arriba, indica cuántas partes tomamos</li>
                <li><strong>Denominador:</strong> El número de abajo, indica en cuántas partes se divide el todo</li>
            </ul>
            <p>Por ejemplo, en la fracción 3/4, el 3 es el numerador y el 4 es el denominador.</p>
            
            <h3>¿Qué son fracciones equivalentes?</h3>
            <p>Las fracciones equivalentes son diferentes fracciones que representan la misma cantidad. Por ejemplo:</p>
            <p><strong>1/2 = 2/4 = 3/6 = 4/8</strong></p>
            <p>Todas estas fracciones representan "la mitad" de algo, aunque estén escritas de forma diferente.</p>
            
            <h3>¿Cómo encontrar fracciones equivalentes?</h3>
            <p>Hay dos formas:</p>
            <ol>
                <li><strong>Multiplicando:</strong> Multiplica el numerador y el denominador por el mismo número
                    <br>Ejemplo: 1/3 × 2/2 = 2/6</li>
                <li><strong>Simplificando:</strong> Divide el numerador y el denominador por el mismo número
                    <br>Ejemplo: 6/9 ÷ 3/3 = 2/3</li>
            </ol>
            
            <h3>Visualizando fracciones</h3>
            <p>Imagina una pizza cortada en 4 partes. Si tomas 2 pedazos, tienes 2/4 de la pizza. Ahora imagina la misma pizza cortada en 8 partes. Si tomas 4 pedazos, tienes 4/8. ¡Es la misma cantidad de pizza! Por eso 2/4 = 4/8.</p>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Lamon, S. J. (2020). <em>Teaching Fractions and Ratios for Understanding</em> (4ª ed.). Routledge.</p>
                <p>Beckmann, S. (2018). <em>Mathematics for Elementary Teachers with Activities</em> (5ª ed.). Pearson.</p>
                <p>National Research Council. (2001). <em>Adding It Up: Helping Children Learn Mathematics</em>. National Academy Press. https://doi.org/10.17226/9822</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 3);
                
                if (type === 0) {
                    const fractions = [
                        { base: '1/2', equiv: ['2/4', '3/6', '4/8'], wrong: ['1/3', '2/5', '3/7'] },
                        { base: '1/3', equiv: ['2/6', '3/9', '4/12'], wrong: ['2/5', '3/8', '1/4'] },
                        { base: '2/3', equiv: ['4/6', '6/9', '8/12'], wrong: ['3/5', '4/7', '5/8'] },
                        { base: '1/4', equiv: ['2/8', '3/12', '4/16'], wrong: ['1/5', '2/7', '3/10'] }
                    ];
                    
                    const frac = fractions[Math.floor(Math.random() * fractions.length)];
                    const correct = frac.equiv[Math.floor(Math.random() * frac.equiv.length)];
                    const wrongs = frac.wrong.slice(0, 3);
                    
                    questions.push({
                        question: `¿Cuál de estas fracciones es equivalente a ${frac.base}?`,
                        options: [correct, ...wrongs].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 1) {
                    const num = [2, 3, 4, 6][Math.floor(Math.random() * 4)];
                    const den = [4, 6, 8, 12][Math.floor(Math.random() * 4)];
                    
                    if (den % num === 0) {
                        const simplified = `1/${den / num}`;
                        questions.push({
                            question: `¿Cuál es la forma simplificada de ${num}/${den}?`,
                            options: [simplified, `${num + 1}/${den}`, `${num}/${den + 1}`, `2/${den}`].sort(() => Math.random() - 0.5),
                            correct: simplified
                        });
                    } else {
                        i--; // Regenerar
                        continue;
                    }
                } else {
                    questions.push({
                        question: '¿Qué número se encuentra en la parte de abajo de una fracción?',
                        options: ['Denominador', 'Numerador', 'Dividendo', 'Factor'].sort(() => Math.random() - 0.5),
                        correct: 'Denominador'
                    });
                }
            }
            
            return questions;
        }
    },
    
    'ecuaciones': {
        title: 'Ecuaciones Simples',
        icon: '🔢',
        teoria: `
            <h2>🔢 Ecuaciones Simples</h2>
            
            <h3>¿Qué es una ecuación?</h3>
            <p>Una ecuación es como una balanza matemática: tiene dos lados que deben estar en equilibrio. El signo igual (=) es el centro de la balanza.</p>
            <p>Ejemplo: <strong>x + 3 = 7</strong></p>
            <p>Esto significa: "un número desconocido más 3 es igual a 7".</p>
            
            <h3>¿Qué es una variable?</h3>
            <p>Una variable es un símbolo (como x, y, o n) que representa un número desconocido que queremos encontrar. Es como un misterio que tenemos que resolver.</p>
            
            <h3>¿Cómo resolver una ecuación simple?</h3>
            <p>El objetivo es dejar la variable sola en un lado del signo igual. Para esto:</p>
            <ol>
                <li>Haz la <strong>operación inversa</strong> en ambos lados de la ecuación</li>
                <li>Mantén el equilibrio: lo que hagas en un lado, hazlo en el otro</li>
            </ol>
            
            <h3>Operaciones inversas</h3>
            <ul>
                <li>La inversa de <strong>sumar</strong> es <strong>restar</strong></li>
                <li>La inversa de <strong>restar</strong> es <strong>sumar</strong></li>
                <li>La inversa de <strong>multiplicar</strong> es <strong>dividir</strong></li>
                <li>La inversa de <strong>dividir</strong> es <strong>multiplicar</strong></li>
            </ul>
            
            <h3>Ejemplos resueltos</h3>
            <p><strong>Ejemplo 1:</strong> x + 5 = 12</p>
            <p>Restamos 5 en ambos lados: x = 12 - 5</p>
            <p>Solución: x = 7</p>
            
            <p><strong>Ejemplo 2:</strong> 3x = 15</p>
            <p>Dividimos entre 3 en ambos lados: x = 15 ÷ 3</p>
            <p>Solución: x = 5</p>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Blitzer, R. (2018). <em>Introductory Algebra for College Students</em> (8ª ed.). Pearson.</p>
                <p>Usiskin, Z., Peressini, A., Marchisotto, E. A., & Stanley, D. (2003). <em>Mathematics for High School Teachers: An Advanced Perspective</em>. Prentice Hall.</p>
                <p>Kieran, C. (2007). Learning and teaching algebra at the middle school through college levels. In F. K. Lester Jr. (Ed.), <em>Second Handbook of Research on Mathematics Teaching and Learning</em> (pp. 707-762). Information Age Publishing.</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 4);
                
                if (type === 0) {
                    // x + a = b
                    const a = Math.floor(Math.random() * 10) + 1;
                    const b = Math.floor(Math.random() * 20) + a + 1;
                    const correct = b - a;
                    
                    questions.push({
                        question: `Resuelve: x + ${a} = ${b}`,
                        options: [correct, correct + 1, correct - 1, correct + 2].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 1) {
                    // x - a = b
                    const a = Math.floor(Math.random() * 10) + 1;
                    const b = Math.floor(Math.random() * 15) + 1;
                    const correct = a + b;
                    
                    questions.push({
                        question: `Resuelve: x - ${a} = ${b}`,
                        options: [correct, correct + 1, correct - 1, b - a].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 2) {
                    // ax = b
                    const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                    const x = Math.floor(Math.random() * 10) + 1;
                    const b = a * x;
                    
                    questions.push({
                        question: `Resuelve: ${a}x = ${b}`,
                        options: [x, x + 1, x - 1, x + 2].sort(() => Math.random() - 0.5),
                        correct: x
                    });
                } else {
                    // x/a = b
                    const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                    const b = Math.floor(Math.random() * 8) + 1;
                    const correct = a * b;
                    
                    questions.push({
                        question: `Resuelve: x ÷ ${a} = ${b}`,
                        options: [correct, correct + a, correct - a, b].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                }
            }
            
            return questions;
        }
    },
    
    'geometricos': {
        title: 'Cuerpos Geométricos',
        icon: '🔷',
        teoria: `
            <h2>🔷 Cuerpos Geométricos</h2>
            
            <h3>¿Qué son los cuerpos geométricos?</h3>
            <p>Los cuerpos geométricos son figuras tridimensionales que tienen <strong>largo, ancho y altura</strong>. A diferencia de las figuras planas (como el círculo o el cuadrado), los cuerpos geométricos ocupan espacio y tienen volumen.</p>
            
            <h3>Partes de un cuerpo geométrico</h3>
            <ul>
                <li><strong>Caras:</strong> Las superficies planas que forman el cuerpo</li>
                <li><strong>Aristas:</strong> Las líneas donde se unen dos caras</li>
                <li><strong>Vértices:</strong> Los puntos donde se encuentran las aristas</li>
            </ul>
            
            <h3>Tipos de cuerpos geométricos</h3>
            
            <h4>Poliedros (tienen caras planas):</h4>
            <ul>
                <li><strong>Cubo:</strong> 6 caras cuadradas iguales, 12 aristas, 8 vértices</li>
                <li><strong>Prisma rectangular:</strong> 6 caras rectangulares, 12 aristas, 8 vértices</li>
                <li><strong>Pirámide:</strong> Base poligonal y caras triangulares que se unen en un vértice</li>
            </ul>
            
            <h4>Cuerpos redondos (tienen superficies curvas):</h4>
            <ul>
                <li><strong>Esfera:</strong> Superficie curva perfectamente redonda (como una pelota)</li>
                <li><strong>Cilindro:</strong> Dos círculos paralelos unidos por una superficie curva</li>
                <li><strong>Cono:</strong> Base circular y una superficie curva que termina en un punto</li>
            </ul>
            
            <h3>Cuerpos geométricos en la vida diaria</h3>
            <p>Los cuerpos geométricos están por todas partes:</p>
            <ul>
                <li>Una pelota es una <strong>esfera</strong></li>
                <li>Una lata es un <strong>cilindro</strong></li>
                <li>Una caja de zapatos es un <strong>prisma rectangular</strong></li>
                <li>Un dado es un <strong>cubo</strong></li>
                <li>Un cono de helado es un <strong>cono</strong></li>
            </ul>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Clemens, S. R., O'Daffer, P. G., & Cooney, T. J. (1998). <em>Geometry</em> (3ª ed.). Addison-Wesley.</p>
                <p>Clements, D. H., & Sarama, J. (2014). <em>Learning and Teaching Early Math: The Learning Trajectories Approach</em> (2ª ed.). Routledge.</p>
                <p>Ministerio de Educación del Perú. (2019). <em>Currículo Nacional de la Educación Básica: Área de Matemática</em>. MINEDU.</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            const shapes = [
                { name: 'Cubo', faces: 6, edges: 12, vertices: 8, type: 'Poliedro' },
                { name: 'Pirámide', faces: 5, edges: 8, vertices: 5, type: 'Poliedro' },
                { name: 'Esfera', faces: 0, edges: 0, vertices: 0, type: 'Cuerpo redondo' },
                { name: 'Cilindro', faces: 2, edges: 0, vertices: 0, type: 'Cuerpo redondo' },
                { name: 'Cono', faces: 1, edges: 0, vertices: 1, type: 'Cuerpo redondo' }
            ];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 4);
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                if (type === 0 && shape.faces > 0) {
                    questions.push({
                        question: `¿Cuántas caras tiene un ${shape.name}?`,
                        options: [shape.faces, shape.faces + 1, shape.faces - 1, shape.faces + 2].filter(n => n >= 0).sort(() => Math.random() - 0.5),
                        correct: shape.faces
                    });
                } else if (type === 1) {
                    questions.push({
                        question: `¿Qué tipo de cuerpo geométrico es un ${shape.name}?`,
                        options: ['Poliedro', 'Cuerpo redondo', 'Figura plana', 'Ángulo'].sort(() => Math.random() - 0.5),
                        correct: shape.type
                    });
                } else if (type === 2) {
                    const objects = [
                        { obj: 'una pelota', shape: 'Esfera' },
                        { obj: 'una lata', shape: 'Cilindro' },
                        { obj: 'un dado', shape: 'Cubo' },
                        { obj: 'un cono de helado', shape: 'Cono' }
                    ];
                    const obj = objects[Math.floor(Math.random() * objects.length)];
                    
                    questions.push({
                        question: `¿Qué forma tiene ${obj.obj}?`,
                        options: ['Esfera', 'Cubo', 'Cilindro', 'Cono'].sort(() => Math.random() - 0.5),
                        correct: obj.shape
                    });
                } else {
                    questions.push({
                        question: '¿Cómo se llaman los puntos donde se encuentran las aristas?',
                        options: ['Vértices', 'Caras', 'Lados', 'Bases'].sort(() => Math.random() - 0.5),
                        correct: 'Vértices'
                    });
                }
            }
            
            return questions;
        }
    },
    
    'operaciones': {
        title: 'Operaciones Básicas',
        icon: '➕',
        teoria: `
            <h2>➕ Operaciones Básicas</h2>
            
            <h3>Las cuatro operaciones fundamentales</h3>
            <p>Las operaciones básicas son las herramientas más importantes de las matemáticas. Con ellas podemos resolver muchos problemas de la vida diaria.</p>
            
            <h3>1. Suma o Adición (+)</h3>
            <p>Es juntar o agregar cantidades. Cuando sumamos, aumentamos.</p>
            <p><strong>Ejemplo:</strong> 5 + 3 = 8 (tengo 5 manzanas y compro 3 más, ahora tengo 8)</p>
            <p><strong>Partes:</strong> Los números que sumamos se llaman <em>sumandos</em> y el resultado es la <em>suma</em> o <em>total</em>.</p>
            
            <h3>2. Resta o Sustracción (-)</h3>
            <p>Es quitar o separar cantidades. Cuando restamos, disminuimos.</p>
            <p><strong>Ejemplo:</strong> 10 - 4 = 6 (tengo 10 dulces y regalo 4, me quedan 6)</p>
            <p><strong>Partes:</strong> El número mayor se llama <em>minuendo</em>, el que quitamos es el <em>sustraendo</em>, y el resultado es la <em>diferencia</em>.</p>
            
            <h3>3. Multiplicación (×)</h3>
            <p>Es una suma repetida. Es más rápido multiplicar que sumar muchas veces el mismo número.</p>
            <p><strong>Ejemplo:</strong> 4 × 3 = 12 (es lo mismo que 4 + 4 + 4 = 12)</p>
            <p><strong>Partes:</strong> Los números que multiplicamos se llaman <em>factores</em> y el resultado es el <em>producto</em>.</p>
            
            <h3>4. División (÷)</h3>
            <p>Es repartir en partes iguales o ver cuántas veces cabe un número en otro.</p>
            <p><strong>Ejemplo:</strong> 15 ÷ 3 = 5 (si reparto 15 caramelos entre 3 amigos, cada uno recibe 5)</p>
            <p><strong>Partes:</strong> El número que dividimos es el <em>dividendo</em>, entre el que dividimos es el <em>divisor</em>, y el resultado es el <em>cociente</em>.</p>
            
            <h3>Propiedades importantes</h3>
            <ul>
                <li>El orden de los sumandos no altera la suma: 3 + 5 = 5 + 3</li>
                <li>El orden de los factores no altera el producto: 2 × 4 = 4 × 2</li>
                <li>Multiplicar por 0 siempre da 0</li>
                <li>Dividir un número entre 1 da el mismo número</li>
            </ul>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Carpenter, T. P., Fennema, E., Franke, M. L., Levi, L., & Empson, S. B. (2015). <em>Children's Mathematics: Cognitively Guided Instruction</em> (2ª ed.). Heinemann.</p>
                <p>Ma, L. (2010). <em>Knowing and Teaching Elementary Mathematics: Teachers' Understanding of Fundamental Mathematics in China and the United States</em>. Routledge.</p>
                <p>Common Core State Standards Initiative. (2010). <em>Common Core State Standards for Mathematics</em>. National Governors Association Center for Best Practices. http://www.corestandards.org</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 4);
                
                if (type === 0) {
                    // Suma
                    const a = Math.floor(Math.random() * 50) + 1;
                    const b = Math.floor(Math.random() * 50) + 1;
                    const correct = a + b;
                    
                    questions.push({
                        question: `¿Cuánto es ${a} + ${b}?`,
                        options: [correct, correct + 1, correct - 1, correct + 5].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 1) {
                    // Resta
                    const b = Math.floor(Math.random() * 30) + 1;
                    const correct = Math.floor(Math.random() * 30) + 1;
                    const a = b + correct;
                    
                    questions.push({
                        question: `¿Cuánto es ${a} - ${b}?`,
                        options: [correct, correct + 1, correct - 1, correct + 2].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else if (type === 2) {
                    // Multiplicación
                    const a = Math.floor(Math.random() * 10) + 2;
                    const b = Math.floor(Math.random() * 10) + 2;
                    const correct = a * b;
                    
                    questions.push({
                        question: `¿Cuánto es ${a} × ${b}?`,
                        options: [correct, correct + a, correct - b, correct + 1].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else {
                    // División
                    const b = Math.floor(Math.random() * 8) + 2;
                    const correct = Math.floor(Math.random() * 10) + 1;
                    const a = b * correct;
                    
                    questions.push({
                        question: `¿Cuánto es ${a} ÷ ${b}?`,
                        options: [correct, correct + 1, correct - 1, b].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                }
            }
            
            return questions;
        }
    },
    
    'negativos': {
        title: 'Números Negativos',
        icon: '➖',
        teoria: `
            <h2>➖ Números Negativos</h2>
            
            <h3>¿Qué son los números negativos?</h3>
            <p>Los números negativos son números menores que cero. Se escriben con un signo menos (-) delante. Por ejemplo: -1, -5, -10.</p>
            <p>Mientras que los números positivos están a la derecha del cero en la recta numérica, los negativos están a la izquierda.</p>
            
            <h3>La recta numérica</h3>
            <p>Imagina una línea horizontal con el cero en el centro:</p>
            <p style="text-align: center; font-size: 1.2em;">... -3, -2, -1, <strong>0</strong>, 1, 2, 3 ...</p>
            <p>Los números negativos van hacia la izquierda y los positivos hacia la derecha.</p>
            
            <h3>Números negativos en la vida real</h3>
            <ul>
                <li><strong>Temperatura:</strong> Si hace 5 grados bajo cero, decimos que hace -5°C</li>
                <li><strong>Elevación:</strong> Si estás 10 metros bajo el nivel del mar, estás a -10 metros</li>
                <li><strong>Dinero:</strong> Si debes 20 pesos, tienes -20 pesos</li>
                <li><strong>Tiempo:</strong> Los años antes de Cristo se escriben con números negativos</li>
            </ul>
            
            <h3>Comparar números negativos</h3>
            <p>Un número es mayor cuando está más a la derecha en la recta numérica:</p>
            <ul>
                <li>-2 es mayor que -5 (porque -2 está más cerca del cero)</li>
                <li>0 es mayor que cualquier número negativo</li>
                <li>Cualquier número positivo es mayor que cualquier número negativo</li>
            </ul>
            
            <h3>Operaciones con números negativos</h3>
            <p><strong>Sumar un negativo</strong> es lo mismo que restar: 5 + (-3) = 5 - 3 = 2</p>
            <p><strong>Restar un negativo</strong> es lo mismo que sumar: 5 - (-3) = 5 + 3 = 8</p>
            <p><strong>Regla práctica:</strong> Dos signos negativos juntos se convierten en positivo.</p>
            
            <div class="references">
                <h4>📚 Referencias</h4>
                <p>Gallardo, A. (2002). The extension of the natural-number domain to the integers in the transition from arithmetic to algebra. <em>Educational Studies in Mathematics, 49</em>(2), 171-192. https://doi.org/10.1023/A:1016210906658</p>
                <p>Altiparmak, K., & Özdoğan, E. (2010). A study on the teaching of the concept of negative numbers. <em>International Journal of Mathematical Education in Science and Technology, 41</em>(1), 31-47.</p>
                <p>Bofferding, L. (2014). Negative integer understanding: Characterizing first graders' mental models. <em>Journal for Research in Mathematics Education, 45</em>(2), 194-245.</p>
            </div>
        `,
        generateExam: function() {
            const questions = [];
            
            for (let i = 0; i < 10; i++) {
                const type = Math.floor(Math.random() * 4);
                
                if (type === 0) {
                    // Comparación
                    const a = Math.floor(Math.random() * 10) - 5;
                    const b = Math.floor(Math.random() * 10) - 5;
                    
                    if (a !== b) {
                        const greater = a > b ? a : b;
                        questions.push({
                            question: `¿Cuál número es mayor: ${a} o ${b}?`,
                            options: [greater, a < b ? a : b, 0, (a + b)].filter((v, i, arr) => arr.indexOf(v) === i).sort(() => Math.random() - 0.5),
                            correct: greater
                        });
                    } else {
                        i--;
                        continue;
                    }
                } else if (type === 1) {
                    // Identificación
                    questions.push({
                        question: '¿Cuál de estos números es negativo?',
                        options: ['-5', '5', '0', '10'].sort(() => Math.random() - 0.5),
                        correct: '-5'
                    });
                } else if (type === 2) {
                    // Suma con negativos
                    const a = Math.floor(Math.random() * 10) + 1;
                    const b = Math.floor(Math.random() * 10) + 1;
                    const correct = a - b;
                    
                    questions.push({
                        question: `¿Cuánto es ${a} + (-${b})?`,
                        options: [correct, correct + 1, correct - 1, a + b].sort(() => Math.random() - 0.5),
                        correct: correct
                    });
                } else {
                    // Orden
                    questions.push({
                        question: '¿Cuál es el número más pequeño?',
                        options: ['-10', '-5', '0', '5'].sort(() => Math.random() - 0.5),
                        correct: '-10'
                    });
                }
            }
            
            return questions;
        }
    }
};
