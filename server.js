//นำเข้าโมดูลที่ใช้มา

//express → สร้างเซิร์ฟเวอร์
//cors → อนุญาตให้ Frontend (เว็บ) เชื่อมต่อ
//jsonwebtoken → ใช้สร้าง JWT Token
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//สร้าง Express App และกำหนดค่า
const app = express();
//app.use(cors()) → ให้เว็บที่รันจาก localhost เข้าถึง API ได้
//app.use(express.json()) → ให้เซิร์ฟเวอร์อ่าน JSON request
app.use(cors());
app.use(express.json());

const SECRET_KEY = "my_secret_key";
const USERS_FILE = "database.json";

// อ่านข้อมูลเบอร์โทร
//ถ้าไม่มี users.json → ส่งอาร์เรย์ว่าง [] กลับไป
//ถ้ามี → อ่านไฟล์ แล้วแปลงเป็น JSON Object
function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

// บันทึกข้อมูลผู้ใช้ลงในไฟล์
function saveUser(user) {
    const users = readUsers();
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));  // บันทึกไฟล์ JSON ใหม่
}

// ตรวจสอบล็อกอินจากเบอร์โทร
app.post("/login", (req, res) => {
    const { phone } = req.body;
    const users = readUsers();
    const user = users.find(u => u.phone === phone);

    if (!user) {
        saveUser(user);
        return res.status(401).json({ message: "Phone number is now Register" });
        
    }

    const token = jwt.sign({ phone: user.phone }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// เริ่มเซิร์ฟเวอร์ ในกรณีที่ใช้ Live server
app.listen(5501, () => console.log("Server running on port 5501"));
// เริ่มเซิร์ฟเวอร์ ในกรณีที่ไม่ใช้ Live server
//app.listen(3000, () => console.log("Server running on port 3000"));