function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const navProfile = document.getElementById("profile-text");
    const navLogout = document.getElementById("logout");
    console.log("Token:", token);  // เช็คค่า token ว่ามีหรือไม่
    console.log("Profile Text Element:", navProfile);  // เช็คว่าเจอ element หรือไม่
    
    if (token && navLogout) {
        navLogout.style.display = "block";  // แสดงปุ่ม logout
          
    } else {
        // ถ้าไม่มี token หรือไม่พบ navLogout ก็ซ่อนปุ่ม logout
        if (navLogout) {
            navLogout.style.display = "none";  // ซ่อนปุ่ม logout หากไม่มี token
        }
    }
    

    if (token && navProfile) {
        const decoded = jwt_decode(token);
        console.log("Decoded:", decoded);  // เช็คผลลัพธ์ของ jwt_decode
        navProfile.innerHTML = `<a href="#">${decoded.phone}</a>`;
    }
});