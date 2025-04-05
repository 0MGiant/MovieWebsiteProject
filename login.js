document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // ป้องกันไม่ให้ `<form>` รีเฟรชหน้า

    const phoneInput = document.getElementById("Phone");
    const errorMessage = document.getElementById("error-message");
    const phone = phoneInput.value.trim();

    if (!/^\d{10}$/.test(phone)) {
        errorMessage.textContent = "Invalid phone number!";
        return;
    }

    try {
        const response = await fetch("http://localhost:5501/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("token", result.token);
            alert("Login Successful!");
            window.location.href = "booking.html";
        } else {
            errorMessage.textContent = result.message;
        }
    } catch (error) {
        errorMessage.textContent = "Server error!";
    }
});
