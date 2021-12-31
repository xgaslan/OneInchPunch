
// window.onmount = () =>{
//     console.log("yüklendim")
// }

const form = document.getElementById("loginForm");
const error = document.getElementById("error");
const email = document.getElementById("email");
const password = document.getElementById("password");

window.onload = () => {
    let checkIsLogin = localStorage.getItem("is_login");
    if(checkIsLogin !== null & checkIsLogin !== "false"){
        window.location.replace("file:///C:/Users/10010421/Documents/Projects/OneInchPunchFrontend/dashboard.html")
    }
    else{
        localStorage.clear()
        localStorage.setItem("is_login", false)
        error.style.display = "none"
    }
}


email.addEventListener("keyup", (event) => handleOnChange(event));
password.addEventListener("keyup", (event) => handleOnChange(event));

let emailValue = "";
let passwordValue = "";

const handleOnChange = (event) => {
    if (event.target.name === "email") {
        emailValue = event.target.value;
    }
    if (event.target.name === "password") {
        passwordValue = event.target.value;
    }
};

form.addEventListener("submit", (event) => handleOnSubmit(event));

const handleOnSubmit = (event) => {
    event.preventDefault();
    postLogin(emailValue, passwordValue);
};

const postLogin = (email, password) => {
    return new Promise(() => {
        fetch("https://localhost:44320/api/Authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                const res = response.json()
                res.then((data) =>  
                {
                    // if(data.status !== 200){
                    //     if(data.status === 404){
                    //         error.style.display = "inline-block"
                    //     }
                    //     alert("Bir hata oluştu.")
                    // }
                    // else{
                        localStorage.setItem("name", data.firsName)
                        localStorage.setItem("last_name", data.lastName)
                        localStorage.setItem("is_login", true)
                        window.location.replace("file:///C:/Users/10010421/Documents/Projects/OneInchPunchFrontend/dashboard.html")
                    }
                    
                // }
                )
            })
            .catch((err) => {
                console.log(err);
                alert("Girmiş olduğunuz bilgiler yanlıştır.");
            });
    });
};
