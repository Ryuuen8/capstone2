document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("floorBtn");
    const menu = document.getElementById("floorMenu");

    if (!btn || !menu) {
        console.error("Floor dropdown elements not found!");
        return;
    }

    btn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevents instant close bug

        const isOpen = menu.classList.toggle("show");
        btn.setAttribute("aria-expanded", isOpen);
    });

    document.addEventListener("click", () => {
        menu.classList.remove("show");
        btn.setAttribute("aria-expanded", "false");
    });
});