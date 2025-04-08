interface TextEffectOptions {
    element: HTMLElement;
    delay?: number;
    duration?: number;
    glitchProbability?: number;
}

export class TextEffect {
    private element: HTMLElement;
    private originalText: string;
    private options: TextEffectOptions;

    constructor(options: TextEffectOptions) {
        this.element = options.element;
        this.originalText = this.element.innerText;
        this.options = {
            delay: options.delay || 50,
            duration: options.duration || 2000,
            glitchProbability: options.glitchProbability || 0.3
        };
    }

    private getRandomChar(): string {
        const chars = '!<>-_\\[]{}—=+*^?#@%$';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async typeWriter(): Promise<void> {
        const text = this.originalText;
        this.element.innerText = '';
        
        for (let i = 0; i < text.length; i++) {
            this.element.innerText += text.charAt(i);
            await this.sleep(this.options.delay!);
        }
    }

    public async glitchEffect(): Promise<void> {
        const text = this.originalText;
        const duration = this.options.duration!;
        const startTime = Date.now();

        while (Date.now() - startTime < duration) {
            if (Math.random() < this.options.glitchProbability!) {
                const pos = Math.floor(Math.random() * text.length);
                const char = this.getRandomChar();
                this.element.innerText = 
                    text.substring(0, pos) + 
                    char + 
                    text.substring(pos + 1);
            } else {
                this.element.innerText = text;
            }
            await this.sleep(50);
        }
        this.element.innerText = text;
    }

    public async matrixEffect(): Promise<void> {
        const text = this.originalText;
        const chars = '01';
        this.element.innerText = '';

        for (let i = 0; i < text.length; i++) {
            let iterations = 5;
            while (iterations > 0) {
                this.element.innerText = 
                    text.substring(0, i) +
                    chars.charAt(Math.floor(Math.random() * chars.length)) +
                    text.substring(i + 1);
                await this.sleep(50);
                iterations--;
            }
            this.element.innerText = 
                text.substring(0, i + 1) +
                text.substring(i + 1);
        }
    }

    public async scrambleEffect(): Promise<void> {
        const text = this.originalText;
        const duration = this.options.duration!;
        const startTime = Date.now();

        while (Date.now() - startTime < duration) {
            let scrambled = '';
            for (let i = 0; i < text.length; i++) {
                if (Math.random() < 0.5) {
                    scrambled += this.getRandomChar();
                } else {
                    scrambled += text[i];
                }
            }
            this.element.innerText = scrambled;
            await this.sleep(50);
        }
        this.element.innerText = text;
    }
}