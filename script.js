// Wait until the HTML page is completely loaded
document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // 1. FORM HANDLING AND VALIDATION
    // =====================================================

    const form = document.querySelector("#reservation-form");

    if (form) {

        // Message areas (defined here so every handler can use them)
        const formMessage = document.querySelector("#form-message");
        const discountMessage = document.querySelector("#discount-message");

        form.addEventListener("submit", function (e) {

            // Stop page from refreshing
            e.preventDefault();

            // Get username and email (the input id is "name")
            const username = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();

            // Check if both fields are filled
            if (username !== "" && email !== "") {

                formMessage.textContent =
                    "Thank you for visiting, " + username +
                    "! We will contact you at " + email + ".";

            } else {

                formMessage.textContent =
                    "Please enter your name and email.";
            }


            // =================================================
            // 5. AGE VERIFICATION / DISCOUNT
            // =================================================

            const birthYearInput = document.querySelector("#birth-year");

            if (birthYearInput && birthYearInput.value.trim() !== "") {

                // Convert string to integer
                const birthYear = parseInt(birthYearInput.value);

                // Calculate age
                const age = 2026 - birthYear;

                if (!isNaN(birthYear) && age >= 0 && age <= 120) {

                    if (age >= 13 && age <= 25) {

                        discountMessage.textContent =
                            "You are " + age +
                            " years old. You qualify for the student discount!";

                    } else if (age >= 60) {

                        discountMessage.textContent =
                            "You are " + age +
                            " years old. You qualify for the senior discount!";

                    } else {

                        discountMessage.textContent =
                            "You are " + age +
                            " years old. You do not qualify for a student or senior discount.";
                    }

                } else {

                    discountMessage.textContent =
                        "Please enter a valid birth year.";
                }

            } else {

                discountMessage.textContent = "";
            }
        });


        // =====================================================
        // 9. CHARACTER COUNTER
        // =====================================================

        const specialNotes = document.querySelector("#special-notes");
        const characterCount = document.querySelector("#character-count");

        if (specialNotes && characterCount) {

            specialNotes.addEventListener("input", function () {

                const remaining = 100 - specialNotes.value.length;

                characterCount.textContent =
                    remaining + " characters remaining";
            });
        }


        // Reset messages when Clear Form is clicked
        form.addEventListener("reset", function () {

            setTimeout(function () {

                if (characterCount) {
                    characterCount.textContent =
                        "100 characters remaining";
                }

                if (formMessage) {
                    formMessage.textContent = "";
                }

                if (discountMessage) {
                    discountMessage.textContent = "";
                }

            }, 0);
        });
    }


    // =====================================================
    // 2. TABLE ROW HIGHLIGHTING
    // =====================================================

    const menuRows = document.querySelectorAll("#menu-table tbody tr");

    menuRows.forEach(function (row) {

        // Mouse enters row
        row.addEventListener("mouseover", function () {

            row.style.backgroundColor = "#f5d6b3";
            row.style.color = "#3e2723";
        });

        // Mouse leaves row
        row.addEventListener("mouseout", function () {

            row.style.backgroundColor = "";
            row.style.color = "";
        });
    });


     // =====================================================
    // 3. LIGHT / DARK MODE
    // =====================================================

    const themeButton = document.querySelector("#theme-button");

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            // Adds the class if missing, removes it if present
            document.body.classList.toggle("dark-mode");
        });
    }

    // =====================================================
    // 4. INTERACTIVE ORDER TOTAL CALCULATOR
    // =====================================================

    const menuCheckboxes =
        document.querySelectorAll(".menu-checkbox");

    const totalElement = document.querySelector("#total");

    function calculateTotal() {

        let total = 0;

        menuCheckboxes.forEach(function (checkbox) {

            if (checkbox.checked) {

                total = total + parseInt(checkbox.value);
            }
        });

        if (totalElement) {

            totalElement.textContent =
                "Total: PKR " + total;
        }
    }


    menuCheckboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", calculateTotal);

    });


    // =====================================================
    // 6. READ MORE / READ LESS
    // =====================================================

    const readMoreButton =
        document.querySelector("#read-more-button");

    const extraText =
        document.querySelector("#extra-text");

    if (readMoreButton && extraText) {

        readMoreButton.addEventListener("click", function () {

            if (extraText.style.display === "none") {

                extraText.style.display = "block";

                readMoreButton.textContent = "Read Less";

            } else {

                extraText.style.display = "none";

                readMoreButton.textContent = "Read More";
            }
        });
    }


    // =====================================================
    // 7. LIVE CATEGORY FILTER
    // =====================================================

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const filterRows =
        document.querySelectorAll("#menu-table tbody tr");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.getAttribute("data-category");

            filterRows.forEach(function (row) {

                const rowCategory =
                    row.getAttribute("data-category");

                if (
                    selectedCategory === "all" ||
                    rowCategory === selectedCategory
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";
                }
            });
        });
    });


    // =====================================================
    // 8. DYNAMIC OPENING STATUS
    // =====================================================

    const openingStatus =
        document.querySelector("#opening-status");

    if (openingStatus) {

        // Get current hour
        const currentHour = new Date().getHours();

        // Café opens at 8 AM and closes at 10 PM
        if (currentHour >= 8 && currentHour < 22) {

            openingStatus.textContent = "We are Open!";
            openingStatus.style.color = "green";

        } else {

            openingStatus.textContent =
                "Closed - Open at 8 AM";

            openingStatus.style.color = "red";
        }
    }

});