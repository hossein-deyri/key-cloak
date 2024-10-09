let timerDurationValue = 0;

let CONFIGS = {
  BANNER:
    "https://upload.wikimedia.org/wikipedia/en/d/d5/Lee_%282023_film_poster%29.jpg",
  LOGO: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
  ON_SUBMIT: () => {
    openModal();

    setTimeout(() => {
      closeModal();
    }, 3000);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const phoneInput = document.getElementById("phone-number");

  // handle logo
  document.getElementById("logo").src = CONFIGS.LOGO;

  // handle banner
  let banner = document.getElementById("custom-banner");
  banner.style.backgroundImage = `url(${CONFIGS.BANNER})`;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    CONFIGS.ON_SUBMIT();
  });

  phoneInput.addEventListener("input", (e) => {
    let phoneNumber = e.target.value;
    phoneNumber = phoneNumber.replace(/\D/g, "");

    if (phoneNumber.length > 11) {
      phoneNumber = phoneNumber.substring(0, 11);
    }

    e.target.value = phoneNumber;
  });
});

var modal = document.getElementById("wraapper-modal");
var span = document.getElementsByClassName("close")[0];
var descriptionModal = (document.getElementById("description-modal").innerText =
  "عملیات با خطا مواجه  شد");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
