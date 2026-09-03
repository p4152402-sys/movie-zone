// ==========================================
// MOVIE ZONE - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// MOVIE DISPLAY
// ==========================================

let movieContainer = document.getElementById("movieContainer");

function displayMovies(movieList) {

    if (!movieContainer) {
        return;
    }

    movieContainer.innerHTML = "";

    if (!movieList || movieList.length === 0) {

        movieContainer.innerHTML = `
            <p style="text-align:center;">
                No movies found.
            </p>
        `;

        return;
    }

    movieList.forEach(function(movie) {

        movieContainer.innerHTML += `

            <div
                class="card"
                data-name="${movie.name.toLowerCase()}"
                data-category="${movie.category || ""}"
                data-language="${movie.language || ""}">

                <img
                    src="${movie.image}"
                    alt="${movie.name}"
                    onclick="showMovieDetails('${movie.name}')"
                    style="cursor: pointer;"
                >

                <h3>
                    onclick="showMovieDetails('${movie.name}')"
                    style="cursor:pointer;"
                >
                    ${movie.name}
                </h3>

                <p>
                    ${movie.year || ""} 
                    ${movie.rating ? "• ⭐ " + movie.rating : ""}
                </p>

                <button
                    onclick="openTrailer('${movie.trailer || ""}')">

                    🎬 Watch Trailer

                </button>

                <button
                    onclick="watchMovies('${movie.name}')">
                
                    🎬 Watch Movie

                </button>

                <button
                    class="fav-btn"
                    data-movie="${movie.name}">

                    ❤️ Favorite

                </button>

                <div class="rating">

                    <span onclick="rateMovie('${movie.name}', 1)">
                        ⭐
                    </span>

                    <span onclick="rateMovie('${movie.name}', 2)">
                        ⭐
                    </span>

                    <span onclick="rateMovie('${movie.name}', 3)">
                        ⭐
                    </span>

                    <span onclick="rateMovie('${movie.name}', 4)">
                        ⭐
                    </span>

                    <span onclick="rateMovie('${movie.name}', 5)">
                        ⭐
                    </span>

                </div>

            </div>

        `;

    });

    setupFavoriteButtons();

}


// Display movies when page loads

if (movieContainer) {

    if (typeof movies !== "undefined") {

        displayMovies(movies);

    }

    else {

        console.error(
            "movies-data.js was not loaded correctly."
        );

        movieContainer.innerHTML = `
            <p style="text-align:center;">
                Movie database could not be loaded.
            </p>
        `;

    }

}


// ==========================================
// SEARCH
// ==========================================

let search = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");


function searchMovies() {

    if (!search || !movieContainer) {
        return;
    }

    let value =
        search.value.toLowerCase().trim();

    if (typeof movies === "undefined") {
        return;
    }

    let results = movies.filter(function(movie) {

        return movie.name
            .toLowerCase()
            .includes(value);

    });

    displayMovies(results);

}


// Search button

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchMovies
    );

}


// Search while typing

if (search) {

    search.addEventListener(
        "keyup",
        searchMovies
    );

}


// ==========================================
// DARK / LIGHT MODE
// ==========================================

let modeBtn =
    document.getElementById("modeBtn");


if (modeBtn) {

    modeBtn.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "light-mode"
            );

            if (
                document.body.classList.contains(
                    "light-mode"
                )
            ) {

                modeBtn.innerText =
                    "🌙 Dark Mode";

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

            else {

                modeBtn.innerText =
                    "☀️ Light Mode";

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }

        }
    );

}


// Remember theme

let savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

    if (modeBtn) {

        modeBtn.innerText =
            "🌙 Dark Mode";

    }

}


// ==========================================
// TRAILER
// ==========================================

function openTrailer(link) {

    let modal =
        document.getElementById(
            "trailerModal"
        );

    let frame =
        document.getElementById(
            "trailerFrame"
        );

    if (!modal || !frame) {
        return;
    }


    if (!link) {

        alert(
            "Trailer is not available yet."
        );

        return;

    }


    modal.style.display = "block";

    frame.src = link;

}


// Close trailer

let closeBtn =
    document.querySelector(".close");


if (closeBtn) {

    closeBtn.onclick = function() {

        let modal =
            document.getElementById(
                "trailerModal"
            );

        let frame =
            document.getElementById(
                "trailerFrame"
            );

        if (modal) {
            modal.style.display = "none";
        }

        if (frame) {
            frame.src = "";
        }

    };

}


// Close modal by clicking outside

window.onclick = function(event) {

    let modal =
        document.getElementById(
            "trailerModal"
        );

    if (
        modal &&
        event.target === modal
    ) {

        modal.style.display = "none";

        let frame =
            document.getElementById(
                "trailerFrame"
            );

        if (frame) {
            frame.src = "";
        }

    }

};


// ==========================================
// FILTER MOVIES
// ==========================================

function filterMovies(category) {

    if (
        !movieContainer ||
        typeof movies === "undefined"
    ) {
        return;
    }


    if (category === "all") {

        displayMovies(movies);

        return;

    }


    let filteredMovies =
        movies.filter(function(movie) {

            let movieCategory =
                (movie.category || "")
                .toLowerCase();

            let movieLanguage =
                (movie.language || "")
                .toLowerCase();

            let selectedCategory =
                category.toLowerCase();


            return (
                movieCategory === selectedCategory ||
                movieLanguage === selectedCategory
            );

        });


    displayMovies(filteredMovies);

}


// ==========================================
// SIGNUP
// ==========================================

function signup() {

    let username =
        document.getElementById(
            "signupUser"
        );

    let password =
        document.getElementById(
            "signupPass"
        );


    if (!username || !password) {
        return;
    }


    if (
        username.value.trim() === "" ||
        password.value.trim() === ""
    ) {

        alert(
            "Please enter username and password."
        );

        return;

    }


    localStorage.setItem(
        username.value,
        password.value
    );


    alert(
        "Account Created!"
    );


    window.location.href =
        "login.html";

}


// ==========================================
// LOGIN
// ==========================================

function login() {

    let username =
        document.getElementById(
            "loginUser"
        );

    let password =
        document.getElementById(
            "loginPass"
        );


    if (!username || !password) {
        return;
    }


    let savedPassword =
        localStorage.getItem(
            username.value
        );


    if (
        savedPassword ===
        password.value
    ) {

        localStorage.setItem(
            "currentUser",
            username.value
        );


        alert(
            "Login Successful!"
        );


        window.location.href =
            "index.html";

    }

    else {

        alert(
            "Invalid Username or Password"
        );

    }

}


// ==========================================
// WELCOME USER
// ==========================================

let currentUser =
    localStorage.getItem(
        "currentUser"
    );


let welcome =
    document.getElementById(
        "welcomeUser"
    );


if (
    currentUser &&
    welcome
) {

    welcome.innerText =
        "Welcome, " + currentUser;

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "login.html";

}


// ==========================================
// FAVORITES
// ==========================================

function setupFavoriteButtons() {

    let favButtons =
        document.querySelectorAll(
            ".fav-btn"
        );


    favButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    let movie =
                        button.dataset.movie;


                    let favorites =
                        JSON.parse(
                            localStorage.getItem(
                                "favorites"
                            )
                        ) || [];


                    if (
                        !favorites.includes(
                            movie
                        )
                    ) {

                        favorites.push(
                            movie
                        );


                        localStorage.setItem(
                            "favorites",
                            JSON.stringify(
                                favorites
                            )
                        );


                        button.innerText =
                            "💖 Added";


                        alert(
                            movie +
                            " added to favorites!"
                        );

                    }

                    else {

                        alert(
                            movie +
                            " is already in favorites!"
                        );

                    }

                }
            );

        }
    );

}


// ==========================================
// SHOW FAVORITES
// ==========================================

let container =
    document.getElementById(
        "favoritesContainer"
    );


if (container) {

    let favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];


    if (favorites.length === 0) {

        container.innerHTML = `
            <p>
                You haven't added any favorites yet.
            </p>
        `;

    }


    favorites.forEach(
        function(movie) {

            container.innerHTML += `

                <div class="favorite-item">

                    <p>
                        ❤️ ${movie}
                    </p>

                    <button
                        onclick="removeFavorite('${movie}')">

                        Remove

                    </button>

                </div>

            `;

        }
    );

}


// Remove favorite

function removeFavorite(movie) {

    let favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];


    favorites =
        favorites.filter(
            function(item) {

                return item !== movie;

            }
        );


    localStorage.setItem(
        "favorites",
        JSON.stringify(
            favorites
        )
    );


    location.reload();

}


// ==========================================
// RATING
// ==========================================

function rateMovie(
    movie,
    rating
) {

    localStorage.setItem(
        movie + "_rating",
        rating
    );


    alert(
        movie +
        " rated " +
        rating +
        " stars!"
    );

}


// ==========================================
// PROFILE
// ==========================================

let profileUser =
    document.getElementById(
        "profileUser"
    );


if (profileUser) {

    let currentUser =
        localStorage.getItem(
            "currentUser"
        );


    profileUser.innerText =
        "Username: " +
        (currentUser || "Guest");

}


let favoriteCount =
    document.getElementById(
        "favoriteCount"
    );


if (favoriteCount) {

    let favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];


    favoriteCount.innerText =
        "Favorite Movies: " +
        favorites.length;

}

function watchMovie(movieName) {

    alert(
        "🎬 " + movieName +
        "\n\nThis movie will open through a legal streaming or rental service."
    );

}

function showMovieDetails(movieName) {

    let movie = movies.find(function(item) {
        return item.name === movieName;
    });

    if (!movie) {
        return;
    }

    let details = document.createElement("div");

    details.className = "movie-details-modal";

    details.innerHTML = `

        <div class="movie-details-content">

            <span class="details-close">&times;</span>

            <img src="${movie.image}" alt="${movie.name}">

            <div class="movie-details-info">

                <h1>${movie.name}</h1>

                <p>
                    ${movie.language} •
                    ${movie.year} •
                    ${movie.category}
                </p>

                <h3>⭐ ${movie.rating}/10</h3>

                <p>
                    ${movie.description}
                </p>

                <button onclick="openTrailer('${movie.trailer}')">
                    ▶ Watch Trailer
                </button>

                <button onclick="watchMovie('${movie.name}')">
                    🎥 Watch Movie
                </button>

                <button
                    class="fav-btn"
                    data-movie="${movie.name}">
                    ❤️ Favorite
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(details);


    let close =
        details.querySelector(".details-close");


    close.onclick = function() {

        details.remove();

    };


    details.onclick = function(event) {

        if (event.target === details) {

            details.remove();

        }

    };

}