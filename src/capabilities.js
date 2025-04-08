// Handle dynamic connection lines between capability cards
document.addEventListener('DOMContentLoaded', () => {
    const capabilitiesSection = document.querySelector('#services');
    const connectionLines = document.querySelector('.connection-lines svg');
    const cards = document.querySelectorAll('.capability-card');

    // Update connection lines positions
    function updateConnections() {
        // Clear existing paths
        connectionLines.innerHTML = '';

        // Create connections between related capabilities
        const connections = [
            ['web', 'cloud'],
            ['cloud', 'network'],
            ['network', 'social'],
            ['social', 'osint'],
            ['osint', 'code'],
            ['code', 'vuln'],
            ['vuln', 'tools'],
            ['tools', 'web']
        ];

        connections.forEach(([from, to]) => {
            const fromCard = document.querySelector(`[data-capability="${from}"]`);
            const toCard = document.querySelector(`[data-capability="${to}"]`);

            if (fromCard && toCard) {
                const fromRect = fromCard.getBoundingClientRect();
                const toRect = toCard.getBoundingClientRect();
                const sectionRect = capabilitiesSection.getBoundingClientRect();

                // Calculate relative positions
                const fromX = fromRect.left + fromRect.width / 2 - sectionRect.left;
                const fromY = fromRect.top + fromRect.height / 2 - sectionRect.top;
                const toX = toRect.left + toRect.width / 2 - sectionRect.left;
                const toY = toRect.top + toRect.height / 2 - sectionRect.top;

                // Create SVG path
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('class', 'connection-line');
                path.setAttribute('d', `M${fromX},${fromY} L${toX},${toY}`);
                connectionLines.appendChild(path);
            }
        });
    }

    // Add hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const capability = card.dataset.capability;
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.5';
                }
            });
            updateConnections();
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
            updateConnections();
        });
    });

    // Initial setup
    updateConnections();

    // Update on resize
    window.addEventListener('resize', updateConnections);
});