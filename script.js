const langBtn = document.getElementById("lang-btn");
const profileText = document.querySelector(".profile-text");
const poster = document.querySelectorAll(".movie-title");
let currentLang = "EN"; // กำหนดค่าเริ่มต้นเป็นอังกฤษ

const translations = {
    EN: {
        profile: "Profile",
        button: "EN",
        poster1: "Kimetsu No Yaiba Infinity train",
        poster2: "Kimetsu No Yaiba Infinity Castle"
    },
    TH: {
        profile: "โปรไฟล์",
        button: "TH",
        poster1: "ดาบพิฆาตอสูร ศึกรถไฟสู่นิรันดร์",
        poster2: "ดาบพิฆาตอสูร ภาคปราสาทไร้ขอบเขต พาร์ท 1"
    }
};
// ฟังก์ชันเปลี่ยนภาษา
function switchLanguage() {
    if (currentLang === "EN") {
        currentLang = "TH";
    } else {
        currentLang = "EN";
    }
    profileText.textContent = translations[currentLang].profile;
    langBtn.textContent = translations[currentLang].button;

    poster[0].textContent = translations[currentLang].poster1;
    poster[1].textContent = translations[currentLang].poster2;
}

// กดปุ่มเปลี่ยนภาษา
langBtn.addEventListener("click", switchLanguage);

// แสดงรอบหนัง
function showSeat(time, theater) {
    // สร้าง URL สำหรับหน้าเว็บใหม่ (ปรับตามโครงสร้างเว็บของคุณ)
    const newPageUrl = `booking.html?movie=${movie}&time=${time}&theater=${theater}`;

    // เปลี่ยนหน้าไปยัง URL ใหม่
    window.location.href = newPageUrl;

}
//ล้าง selectedMovieTitle selectedTheater selectedTime
const logo = document.getElementById("imglogo");
logo.addEventListener("click", function () {
    localStorage.removeItem("selectedMovieTitle");
    localStorage.removeItem("selectedTheater");
    localStorage.removeItem("selectedTime");
});
//

let selectedSeats = [];
let personal_bookedSeats = [];
function createSeatLayout(a, b, c) {
    const container = document.getElementById("seating-chart-first");
    container.innerHTML = ""; // ล้างเนื้อหาเก่าก่อนสร้างใหม่

    let selectedSeats = JSON.parse(localStorage.getItem("bookingHistory")) || {};

    let movieBookedSeats = selectedSeats[a] || [];
    let movieBookedSeats2 = movieBookedSeats[b] || [];
    let movieBookedSeats3 = movieBookedSeats2[c] || [];


    console.log(movieBookedSeats3);

    for (let row = 1; row < 10; row++) {
        let rowDiv = document.createElement("div");
        if (row > 0 && row < 9) {
            rowDiv.classList.add("seat-row");
            if (row == 5) {
                rowDiv.style.marginTop = "20px";
            }
        }
        else {
            rowDiv.style.marginTop = "20px";
            rowDiv.classList.add("vip-row");
        }

        for (let col = 1; col < 19; col++) {
            const seat = document.createElement("div");

            seat.classList.add("fa-solid", "fa-couch");
            if (row == 9) {
                const rowLetter = "VIP";
                seat.dataset.seatId = `${rowLetter}${col}`;
                seat.style.color = "#2a80f8";
                if (col % 2 == 0) {
                    seat.style.marginRight = "0px";
                }
                if (movieBookedSeats3.includes(`VIP${col}`)) {
                    seat.classList.remove("fa-couch");
                    seat.classList.add("fa-check-circle", "booked"); // เปลี่ยนเป็นเครื่องหมายเช็ค
                    seat.style.color = "#e8ce22"; // เปลี่ยนเป็นสีแดงส้ม
                    seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
                    seat.style.height = "min(2.2rem, 2.5vw)";
                }
            }
            else {
                const rowLetter = String.fromCharCode(64 + row);
                seat.dataset.seatId = `${rowLetter}${col}`;
                seat.style.color = "#63E6BE";
                if (movieBookedSeats3.includes(`${String.fromCharCode(64 + row)}${col}`)) {

                    seat.classList.remove("fa-couch");
                    seat.classList.add("fa-check-circle", "booked"); // เปลี่ยนเป็นเครื่องหมายเช็ค
                    seat.style.color = "#e8ce22"; // เปลี่ยนเป็นสีแดงส้ม
                    seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
                    seat.style.height = "min(2.2rem, 2.5vw)";
                }
            }
            // เพิ่ม Event Listener สำหรับเลือกที่นั่ง
            seat.addEventListener("click", () => toggleSeat(seat));
            rowDiv.appendChild(seat);
        }
        container.appendChild(rowDiv);
    }
}
// เรียกใช้ฟังก์ชันสร้างที่นั่งเมื่อหน้าโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
    let a = localStorage.getItem("selectedMovieTitle");
    let b = localStorage.getItem("selectedTheater");
    let c = localStorage.getItem("selectedTime");
    createSeatLayout(a, b, c);
    seat.addEventListener("click", () => toggleSeat(seat));
    /*document.querySelectorAll(".fa-couch").forEach(seat => {
        seat.addEventListener("click", function () {
            let selectedSeats = JSON.parse(localStorage.getItem("bookingHistory")) || {};
    
            let movieBookedSeats = selectedSeats[a] || [];
            let movieBookedSeats2 = movieBookedSeats[b] || [];
            let movieBookedSeats3 = movieBookedSeats2[c] || [];
            
            if (!this.dataset.originalColor) {
                this.dataset.originalColor = getComputedStyle(this).color; // เก็บสีเดิม
            }
            this.classList.toggle("selected");
            console.log(this.seat);
            //console.log(this.classList);
            //ถ้า มี seat นี้อยู่ใน history จะให้เป็น booked
            if (movieBookedSeats3.includes(this.id)) { // ใช้ ID หรือค่าที่เหมาะสมในการตรวจสอบ
                this.classList.add("booked"); // ถ้าที่นั่งถูกจองแล้ว
            }else if (this.classList.contains("selected")) {
                this.classList.remove("fa-couch");
                this.classList.add("fa-check-circle"); // เปลี่ยนเป็น icon อื่น
                this.style.color = "#ef6347";
            } else {
                this.classList.remove("fa-check-circle");
                this.classList.add("fa-couch"); // เปลี่ยนกลับเป็น icon เดิม
                this.style.color = this.dataset.originalColor; // คืนค่าสีเดิม
            }
        });
    });*/
    // createSeatLayout();     
});

function toggleSeat(seat) {
    //console.log(seat);
    personal_bookedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const seatId = seat.dataset.seatId;
    let bookingHistory = JSON.parse(localStorage.getItem("bookingHistory")) || {};
    const a = localStorage.getItem("selectedMovieTitle");
    const b = localStorage.getItem("selectedTheater");
    const c = localStorage.getItem("selectedTime");
    console.log(seatId);
    const isBooked = seat.classList.contains("booked") || (bookingHistory[a]?.[b]?.[c]?.includes(seatId));

    if (isBooked) {
        alert("ที่นั่งนี้ถูกจองแล้ว!");
        return;
    }

    if (!seat.dataset.originalColor) {
        seat.dataset.originalColor = getComputedStyle(seat).color;
    }

    seat.classList.toggle("selected");


    if (seat.classList.contains("selected")) {
        seat.classList.remove("fa-couch");
        seat.classList.add("fa-check-circle");
        seat.style.color = "#ef6347";
        selectedSeats.push(seatId);
    } else {
        seat.classList.remove("fa-check-circle");
        seat.classList.add("fa-couch");
        seat.style.color = seat.dataset.originalColor;
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));  // บันทึกสถานะที่นั่งใน localStorage
    updateSelectedSeats();
}
//ระบบการจอง
const BookingPage = document.getElementById("booking-page");
const SummaryPage = document.getElementById("summary-page");
const bookingSeat = document.getElementsByClassName("booking-container");
const selectedSeatsList = document.getElementById("seats-list");
const bookButton = document.getElementById("book-seats");

const backButton = document.getElementById("back-movie");
backButton.addEventListener("click", () => {
    window.location.href = "kimetsu-no-yaiba-Infinity-train.html";
    localStorage.removeItem("selectedTheater");
    localStorage.removeItem("selectedTime");
});


// ฟังก์ชันสำหรับการจองที่นั่ง
bookButton.addEventListener("click", () => {
    console.log(selectedSeats.length);
    if (selectedSeats.length > 0) {
        personal_bookedSeats = selectedSeats;
        localStorage.setItem("personal-seats", JSON.stringify(personal_bookedSeats));

        // เปลี่ยนสถานะที่นั่งที่ถูกเลือกเป็นที่จอง
        selectedSeats.forEach(seatId => {
            const seat = document.querySelector(`[data-seat-id="${seatId}"]`);
            seat.classList.remove("selected");
            seat.classList.add("booked");
            seat.innerHTML = `จอง ${seatId}`;
            seat.setAttribute('disabled', 'true');
        });
        console.log(localStorage.getItem("bookedSeats"));
        // เคลียร์การเลือกที่นั่ง
        // selectedSeats = [];
        bookButton.disabled = true;
        console.log(localStorage);

        showSummaryPage();
    }
});

function updateSelectedSeats() {
    selectedSeatsList.innerHTML = "";
    selectedSeats.forEach(seatId => {
        if (selectedSeats.length > 0) {

            selectedSeatsList.textContent = `Seat you select: ${selectedSeats.join(", ")}`;
        } else {
            selectedSeatsList.textContent = "No seat selected";

        }
    });
    bookButton.disabled = selectedSeats.length === 0;  // เปิด/ปิดปุ่ม Booking ตามจำนวนที่เลือก        
}
function showSummaryPage() {
    window.location.href = "summary.html";
}
function showMoviePage() {
    window.location.href = "kimetsu-no-yaiba-Infinity-train.html";
}

const resetButton = document.getElementById('reset-btn');

resetButton.addEventListener("click", () => {
    localStorage.removeItem("bookedSeats");
    localStorage.removeItem("test");
    localStorage.removeItem("personal-seats");
    localStorage.removeItem("selectedMovieTitle");
    localStorage.removeItem("selectedTheater");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("bookingHistory");
    // createSeats();
    window.location.href = "index.html";
    selectedSeats = [];
    bookButton.disabled = true;
});

// ตัวแปรเพื่อเก็บชื่อหนัง
let movieNames = [];

// ฟังก์ชันสำหรับการคลิกที่หนัง
function addMovieName(event) {
    // ดึงชื่อหนังจาก div.movie-title ที่อยู่ใน movie-container เดียวกัน
    let movieTitle = event.target.closest('#kimetsu-no-yaiba-Infinity-train').querySelector('.movie-title').innerText;

    // เพิ่มชื่อหนังที่ถูกคลิกไปยัง movieNames
    movieNames.push(movieTitle);

    // แสดงผลชื่อหนังที่ถูกคลิก
    console.log(`You clicked on: ${movieTitle}`);
    console.log("All clicked movie names:", movieNames);
}

// เพิ่ม event listener ให้กับทุก ๆ รูปภาพใน .movie-container
let movieImages = document.querySelectorAll('.movie-container img');
movieImages.forEach(function (image) {
    image.addEventListener('click', addMovieName);
});

function showPage() {
    let token = localStorage.getItem('token');
    if (token === null) {
        window.location.href = "Form_pattern.html";
    }
    else {
        window.location.href = "booking.html";
    }

}