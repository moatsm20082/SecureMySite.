document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const userIcon = document.getElementById("user-icon");

    // ✅ تحميل بيانات المستخدم
    let storedUser = JSON.parse(localStorage.getItem("userData")) || {};

    // ✅ تحديث صورة المستخدم إذا كان مسجل دخول
    if (userIcon) {
        let savedImage = sessionStorage.getItem("profileImage") || storedUser.profileImage;
        if (savedImage) {
            userIcon.src = savedImage;
        }
    }

    // ✅ تسجيل حساب جديد مع صورة
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value.trim();
            const profilePicInput = document.getElementById("profile-pic");

            let userData = { username, email, password };

            if (profilePicInput.files.length > 0) {
                const file = profilePicInput.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                    userData.profileImage = e.target.result;
                    localStorage.setItem("userData", JSON.stringify(userData));
                    redirectToLogin();
                };
                reader.readAsDataURL(file);
            } else {
                localStorage.setItem("userData", JSON.stringify(userData));
                redirectToLogin();
            }
        });
    }

    // ✅ تسجيل الدخول وتحديث الصورة فورًا
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();

            if (email === storedUser.email && password === storedUser.password) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("profileImage", storedUser.profileImage || "");

                // ✅ تحديث صورة المستخدم مباشرة بعد تسجيل الدخول
                if (userIcon && storedUser.profileImage) {
                    userIcon.src = storedUser.profileImage;
                }

                showSuccess("✅ تسجيل دخول ناجح!");
                setTimeout(() => window.location.replace("index.html"), 300);
            } else {
                showError("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!");
            }
        });
    }

    function redirectToLogin() {
        showSuccess("🎉 تم إنشاء الحساب بنجاح! جاري نقلك...");
        setTimeout(() => window.location.replace("login.html"), 300);
    }

    function showSuccess(msg) {
        let successDiv = document.createElement("div");
        successDiv.textContent = msg;
        successDiv.style.cssText = "color: green; font-weight: bold; text-align: center;";
        document.body.appendChild(successDiv);
    }

    function showError(msg) {
        let errorDiv = document.getElementById("error-msg");
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.id = "error-msg";
            document.body.appendChild(errorDiv);
        }
        errorDiv.textContent = msg;
        errorDiv.style.cssText = "color: red; font-weight: bold; text-align: center;";
    }
});
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}
