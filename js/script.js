const baseUrl = "https://www.balldontlie.io/api/v1/";
const playerEndPoin = `${baseUrl}players`;
const teamEndPoin = `${baseUrl}teams`;
const gamesEndPoin = `${baseUrl}games`;

const contents = document.querySelector("#content-list");
const ViewModal = document.querySelector(".modal");
const title = document.querySelector(".card-title");

function getPlayer() {
    title.innerHTML = "Players Nahelop Basketball"
    fetch(playerEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(player => {
                data += `
                <li class="collection-item">
                    <p>ID: ${player.id} <br>
                       First Name       : ${player.first_name}<br>
                       Last Name        : ${player.last_name}<br>
                       Position         : ${player.position} <br>
                       Team            : ${player.team.full_name}
                    </p>
                    <center><a href="#modal1" data-id="${player.id}" class="secondary-content modal-trigger"><i class="material-icons" data-id="${player.id}">info</i></a></center>
                </li>
                `
                
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
            //     const detil = document.querySelectorAll('.secondary-content');
            //     detil.forEach(btn => {
            //         btn.onclick = (event) => {
            //             showPLayerInfo(baseUrl + "player/" + event.target.dataset.id);
            //     }
            // })
        }).catch(err => {
            console.error(err);
        })
}

function getTeam() {
    title.innerHTML = "Teams Nahelop Basketball"
    fetch(teamEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(teams => {
                data += `
                <li class="collection-item">
                    <p>ID: ${teams.id} <br>
                       Nama     : ${teams.full_name}<br>
                       Kota     : ${teams.city}<br>
                       Divisi  : ${teams.division}
                    </p>
                    <a href="#modal1" data-id="${teams.id}" class="secondary-content modal-trigger"><i class="material-icons" data-id="${teams.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
            //     const detil = document.querySelectorAll('.secondary-content');
            //     detil.forEach(btn => {
            //         btn.onclick = (event) => {
            //             showTeamInfo(baseUrl + "player/" + event.target.dataset.id);
            //     }
            // })
        }).catch(err => {
            console.error(err);
        })
}

function getGames() {
    title.innerHTML = "Games Nahelop Basketball"
    fetch(gamesEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            let i = 1;
            resJson.data.forEach(game => {
                data += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${game.id}</td>
                    <td>${game.home_team.full_name}</td>
                    <td>${game.date}</td>
                    <td>${game.home_team.city}</td>
                    <td>${game.home_team.division}</td>
                    <td>${game.home_team_score}</td>
                    <td>${game.season}</td>
                </tr>
                `;
                i++;
            });
            // contents.innerHTML = '<ul class="collection">' + data + '</ul>'
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>ID</th>
                            <th>Nama Tim</th>
                            <th>Tanggal</th>
                            <th>Kota</th>
                            <th>Divisi</th>
                            <th>Skor</th>
                            <th>Musim</th>
                        </thead>
                        <tbody>
                            ${data}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}
function loadPage(page) {
    switch (page) {
        case "players":
            getPlayer();
            break;
        case "teams":
            getTeam();
            break;
        case "games":
            getGames();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    // getPlayer();
    // getTeam();

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "player";
    loadPage(page);

    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);

});