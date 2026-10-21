document.addEventListener("DOMContentLoaded", () => {
    const memberHotspots = [...document.querySelectorAll(".member-hotspot")];
    memberHotspots.forEach((hotspot) => {
        const pin = hotspot.querySelector(".member-pin");
        pin?.addEventListener("click", () => {
            memberHotspots.forEach((other) => {
                if (other !== hotspot) other.open = false;
            });
        });
    });

    const canvas = document.getElementById("connect-canvas");
    const context = canvas?.getContext("2d");
    if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let points = [];
    let pointer = { x: -1000, y: -1000 };
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const count = Math.max(28, Math.min(76, Math.round((width * height) / 24000)));
        points = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1 + Math.random() * 1.2
        }));
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const pointerDistance = Math.hypot(pointer.x - point.x, pointer.y - point.y);
            const glow = Math.max(0, 1 - pointerDistance / 220);

            context.beginPath();
            context.arc(point.x, point.y, point.radius + glow, 0, Math.PI * 2);
            context.fillStyle = `rgba(145, 224, 194, ${0.16 + glow * 0.55})`;
            context.fill();

            for (let j = i + 1; j < points.length; j++) {
                const other = points[j];
                const distance = Math.hypot(other.x - point.x, other.y - point.y);
                if (distance < 130) {
                    context.beginPath();
                    context.moveTo(point.x, point.y);
                    context.lineTo(other.x, other.y);
                    context.strokeStyle = `rgba(145, 224, 194, ${(1 - distance / 130) * 0.12})`;
                    context.lineWidth = 1;
                    context.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", (event) => {
        pointer = { x: event.clientX, y: event.clientY };
    }, { passive: true });
    window.addEventListener("mouseleave", () => {
        pointer = { x: -1000, y: -1000 };
    }, { passive: true });
    resizeCanvas();
    draw();
});
