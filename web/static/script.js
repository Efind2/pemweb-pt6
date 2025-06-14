document.addEventListener("DOMContentLoaded", () => {
    // === BAGIAN TAB ===
    loadContent('postingan');
    function loadContent(section) {
        fetch(`/load/${section}`)
            .then(response => response.text())
            .then(html => {
                document.getElementById("content").innerHTML = html;
            })
            .catch(error => {
                document.getElementById("content").innerHTML = "<p>Gagal memuat konten.</p>";
                console.error(error);
            });
    }

    window.switchTab = function (element, section) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        element.classList.add('active');
        loadContent(section);
    }

    
    const openBtn = document.getElementById("posting");
    const closeBtn = document.getElementById("closePopup");
    const popup = document.getElementById("popupModal");

    if (openBtn && closeBtn && popup) {
        openBtn.onclick = () => popup.style.display = "block";
        closeBtn.onclick = () => popup.style.display = "none";

        window.onclick = (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        };
    }
    
    const signUpBtn = document.getElementById("btn-create-account");
    const signInBtn = document.getElementById("btn-sign-in");
    const closeSignUp = document.getElementById("close");
    const closeSignIn = document.getElementById("close-in");

    const modalSignUp = document.getElementById("modal-sign-up");
    const modalSignIn = document.getElementById("modal-sign-in");

    if (signUpBtn && modalSignUp) {
        signUpBtn.addEventListener("click", () => modalSignUp.style.display = "block");
    }

    if (closeSignUp) {
        closeSignUp.addEventListener("click", () => modalSignUp.style.display = "none");
    }

    if (signInBtn && modalSignIn) {
        signInBtn.addEventListener("click", () => modalSignIn.style.display = "block");
    }

    if (closeSignIn) {
        closeSignIn.addEventListener("click", () => modalSignIn.style.display = "none");
    }

    window.addEventListener("click", (e) => {
        if (e.target === modalSignUp) {
            modalSignUp.style.display = "none";
        }
        if (e.target === modalSignIn) {
            modalSignIn.style.display = "none";
        }
    });
    window.showNotif = function(message) {
        const notif = document.getElementById("notifSuccess");
        console.log("Notifikasi jalan:", message); // DEBUG
        notif.textContent = message;
        notif.style.display = "block";
        setTimeout(() => {
            notif.style.display = "none";
        }, 3000);
    }
    
    const form = document.getElementById("postForm");
        if (form) {
        form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch("/post", {
            method: "POST",
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                popup.style.display = "none";
                form.reset();
                loadContent("postingan");
                showNotif("Postingan berhasil!");
            } else {
                return response.text().then(text => {
                    throw new Error(text || "Gagal memposting");
                });
            }
        })
        .catch(err => {
            console.error(err);
            showNotif("Gagal memposting.");
        });
    });
    }

});
