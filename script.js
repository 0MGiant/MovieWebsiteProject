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
function showSeat(time,theater) {
    // ตรวจสอบว่ามีข้อมูล time และ theater หรือไม่

    // สร้าง URL สำหรับหน้าเว็บใหม่ (ปรับตามโครงสร้างเว็บของคุณ)
    const newPageUrl = `booking.html?movie=${movie}&time=${time}&theater=${theater}`;

    // เปลี่ยนหน้าไปยัง URL ใหม่
    window.location.href = newPageUrl;

}
function createSeatLayout(containerId, rows, cols, isVIP = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // ล้างเนื้อหาเก่าก่อนสร้างใหม่

    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add(isVIP ? "vip-row" : "seat-row");

        for (let col = 0; col < cols; col++) {
            const seat = document.createElement("i");
            seat.classList.add("fa-solid", "fa-couch");
            const rowLetter =  isVIP ? "VIP" : String.fromCharCode(65 + row);  
            seat.dataset.seatId = `${rowLetter}${col + 1}`;
            seat.style.color = isVIP ? "#2a80f8" : "#63E6BE"; // สีฟ้า = VIP, สีเขียว = ปกติ

            // เพิ่ม Event Listener สำหรับเลือกที่นั่ง
            seat.addEventListener("click", () => toggleSeat(seat));

            rowDiv.appendChild(seat);
        }

        container.appendChild(rowDiv);
    }
}
// เรียกใช้ฟังก์ชันสร้างที่นั่งเมื่อหน้าโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
    createSeatLayout("seating-chart-first", 4, 18); // ที่นั่งปกติ 4 แถว × 18 คอลัมน์
    createSeatLayout("seating-chart-second", 4, 18); // ที่นั่งปกติอีกชุด
    createSeatLayout("vip-row", 2, 4, true); // ที่นั่ง VIP 2 แถว × 4 คอลัมน์
});
//ระบบการจอง
const BookingPage  = document.getElementById("booking-page");
//const SummaryPage = document.getElementById("summary-page");
const bookingSeat = document.getElementsByClassName("booking-container");
const selectedSeatsList = document.getElementById("seats-list");
const bookButton = document.getElementById("book-seats");
bookButton.addEventListener("click",()=> showSummaryPage());

const backButton = document.getElementById("back-movie");
backButton.addEventListener("click",()=> showMoviePage());


let selectedSeats = [];

function toggleSeat(seat) {
    if (seat.classList.contains("booked")) {
        alert("ที่นั่งนี้ถูกจองแล้ว!");
        return;
    }
    
    if (!seat.dataset.originalColor) {
        seat.dataset.originalColor = getComputedStyle(seat).color; // เก็บสีเดิม
    }

    seat.classList.toggle("selected");
    const seatId = seat.dataset.seatId;

    if (seat.classList.contains("selected")) {
        seat.classList.remove("fa-couch");
        seat.classList.add("fa-check-circle"); // เปลี่ยนเป็นเครื่องหมายเช็ค
        seat.style.color = "#ef6347"; // เปลี่ยนเป็นสีแดงส้ม
        seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
        seat.style.height = "min(2.2rem, 2.5vw)";
        selectedSeats.push(seatId);
    } else {
        seat.classList.remove("fa-check-circle");
        seat.classList.add("fa-couch"); // กลับเป็นโซฟา
        seat.style.color = seat.dataset.originalColor; // คืนค่าสีเดิม
        seat.style.width = "min(2.2rem, 2.5vw)"; // คงขนาดไว้
        seat.style.height = "min(2.2rem, 2.5vw)";
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    }
    updateSelectedSeats();
}
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
function showMoviePage(){
    window.location.href = "kimetsu-no-yaiba-Infinity-train.html";
}