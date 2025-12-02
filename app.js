// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('Service Worker registrado');
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                            console.log('Service Worker actualizado');
                        }
                    });
                });
            })
            .catch(err => console.log('Error al registrar Service Worker:', err));
    });
}

// Module navigation
document.addEventListener('DOMContentLoaded', () => {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        const startBtn = card.querySelector('.btn-start');
        const moduleId = card.dataset.module;
        
        startBtn.addEventListener('click', () => {
            window.location.href = `module.html?id=${moduleId}`;
        });
    });
});

document.getElementById("btn-notify").addEventListener("click", () => {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            navigator.serviceWorker.getRegistration().then(reg => {
                reg.showNotification("¡Bienvenido a MateMágica! 🎓", {
                    body: "Sigue aprendiendo matemáticas de forma divertida.",
                    icon: "icon-192.jpg",
                    vibrate: [200, 100, 200],
                    tag: "welcome",
                });
            });
        } else {
            alert("Debes permitir notificaciones para recibir avisos.");
        }
    });
});

window.addEventListener("load", () => {
    if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.showNotification("¡Nueva lección disponible! 📘", {
                body: "Explora los nuevos módulos en MateMágica.",
                icon: "icon-192.jpg",
            });
        });
    }
});
