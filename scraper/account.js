
//Xử lí validator 
function Validator (options) {

    function validate(inputElement,rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            if(errorMessage) {
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid');  
            } else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');  
            }
    }
    //Lấy element của form cần validate 
    var formElement = document.querySelector(options.form);
    
    if(formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement) {
                //Xử lí trường hợp khi blur ra ngoài
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                //Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}
//Định nghĩa rules
//Nguyên tắc của các rules
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return regex.test(value) ?undefined : 'Vui lòng nhập lại email'
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ?undefined : `Vui lòng nhập tối thiếu ${min} kí tự`
        }
    }
} 

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}


//Xử lí đăng nhập đăng ký
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const emailFormat = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if(email=== "" || password === "") {
        Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng nhập đầy đủ email và mật khẩu.",
            scrollbarPadding: false
        })
        return;
    }

    if(!emailFormat.test(email)){
        Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng nhập lại email."
        })
        return
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Đăng nhập thành công, chuyển hướng đến trang chủ trong 3 giây..."
    })
    setTimeout(() => {
        window.location.href= "index.html";
    }, 3000);
}

function register() {
    const fullname = document.getElementById('regisName').value
    const tel = document.getElementById('regisPhoneNum').value
    const email = document.getElementById('regisEmail').value
    const password = document.getElementById('regisPassword').value
    const gmailFormat = /^[a-zA-Z0-9._-]+@gmail\.com$/
    const telFormat = /^[0-9]+$/ 

    if(fullname === ''|| tel === ''|| email === ''|| password === '' ) {
        Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng nhập đầy đủ thông tin cá nhân."                  
        })
        return
    }

    if(!gmailFormat.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng nhập lại email."
        })
        return
    }
    if(!telFormat.test(tel)) {
        Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng nhập lại số điện thoại."
        })
        return
    }

    Swal.fire({
        icon: "success",
        title: "Đăng ký tài khoản thành công.",
        text: "Chức năng đang được cập nhật..."
    })
}

 //Keyboard envent 
 document.onkeyup = function(e) {
    if(e.which === 27) {
        window.history.back();
    }
 }
//Xử lí chuyển động login
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("changecolor");
});

registerBtn.addEventListener('click', () => {
    container.classList.add("changecolor");
});

