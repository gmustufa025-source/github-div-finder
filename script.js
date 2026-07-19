const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    getUser(searchInput.value.trim());
});

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getUser(searchInput.value.trim());
    }
});

async function getUser(username) {

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            alert("User Not Found!");
            return;
        }

        const data = await response.json();

        document.getElementById("avatar").src = data.avatar_url;

        document.getElementById("name").textContent =
            data.name || "No Name";

        document.getElementById("username").textContent =
            "@" + data.login;

        document.getElementById("bio").textContent =
            data.bio || "No Bio Available";

        document.getElementById("repos").textContent =
            data.public_repos;

        document.getElementById("followers").textContent =
            data.followers;

        document.getElementById("following").textContent =
            data.following;

        document.getElementById("location").textContent =
            data.location || "Not Available";

        document.getElementById("company").textContent =
            data.company || "Not Available";

        document.getElementById("profileLink").href =
            data.html_url;

    } catch (error) {

        alert("Something went wrong!");
        console.log(error);

    }

}

// Default Profile
getUser("octocat");