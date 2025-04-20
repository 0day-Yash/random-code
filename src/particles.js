class ParticleSystem {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            color: options.color || '#4361ee',
            minSize: options.minSize || 2,
            maxSize: options.maxSize || 4,
            speed: options.speed || 1,
            connectParticles: options.connectParticles || true,
            lineColor: options.lineColor || 'rgba(67, 97, 238, 0.15)',
            maxConnections: options.maxConnections || 3
        };
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.init();
        this.animate();
        this.handleResize();
    }
    
    init() {
        this.resize();
        this.createParticles();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.resize();
            this.createParticles();
        }, 200);
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width * window.devicePixelRatio;
        this.canvas.height = this.height * window.devicePixelRatio;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
                speedX: (Math.random() - 0.5) * this.options.speed,
                speedY: (Math.random() - 0.5) * this.options.speed
            });
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.options.color;
            this.ctx.fill();
            
            // Connect particles
            if (this.options.connectParticles) {
                this.connectNearbyParticles(particle, i);
            }
        });
    }
    
    connectNearbyParticles(particle, index) {
        let connectCount = 0;
        for (let i = index + 1; i < this.particles.length && connectCount < this.options.maxConnections; i++) {
            const dx = this.particles[i].x - particle.x;
            const dy = this.particles[i].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.options.lineColor;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.particles[i].x, this.particles[i].y);
                this.ctx.stroke();
                connectCount++;
            }
        }
    }
    
    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles-container', {
        particleCount: 75,
        color: 'rgba(47, 217, 0, 0.5)',
        minSize: 1,
        maxSize: 6,
        speed: 1.0,
        connectParticles: true,
        lineColor: 'rgba(77, 196, 8, 0.4)',
        maxConnections: 4
    });
});