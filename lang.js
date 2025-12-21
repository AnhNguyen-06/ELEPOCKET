const translations = {
    en: {
        "nav-home": "Home",
        "nav-about": "About us",
        "nav-quicktest": "Quick Test",
        "nav-blog": "Blog",
        "nav-signup": "Sign up",
        "search-placeholder": "Search...",
        
        "page-blog-title": "Blog",
        "blog-1-title": "What even is ELEPOCKET?",
        "blog-1-desc": "The first ELEBlog ever!",

        "contact-label": "Contact",
        "footer-info-title": "Contact info"
    },
    vi: {
        "nav-home": "Trang chủ",
        "nav-about": "Về chúng tôi",
        "nav-quicktest": "Test nhanh",
        "nav-blog": "Bài viết",
        "nav-signup": "Đăng ký",
        "search-placeholder": "Tìm kiếm...",

        "page-blog-title": "Bài viết",
        "blog-1-title": "ELEPOCKET là cái gì vậy?",
        "blog-1-desc": "Bài viết đầu tiên của tụi mình!",

        "contact-label": "Liên hệ",
        "footer-info-title": "Thông tin liên hệ"
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