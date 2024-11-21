document.getElementById("scanButton").addEventListener("click", async function () {
    let e = new ZXing.BrowserQRCodeReader(),
        t = document.getElementById("video"),
        cameraSelect = document.getElementById("cameraSelect"),
        cameraStatusText = document.getElementById("cameraStatusText");

    // Ensure a camera is selected
    const selectedCameraId = cameraSelect.value;

    // Get available video devices
    let devices = await navigator.mediaDevices.enumerateDevices();
    let cameraCount = devices.filter((device) => device.kind === "videoinput").length;
    cameraStatusText.textContent = `Available cameras: ${cameraCount}`;

    if (selectedCameraId) {
        // Use selected camera if available
        const constraints = {
            video: {
                deviceId: { exact: selectedCameraId },
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                frameRate: { ideal: 30, min: 10 },
            },
        };

        try {
            let stream = await navigator.mediaDevices.getUserMedia(constraints);
            t.srcObject = stream;
            t.style.display = "block";

            e.decodeOnceFromVideoDevice(selectedCameraId, "video")
                .then((result) => {
                    stream.getTracks().forEach((track) => track.stop());
                    t.style.display = "none";
                    if (result.text.startsWith("sadnan.html?") || result.text.startsWith("pay.html?") || result.text.startsWith("text")) {
                        window.location.href = result.text;
                    } else {
                        alert("আপনার স্কেন করা কোড সঠিক নয়");
                    }
                })
                .catch((err) => {
                    console.error("Error decoding QR Code: ", err);
                    stream.getTracks().forEach((track) => track.stop());
                    t.style.display = "none";
                });
        } catch (err) {
            console.error("Error accessing camera: ", err);
        }
    } else {
        // Fallback if no camera selected
        let i;
        devices.forEach((device) => {
            if ("videoinput" === device.kind && device.label && device.label.length > 0 && device.label.toLowerCase().includes("back")) {
                i = device.deviceId;
            }
        });

        // Default to either the selected camera or the environment facing camera
        const fallbackConstraints = {
            video: { deviceId: { exact: i } },
        };

        // Start video feed with fallback if no camera selected
        await c(fallbackConstraints) || await c({ video: { facingMode: { exact: "environment" } } });
    }
});

// Populate camera dropdown
(async function populateCameraDropdown() {
    let cameraSelect = document.getElementById("cameraSelect"),
        devices = await navigator.mediaDevices.enumerateDevices();

    cameraSelect.innerHTML = ""; // Clear existing options
    devices.forEach((device) => {
        if (device.kind === "videoinput") {
            const option = document.createElement("option");
            option.value = device.deviceId;
            option.text = device.label || `Camera ${cameraSelect.length + 1}`;
            cameraSelect.appendChild(option);

            // Preselect "camera2 0, facing back"
            if (option.text.toLowerCase().includes("camera2 0") && option.text.toLowerCase().includes("facing back")) {
                option.selected = true;
            }
        }
    });
})();
