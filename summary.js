document.addEventListener("DOMContentLoaded", () => {
    const selectedSeatsDetails = document.getElementById('seat-list');
    const totalPrice = document.getElementById('total-price');
    const backButton = document.getElementById('back-btn');
    const payButton = document.getElementById('pay-btn');

    // console.log(localStorage);

    let personal_bookedSeats = JSON.parse(localStorage.getItem("personal-seats"));

    //นำค่าจาก localStorage เข้าตัวแปร selectedMovieTitle
    let selectedMovieTitle = localStorage.getItem("selectedMovieTitle");
    let selectedTheater = localStorage.getItem("selectedTheater");
    let selectedTime = localStorage.getItem("selectedTime");

    document.getElementById("movie-title").textContent = selectedMovieTitle;
    document.getElementById("Theater").textContent = selectedTheater;

    console.log(localStorage);

    function addToHistory(movie, theater, time, seats, price) {
        let history = JSON.parse(localStorage.getItem("bookingHistory")) || {};
        let personnal_info = JSON.parse(localStorage.getItem("personal-info")) || [];
        
        const token = localStorage.getItem("token");
        const decode = jwt_decode(token);
        const user = decode.phone;        

        const newBooking = {
            user: user,
            movie: movie,
            theater: theater,
            time: time,
            seats: seats,
            price: price,
            date: new Date().toISOString().split("T")[0]  // เก็บวันที่จอง
        };
        personnal_info.push(newBooking);

        // ถ้าเบอร์นี้ยังไม่มีประวัติ ให้สร้าง array ใหม่

        // ตั้งค่าใหม่ให้ history[movie][theater][time]
        if (!history[movie]) {
            history[movie] = {};
        }
        if (!history[movie][theater]) {
            history[movie][theater] = {};
        }
        if (!history[movie][theater][time]) {
            history[movie][theater][time] = [];
        }

        console.log(history);

        // เพิ่มข้อมูลใหม่ลงไป
        history[movie][theater][time] = history[movie][theater][time].concat(seats);

        // เซฟกลับเข้า localStorage
        localStorage.setItem("personal-info", JSON.stringify(personnal_info));
        localStorage.setItem("bookingHistory", JSON.stringify(history));
    }

    document.getElementById("seat-list").textContent = personal_bookedSeats.join(", ");
    // กรองข้อมูลที่นั่งที่ไม่ถูกต้อง (ช่องว่าง, null, หรือ undefined)
    personal_bookedSeats = personal_bookedSeats.filter(seat => seat.trim() !== "");

    const vipSeats = personal_bookedSeats.filter(seat => seat.startsWith("VIP"));
    const regularSeats = personal_bookedSeats.filter(seat => !seat.startsWith("VIP"));

    let totalPriceAmount = 0;

    // แสดงข้อมูลการจอง
    if (personal_bookedSeats.length > 0) {
        totalPriceAmount = (regularSeats.length * 100) + (vipSeats.length * 300);
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

        addToHistory(selectedMovieTitle, selectedTheater, selectedTime, personal_bookedSeats, totalPriceAmount);

        localStorage.removeItem("personal_bookedSeats");

        localStorage.removeItem("selectedMovieTitle");
        localStorage.removeItem("selectedTheater");
        localStorage.removeItem("selectedTime");

        // localStorage.removeItem("bookingHistory");

        alert('การชำระเงินสำเร็จ!');
        window.location.href = "index.html"; // กลับไปหน้าจองที่นั่ง
    });

});
