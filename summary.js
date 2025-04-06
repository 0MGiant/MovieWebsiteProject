document.addEventListener("DOMContentLoaded", () => {
    const selectedSeatsDetails = document.getElementById('seat-list');
    const totalPrice = document.getElementById('total-price');
    const backButton = document.getElementById('back-btn');
    const payButton = document.getElementById('pay-btn');

    // console.log(localStorage);

    let personal_bookedSeats = JSON.parse(localStorage.getItem("personal-seats"));

    //นำค่าจาก localStorage เข้าตัวแปร selectedMovieTitle
    selectedMovieTitle = localStorage.getItem("selectedMovieTitle");
    selectedTheater = localStorage.getItem("selectedTheater");
    selectedTime = localStorage.getItem("selectedTime");

    // console.log(selectedMovieTitle);
    // console.log(selectedTheater);
    // console.log(selectedTime);
    
    
    document.getElementById("movie-title").textContent = selectedMovieTitle; 
    document.getElementById("Theater").textContent = selectedTheater; 
    
    localStorage.removeItem("selectedMovieTitle");
    localStorage.removeItem("selectedTheater");
    localStorage.removeItem("selectedTime");

    addToHistory(selectedMovieTitle, selectedTheater, selectedTime, personal_bookedSeats);
    // localStorage.removeItem("bookingHistory");
    console.log(localStorage);

    function addToHistory(movie, theater, time, seats) {
        const history = JSON.parse(localStorage.getItem("bookingHistory")) || {};
      
        const newBooking = {
          theater: theater,
          time: time,
          seats: seats,
          date: new Date().toISOString().split("T")[0]  // เก็บวันที่จอง
        };
      
        // ถ้าเบอร์นี้ยังไม่มีประวัติ ให้สร้าง array ใหม่
        if (!history[movie]) {
          history[movie] = [];
        }
      
        // เพิ่มข้อมูลใหม่ลงไป
        history[movie].push(newBooking);
      
        // เซฟกลับเข้า localStorage
        localStorage.setItem("bookingHistory", JSON.stringify(history));
      }
 
    document.getElementById("seat-list").textContent = personal_bookedSeats.join(", "); 

    // กรองข้อมูลที่นั่งที่ไม่ถูกต้อง (ช่องว่าง, null, หรือ undefined)
    personal_bookedSeats = personal_bookedSeats.filter(seat => seat.trim() !== "");
    
    // let a = {"number":[1,2,3]};
    // localStorage.setItem("test", JSON.stringify(a));
    
    const vipSeats = personal_bookedSeats.filter(seat => seat.startsWith("VIP"));
    const regularSeats = personal_bookedSeats.filter(seat => !seat.startsWith("VIP"));

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
        // ดึงข้อมูลที่นั่งที่ถูกจองจาก Local Storage
        let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

        // บันทึกการจองทั้งหมด
        bookedSeats = [...bookedSeats, ...personal_bookedSeats];
        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

        localStorage.removeItem("personal_bookedSeats");

        alert('การชำระเงินสำเร็จ!');
        window.location.href = "index.html"; // กลับไปหน้าจองที่นั่ง
    });

});

// สร้างตัวแปรสำหรับเก็บชื่อหนัง
let selectedMovieTitle = "";
let selectedTheater = "";
