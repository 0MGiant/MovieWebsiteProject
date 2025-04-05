document.addEventListener("DOMContentLoaded", () => {
    const selectedSeatsDetails = document.getElementById('seat-list');
    const totalPrice = document.getElementById('total-price');
    const backButton = document.getElementById('back-btn');
    const payButton = document.getElementById('pay-btn');

    console.log(localStorage);

    let personal_bookedSeats = JSON.parse(localStorage.getItem("personal-seats")); 
    document.getElementById("seat-list").textContent = personal_bookedSeats.join(", "); 
    
    // กรองข้อมูลที่นั่งที่ไม่ถูกต้อง (ช่องว่าง, null, หรือ undefined)
    personal_bookedSeats = personal_bookedSeats.filter(seat => seat.trim() !== "");
    const vipSeats = personal_bookedSeats.filter(seat => seat.startsWith("VIP"));
    const regularSeats = personal_bookedSeats.filter(seat => !seat.startsWith("VIP"));

    // let a = {"number":[1,2,3]};
    // localStorage.setItem("test", JSON.stringify(a));

    // แสดงข้อมูลการจอง
    if (personal_bookedSeats.length > 0) {
        const totalPriceAmount = (regularSeats.length * 100) + (vipSeats.length*300);
        selectedSeatsDetails.textContent = personal_bookedSeats.join(", ");
        totalPrice.textContent = totalPriceAmount;
    } 
    else {
        selectedSeatsDetails.textContent = "ไม่มีการจองที่นั่ง";
        totalPrice.textContent = "ราคาทั้งหมด: 0 บาท";
    }

    // ฟังก์ชันย้อนกลับไปหน้าจองที่นั่ง
    backButton.addEventListener("click", () => {
        localStorage.removeItem("personal_bookedSeats");

        window.location.href = "booking.html"; // กลับไปหน้าจองที่นั่ง
    });

    // ฟังก์ชันสำหรับการชำระเงิน
    payButton.addEventListener("click", () => {
        // const name = "Nick";
        // // ประกาศตัวแปร username จาก input
        // const username = document.getElementById("user").value.trim();

        // ดึงข้อมูลที่นั่งที่ถูกจองจาก Local Storage
        let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

        // let totalPrice = 0;
        // if (personal_bookedSeats.length > 0) {
        //     const vipSeats = personal_bookedSeats.filter(seat => seat.startsWith("VIP"));
        //     const regularSeats = personal_bookedSeats.filter(seat => !seat.startsWith("VIP"));
        //     totalPrice = (regularSeats.length * 100) + (vipSeats.length*300);
        // }

        // บันทึกการจองทั้งหมด
        bookedSeats = [...bookedSeats, ...personal_bookedSeats];
        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

        localStorage.removeItem("personal_bookedSeats");

        alert('การชำระเงินสำเร็จ!');
        window.location.href = "index.html"; // กลับไปหน้าจองที่นั่ง
    });
});
