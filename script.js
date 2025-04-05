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

document.querySelectorAll(".fa-couch").forEach(seat => {
    seat.addEventListener("click", function () {
        if (!this.dataset.originalColor) {
            this.dataset.originalColor = getComputedStyle(this).color; // เก็บสีเดิม
        }
        this.classList.toggle("selected");
        if (this.classList.contains("selected")) {
            this.classList.remove("fa-couch");
            this.classList.add("fa-check-circle"); // เปลี่ยนเป็น icon อื่น
            this.style.color = "#ef6347";
        } else {
            this.classList.remove("fa-check-circle");
            this.classList.add("fa-couch"); // เปลี่ยนกลับเป็น icon เดิม
            this.style.color = this.dataset.originalColor; // คืนค่าสีเดิม
        }
    });
});

// แสดงรอบหนัง
function showSeat(time, theater) {
    // สร้าง URL สำหรับหน้าเว็บใหม่ (ปรับตามโครงสร้างเว็บของคุณ)
    const newPageUrl = `booking.html?movie=${movie}&time=${time}&theater=${theater}`;

    // เปลี่ยนหน้าไปยัง URL ใหม่
    window.location.href = newPageUrl;

}
function createSeatLayout(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // ล้างเนื้อหาเก่าก่อนสร้างใหม่

    let selectedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    console.log(selectedSeats);
    console.log(localStorage);


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
                if(col%2 == 0) { 
                    seat.style.marginRight = "0px";
                }
                if (selectedSeats.includes(`VIP${col}`)) {
                    seat.classList.remove("fa-couch");
                    seat.classList.add("fa-check-circle"); // เปลี่ยนเป็นเครื่องหมายเช็ค
                    seat.style.color = "#e8ce22"; // เปลี่ยนเป็นสีแดงส้ม
                    seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
                    seat.style.height = "min(2.2rem, 2.5vw)";
                }
            }
            else {
                const rowLetter = String.fromCharCode(64 + row);
                seat.dataset.seatId = `${rowLetter}${col}`;
                seat.style.color = "#63E6BE";
                if (selectedSeats.includes(`${String.fromCharCode(64 + row)}${col}`)) {
                    seat.classList.remove("fa-couch");
                    seat.classList.add("fa-check-circle"); // เปลี่ยนเป็นเครื่องหมายเช็ค
                    seat.style.color = "#e8ce22"; // เปลี่ยนเป็นสีแดงส้ม
                    seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
                    seat.style.height = "min(2.2rem, 2.5vw)";
                }
            }
            // const rowLetter = isVIP ? "VIP" : String.fromCharCode(64 + row);
            // seat.dataset.seatId = `${rowLetter}${col}`;
            //seat.style.color = isVIP ? "#2a80f8" : "#63E6BE"; // สีฟ้า = VIP, สีเขียว = ปกติ

            // เพิ่ม Event Listener สำหรับเลือกที่นั่ง
            seat.addEventListener("click", () => toggleSeat(seat));

            rowDiv.appendChild(seat);
        }

        container.appendChild(rowDiv);
    }
}
// เรียกใช้ฟังก์ชันสร้างที่นั่งเมื่อหน้าโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
    createSeatLayout("seating-chart-first"); // ที่นั่งปกติ 4 แถว × 18 คอลัมน์
    // createSeatLayout("seating-chart-second"); // ที่นั่งปกติอีกชุด
    // createSeatLayout("vip-row",true); // ที่นั่ง VIP 2 แถว × 4 คอลัมน์
});

//ระบบการจอง
const BookingPage = document.getElementById("booking-page");
const SummaryPage = document.getElementById("summary-page");
const bookingSeat = document.getElementsByClassName("booking-container");
const selectedSeatsList = document.getElementById("seats-list");
const bookButton = document.getElementById("book-seats");

const backButton = document.getElementById("back-movie");
backButton.addEventListener("click", () => showMoviePage());

let selectedSeats = [];

function toggleSeat(seat) {
    if (seat.classList.contains("booked")) {
        alert("ที่นั่งนี้ถูกจองแล้ว!");
        return;
    }

    if (!seat.dataset.originalColor) {
        seat.dataset.originalColor = getComputedStyle(seat).color; // เก็บสีเดิม
    }

    // เปลี่ยนสถานะการเลือกที่นั่ง
    seat.classList.toggle("selected");

    const seatId = seat.dataset.seatId;

    if (seat.classList.contains("selected")) {
        seat.classList.remove("fa-couch");
        seat.classList.add("fa-check-circle"); // เปลี่ยนเป็นเครื่องหมายเช็ค
        seat.style.color = "#ef6347"; // เปลี่ยนเป็นสีแดงส้ม
        seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
        seat.style.height = "min(2.2rem, 2.5vw)";
        selectedSeats.push(seatId);
        console.log(selectedSeats);
    } else {
        seat.classList.remove("fa-check-circle");
        seat.classList.add("fa-couch"); // กลับเป็นโซฟา
        seat.style.color = seat.dataset.originalColor; // คืนค่าสีเดิม
        seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
        seat.style.height = "min(2.2rem, 2.5vw)";
        selectedSeats = selectedSeats.filter(id => id !== seatId);
        console.log(selectedSeats);
    }

    updateSelectedSeats();
}

let personal_bookedSeats = [];

// ฟังก์ชันสำหรับการจองที่นั่ง
bookButton.addEventListener("click", () => {
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
    // createSeats();
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
movieImages.forEach(function(image) {
    image.addEventListener('click', addMovieName);
});
