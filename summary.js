document.addEventListener("DOMContentLoaded", () => {
    const selectedSeatsDetails = document.getElementById('selectedSeatsDetails');
    const totalPrice = document.getElementById('total-price');
    const backButton = document.getElementById('back-btn');
    const payButton = document.getElementById('pay-btn');
    const seatPrice = 100; // ราคาแต่ละที่นั่ง
    let selectedSeats = localStorage.getItem("bookedSeats")?.split(',') || [];

    // กรองข้อมูลที่นั่งที่ไม่ถูกต้อง (ช่องว่าง, null, หรือ undefined)
    selectedSeats = selectedSeats.filter(seat => seat.trim() !== "");
    console.log(selectedSeats);

    // แสดงข้อมูลการจอง
    if (selectedSeats.length > 0) {
        const totalPriceAmount = selectedSeats.length * seatPrice;
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
