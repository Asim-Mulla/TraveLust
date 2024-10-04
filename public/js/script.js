// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//////////////////////

let filters = document.querySelectorAll(".filter");
let filtersContainer = document.querySelector(".filters");
let leftArrow = document.querySelector(".scroll-icon-left");
let rightArrow = document.querySelector(".scroll-icon-right");

let manageIcons = () => {
  if (filtersContainer.scrollLeft >= 20) {
    leftArrow.classList.add("active");
  } else {
    leftArrow.classList.remove("active");
  }

  let maxScrollValue =
    filtersContainer.scrollWidth - filtersContainer.clientWidth - 20;

  if (filtersContainer.scrollLeft >= maxScrollValue) {
    rightArrow.classList.remove("active");
  } else {
    rightArrow.classList.add("active");
  }
};

rightArrow.addEventListener("click", () => {
  filtersContainer.scrollLeft += 400;
  manageIcons();
});
leftArrow.addEventListener("click", () => {
  filtersContainer.scrollLeft -= 400;
  manageIcons();
});

filtersContainer.addEventListener("scroll", manageIcons);

// tax toggle functionality

let taxToggle = document.getElementById("flexSwitchCheckDefault");
taxToggle.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

//
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  let scrollUpDiv = document.querySelector(".scroll_up");
  let currentScrollY = window.scrollY;

  if (currentScrollY < lastScrollY) {
    scrollUpDiv.classList.add("show");
  } else {
    scrollUpDiv.classList.remove("show");
  }

  lastScrollY = currentScrollY;
});

let taxToggle_2 = document.getElementById("flexSwitchCheckDefault_2");
if (taxToggle_2) {
  taxToggle_2.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const filters = document.querySelectorAll(".filter");
  const bottom_nav_icons = document.querySelectorAll(".bottom_nav_icon");

  filters.forEach((filter) => {
    if (filter.getAttribute("href") === currentPath) {
      const child = filter.querySelector(".filterDiv");
      child.classList.add("active");
    }
  });

  bottom_nav_icons.forEach((icon) => {
    if (icon.getAttribute("href") === currentPath) {
      icon.classList.add("active");
    }
  });

  const scrollableContainer = document.querySelector(".filters");

  // Disable smooth scrolling temporarily
  scrollableContainer.style.scrollBehavior = "auto";

  // Restore the scroll position if it's available in sessionStorage
  const savedScrollPosition = sessionStorage.getItem("scrollPosition");
  if (savedScrollPosition) {
    scrollableContainer.scrollLeft = savedScrollPosition;
  }

  // Disable smooth scrolling temporarily
  scrollableContainer.style.scrollBehavior = "";

  // Save the scroll position before the page is unloaded
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPosition", scrollableContainer.scrollLeft);
  });

  // Alternatively, you can save the scroll position whenever user scrolls
  scrollableContainer.addEventListener("scroll", () => {
    sessionStorage.setItem("scrollPosition", scrollableContainer.scrollLeft);
  });
});
