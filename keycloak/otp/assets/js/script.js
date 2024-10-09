let timerDurationValue = 0;

let CONFIGS = {
  EDIT_PHONE_HREF: "./index.html",
  BANNER:
    "https://upload.wikimedia.org/wikipedia/en/d/d5/Lee_%282023_film_poster%29.jpg",
  LOGO: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
  ON_SUBMIT: () => {
    openModal();

    setTimeout(() => {
      closeModal();
    }, 3000);
  },
  PHONE_NUMBER: "09121112233",
  ON_OTP_CHANGE: (value) => {
    console.log(value);
  },
  SET_TIMER: (value) => {
    timerDurationValue = value;
  },
};

document.addEventListener("DOMContentLoaded", function () {
  let otpInput = document.getElementById("otp-container");
  let phoneNumberSpan = document.getElementById("phone-number");
  let timerSection = document.getElementById("timer-section");
  let getCodeAgain = document.getElementById("get-code-again");
  let timerDuration = document.getElementById("timer-duration");
  let submitForm = document.getElementById("login-form");

  // handle banner
  let banner = document.getElementById("custom-banner");
  banner.style.backgroundImage = `url(${CONFIGS.BANNER})`;

  // handle logo
  document.getElementById("logo").src = CONFIGS.LOGO;

  // handle edit phone href
  document.getElementById("edit-phone").href = CONFIGS.EDIT_PHONE_HREF;

  let numberOfDigits = 5;
  let otpBoxes = [];
  let otpValues = Array(numberOfDigits).fill("");

  timerSection.style.display = "none";
  getCodeAgain.style.display = "none";
  phoneNumberSpan.innerHTML = CONFIGS.PHONE_NUMBER;

  for (let i = 0; i < numberOfDigits; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.maxLength = 1;

    input.addEventListener("input", (e) => handleChange(e.target.value, i));
    input.addEventListener("keydown", (e) => handleOnKeyDown(e, i));
    input.addEventListener("paste", handlePaste);
    input.addEventListener("focus", (e) => handleOnFocus(e, i));
    input.addEventListener("keypress", (e) => {
      if (!/[0-9۰-۹]/.test(e.key)) {
        e.preventDefault();
      }
    });

    otpInput.appendChild(input);
    otpBoxes.push(input);
  }

  let timerInterval = null;

  submitForm.addEventListener("submit", (e) => {
    timerDuration.innerHTML = "";
    timerSection.style.display = "block";
    getCodeAgain.style.display = "none";
    CONFIGS.SET_TIMER(80);
    e.preventDefault();
    CONFIGS.ON_SUBMIT();
    startTimer();
  });

  function startTimer() {
    let countdown = timerDurationValue;

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      if (countdown > 0) {
        countdown--;

        let minutes = Math.floor(countdown / 60);
        let seconds = Math.floor(countdown % 60);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDuration.innerHTML = minutes + ":" + seconds;
      } else {
        clearInterval(timerInterval);
        timerDuration.innerHTML = "";
        timerSection.style.display = "none";
        getCodeAgain.style.display = "block";
      }
    }, 1000);
  }

  function handleChange(value, index) {
    let newValue = value
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      .replace(/\D/g, "");

    otpValues[index] = newValue;
    otpBoxes[index].value = newValue;

    if (newValue && index < numberOfDigits - 1) {
      otpBoxes[index + 1].focus();
    }
    CONFIGS.ON_OTP_CHANGE(otpValues.join(""));
  }

  function handleOnKeyDown(e, index) {
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      otpBoxes[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < numberOfDigits - 1) {
      e.preventDefault();
      otpBoxes[index + 1].focus();
    }
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpValues[index - 1] = "";
      otpBoxes[index - 1].focus();
      CONFIGS.ON_OTP_CHANGE(otpValues.join(""));
    }
  }

  function handlePaste(e) {
    let pastedValue = e.clipboardData.getData("text").slice(0, numberOfDigits);
    let pastedNumbers = pastedValue.match(/\d/g);

    if (pastedNumbers) {
      for (let i = 0; i < numberOfDigits && i < pastedNumbers.length; i++) {
        otpValues[i] = pastedNumbers[i];
        otpBoxes[i].value = pastedNumbers[i];
      }
      otpBoxes[Math.min(pastedNumbers.length, numberOfDigits) - 1].blur();
      CONFIGS.ON_OTP_CHANGE(otpValues.join(""));
    }
  }

  function handleOnFocus(e) {
    e.target.select();
  }
});

// toast
let modal = document.getElementById("wraapper-modal");
let span = document.getElementsByClassName("close")[0];
let descriptionModal = (document.getElementById("description-modal").innerText =
  "عملیات با خطا مواجه  شد");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
