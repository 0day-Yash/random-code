// Particle system and interactive animations for CypherSec

class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            color: options.color || '#00ff88',
            speed: options.speed || 1,
            size: options.size || 2,
            connectionRadius: options.connectionRadius || 100,
            mode: options.mode || 'network' // 'network', 'matrix', 'dataStream'
        };
        this.init();
    }

    init() {
        // Resize canvas to full width/height
        const resize = () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Create initial particles
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * this.options.speed,
            vy: (Math.random() - 0.5) * this.options.speed,
            size: this.options.size,
            color: this.options.color
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Draw connections in network mode
            if (this.options.mode === 'network') {
                this.particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.options.connectionRadius) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / this.options.connectionRadius})`;
                        this.ctx.stroke();
                    }
                });
            }
        });

        // Matrix mode effect
        if (this.options.mode === 'matrix') {
            this.drawMatrixEffect();
        }

        // Data stream effect
        if (this.options.mode === 'dataStream') {
            this.drawDataStreamEffect();
        }

        requestAnimationFrame(() => this.animate());
    }

    drawMatrixEffect() {
        this.ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
        this.ctx.font = '12px monospace';
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
        }
    }

    drawDataStreamEffect() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(particle.x + 10, particle.y);
            this.ctx.strokeStyle = particle.color;
            this.ctx.stroke();
            particle.x += 2;
            if (particle.x > this.canvas.width) particle.x = 0;
        });
    }
}

// Interactive elements animations
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        // Add hover effects to cards
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });

        // Initialize section-specific effects
        this.initSectionEffects();
    }

    handleCardHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    handleCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'none';
    }

    initSectionEffects() {
        // Hero section particle effect
        const heroCanvas = document.createElement('canvas');
        heroCanvas.classList.add('absolute', 'inset-0', '-z-10');
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.appendChild(heroCanvas);
            const heroParticles = new ParticleSystem(heroCanvas, {
                particleCount: 30,
                color: '#00ff88',
                mode: 'network'
            });
            heroParticles.animate();
        }

        // Services section matrix effect
        const servicesCanvas = document.createElement('canvas');
        servicesCanvas.classList.add('absolute', 'inset-0', 'opacity-10');
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.appendChild(servicesCanvas);
            const servicesParticles = new ParticleSystem(servicesCanvas, {
                particleCount: 20,
                color: '#4a9eff',
                mode: 'matrix'
            });
            servicesParticles.animate();
        }

        // Team section data stream effect
        const teamCanvas = document.createElement('canvas');
        teamCanvas.classList.add('absolute', 'inset-0', 'opacity-5');
        const teamSection = document.getElementById('team');
        if (teamSection) {
            teamSection.appendChild(teamCanvas);
            const teamParticles = new ParticleSystem(teamCanvas, {
                particleCount: 15,
                color: '#ff4a4a',
                mode: 'dataStream'
            });
            teamParticles.animate();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveElements();
});  