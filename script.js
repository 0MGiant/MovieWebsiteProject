const langBtn = document.getElementById("lang-btn");
const menuItems = document.querySelectorAll(".menu-list-item");
const profileText = document.querySelector(".profile-text");
const poster = document.querySelectorAll(".movie-title");
let currentLang = "en"; // กำหนดค่าเริ่มต้นเป็นอังกฤษ

const translations = {
    en: {
        home: "Home",
        movie: "Movie",
        theater: "Theater",
        profile: "Profile",
        button: "EN",
        poster1: "Kimetsu No Yaiba Infinity train",
        poster2: "Kimetsu No Yaiba Infinity Castle"
    },
    th: {
        home: "หน้าแรก",
        movie: "หนัง",
        theater: "โรงภาพยนตร์",
        profile: "โปรไฟล์",
        button: "TH",
        poster1: "ดาบพิฆาตอสูร ศึกรถไฟสู่นิรันดร์",
        poster2: "ดาบพิฆาตอสูร ภาคปราสาทไร้ขอบเขต พาร์ท 1"
    }
};
// ฟังก์ชันเปลี่ยนภาษา
function switchLanguage() {
    if (currentLang === "en") {
        currentLang = "th";
    } else {
        currentLang = "en";
    }

    menuItems[0].textContent = translations[currentLang].home;
    menuItems[1].textContent = translations[currentLang].movie;
    menuItems[2].textContent = translations[currentLang].theater;
    profileText.textContent = translations[currentLang].profile;
    langBtn.textContent = translations[currentLang].button;
    
    poster[0].textContent = translations[currentLang].poster1;
    poster[1].textContent = translations[currentLang].poster2;
}
document.querySelectorAll(".fa-couch").forEach(seat => {
    seat.addEventListener("click", function() {
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
// กดปุ่มเปลี่ยนภาษา
langBtn.addEventListener("click", switchLanguage);
// แสดงรอบหนัง
function showSeat(time){
    let allSeats = document.querySelectorAll(".booking-container");
    allSeats.forEach(seat => seat.classList.add("hidden"));

    //let otherTheaters = document.querySelectorAll(`.booking-container:not([data-theater="${theater}"])`);
    //otherTheaters.forEach(theater => theater.classList.add("hidden"));
    
    let selectedSeat = document.querySelector(`.booking-container[data-time="${time}"]`);
    if (selectedSeat) {
        selectedSeat.classList.toggle("show");
    }
}