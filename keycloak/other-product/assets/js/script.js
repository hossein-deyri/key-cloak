let CONFIGS = {
  BANNER:
    "https://upload.wikimedia.org/wikipedia/en/d/d5/Lee_%282023_film_poster%29.jpg",
  LOGO: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
};

document.addEventListener("DOMContentLoaded", function () {
  // handle banner
  let banner = document.getElementById("custom-banner");
  banner.style.backgroundImage = `url(${CONFIGS.BANNER})`;

  // handle logo
  document.getElementById("logo").src = CONFIGS.LOGO;
});
