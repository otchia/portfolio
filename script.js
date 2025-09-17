document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("connect-canvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    let points = [];
    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createPoints();
    }

    function createPoints() {
        points = [];
        for (let x = 0; x < width; x += width / 20) {
            for (let y = 0; y < height; y += height / 20) {
                points.push({
                    x: x + Math.random() * width / 20,
                    y: y + Math.random() * height / 20
                });
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < points.length; i++) {
            let p = points[i];

            let dx = target.x - p.x;
            let dy = target.y - p.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let opacity = Math.max(0, 1 - distance / 200);

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();

            for (let j = 0; j < points.length; j++) {
                if (i !== j) {
                    let p2 = points[j];
                    let dist = Math.sqrt((p2.x - p.x) ** 2 + (p2.y - p.y) ** 2);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity / 2})`;
                        ctx.stroke();
                    }
                }
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", function (e) {
        target.x = e.clientX;
        target.y = e.clientY;
    });

    resizeCanvas();
    animate();
});

