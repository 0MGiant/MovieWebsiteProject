const translations = {
    "th": {
        "movie-title-1": "ดาบพิฆาตอสูร เดอะมูฟวี่ : ศึกรถไฟสู่นิรันดร์",
        "date": "9 เมษายน 2025",
        "Movie-Genres": "อนิเมชัน, แอคชั่น, แฟนตาซี",
        "Summary": "เนื้อเรื่องย่อ",
        "Summary-page-1": `ทันจิโร่, เนซึโกะ, เซ็นอิตสึ และ อิโนะสุเกะ ได้รับภารกิจใหม่ให้ขึ้นไปยัง
                "ขบวนรถไฟมรณะ" (Mugen Train) ซึ่งมีเหตุการณ์ผู้คนหายตัวไปอย่างลึกลับกลุ่มของทันจิโร่ได้ร่วมมือกับ
                <br>เรนโกคุ เคียวจูโร่ เสาหลักแห่งเปลวเพลิง เพื่อต่อสู้กับปีศาจที่ซ่อนตัวอยู่บนขบวนรถไฟ
                พวกเขาต้องเผชิญกับ เอนมุ อสูรข้างขึ้นลำดับที่ 1 แห่งข้างแรม ซึ่งมีพลังควบคุมความฝัน
                <br>ทำให้เหยื่อติดอยู่ในฝันอันแสนสุขโดยไม่สามารถตื่นขึ้นมาได้ศึกบนขบวนรถไฟสุดเดือดดำเนินไปพร้อมกับการเสียสละครั้งใหญ่ของเรนโกคุ
                ผู้ยืนหยัดปกป้องทุกคนด้วยหัวใจของ<br>นักล่าอสูรที่แท้จริง
                เรื่องราวของเขากลายเป็นแรงบันดาลใจให้ทันจิโร่และพรรคพวกก้าวไปสู่การเป็นนักล่าอสูรที่แข็งแกร่งยิ่งขึ้น`,
        "Theater 2": "โรงภาพยนตร์ที่ 2",
        "Theater 3": "โรงภาพยนตร์ที่ 3",
        "Normal": "ทั่วไป",

        "movie-title-2": "ดาบพิฆาตอสูร: ภาคปราสาทไร้ขอบเขต",
        "Summary-page-2": `ในภาคนี้ ทันจิโร่และเพื่อน ๆ พร้อมกับเหล่าเสาหลักและหน่วยพิฆาตอสูร ถูกเคลื่อนย้ายมายังปราสาทไร้ขอบเขตเพื่อเผชิญหน้ากับคิบุทสึจิ มุซัน อสูรที่แข็งแกร่งที่สุด <br>พวกเขาต้องต่อสู้กับอสูรจันทราที่เหลือในศึกสุดท้าย</div>`,
        "Theater 1": "โรงภาพยนตร์ที่ 1",
        "Theater 4": "โรงภาพยนตร์ที่ 4",

        "screen": "📽️ จอภาพ",
        "booking": "จอง",
        "back": "ย้อนกลับ",
        "Selected-Seats": "ที่นั่งของคุณ",
        "total-amount": "ทั้งหมด :",
        "checkout": "ชำระเงิน",

        "Booking-History": "ประวัติการจองที่นั่ง",
        "his-movie": "หนังเรื่อง :",
        "his-theater": "โรงภาพยนตร์ :",
        "his-time": "เวลา : ",
        "his-seats": "ที่นั่ง : ",
        "his-price": "ราคา : ",
        "his-price-curr": " บาท",
        "his-date": "วันที่ : "
    },
    "en": {
        "movie-title-1": "Kimetsu No Yaiba Infinity Train",
        "date": "9 April 2025",
        "Movie-Genres": "Animation, Action, Fantasy",
        "Summary": "Summary",
        "Summary-page-1": `Tanjiro, Nezuko, Zenitsu, and Inosuke receive a new mission to board the 'Mugen Train' (Infinity Train), 
                where people have been mysteriously disappearing. The group teams up with <br> Rengoku Kyojuro, the Flame Hashira, 
                to fight the demon lurking aboard the train. They face Enmu, the Lower Rank 1 demon of the Moon Pillar, who has the power to manipulate dreams,<br> 
                trapping his victims in a blissful dream from which they cannot awaken. The intense battle on the train progresses alongside a major sacrifice from Rengoku, 
                who stands firm to protect everyone <br> with the heart of a true demon slayer. His story becomes an inspiration for Tanjiro and his companions to strive toward becoming even stronger demon slayers.`,
        "Theater 2": "Theater 2",
        "Theater 3": "Theater 3",
        "Normal": "normal",

        "movie-title-2": "Kimetsu No Yaiba Infinity Castle",
        "Summary-page-2": `In this arc, Tanjiro and his friends, along with the Hashira and the Demon Slayer Corps, are transported to the Infinite Castle to face Kibutsuji Muzan, the strongest demon. 
                <br> They must fight the remaining Upper Rank demons in a final battle.`,
        "Theater 1": "Theater 1",
        "Theater 4": "Theater 4",

        "screen": "📽️ Screen",
        "booking": "Booking",
        "back": "Back",
        "Selected-Seats": "Selected-Seats",
        "total-amount": "Total :",
        "checkout": "Checkout",

        "Booking-History": "Booking History",
        "his-movie": "Movie : ",
        "his-theater": "Theater : ",
        "his-time": "Time : ",
        "his-seats": "Seats : ",
        "his-price": "Price : ",
        "his-price-curr": " Baht",
        "his-date": "Date : "
    }
};

function changeLanguage(lang) {
    const a = localStorage.getItem("selectedMovieTitle");
    const b = localStorage.getItem("selectedTheater");
    const movietitle = document.getElementById("movie-title");
    const movietheater = document.getElementById("Theater");
    if (a == "Kimetsu No Yaiba Infinity Train") {
        movietitle.setAttribute("data-translate", "movie-title-1");
    } else if (a == "Kimetsu No Yaiba Infinity Castle") {
        movietitle.setAttribute("data-translate", "movie-title-2");
    }
    if (b == "Theater_1") {
        movietheater.setAttribute("data-translate", "Theater 1");
    } else if (b == "Theater_2") {
        movietheater.setAttribute("data-translate", "Theater 2");
    } else if (b == "Theater_3") {
        movietheater.setAttribute("data-translate", "Theater 3");
    } else if (b == "Theater_4") {
        movietheater.setAttribute("data-translate", "Theater 4");
    }
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-translate]").forEach(element => {
        let key = element.getAttribute("data-translate");
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}
//data-translate="Summary"