const translations = {
    en: {
        // Navigation bar
        "nav-home": "Home",
        "nav-about": "About us",
        "nav-quicktest": "Quick Test",
        "nav-blog": "Blog",
        "nav-signup": "Sign up",
        "search-placeholder": "Search...",
        
        // Home

        // About us
        "page-aboutus-title": "About us",

        // Quick test

        // Blog
        "page-blog-title": "Blog",
        "blog-1-title": "What even is ELEPOCKET?",
        "blog-1-desc": "The first ELEBlog ever!",

        "contact-label": "Contact",
        "footer-info-title": "Contact info",

        // Sign up - Sign in
        "sign-up-title": "Sign up",
        "sign-in-title": "Sign in",
        "username-placeholder": "Username",
        "email-placeholder": "Email",
        "password-placeholder": "Password",
        "agree": "I agree to the",
        "terms-of-service": "Terms of Service",
        "and": "and",
        "privacy-policy": "Privacy Policy",
        "of-ELE": "of Elepocket",
        "sign-up-button": "Sign up",
        "sign-in-button": "Sign in",
        "login-now": "Login now",
        "signup-now": "Register now",
        "already-have-account": "Already have an account?",

        "remember": "Remember me",
        "forgot-password": "Forgot password?",
        "dont-have-account": "Don't have an account?",
    },
    vi: {
        // Thanh điều hướng
        "nav-home": "Trang chủ",
        "nav-about": "Về chúng tôi",
        "nav-quicktest": "Test nhanh",
        "nav-blog": "Bài viết",
        "nav-signup": "Đăng ký",
        "search-placeholder": "Tìm kiếm...",

        // Trang chủ

        // Về chúng tôi
        "page-aboutus-title": "Về chúng tôi",

        // Bài viết
        "page-blog-title": "Bài viết",
        "blog-1-title": "ELEPOCKET là cái gì vậy?",
        "blog-1-desc": "Bài viết đầu tiên của tụi mình!",

        "contact-label": "Liên hệ",
        "footer-info-title": "Thông tin liên hệ",

        // Đăng ký - Đăng nhập
        "sign-up-title": "Đăng ký",
        "sign-in-title": "Đăng nhập",
        "username-placeholder": "Tên người dùng",
        "email-placeholder": "Email",
        "password-placeholder": "Mật khẩu",
        "agree": "Tôi đồng ý với",
        "terms-of-service": "Điều khoản",
        "and": "và",
        "privacy-policy": "Chính sách bảo mật",
        "of-ELE": "của Elepocket",
        "sign-up-button": "Đăng ký",
        "sign-in-button": "Đăng nhập",
        "login-now": "Đăng nhập ngay",
        "signup-now": "Đăng ký ngay",
        "already-have-account": "Đã có tài khoản?",

        "remember": "Ghi nhớ tôi",
        "forgot-password": "Quên mật khẩu?",
        "dont-have-account": "Chưa có tài khoản?",
    }
}

function changeLanguage(lang) {
    // Lưu ngôn ngữ vào bộ nhớ
    localStorage.setItem('selectedLang', lang);

    // Thay đổi nội dung các thẻ văn bản
    const elements = document.querySelectorAll('[data-lang]');

    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });


    const searchInputs = document.querySelectorAll('input[placeholder]');
    searchInputs.forEach(input => {
        const key = input.getAttribute('data-lang');
        // Kiểm tra key
        if(key && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'vi';
    changeLanguage(savedLang);

    const toggle = document.getElementById('language-toggle');
    if (toggle) {
        toggle.checked = (savedLang === 'en');

        toggle.addEventListener('change', function() {
            if (this.checked) {
                changeLanguage('en');
            } else {
                changeLanguage('vi'); 
            }
        });
    }
});