// Main JavaScript File (main.js)

// Hide navbar on scroll down, show on scroll up
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    navbar.classList.remove("navbar-hidden");
    return;
  }
  let scrollTimeout;
  if (currentScroll > lastScroll) {
    navbar.classList.add("navbar-hidden");
  } else {
    navbar.classList.remove("navbar-hidden");
  }
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    navbar.classList.remove("navbar-hidden");
  }, 900);
  lastScroll = currentScroll;
});

// Laptop data array
const laptops = [
  {
    id: 1,
    name: "Dell XPS 15",
    price: 7300,
    discount: 10,
    image: "images/unnamed.jpg",
    category: "premium",
  },
  {
    id: 2,
    name: "HP Spectre x360",
    price: 8400,
    discount: 15,
    image: "images/كيفية_اختيار_انواع_اللاب_توب_والحجم_والوزن_المناسبين.webp",
    category: "premium",
  },
  {
    id: 3,
    name: "Lenovo ThinkPad",
    price: 6400,
    discount: 10,
    image: "images/افضل-لابتوب-لمعالجة-الصور-7.webp",
    category: "business",
  },
  {
    id: 4,
    name: "Dell Inspiron",
    price: 9000,
    discount: 20,
    image: "images/Dell-min637730397900548887-w960.jpg",
    category: "budget",
  },
  {
    id: 5,
    name: "MacBook Pro",
    price: 7000,
    discount: 18,
    image: "images/alrams-61c429ff11.jpg",
    category: "premium",
  },
  {
    id: 6,
    name: "ASUS ROG",
    price: 6600,
    discount: 25,
    image: "images/aghl-lab-tob-fy-alaaalm-asus-rog-s17main6295df7fee15f.jpg",
    category: "gaming",
  },
  {
    id: 7,
    name: "Acer Swift 3",
    price: 5500,
    discount: 10,
    image: "images/71R0XLrsuEL.jpg",
    category: "budget",
  },
  {
    id: 8,
    name: "Microsoft Surface",
    price: 5000,
    discount: 22,
    image: "images/51JZiCYZ+9S.jpg",
    category: "premium",
  },
];

// Function to render laptops
function renderLaptops(laptopsToRender = laptops) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  laptopsToRender.forEach((laptop) => {
    const discountedPrice = laptop.price * (1 - laptop.discount / 100);

    tbody.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box mb-3 bg-white position-relative" 
                data-work="${laptop.discount}% OFF" 
                data="${laptop.name}">
                <img class="img-fluid" src="${laptop.image}" alt="${
      laptop.name
    }" />
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="text-uppercase mb-0">${laptop.name}</p>
                <span class="fw-bold">EGP ${discountedPrice.toFixed(0)}</span>
            </div>
            <a href="#" class="btn view-btn rounded-pill text-uppercase w-100 mt-2" data-id="${
              laptop.id
            }">
                More Info
            </a>
        </div>
        `;
  });

  // Add event listeners to all "More Info" buttons
  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const laptopId = parseInt(this.getAttribute("data-id"));
      const laptop = laptops.find((l) => l.id === laptopId);
      showLaptopDetails(laptop);
    });
  });
}

// Function to show laptop details in a modal
function showLaptopDetails(laptop) {
  const discountedPrice = laptop.price * (1 - laptop.discount / 100);

  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="laptopModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${laptop.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${laptop.image}" class="img-fluid" alt="${
    laptop.name
  }">
                        </div>
                        <div class="col-md-6">
                            <p><strong>Original Price:</strong> EGP ${
                              laptop.price
                            }</p>
                            <p><strong>Discount:</strong> ${
                              laptop.discount
                            }% OFF</p>
                            <p><strong>Final Price:</strong> EGP ${discountedPrice.toFixed(
                              0
                            )}</p>
                            <hr>
                            <button class="btn btn-success w-100">Add to Cart</button>
                            <button class="btn btn-outline-primary w-100 mt-2">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("laptopModal"));
  modal.show();

  // Remove modal when closed
  document
    .getElementById("laptopModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

// Search functionality
function InputSearch() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const filteredLaptops = laptops.filter((laptop) =>
    laptop.name.toLowerCase().includes(searchInput)
  );
  renderLaptops(filteredLaptops);
}

// Category filtering
document.querySelectorAll(".our-work ul li").forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all items
    document.querySelectorAll(".our-work ul li").forEach((i) => {
      i.classList.remove("active");
    });

    // Add active class to clicked item
    this.classList.add("active");

    const category = this.textContent.toLowerCase();

    if (category === "all") {
      renderLaptops();
    } else {
      const filteredLaptops = laptops.filter((laptop) => {
        if (category === "design") return laptop.category === "premium";
        if (category === "code") return laptop.category === "business";
        if (category === "photo") return laptop.category === "gaming";
        if (category === "app") return laptop.category === "budget";
        return true;
      });
      renderLaptops(filteredLaptops);
    }
  });
});

document
  .querySelector('.search-form input[type="submit"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("search").focus();
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      window.scrollTo({
        top: shopSection.offsetTop - 1,
        behavior: "smooth",
      });
    }
    InputSearch();
  });
// Instant search as you type
document.getElementById("search").addEventListener("input", InputSearch);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Newsletter subscription
document
  .querySelector('.subscribe input[type="submit"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.querySelector('.subscribe input[type="text"]').value;

    if (email && email.includes("@") && email.includes(".")) {
      alert("Thank you for subscribing to our newsletter!");
      document.querySelector('.subscribe input[type="text"]').value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderLaptops();
  // Add hover effect to laptop boxes
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.03)";
      this.style.transition = "transform 0.3s ease";
    });

    box.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});
