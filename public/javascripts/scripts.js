function resetForm() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.checked = false;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const collapseIcon = document.getElementById('collapseIcon');
    const navbarToggleExternalContent = new bootstrap.Collapse(document.getElementById('navbarToggleExternalContent'), {
        toggle: false  
    });
    navbarToggleExternalContent._element.addEventListener('show.bs.collapse', function () {
        // Change the icon when the collapse is shown
        collapseIcon.classList.remove('bi-chevron-compact-down');
        collapseIcon.classList.add('bi-chevron-compact-up');
    });

    navbarToggleExternalContent._element.addEventListener('hidden.bs.collapse', function () {
        // Change the icon when the collapse is hidden
        collapseIcon.classList.remove('bi-chevron-compact-up');
        collapseIcon.classList.add('bi-chevron-compact-down');
    });
});





// Optionally, add an event listener to the reset button (assuming it has the ID resetButton)
// document.getElementById('resetButton').addEventListener('click', function () {
//     // Reset the form
//     document.querySelector('form').reset();
//     // Clear the illustration
//     document.getElementById('illustrationContainer').innerHTML = '';
// });



function submitForm(form) {
    swal({
        title: "Are you sure?",
        text: "This Shower will be deleted",
        icon: "warning",
        buttons: "Delete",
        dangerMode: true,
    })
        .then(function (isDelete) {
            if (isDelete) {
                form.submit();
            }
        });
    return false;
}

