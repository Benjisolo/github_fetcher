$(document).ready(function () {
    var user = "";
    var count = 0;

    $("#form").submit(function (event) {
        event.preventDefault();

        var username = $("#username").val();

        // searchUsers(username);
        countFollowers(username)
    });

    function searchUsers(username) {
        $.get("https://api.github.com/search/users?q=" + username + "+in:user&per_page=100",
            function (data) {
                // console.log(data);
                data.items.forEach((item) => {
                    var followers = countFollowers(item.login);
                    user = 
                    `<div class="card" style="width: 18rem"> 
                        <img src="${item.avatar_url}" class="card-img-top"/>
                        <div class="card-body">
                            <h5 class="card-title">${item.login}</h5>
                            <h6 class="card-subtitle text-muted">followers:</h6>
                            <a href="${item.followers_url}" class="card-link">${followers}</a>
                        </div>
                    </div>`;
                    $("#result").append(user);
                });
            }
        );
    }

    function countFollowers(username) {
        $.get("https://api.github.com/users/" + username + "/followers", function(data) {
            // console.log(data)
            data.items.forEach((item) => {
                $('#result').append(`<h5>${item.login} </h5>`)
            })
        })
    }
});