// ============================================
// MATRIX BACKGROUND ANIMATION
// ============================================

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create an array of characters (hexadecimal + cyberpunk symbols)
const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "∆", "Σ", "Π", "Ω"];

// Create an array of columns
let columns = Math.floor(canvas.width / 20);

// Initialize the y positions of the columns
let yPositions = [];
for (let i = 0; i < columns; i++) {
    yPositions[i] = Math.random() * canvas.height;
}

// Update the matrix animation
function updateMatrix() {
    // Set the background color with transparency for trail effect
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(11, 11, 15, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font (verde chillón + glow)
    ctx.fillStyle = "#03FD03"; 
    ctx.font = "14px 'JetBrains Mono', monospace";
    
    // EFECTO NEÓN
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#03FD03";

    // Loop through each column
    for (let i = 0; i < columns; i++) {
        // Select a random character from the array
        const character = characters[Math.floor(Math.random() * characters.length)];

        // Set the y position of the current column
        const y = yPositions[i];

        // Draw the character at the current position
        ctx.fillText(character, i * 20, y);

        // Move the column down by 20 units
        yPositions[i] += 20;

        // Reset the position if it reaches the bottom of the canvas
        if (yPositions[i] > canvas.height && Math.random() > 0.975) {
            yPositions[i] = 0;
        }
    }
}

// Render the matrix animation
function renderMatrix() {
    requestAnimationFrame(renderMatrix);
    updateMatrix();
}

// Start the animation
renderMatrix();

// ============================================
// TERMINAL BOOT SEQUENCE
// ============================================

const bootSequence = [
    { text: '[  OK  ] Starting portfolio system...', class: 'success', delay: 100 },
    { text: '[  OK  ] Mounting /dev/skills...', class: 'success', delay: 150 },
    { text: '[  OK  ] Loading creative.module...', class: 'success', delay: 100 },
    { text: '[  OK  ] Initializing neural.network...', class: 'success', delay: 120 },
    { text: '', class: 'output', delay: 200 },
    { text: '════════════════════════════════════', class: 'info', delay: 50 },
    { text: '    DESARROLLADOR FULL STACK', class: 'info', delay: 80 },
    { text: '    Creando experiencias digitales', class: 'info', delay: 80 },
    { text: '════════════════════════════════════', class: 'info', delay: 50 },
    { text: '', class: 'output', delay: 200 },
    { text: '> Sistema listo.', class: 'success', delay: 100 },
    { text: '> Bienvenido al portfolio.', class: 'info', delay: 100 },
    { text: '', class: 'output', delay: 100 }
];

function typeText(element, text, callback) {
    let i = 0;
    const speed = 30;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function addTerminalLine(container, text, className, typed = false, callback) {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    container.appendChild(line);
    
    if (typed && text) {
        typeText(line, text, callback);
    } else {
        line.textContent = text;
        if (callback) callback();
    }
}

function runBootSequence(container) {
    let index = 0;
    
    function nextLine() {
        if (index < bootSequence.length) {
            const line = bootSequence[index];
            setTimeout(() => {
                addTerminalLine(container, line.text, line.class, true, () => {
                    index++;
                    nextLine();
                });
            }, line.delay);
        } else {
            const cursorLine = document.createElement('div');
            cursorLine.className = 'terminal-line';
            cursorLine.innerHTML = '<span class="prompt">arch@portfolio:~$</span><span class="cursor"></span>';
            container.appendChild(cursorLine);
        }
    }
    
    nextLine();
}

// Iniciar secuencia de arranque
setTimeout(() => {
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) {
        runBootSequence(terminalBody);
    }
}, 500);

// ============================================
// EFECTOS DE GLITCH
// ============================================

const navBlocks = document.querySelectorAll('.nav-block');
const projectCards = document.querySelectorAll('.project-card');
const imageFrame = document.querySelector('.image-frame');

// Añadir efecto glitch a nav blocks y project cards
[...navBlocks, ...projectCards].forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.classList.add('glitch');
        setTimeout(() => this.classList.remove('glitch'), 300);
    });
});

// Añadir efecto glitch al marco de la imagen
if (imageFrame) {
    imageFrame.addEventListener('mouseenter', function() {
        this.classList.add('glitch');
        setTimeout(() => this.classList.remove('glitch'), 300);
    });
}

// ============================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje')
    };

    const errorMessages = {
        nombre: document.getElementById('errorNombre'),
        email: document.getElementById('errorEmail'),
        telefono: document.getElementById('errorTelefono'),
        asunto: document.getElementById('errorAsunto'),
        mensaje: document.getElementById('errorMensaje')
    };

    // Mensajes de error personalizados
    const errors = {
        nombre: {
            valueMissing: 'El nombre es obligatorio',
            patternMismatch: 'Solo se permiten letras (mínimo 3 caracteres)',
            tooShort: 'El nombre debe tener al menos 3 caracteres'
        },
        email: {
            valueMissing: 'El email es obligatorio',
            typeMismatch: 'Formato de email inválido',
            patternMismatch: 'Email inválido. Formato: usuario@dominio.com'
        },
        telefono: {
            patternMismatch: 'Solo números, entre 9 y 15 dígitos'
        },
        asunto: {
            valueMissing: 'El asunto es obligatorio',
            tooShort: 'El asunto debe tener al menos 5 caracteres'
        },
        mensaje: {
            valueMissing: 'El mensaje es obligatorio',
            tooShort: 'El mensaje debe tener al menos 20 caracteres',
            tooLong: 'El mensaje no puede superar los 500 caracteres'
        }
    };

    // Función para mostrar error
    function showError(input, message) {
        const errorSpan = errorMessages[input.name];
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
        input.classList.add('invalid');
    }

    // Función para limpiar error
    function clearError(input) {
        const errorSpan = errorMessages[input.name];
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
        }
        input.classList.remove('invalid');
    }

    // Validar campo individual
    function validateField(input) {
        const validity = input.validity;
        const fieldErrors = errors[input.name];

        // Si el campo está vacío y no es requerido, no mostrar error
        if (!input.required && input.value.trim() === '') {
            clearError(input);
            return true;
        }

        if (validity.valueMissing) {
            showError(input, fieldErrors.valueMissing);
            return false;
        }
        if (validity.typeMismatch) {
            showError(input, fieldErrors.typeMismatch);
            return false;
        }
        if (validity.patternMismatch) {
            showError(input, fieldErrors.patternMismatch);
            return false;
        }
        if (validity.tooShort) {
            showError(input, fieldErrors.tooShort);
            return false;
        }
        if (validity.tooLong) {
            showError(input, fieldErrors.tooLong);
            return false;
        }

        clearError(input);
        return true;
    }

    // Añadir eventos de validación en tiempo real
    Object.values(inputs).forEach(input => {
        if (input) {
            // Validar al escribir (después del primer intento de envío)
            input.addEventListener('input', function() {
                if (this.hasAttribute('data-touched')) {
                    validateField(this);
                }
            });

            // Validar al salir del campo
            input.addEventListener('blur', function() {
                this.setAttribute('data-touched', 'true');
                validateField(this);
            });
        }
    });

    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Marcar todos los campos como tocados
        Object.values(inputs).forEach(input => {
            if (input) {
                input.setAttribute('data-touched', 'true');
            }
        });

        // Validar todos los campos
        let isValid = true;
        Object.values(inputs).forEach(input => {
            if (input && !validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Aquí iría la lógica para enviar el formulario
            // Por ahora, solo mostramos mensaje de éxito
            const successDiv = document.getElementById('formSuccess');
            successDiv.style.display = 'block';
            
            // Limpiar formulario
            contactForm.reset();
            
            // Limpiar errores
            Object.values(inputs).forEach(input => {
                if (input) {
                    clearError(input);
                    input.removeAttribute('data-touched');
                }
            });

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);

            // Scroll al mensaje de éxito
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Hacer scroll al primer campo con error
            const firstInvalid = contactForm.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        }
    });
}

// ============================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Solo aplicar smooth scroll si el href no es solo "#"
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});