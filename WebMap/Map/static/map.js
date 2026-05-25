let selected = [];

var locations = JSON.parse(
    document.getElementById("locations-data").textContent
);

locations.forEach((loc) => {

    let marker = L.marker([loc.y_coordinate, loc.x_coordinate])
        .addTo(map);

    marker.bindPopup(`<b>${loc.room_name}</b>`);

    marker.on("click", async function () {

        selected.push(loc.room_name);

        if (selected.length < 2) return;

        const csrftoken = getCSRFToken();
        if (!csrftoken) return;

        try {
            const response = await fetch("/pathfind/", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken
                },
                body: JSON.stringify({
                    start: selected[0],
                    end: selected[1]
                })
            });

            if (!response.ok) return;

            const data = await response.json();

            // remove old dynamic path only
            if (currentPath) {
                map.removeLayer(currentPath);
            }

            currentPath = L.polyline.antPath(data.path, {
                color: "#00E5FF",
                weight: 5,
                delay: 600,
                pulseColor: "#FFFFFF"
            }).addTo(map);

        } catch (err) {
            console.error("PATH ERROR:", err);
        }

        selected = [];
    });
});