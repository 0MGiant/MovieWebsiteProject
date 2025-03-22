// ตั้งค่าผลลัพธ์เริ่มต้น
const homePage = document.getElementById("home");
const cinema1Page = document.getElementById("cinema1");
const cinema2Page = document.getElementById("cinema2");

const cinema1Seats = createSeatManager("cinema1");
const cinema2Seats = createSeatManager("cinema2");

document.getElementById("cinema1-btn").addEventListener("click", () => showCinemaPage(1));
document.getElementById("cinema2-btn").addEventListener("click", () => showCinemaPage(2));
document.getElementById("back-btn1").addEventListener("click", () => showHomePage());
document.getElementById("back-btn2").addEventListener("click", () => showHomePage());

// เพิ่มเหตุการณ์สำหรับปุ่มล้างสถานะที่นั่ง
document.getElementById("clear-seats1").addEventListener("click", () => clearSeats("cinema1"));
document.getElementById("clear-seats2").addEventListener("click", () => clearSeats("cinema2"));

function showCinemaPage(cinemaNumber) {
    homePage.style.display = "none";
    if (cinemaNumber === 1) {
        cinema1Page.style.display = "block";
        cinema1Seats.createSeats();  // สร้างที่นั่งในโรงหนัง 1
    } else if (cinemaNumber === 2) {
        cinema2Page.style.display = "block";
        cinema2Seats.createSeats();  // สร้างที่นั่งในโรงหนัง 2
    }
}

function showHomePage() {
    homePage.style.display = "block";
    cinema1Page.style.display = "none";
    cinema2Page.style.display = "none";
}

// ฟังก์ชันล้างสถานะที่นั่ง
function clearSeats(cinema) {
    const bookedSeatsKey = `${cinema}-bookedSeats`;
    
    // ลบข้อมูลที่จองจาก localStorage
    localStorage.removeItem(bookedSeatsKey);

    // รีเซ็ตสถานะที่นั่งทั้งหมด
    const seatMap = document.getElementById(`seat-map${cinema === "cinema1" ? 1 : 2}`);
    const seats = seatMap.querySelectorAll(".seat");
    seats.forEach(seat => {
        seat.classList.remove("booked");
        seat.classList.remove("selected");
    });

    alert(`ล้างสถานะที่นั่งทั้งหมดใน ${cinema === "cinema1" ? "โรงหนัง 1" : "โรงหนัง 2"}`);
}

// ฟังก์ชันสร้างระบบที่นั่ง
function createSeatManager(cinema) {
    const seatMap = document.getElementById(`seat-map${cinema === "cinema1" ? 1 : 2}`);
    const selectedSeatsList = document.getElementById(`seats-list${cinema === "cinema1" ? 1 : 2}`);
    const bookButton = document.getElementById(`book-seats${cinema === "cinema1" ? 1 : 2}`);
    const bookedSeatsKey = `${cinema}-bookedSeats`;
    
    let selectedSeats = [];

    function createSeats() {
        // ลบที่นั่งเก่าออกก่อนที่จะสร้างที่นั่งใหม่
        seatMap.innerHTML = '';  // ล้างที่นั่งที่มีอยู่แล้ว

        // สร้างที่นั่งใหม่
        for (let i = 1; i <= 20; i++) {
            const seat = document.createElement("div");
            seat.classList.add("seat");
            seat.dataset.seatId = i;
            seat.innerText = i;

            // เช็คสถานะของที่นั่งที่ถูกจองจาก localStorage
            if (localStorage.getItem(bookedSeatsKey)?.split(',').includes(i.toString())) {
                seat.classList.add("booked");
            }

            // เมื่อคลิกที่นั่ง ให้ทำการ toggle การเลือก
            seat.addEventListener("click", () => toggleSeat(seat));

            seatMap.appendChild(seat);
        }
    }

    function toggleSeat(seat) {
        if (seat.classList.contains("booked")) {
            alert("ที่นั่งนี้ถูกจองแล้ว!");
            return;
        }

        seat.classList.toggle("selected");
        const seatId = seat.dataset.seatId;

        if (seat.classList.contains("selected")) {
            selectedSeats.push(seatId);
        } else {
            selectedSeats = selectedSeats.filter(id => id !== seatId);
        }

        updateSelectedSeats();
    }

    function updateSelectedSeats() {
        selectedSeatsList.innerHTML = "";
        selectedSeats.forEach(seatId => {
            const li = document.createElement("li");
            li.textContent = `ที่นั่ง: ${seatId}`;
            selectedSeatsList.appendChild(li);
        });

        bookButton.disabled = selectedSeats.length === 0;
    }

    bookButton.addEventListener("click", () => {
        // บันทึกข้อมูลที่นั่งที่จองไว้ใน localStorage
        localStorage.setItem(bookedSeatsKey, [selectedSeats, localStorage.getItem(bookedSeatsKey)?.split(',')].join(","));
        
        // เปลี่ยนสถานะของที่นั่งที่จองแล้ว
        selectedSeats.forEach(seatId => {
            const seat = document.querySelector(`[data-seat-id="${seatId}"]`);
            seat.classList.remove("selected");
            seat.classList.add("booked");
        });

        alert(`จองที่นั่งเรียบร้อย: ${selectedSeats.join(", ")}`);
        selectedSeats = [];
        updateSelectedSeats();
    });

    return {
        createSeats,
        toggleSeat
    };
}
