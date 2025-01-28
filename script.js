$(document).ready(() => {
    $("#close-tome").on("click", function () {
        $('#book-view').addClass('hidden');
    });

    function showBook() {
        $('#book-view').removeClass('hidden');
    }

    function hideOtherPages() {
        $('.spell-page').each(function () {
            $(this).addClass('hidden');
        });
    }

    function openPage(spellPageToOpen) {
        showBook();
        hideOtherPages();
        $(`#${spellPageToOpen}`).removeClass('hidden');
    }

    $("#summon-familiar-book-cover").on("click", () => {
        openPage("summon-familiar-book");
    });

    $("#change-password-book-cover").on("click", () => {
        openPage("change-password-book");
    });

    $("#change-name-book-cover").on("click", () => {
        openPage("change-name-book");
    });

    $("#change-password-form").on("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password === data.repeatPassword) {
            console.log("Successfully changed password");
            event.target.reset();
        } else {
            console.log("Password does not match. Try again.");
        }
    });

    // Show/hide wings selection based on checkbox
    $('#has-wings').on('change', function () {
        if ($(this).is(':checked')) {
            $('#wings-selection').removeClass('hidden');
        } else {
            $('#wings-selection').addClass('hidden');
        }
    });

    // Mood descriptions based on range value
    const moodDescriptions = [
        "Angry",
        "Grumpy",
        "Irate",
        "Apathetic",
        "Sleepy",
        "Hesitant",
        "Inspired",
        "Thankful",
        "Confident",
        "Curious",
        "Joyful"
    ];

    // Update mood value display and description
    $('#familiar-mood').on('input', function () {
        const moodValue = parseInt($(this).val(), 10);
        $('#mood-description').text(moodDescriptions[moodValue - 1]);
    });

    // Handle form submission
    $('#summon-form').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        const name = data.familiarName;
        const base = data.creatureBase;
        const hasWings = data.hasWings;
        const wings = hasWings ? data.creatureWings : "No Wings";
        const selectedCustomizations = [data.custFireBreath, data.custLevitating, data.custLevitating];
        const moodValue = data.familiarMood;
        const contractEnd = data.contractEnd || "an unknown date";

        // Display the summoned familiar
        const customizationsText = selectedCustomizations.length > 0
            ? ` It has the following customizations: ${selectedCustomizations.join(", ")}.`
            : " It has no customizations.";

        alert(`You have summoned: ${name}, a ${base} with ${wings}.${customizationsText} It appears to be ${moodDescriptions[moodValue - 1]}. The contract ends on ${contractEnd}.`);
    });

    function updateWizardNameAndTitle(name, adjective) {
        let wizardNameElements = document.querySelectorAll('.wizard-name');
        for (let i = 0; i < wizardNameElements.length; i++) {
            wizardNameElements[i].textContent = name || "Mexyll";
        }
        let wizardAdjectiveElements = document.querySelectorAll('.wizard-adjective');
        for (let i = 0; i < wizardAdjectiveElements.length; i++) {
            wizardAdjectiveElements[i].textContent = adjective || "Magnificent";
        }
    }

    document.getElementById('rename-wizard-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('wizard-name').value;
        const adjective = document.getElementById('wizard-adjective').value;
        updateWizardNameAndTitle(name, adjective);
    });
});