window.onload = function () {
    //copyrighted:
    var godinaUtoku = new Date().getFullYear();
    document.querySelector("#izlogovanje").nextElementSibling.innerHTML += "-" + godinaUtoku;
    //skrolovanje
    $(window).scroll(function () {
        var skrol = $(this).scrollTop();
        // console.log(skrol)
        if (skrol > 300) {
            ispisDrustvenihMreza();
            $("#omotac").prev().removeClass("sakriven");
            $("#omotac").prev().addClass("fiksiranMeni");

            $("#omotac").next().removeClass("sakriven");
            $("#omotac").next().addClass("fiksiranFuter");
        }
        else {
            $("#omotac").prev().removeClass("fiksiranMeni");
            $("#omotac").prev().addClass("sakriven")

            $("#omotac").next().removeClass("fiksiranFuter");
            $("#omotac").next().addClass("sakriven")
        }
        $("footer > a:first").on('click', function (e) {
            e.preventDefault();
            $('html').animate({
                scrollTop: 0
            }, 500);
        });

    });
    $("#slajder > a:first").click(function (e) {
        e.preventDefault();
        $('html').animate({
            scrollTop: $("#sadrzaj").offset().top
        }, 500);
    });
    //autor model...khm khm...modal
    $("#open-author").click(function (e) {
        e.preventDefault();
        $("#autor").fadeIn("slow");
        $("#zatvoriAutora").click(function () {
            $("#autor").fadeOut("slow");
        })
    })
    //meni
    $(".linkoviMenija").find("a:first").click(function (e) {
        e.preventDefault();
        $(".iksic").removeClass("sakriven");
        $(".fa-bars").parent().hide();
        $(".iksic").click(function (e) {
            e.preventDefault();
            $("#crnMeni").slideUp("slow");
            $(".iksic").addClass("sakriven");
            $("#logo").css('visibility', 'visible');
            $(".linkoviMenija").find("a:first").show();
            $(".linkoviMenija").find("a:first").next().addClass("sakriven");
            $(".fa-bars").parent().show();
        })
        $("#logo").css('visibility', 'hidden');
        $("#crnMeni").slideDown("slow");
    })
    //filter lista
    $("#naslov span a").click(function (e) {
        e.preventDefault();
        $("#listaFiltera").slideDown("slow");
        $("#zatvoriFilter").click(function () {
            $("#listaFiltera").slideUp("slow");
        })
    })
    //za pojedinacne
    var url = window.location.pathname;
    console.log(url)
    if (url.includes("index.html") || url == "/") {
        $("#slajder").css(
            'background-image', 'url(assets/images/skopi.jpg)'
        )
        dohvatiDogadjaje();

    }
    if (url.includes("news.html")) {
        $("#slajder").css(
            'background-image', 'url(assets/images/slajder68.jpg)'
        )
        dohvatiVesti();
        ispisSortiranja();
        $("#pretrazivanje input").keyup(pretrazi)
    }
    if (url.includes("about.html")) {
        $("#slajder").css(
            'background-image', 'url(assets/images/slajder701.jpg)'
        )
        dohvatiMomke();
        dohvatiUloge();
    }
    if (url.includes("contact.html")) {
        $("#nalog").click(proveriFormu);
        $("#posalji").click(proveriPoruku);
    }

}
//sporedni ispisi
function ispisDrustvenihMreza() {
    let ispis = "<ul>";
    let linkovi = ["facebook", "youtube", "instagram", "twitter"];
    for (let i of linkovi) {
        ispis += `<li><a href="https://${i}.com"><i class="fa fa-${i}"></i></a></li>`;
    }
    ispis += "</ul>";
    document.getElementById("drustvene-mreze").innerHTML = ispis;
}
function ispisSortiranja() {
    let ispis = "<select id='ddlSort'><option value='0'>Sort...</option>";
    let niz = ["Newest", "Oldest", "Most viewed"];
    for (let i of niz) {
        ispis += `
            <option value='${i.substr(0, 3)}'>${i}</option>
        `;
    }
    ispis += "</select>";
    document.getElementById("sortiranje").innerHTML = ispis;
    document.querySelector("#ddlSort").addEventListener("change", sortiraj)
};
function listaKategorija(n) {
    let ispis = "<ul id='listaKategorija'>";
    ispis += "<li><a href='#' data-idkat='0'>All</a></li>"
    let sveKategorije = ["All"];
    n.forEach(el => {
        for (let c of el.category) {
            if (sveKategorije.length > 0) {
                if (sveKategorije.indexOf(c.title) == -1) {
                    sveKategorije.push(c.title)
                    ispis += `<li><a href='#' data-idkat='${c.id}'></a></li>`;
                }
            }
            else {
                sveKategorije.push(c.title)
            }
        }
    })
    ispis += "</ul>";
    console.log(sveKategorije)
    document.querySelector("#listaFiltera-sadrzaj").innerHTML += ispis;
    for (let svk in sveKategorije) {
        let atags = document.querySelector("#listaKategorija").childNodes[svk].childNodes[0];
        atags.innerHTML = sveKategorije[svk];
        atags.addEventListener("click", filtriraj)
    }
}
function formatirajDatum(d) {
    let month = new Date(d).toLocaleString('default', { month: 'short' });
    let day = new Date(d).getDate();
    let year = new Date(d).getFullYear();
    return month + " " + day + "," + year;
}
(function ispisMenija() {
    let ispis = "<ul>";
    let linkovi = ["news.html", "about.html", "contact.html"];
    let nazivi = ["Blog", "About", "Contact"];
    for (let i in linkovi) {
        ispis += `<li>
            <span>${nazivi[i].substr(0, 1)}</span>
            <a href="${linkovi[i]}">${nazivi[i]}</a></li>`;
    }
    ispis += "</ul>";
    document.getElementById("crnMeni").innerHTML += ispis;
})();
(function ispisOautoru() {
    document.querySelector("#autor-sadrzaj > p").innerHTML = `
    Well hello! Didn't see you there...Wanna know something about me, huh? Why? Are you working for the police? If not, nice to meet you, my name is Dijana, I'm 20 years old and I live in a house. In Belgrade. 
    <br>
    After successfully finishing both kindergarten and elementary school, I decided to continue my education
    at the Philological High School because I really liked learning about languages. I was so good that I
    managed to master six of them ( English, French, Latin, Serbian, Bosnian and Montenegrin), but I
    realized I needed a new challenge...I always wanted to talk to the machines and the best way to do that
    is by learning computer languages. I will be able to speak to my laptop, right?
    `;
})();
//AJAX ft JSON
//---events
function dohvatiDogadjaje() {
    $.ajax({
        url: "assets/data/events.json",
        method: "get",
        dataType: "json",
        success: function (events) {
            ispisiDogadjaje(events);
        }
    });
}
function ispisiDogadjaje(events) {
    let ispis = "";
    events.forEach(element => {
        ispis += ispisiDogadjaj(element);
    });
    document.getElementById("desavanja").innerHTML = ispis;

}
function ispisiDogadjaj(element) {
    return `<div class="desavanje">
                <div class="fleksuj">
                <h3><span>${element.godina}</span>${element.naslov}</h3>
                <p>${element.kategorija}</p>
                <span></span>
                <p>${element.tekst}</p>
                </div>
                <div class="fleksuj">
                <img src="${element.slika.src}"
                alt="${element.slika.alt}"/>
                </div>
            </div>`;
}
//---news
function ajaxNews(vraceno) {
    $.ajax({
        url: "assets/data/news.json",
        method: "get",
        dataType: "json",
        success: vraceno
    });
}
function dohvatiVesti() {
    ajaxNews(
        function (news) {
            ispisiVesti(news);
            listaKategorija(news)
        }
    );
}
function ispisiVesti(news) {
    let ispis = "";
    news.forEach(element => {
        ispis += ispisiVest(element);
    });
    document.getElementsByClassName("deO3")[0].innerHTML = ispis;
}
function ispisiVest(element) {
    return `
    <div class="fleksuj">
        <figure>
        <img src="assets/images/${element.slika.src}" alt="${element.slika.alt}"/>
        </figure>
        <div class="info">
            <p>${formatirajDatum(element.datum)}</p>
            <p><i class="fa fa-eye"></i>${element.pregledi}</p>
        </div>
        <h3>${element.naslov} - ${element.magazin}</h3>
        <a href='#'>Read More</a>
    </div>
    `;
}
//---boyz
function dohvatiMomke() {
    $.ajax({
        url: "assets/data/boys.json",
        method: "get",
        dataType: "json",
        success: function (boys) {
            ispisiMomke(boys);
        }
    });
}
function ispisiMomke(boys) {
    let ispis = "";
    boys.forEach(element => {
        ispis += `<div class="fleksuj">
            <figure>
            <p>${element.name}</p>
            <img src="assets/images/${element.slika.src}" alt="${element.slika.alt}" />
            </figure>
            <p>${element.role}</p>
            <p>"${element.description}"</p>
        </div>`;
    });
    document.getElementsByClassName("deO3")[0].innerHTML += ispis;
}
//---roles
function dohvatiUloge() {
    $.ajax({
        url: "assets/data/roles.json",
        method: "get",
        dataType: "json",
        success: function (roles) {
            ispisiUloge(roles);
        }
    });
};
function ispisiUloge(roles) {
    let ispis = "";
    roles.forEach(element => {
        ispis += `<div class="fleksuj">
            <i class="fa fa-${element.icon}"></i>
            <p>${element.name}</p>
            <p>${element.desc}</p>
        </div>`;
    });
    $(".deO:last").html(ispis);
}
//provera forme
function proveriFormu() {
    let validno = true;

    const ime = $("#ime").val().trim();
    const mejl = $("#mejl").val().trim();

    const reIme = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
    const remejl = /^[A-z0-9\.\_\%\+\-]+@[A-z0-9\.\-]+(\.[A-z]{2,})+$/;

    if (ime == "") {
        validno = false;
        $("#ime").css("border-bottom", "2px solid red");
    }
    else if (!reIme.test(ime)) {
        validno = false;
        $("#ime").css("border-bottom", "2px solid red");
        $("#ime").next().html("<br><i>Gotta start with an uppercase!</i>");
    }
    else {
        $("#ime").css("border-bottom", "2px solid green");
        $("#ime").next().html("");
    }

    if (mejl == "") {
        validno = false;
        $("#mejl").css("border-bottom", "2px solid red");
    }
    else if (!remejl.test(mejl)) {
        validno = false;
        $("#mejl").css("border-bottom", "2px solid red");
        $("#mejl").next().html("<br><i>Don't forget @!</i>");
    }
    else {
        $("#mejl").css("border-bottom", "2px solid green");
        $("#mejl").next().html("");
    }

    if (validno) {
        localStorage.setItem("name", ime);
        $("#modal").fadeIn("slow");
        $("#modal-sadrzaj p").html('Welcome ' + localStorage.getItem("name") + "!");
        $("#zatvori").click(function () {
            $("#modal").fadeOut("slow");
            location.reload();
        })
    }
}
function proveriPoruku() {
    let validno = true;

    const poruka = $("#poruka").val().trim();

    const rePoruka = /^[\w\d]+(\s+[\w\d]+){9,}$/;

    if (poruka == "") {
        validno = false;
        $("#poruka").css("border-bottom", "2px solid red")
        $("#zaPoruku span").html("You have to fill in!");
    }
    else if (!rePoruka.test(poruka)) {
        validno = false;
        $("#poruka").css("border-bottom", "2px solid red");
        $("#zaPoruku span").html("Minimum 10 words");
    }
    else {
        $("#poruka").css("border-bottom", "2px solid green");
    }
    if (validno) {
        $("#zaPoruku span").html("Successfully sent!");
        $("#poruka").val("");
    }
}
//local storage ft login/out
(function proveraStorage() {
    if (localStorage.getItem("name")) {
        //ispisi poruku dobrodoslice
        $("#dobrodoslica").html("Wazzup " + localStorage.getItem("name") + "?!");

        let log = document.createElement("a");
        log.setAttribute("href", "#");
        log.innerHTML = "Log out";
        document.getElementById("izlogovanje").appendChild(log);

        //kontakt stranica se menja

        $(".ulogovan").removeClass("sakriven");
        $(".ulogovan").prev().hide();
        $(".ulogovan").next().hide();
        $("#zaPoruku").removeClass("sakriven");

        //meni sirenje
        $("#crnMeni ul").append("<li id='lgo'><span>L</span><a href='#'>Logout</a></li>")

    }
    $("#izlogovanje a,#lgo").click(function (e) {
        e.preventDefault();
        localStorage.removeItem("name");
        location.reload();

        //kontakt stranica

        $(".ulogovan").addClass("sakriven");
        $(".ulogovan").prev().show();
        $(".ulogovan").next().show();
        $("#zaPoruku").addClass("sakriven");
    })
})();
//pretraga
function pretrazi() {
    let uneto = this.value;
    console.log(uneto)
    ajaxNews((news) => {
        let rezultatPretrage = news.filter(n => {
            if (n.naslov.toLowerCase().indexOf(uneto.toLowerCase()) !== -1) {
                return true;
            }
        })
        if (rezultatPretrage.length > 0) {
            $("#naslovKat").html("")
            ispisiVesti(rezultatPretrage)
        }
        else {
            $("#naslovKat").html("No matching results")
            $("#pretraga").next().html("")
        }
    }
    );
}
var filtriraneVesti = [];
function sortiraj() {
    let izabrano = this.value.toLowerCase();
    console.log(izabrano)
    ajaxNews((news) => {
        if (filtriraneVesti.length > 0) {
            filtriraneVesti.sort((a, b) => {
                if (izabrano == "new") {
                    if (a.datum == b.datum) return 0;
                    return a.datum > b.datum ? -1 : 1;
                }
                else if (izabrano == "old") {
                    if (a.datum == b.datum) return 0;
                    return a.datum > b.datum ? 1 : -1;
                }
                else if (izabrano == "mos") {
                    if (a.pregledi == b.pregledi) return 0;
                    return a.pregledi > b.pregledi ? -1 : 1;
                }
            });
            ispisiVesti(filtriraneVesti);
        }
        else {
            let sortirani = news.sort((a, b) => {
                if (izabrano == "new") {
                    if (a.datum == b.datum) return 0;
                    return a.datum > b.datum ? -1 : 1;
                }
                else if (izabrano == "old") {
                    if (a.datum == b.datum) return 0;
                    return a.datum > b.datum ? 1 : -1;
                }
                else if (izabrano == "mos") {
                    if (a.pregledi == b.pregledi) return 0;
                    return a.pregledi > b.pregledi ? -1 : 1;
                }
            });
            ispisiVesti(sortirani);
        }
    }
    );
}
function filtriraj() {
    let izabrano = $(this).data("idkat")
    console.log(izabrano)
    ajaxNews((news) => {
        filtriraneVesti = news.filter(n => {
            if (izabrano == 0) {
                $("#naslovKat").html("")
                return true;
            }
            for (let c of n.category) {
                if (c.id == izabrano) {
                    $("#naslovKat").html(c.title)
                    return true;
                }
            }
        })
        $("#listaFiltera").slideUp("slow");
        console.log(filtriraneVesti)
        ispisiVesti(filtriraneVesti)
    }
    );
}