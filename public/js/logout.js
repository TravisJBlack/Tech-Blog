document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector("#logout");
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const response = await fetch("/api/user/logout", {
          method: "POST",
        });
        if (response.ok) {
          document.location.replace("/login");
        } else {
          alert("Failed to log out.");
        }
      });
    }
  });
  