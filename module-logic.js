// Get module ID from URL
const urlParams = new URLSearchParams(window.location.search);
const moduleId = urlParams.get('id');
const moduleData = modulesData[moduleId];

let currentSection = 'teoria';
let examQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// Initialize module
document.addEventListener('DOMContentLoaded', () => {
    if (!moduleData) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('module-title').textContent = moduleData.icon + ' ' + moduleData.title;
    loadTheory();
    loadPractice();
    
    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });
    
    setupExamButtons();
});

function setupExamButtons() {
    const btnStartExam = document.getElementById('btn-start-exam');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const btnReset = document.getElementById('btn-reset');
    const btnHome = document.getElementById('btn-home');
    
    if (btnStartExam) btnStartExam.addEventListener('click', startExam);
    if (btnPrev) btnPrev.addEventListener('click', prevQuestion);
    if (btnNext) btnNext.addEventListener('click', nextQuestion);
    if (btnSubmit) btnSubmit.addEventListener('click', submitExam);
    if (btnReset) btnReset.addEventListener('click', resetExam);
    if (btnHome) btnHome.addEventListener('click', goHome);
}

function switchSection(section) {
    currentSection = section;
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`).classList.add('active');
}

function loadTheory() {
    const container = document.getElementById('teoria-content');
    container.innerHTML = `<div class="teoria-box">${moduleData.teoria}</div>`;
}

function loadPractice() {
    const container = document.getElementById('practica-content');
    
    if (moduleId === 'plano-cartesiano') {
        container.innerHTML = createCartesianPlane();
    } else if (moduleId === 'porcentajes') {
        container.innerHTML = createPercentageActivity();
    } else if (moduleId === 'angulos') {
        container.innerHTML = createAngleActivity();
    } else if (moduleId === 'fracciones') {
        container.innerHTML = createFractionActivity();
    } else if (moduleId === 'ecuaciones') {
        container.innerHTML = createEquationActivity();
    } else if (moduleId === 'geometricos') {
        container.innerHTML = createGeometricActivity();
    } else if (moduleId === 'operaciones') {
        container.innerHTML = createOperationsActivity();
    } else if (moduleId === 'negativos') {
        container.innerHTML = createNegativeActivity();
    }
}

// Interactive Activities
function createCartesianPlane() {
    setTimeout(() => {
        const canvas = document.getElementById('cartesian-canvas');
        const ctx = canvas.getContext('2d');
        let targetX = Math.floor(Math.random() * 11) - 5;
        let targetY = Math.floor(Math.random() * 11) - 5;
        let score = 0;
        
        function drawPlane() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Grid
            ctx.strokeStyle = '#E0E0E0';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 10; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 40, 0);
                ctx.lineTo(i * 40, 400);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * 40);
                ctx.lineTo(400, i * 40);
                ctx.stroke();
            }
            
            // Axes
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(200, 0);
            ctx.lineTo(200, 400);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, 200);
            ctx.lineTo(400, 200);
            ctx.stroke();
            
            // Labels
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.fillText('X', 380, 190);
            ctx.fillText('Y', 210, 20);
            ctx.fillText('0', 185, 215);
        }
        
        function drawPoint(x, y, color = '#4A90E2', size = 8) {
            const canvasX = 200 + x * 40;
            const canvasY = 200 - y * 40;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        function updateInstruction() {
            document.getElementById('cart-instruction').textContent = 
                `Haz clic en el punto (${targetX}, ${targetY})`;
            document.getElementById('cart-score').textContent = `Puntos: ${score}`;
        }
        
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            const gridX = Math.round((clickX - 200) / 40);
            const gridY = Math.round((200 - clickY) / 40);
            
            const feedback = document.getElementById('cart-feedback');
            
            if (gridX === targetX && gridY === targetY) {
                score++;
                feedback.innerHTML = `<div class="feedback correct">¡Correcto! Encontraste (${targetX}, ${targetY})</div>`;
                drawPoint(targetX, targetY, '#27AE60', 12);
                
                setTimeout(() => {
                    targetX = Math.floor(Math.random() * 11) - 5;
                    targetY = Math.floor(Math.random() * 11) - 5;
                    drawPlane();
                    updateInstruction();
                    feedback.innerHTML = '';
                }, 1500);
            } else {
                feedback.innerHTML = `<div class="feedback incorrect">Ese es (${gridX}, ${gridY}). Intenta de nuevo.</div>`;
                drawPoint(gridX, gridY, '#E74C3C', 6);
            }
        });
        
        drawPlane();
        updateInstruction();
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>🎯 Práctica del Plano Cartesiano</h2>
            <div class="instructions">
                <p id="cart-instruction">Haz clic en el plano para ubicar el punto</p>
                <p id="cart-score">Puntos: 0</p>
            </div>
            <div class="canvas-container">
                <canvas id="cartesian-canvas" width="400" height="400"></canvas>
            </div>
            <div id="cart-feedback"></div>
        </div>
    `;
}

function createPercentageActivity() {
    setTimeout(() => {
        let currentPercent = 50;
        updatePercentageBar();
        
        document.getElementById('percent-input').addEventListener('input', (e) => {
            currentPercent = parseInt(e.target.value) || 0;
            if (currentPercent > 100) currentPercent = 100;
            if (currentPercent < 0) currentPercent = 0;
            e.target.value = currentPercent;
            updatePercentageBar();
        });
        
        function updatePercentageBar() {
            const bar = document.getElementById('percent-bar');
            bar.style.width = currentPercent + '%';
            bar.textContent = currentPercent + '%';
            
            const total = 100;
            const value = currentPercent;
            document.getElementById('percent-result').innerHTML = 
                `${currentPercent}% de ${total} = <strong>${value}</strong>`;
        }
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>📊 Visualiza Porcentajes</h2>
            <div class="instructions">
                <p>Mueve el control para ver cómo cambia el porcentaje</p>
            </div>
            <div class="controls">
                <label>Porcentaje: </label>
                <input type="number" id="percent-input" min="0" max="100" value="50" style="padding: 10px; font-size: 1.1em; width: 100px;">
                <span> %</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="percent-bar" style="width: 50%;">50%</div>
            </div>
            <div id="percent-result" style="font-size: 1.3em; margin-top: 20px; text-align: center;"></div>
        </div>
    `;
}

function createAngleActivity() {
    setTimeout(() => {
        const canvas = document.getElementById('angle-canvas');
        const ctx = canvas.getContext('2d');
        let currentAngle = 45;
        
        function drawAngle(angle) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = 200;
            const centerY = 200;
            const radius = 150;
            
            // Draw angle arc
            ctx.strokeStyle = '#4A90E2';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, -angle * Math.PI / 180, true);
            ctx.lineTo(centerX, centerY);
            ctx.closePath();
            ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
            ctx.fill();
            ctx.stroke();
            
            // Draw lines
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + radius, centerY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            const endX = centerX + radius * Math.cos(-angle * Math.PI / 180);
            const endY = centerY + radius * Math.sin(-angle * Math.PI / 180);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Draw angle label
            ctx.fillStyle = '#4A90E2';
            ctx.font = 'bold 24px Arial';
            ctx.fillText(angle + '°', centerX + 60, centerY - 30);
        }
        
        document.getElementById('angle-slider').addEventListener('input', (e) => {
            currentAngle = parseInt(e.target.value);
            document.getElementById('angle-value').textContent = currentAngle + '°';
            drawAngle(currentAngle);
            
            let type = '';
            if (currentAngle < 90) type = 'agudo';
            else if (currentAngle === 90) type = 'recto';
            else if (currentAngle < 180) type = 'obtuso';
            else type = 'llano';
            
            document.getElementById('angle-type').textContent = `Tipo: Ángulo ${type}`;
        });
        
        drawAngle(currentAngle);
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>📐 Mide Ángulos</h2>
            <div class="instructions">
                <p>Mueve el control para cambiar el ángulo</p>
            </div>
            <div class="canvas-container">
                <canvas id="angle-canvas" width="400" height="400"></canvas>
            </div>
            <div class="controls">
                <input type="range" id="angle-slider" min="0" max="180" value="45" style="width: 300px;">
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div id="angle-value" style="font-size: 2em; font-weight: bold; color: #4A90E2;">45°</div>
                <div id="angle-type" style="font-size: 1.3em; color: #50C878; margin-top: 10px;">Tipo: Ángulo agudo</div>
            </div>
        </div>
    `;
}

function createFractionActivity() {
    setTimeout(() => {
        let numerator = 1;
        let denominator = 2;
        
        function updateFraction() {
            numerator = parseInt(document.getElementById('frac-num').value) || 1;
            denominator = parseInt(document.getElementById('frac-den').value) || 1;
            if (denominator === 0) denominator = 1;
            
            document.getElementById('frac-display').textContent = `${numerator}/${denominator}`;
            drawFractionPie();
            findEquivalent();
        }
        
        function drawFractionPie() {
            const canvas = document.getElementById('fraction-canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = 150;
            const centerY = 150;
            const radius = 100;
            
            // Draw full circle
            ctx.strokeStyle = '#4A90E2';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Draw filled portion
            const fillAngle = (numerator / denominator) * Math.PI * 2;
            ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + fillAngle);
            ctx.closePath();
            ctx.fill();
            
            // Draw division lines
            ctx.strokeStyle = '#2C3E50';
            ctx.lineWidth = 2;
            for (let i = 0; i < denominator; i++) {
                const angle = (i / denominator) * Math.PI * 2 - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                ctx.stroke();
            }
        }
        
        function findEquivalent() {
            const factor = 2;
            const equivNum = numerator * factor;
            const equivDen = denominator * factor;
            document.getElementById('frac-equiv').innerHTML = 
                `<strong>${numerator}/${denominator} = ${equivNum}/${equivDen}</strong>`;
        }
        
        document.getElementById('frac-num').addEventListener('input', updateFraction);
        document.getElementById('frac-den').addEventListener('input', updateFraction);
        
        updateFraction();
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>🍕 Explora Fracciones</h2>
            <div class="instructions">
                <p>Cambia el numerador y denominador para ver la fracción</p>
            </div>
            <div class="controls">
                <label>Numerador: </label>
                <input type="number" id="frac-num" min="0" max="12" value="1" style="width: 80px; padding: 8px; font-size: 1.1em;">
                <span style="font-size: 1.5em; margin: 0 10px;">/</span>
                <label>Denominador: </label>
                <input type="number" id="frac-den" min="1" max="12" value="2" style="width: 80px; padding: 8px; font-size: 1.1em;">
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <div id="frac-display" style="font-size: 3em; font-weight: bold; color: #4A90E2;">1/2</div>
            </div>
            <div class="canvas-container">
                <canvas id="fraction-canvas" width="300" height="300"></canvas>
            </div>
            <div id="frac-equiv" style="text-align: center; font-size: 1.5em; margin-top: 20px; color: #50C878;"></div>
        </div>
    `;
}

function createEquationActivity() {
    let score = 0;
    let currentEquation = generateEquation();
    
    function generateEquation() {
        const types = ['add', 'subtract', 'multiply', 'divide'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let equation, answer;
        
        switch(type) {
            case 'add':
                const a1 = Math.floor(Math.random() * 10) + 1;
                const b1 = Math.floor(Math.random() * 20) + a1;
                answer = b1 - a1;
                equation = `x + ${a1} = ${b1}`;
                break;
            case 'subtract':
                const a2 = Math.floor(Math.random() * 10) + 1;
                const b2 = Math.floor(Math.random() * 15) + 1;
                answer = a2 + b2;
                equation = `x - ${a2} = ${b2}`;
                break;
            case 'multiply':
                const a3 = Math.floor(Math.random() * 4) + 2;
                answer = Math.floor(Math.random() * 10) + 1;
                const b3 = a3 * answer;
                equation = `${a3}x = ${b3}`;
                break;
            case 'divide':
                const a4 = Math.floor(Math.random() * 4) + 2;
                const b4 = Math.floor(Math.random() * 8) + 1;
                answer = a4 * b4;
                equation = `x ÷ ${a4} = ${b4}`;
                break;
        }
        
        return { equation, answer };
    }
    
    setTimeout(() => {
        document.getElementById('eq-display').textContent = currentEquation.equation;
        
        document.getElementById('eq-submit').addEventListener('click', () => {
            const userAnswer = parseInt(document.getElementById('eq-answer').value);
            const feedback = document.getElementById('eq-feedback');
            
            if (userAnswer === currentEquation.answer) {
                score++;
                feedback.innerHTML = `<div class="feedback correct">¡Correcto! x = ${currentEquation.answer}</div>`;
                document.getElementById('eq-score').textContent = `Ecuaciones resueltas: ${score}`;
                
                setTimeout(() => {
                    currentEquation = generateEquation();
                    document.getElementById('eq-display').textContent = currentEquation.equation;
                    document.getElementById('eq-answer').value = '';
                    feedback.innerHTML = '';
                }, 2000);
            } else {
                feedback.innerHTML = `<div class="feedback incorrect">Incorrecto. Intenta de nuevo.</div>`;
            }
        });
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>🔢 Resuelve Ecuaciones</h2>
            <div class="instructions">
                <p>Encuentra el valor de x en cada ecuación</p>
                <p id="eq-score">Ecuaciones resueltas: 0</p>
            </div>
            <div style="background: #F9F9F9; padding: 30px; border-radius: 12px; margin: 20px 0;">
                <div id="eq-display" style="font-size: 2.5em; font-weight: bold; text-align: center; color: #4A90E2;">x + 5 = 12</div>
            </div>
            <div class="controls">
                <label style="font-size: 1.3em;">x = </label>
                <input type="number" id="eq-answer" placeholder="?" style="width: 100px; padding: 12px; font-size: 1.3em; margin: 0 10px;">
                <button id="eq-submit" class="btn-primary">Verificar</button>
            </div>
            <div id="eq-feedback"></div>
        </div>
    `;
}

function createGeometricActivity() {
    const shapes = [
        { name: 'Cubo', emoji: '🟦', faces: 6, edges: 12, vertices: 8 },
        { name: 'Esfera', emoji: '⚽', faces: 0, edges: 0, vertices: 0 },
        { name: 'Cilindro', emoji: '🥫', faces: 2, edges: 0, vertices: 0 },
        { name: 'Cono', emoji: '🍦', faces: 1, edges: 0, vertices: 1 },
        { name: 'Pirámide', emoji: '🔺', faces: 5, edges: 8, vertices: 5 }
    ];
    
    let currentShape = shapes[0];
    
    setTimeout(() => {
        updateShapeDisplay();
        
        document.getElementById('geo-next').addEventListener('click', () => {
            const currentIndex = shapes.indexOf(currentShape);
            currentShape = shapes[(currentIndex + 1) % shapes.length];
            updateShapeDisplay();
        });
        
        function updateShapeDisplay() {
            document.getElementById('geo-emoji').textContent = currentShape.emoji;
            document.getElementById('geo-name').textContent = currentShape.name;
            
            let info = `<ul style="text-align: left; display: inline-block; font-size: 1.2em;">`;
            if (currentShape.faces > 0) info += `<li><strong>Caras:</strong> ${currentShape.faces}</li>`;
            if (currentShape.edges > 0) info += `<li><strong>Aristas:</strong> ${currentShape.edges}</li>`;
            if (currentShape.vertices > 0) info += `<li><strong>Vértices:</strong> ${currentShape.vertices}</li>`;
            if (currentShape.faces === 0) info += `<li>Es un <strong>cuerpo redondo</strong></li>`;
            else info += `<li>Es un <strong>poliedro</strong></li>`;
            info += `</ul>`;
            
            document.getElementById('geo-info').innerHTML = info;
        }
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>🔷 Conoce los Cuerpos Geométricos</h2>
            <div class="instructions">
                <p>Explora diferentes cuerpos geométricos y sus características</p>
            </div>
            <div style="background: #F9F9F9; padding: 40px; border-radius: 12px; margin: 20px 0;">
                <div id="geo-emoji" style="font-size: 8em; text-align: center;">🟦</div>
                <div id="geo-name" style="font-size: 2.5em; font-weight: bold; text-align: center; color: #4A90E2; margin: 20px 0;">Cubo</div>
                <div id="geo-info" style="text-align: center;"></div>
            </div>
            <div class="controls">
                <button id="geo-next" class="btn-primary">Siguiente Figura →</button>
            </div>
        </div>
    `;
}

function createOperationsActivity() {
    let score = 0;
    let currentProblem = generateProblem();
    
    function generateProblem() {
        const operations = ['+', '-', '×', '÷'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        let a, b, answer, question;
        
        switch(op) {
            case '+':
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
                answer = a + b;
                question = `${a} + ${b}`;
                break;
            case '-':
                b = Math.floor(Math.random() * 30) + 1;
                answer = Math.floor(Math.random() * 30) + 1;
                a = b + answer;
                question = `${a} - ${b}`;
                break;
            case '×':
                a = Math.floor(Math.random() * 10) + 2;
                b = Math.floor(Math.random() * 10) + 2;
                answer = a * b;
                question = `${a} × ${b}`;
                break;
            case '÷':
                b = Math.floor(Math.random() * 8) + 2;
                answer = Math.floor(Math.random() * 10) + 1;
                a = b * answer;
                question = `${a} ÷ ${b}`;
                break;
        }
        
        return { question, answer };
    }
    
    setTimeout(() => {
        document.getElementById('op-display').textContent = currentProblem.question;
        
        document.getElementById('op-submit').addEventListener('click', checkAnswer);
        document.getElementById('op-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer();
        });
        
        function checkAnswer() {
            const userAnswer = parseInt(document.getElementById('op-answer').value);
            const feedback = document.getElementById('op-feedback');
            
            if (userAnswer === currentProblem.answer) {
                score++;
                feedback.innerHTML = `<div class="feedback correct">¡Correcto! ${currentProblem.question} = ${currentProblem.answer}</div>`;
                document.getElementById('op-score').textContent = `Problemas resueltos: ${score}`;
                
                setTimeout(() => {
                    currentProblem = generateProblem();
                    document.getElementById('op-display').textContent = currentProblem.question;
                    document.getElementById('op-answer').value = '';
                    feedback.innerHTML = '';
                    document.getElementById('op-answer').focus();
                }, 1500);
            } else {
                feedback.innerHTML = `<div class="feedback incorrect">Incorrecto. Intenta de nuevo.</div>`;
            }
        }
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>➕ Practica Operaciones</h2>
            <div class="instructions">
                <p>Resuelve las operaciones lo más rápido que puedas</p>
                <p id="op-score">Problemas resueltos: 0</p>
            </div>
            <div style="background: #F9F9F9; padding: 40px; border-radius: 12px; margin: 20px 0;">
                <div id="op-display" style="font-size: 3em; font-weight: bold; text-align: center; color: #4A90E2;"></div>
            </div>
            <div class="controls">
                <input type="number" id="op-answer" placeholder="Respuesta" style="width: 150px; padding: 15px; font-size: 1.5em;">
                <button id="op-submit" class="btn-primary" style="padding: 15px 40px; font-size: 1.3em;">Verificar</button>
            </div>
            <div id="op-feedback"></div>
        </div>
    `;
}

function createNegativeActivity() {
    setTimeout(() => {
        const canvas = document.getElementById('negative-canvas');
        const ctx = canvas.getContext('2d');
        
        function drawNumberLine(highlightNumber = null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerY = 100;
            const spacing = 40;
            const startX = 50;
            
            // Draw line
            ctx.strokeStyle = '#2C3E50';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(startX, centerY);
            ctx.lineTo(550, centerY);
            ctx.stroke();
            
            // Draw numbers
            ctx.fillStyle = '#2C3E50';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            
            for (let i = -5; i <= 5; i++) {
                const x = startX + 50 + (i * spacing);
                
                // Tick mark
                ctx.beginPath();
                ctx.moveTo(x, centerY - 10);
                ctx.lineTo(x, centerY + 10);
                ctx.stroke();
                
                // Number
                if (i === highlightNumber) {
                    ctx.fillStyle = '#E74C3C';
                    ctx.font = 'bold 24px Arial';
                    ctx.fillText(i.toString(), x, centerY + 35);
                    
                    // Highlight circle
                    ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
                    ctx.beginPath();
                    ctx.arc(x, centerY, 15, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = '#2C3E50';
                    ctx.font = 'bold 18px Arial';
                } else {
                    ctx.fillText(i.toString(), x, centerY + 35);
                }
            }
        }
        
        let currentNumber = 0;
        drawNumberLine(currentNumber);
        
        document.getElementById('neg-slider').addEventListener('input', (e) => {
            currentNumber = parseInt(e.target.value);
            document.getElementById('neg-value').textContent = currentNumber;
            drawNumberLine(currentNumber);
            
            let description = '';
            if (currentNumber > 0) description = 'Este es un número positivo';
            else if (currentNumber < 0) description = 'Este es un número negativo';
            else description = 'Este es el cero (ni positivo ni negativo)';
            
            document.getElementById('neg-description').textContent = description;
        });
    }, 100);
    
    return `
        <div class="interactive-container">
            <h2>➖ Explora Números Negativos</h2>
            <div class="instructions">
                <p>Mueve el control para ver diferentes números en la recta numérica</p>
            </div>
            <div class="canvas-container">
                <canvas id="negative-canvas" width="600" height="200"></canvas>
            </div>
            <div class="controls">
                <input type="range" id="neg-slider" min="-5" max="5" value="0" style="width: 400px;">
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div style="font-size: 1.3em; margin-bottom: 10px;">Número seleccionado:</div>
                <div id="neg-value" style="font-size: 3em; font-weight: bold; color: #E74C3C;">0</div>
                <div id="neg-description" style="font-size: 1.2em; color: #50C878; margin-top: 10px;"></div>
            </div>
        </div>
    `;
}

// Exam Functions
function startExam() {
    examQuestions = moduleData.generateExam();
    currentQuestionIndex = 0;
    userAnswers = new Array(10).fill(null);
    
    document.getElementById('examen-intro').style.display = 'none';
    document.getElementById('examen-content').style.display = 'block';
    
    displayQuestion();
}

function displayQuestion() {
    const question = examQuestions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    
    container.innerHTML = `
        <div class="question-box">
            <h3>Pregunta ${currentQuestionIndex + 1}</h3>
            <p style="font-size: 1.2em; margin: 20px 0;">${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}" 
                         onclick="selectOption('${option.toString().replace(/'/g, "\\'")}')">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('btn-prev').disabled = currentQuestionIndex === 0;
    document.getElementById('btn-next').style.display = currentQuestionIndex < 9 ? 'block' : 'none';
    document.getElementById('btn-submit').style.display = currentQuestionIndex === 9 ? 'block' : 'none';
}

window.selectOption = function(option) {
    userAnswers[currentQuestionIndex] = option;
    displayQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < 9) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function submitExam() {
    let correctCount = 0;
    
    for (let i = 0; i < examQuestions.length; i++) {
        if (userAnswers[i] && userAnswers[i].toString() === examQuestions[i].correct.toString()) {
            correctCount++;
        }
    }
    
    const passed = correctCount >= 7;
    
    document.getElementById('examen-content').style.display = 'none';
    document.getElementById('examen-results').style.display = 'block';
    
    document.getElementById('score-display').textContent = `${correctCount}/10`;
    document.getElementById('results-title').textContent = passed ? '¡Felicidades! 🎉' : 'Sigue Practicando 💪';
    document.getElementById('results-title').style.color = passed ? '#27AE60' : '#E74C3C';
    
    const message = passed 
        ? '¡Excelente trabajo! Has aprobado esta lección. Ahora puedes pasar al siguiente módulo o repasar si lo deseas.'
        : 'Necesitas al menos 7 respuestas correctas para aprobar. Revisa la teoría y la práctica, luego intenta de nuevo. ¡Tú puedes!';
    
    document.getElementById('results-message').textContent = message;
}

function resetExam() {
    document.getElementById('examen-results').style.display = 'none';
    document.getElementById('examen-intro').style.display = 'block';
}

function goHome() {
    window.location.href = 'index.html';
}
