$(document).ready(function () {
    const myClient_id = "Iv1.01a8f535dd4ca2c8"
    const myClient_secret = "bdb0cc9173140424596b65bd38dea4471e3bce3d"
    const myToken = "782002dfb35cf1fa112878d6e2d84dba706e2cd8"
    const endPoint = "https://api.github.com/search/users"

    var user = "";
    var appAuth = `client_id=${myClient_id}&client_secret=${myClient_secret}`
    var userlist = []

    $("#form").keyup(function (event) {
        var username = $("#username").val();

        search(username)
        // countFollowers(username)
        // fetchUserInfo()
    });

    // function fetchUserInfo() {
        $.get("user-info2",
            function (textdata, status) {
                var lines = textdata.split("\n")
                avatar = ""
                nbrFollowing = 0
                $.each(lines, function(l, content) {
                    search2(content, l)
                })
            }
        );
    // }

    function search2(username, position) {
        follName = ""
        $.get(`https://api.github.com/users/${username}`, function(userData) {
            $.get(`https://api.github.com/users/${username}/followers?&per_page=100`, function(followersData) {
                // console.log(followersData)
                $.each(followersData, function(i, item) {
                    follName = 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="${item.html_url}">${item.login}</a>
                    </li>`
                    $(`#followersList_${position}`).append(follName)
                })
            })
            $.get(`https://api.github.com/users/${username}/following?&per_page=100`, function(followingData) {
                // console.log(followingData)
                $.each(followingData, function(i, item) {
                    follName = 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="${item.html_url}">${item.login}</a>
                    </li>`
                    $(`#followingList_${position}`).append(follName)
                })
            })/*
            $.get(`https://api.github.com/users/${username}/repos_url?&per_page=100`, function(reposData) {
                // console.log(reposData)
                $.each(reposData, function(i, item) {
                    follName = 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="${item.html_url}">${item.login}</a>
                    </li>`
                    $("#reposList").append(reposName)
                })
            })*/
            user =
                `<div class="row">
                    <div class="col-sm-3">
                        <img src="${userData.avatar_url}" class="rounded-circle img-thumbnail mx-auto"/>
                        <h5 class="text-center mx-auto">${username}</h5>
                        <a href="${userData.html_url}" class="btn btn-outline-primary mx-auto d-block" target="_blank">View Profile</a>
                    </div>
                    <div class="col-sm-9">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#repos_${position}">
                                Public repos
                                <span class="badge badge-pill badge-info">${userData.public_repos}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#followers_${position}">
                                Followers
                                <span class="badge badge-pill badge-success">${userData.followers}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#following_${position}">
                                Following
                                <span class="badge badge-pill badge-warning">${userData.following}</span>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade" id="repos_${position}">
                            <ul class="list-group" id="reposList_${position}" style="height:138px; overflow:auto"></ul>
                            <a href="https://api.github.com/users/${username}/repos" target="_blank" class="btn btn-outline-danger float-right" id="allReposBtn_${position}" float-right">see all -></a>
                            </div>
                            <div class="tab-pane fade active show" id="followers_${position}">
                                <ol class="list-group" id="followersList_${position}" style="height:138px; overflow:auto"></ol>
                                <a href="https://api.github.com/users/${username}/followers" target="_blank" class="btn btn-outline-danger float-right" id="allFollowersBtn_${position}" float-right">see all -></a>
                            </div>
                            <div class="tab-pane fade" id="following_${position}">
                                <ol class="list-group" id="followingList_${position}" style="height:138px; overflow:auto"></ol>
                                <a href="https://api.github.com/users/${username}/following" target="_blank" class="btn btn-outline-danger float-right" id="allFollowingBtn_${position}" float-right">see all -></a>
                            </div>
                        </div>
                    </div>
                </div>`;
            $("#result").append(user);
        })
    }
/*
    function searchUsers(username) {
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            data: {
                
            }
        })
    }*/


function searchUsers(username) {
        $.get(`https://api.github.com/search/users?q=${username}+in:user&per_page=100`,
            function (data) {
                data.items.forEach((item) => {
                    // countFollowers(item.login)
                    user =
                        `<ul class="nav nav-tabs">
                            <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#home">Repos</a>
                            </li>
                            <li class="nav-item">

                            <a class="nav-link active" data-toggle="tab" href="#profile">Followers</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" data-toogle="tab" href="#following">Following</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div class="tab-pane fade" id="home">
                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                            </div>
                            <div class="tab-pane fade active show" id="profile">
                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                            </div>
                            <div class="tab-pane fade" id="dropdown1">
                            <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
                            </div>
                            <div class="tab-pane fade" id="dropdown2">
                            <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
                            </div>
                        </div>`;
                    $("#result").append(user);
                });
            }
        );
    }
 

    
    function search(username) {
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            data: {
                client_id: myClient_id,
                client_secret: myClient_secret
            }
        }).done(function(user) {
            user =
                `<div class="card" style="width: 18rem"> 
                <img src="${user.avatar_url}" class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title">${user.login}</h5>
                    <h6 class="card-subtitle text-muted">followers:</h6>
                    <a href="${user.followers_url}" class="card-link">${user.followers}</a>
                </div>
            </div>`;
            $("#result").append(user);
        })
    }
    
});
