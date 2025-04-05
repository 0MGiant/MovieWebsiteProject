document.addEventListener("DOMContentLoaded", () => {
    const selectedSeatsDetails = document.getElementById('seat-list');
    const totalPrice = document.getElementById('total-price');
    const backButton = document.getElementById('back-btn');
    const payButton = document.getElementById('pay-btn');
    let selectedSeats = localStorage.getItem("bookedSeats")?.split(',');
    document.getElementById("seat-list").textContent = selectedSeats.join(", ");
    // กรองข้อมูลที่นั่งที่ไม่ถูกต้อง (ช่องว่าง, null, หรือ undefined)
    selectedSeats = selectedSeats.filter(seat => seat.trim() !== "");
    const vipSeats = selectedSeats.filter(seat => seat.startsWith("VIP"));
    const regularSeats = selectedSeats.filter(seat => !seat.startsWith("VIP"));
    console.log(localStorage);
    // แสดงข้อมูลการจอง
    if (selectedSeats.length > 0) {
        const totalPriceAmount = (regularSeats.length * 100) + (vipSeats.length*300);
        selectedSeatsDetails.textContent = selectedSeats.join(", ");
        totalPrice.textContent = totalPriceAmount;
    } 
    else {
        selectedSeatsDetails.textContent = "ไม่มีการจองที่นั่ง";
        totalPrice.textContent = "ราคาทั้งหมด: 0 บาท";
    }

    // ฟังก์ชันย้อนกลับไปหน้าจองที่นั่ง
    backButton.addEventListener("click", () => {
        window.location.href = "booking.html"; // กลับไปหน้าจองที่นั่ง
        localStorage.removeItem("bookedSeats");
    });

    // ฟังก์ชันสำหรับการชำระเงิน
    payButton.addEventListener("click", () => {
        alert('การชำระเงินสำเร็จ!');
        window.location.href = "index.html"; // กลับไปหน้าจองที่นั่ง
    });
});


