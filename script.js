document.addEventListener("DOMContentLoaded", function () {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log("Is Mobile Device:", isMobile); // Check the console for this message

    if (!isMobile) {
        try {
            VANTA.HALO({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: window.innerHeight,
                minWidth: window.innerWidth,
                amplitudeFactor: 0.8,
                xOffset: -0.23,
                yOffset: 0.3,
                size: 0.4,
            });
            console.log("Vanta.js initialized successfully.");
        } catch (error) {
            console.error("Vanta.js initialization failed:", error);
            // Fallback for failed initialization
            document.getElementById("vanta-bg").style.backgroundColor = "#1a1a1a";
        }
    } else {
        // Fallback for mobile devices
        console.log("Mobile device detected. Using fallback background.");
        document.getElementById("vanta-bg").style.backgroundColor = "#1a1a1a"; // Fallback color
    }
});