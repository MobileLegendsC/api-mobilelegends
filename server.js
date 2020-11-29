//Requirements Importer
const Express = require("express")
const Request = require("request")
const IsUp = require("is-up")
const Web = Express()

//Variables
const Port = process.env.PORT || 80

////*Website Main
//Redirectors
Web.get("/", function(req, res){
    try{
        res.redirect("/api/home")
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Anti WWP
Web.use("", function(req, res, next){
    try{
        if(req.originalUrl.indexOf("/api/hero/detail/") != -1 && 20 >= req.originalUrl.length){
            next()
            return
        }

        if(req.originalUrl == "/api" || req.originalUrl == "/api/home" || req.originalUrl == "/api/hero/list" || req.originalUrl == "/api/hero/icon/list" || req.originalUrl == "/api/rank/list" || req.originalUrl == "/api/rank/icon/list" || req.originalUrl == "/api/shop/item/list" || req.originalUrl == "/api/shop/item/icon/list" || req.originalUrl == "/api/icon" || req.originalUrl == "/api/logo/list" || req.originalUrl == "/api/events/match/nationmatch" || req.originalUrl == "/api/hero/role/list" || req.originalUrl == "/api/hero/role/icon/list" || req.originalUrl == "/api/hero/emblem/list" || req.originalUrl == "/api/hero/emblem/icon/list" || req.originalUrl == "/api/events/mlbb/professional_league" || req.originalUrl == "/api/hero/battlespell/list" || req.originalUrl == "/api/hero/battlespell/icon/list" || req.originalUrl == "/api/hero/power/icon/list" || req.originalUrl == "/api/hero/talent/list" || req.originalUrl == "/api/hero/talent/icon/list" || req.originalUrl == "/api/hero/subtalent/list" || req.originalUrl == "/api/hero/subtalent/icon/list"){
            next()
            return
        }else{
            res.json({
                "api": "FAIL",
                "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
            })
        }
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Server OnDown Handler
setTimeout(() => {
    process.exit(0)
}, 25300000)

//Website Self Handler
Web.listen(Port, ()=>{
    console.log(`=============================
    Server Status: Online
=============================`)
})

////*API Main
//API
Web.get("/api", function(req, res){
    try{
        res.json({
            "api": "SUCCESS",
            "message": "API successfully retrieves the API information.",
            "api_type": "beta",
            "is_uptodate": true,
            "version": "1.0"
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})


Web.get("/api/home", function(req, res){
    try{
        Request("https://chaziyu.com/mobilelegends.com/", function(err, rres, body){
            try{
                var websiteslist = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.*?"/g)
                var websitesarray = Array.from(websiteslist)
                var websites = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var website = websitesarray[got][0]
                        var websitelength = website.length-1
                        var result = website.slice(29, websitelength)

                        if(website.indexOf("mobilelegends") != -1 && website.indexOf("zhaokuaizhao.com") == -1){
                            websites.push(`https://${result}`)
                        }

                        if(website.indexOf("zhaokuaizhao.com") != -1 && website.indexOf("mobilelegends.com") != -1){
                            var result2 = website.slice(33, websitelength)
                            websites.push(`https://${result2}`)
                        }

                        got += 1
                    }catch{
                        clearInterval(IT)
                        MainS()

                        async function MainS(){

                            var up = false
                            var iswup = await IsUp("https://m.mobilelegends.com/en")

                            if(iswup){
                                up = true
                            }

                            res.json({
                                "api": "SUCCESS",
                                "message": "API successfully retrieves the API home information.",
                                "api_type": "beta",
                                "is_uptodate": true,
                                "version": "1.0",
                                "home": {
                                    "name": "api-mobilelegends",
                                    "message": "API-MobileLegends is a MobileLegends Official Fanbase API or ML OFA is a website where you can interact with MobileLegends Shop, Account, Players, Characters, and others via Web API. It's very useful because you can use it to track events, news updates, and more!",
                                    "are_we_opensource": "Yes but no, but there is a chance that we can publish its source by following our Mobile Legends account and supporting the API.",
                                    "bug_message": "If you found a Bug please message our email mosktmp+gicb7@gmail.com, to report the problem.",
                                    "mobilelegends_giveaway": {
                                        "url": "https://mobilelegendscodes.blogspot.com/"
                                    }
                                },
                                "monitor": {
                                    "mobilelegends": {
                                        "self_url": "https://m.mobilelegends.com/en",
                                        "url": "https://stats.uptimerobot.com/7OKB5Fm3L9",
                                        "is_up": up,
                                        "javascripts": [
                                            "https://m.mobilelegends.com/static/js/platform.js",
                                            "https://m.mobilelegends.com/static/js/manifest.378d78690a0a6f1c6db5.js",
                                            "https://m.mobilelegends.com/static/js/vendor.c6f7244c5ae70910be52.js",
                                            "https://m.mobilelegends.com/static/js/app.6d294d4153eb5b0dd528.js"
                                        ]
                                    },
                                },
                                "email": "mosktmp+gicb7@gmail.com",
                                "creators": [
                                    "Please support us and this API by following our Mobile Legends account, and without your support, this API would not exist or Outdated.",
                                    {
                                        "name": "ForenstincMilk",
                                        "type": "Creator",
                                        "mobilelegends_id": 833485216
                                    },
                                    {
                                        "name": "Ounceed",
                                        "type": "Developer & Bug hunter",
                                        "mobilelegends_id": null
                                    }
                                ],
                                "helpers": [
                                    "Please support their website because without them this API would not exist.",
                                    {
                                        "name": "gamerhub",
                                        "url": "https://www.gamerhub.gg/mobile-legends-bang-bang/"
                                    },
                                    {
                                        "name": "expertwm",
                                        "url": "https://www.expertwm.com/icons"
                                    },
                                    {
                                        "name": "mobilelegends",
                                        "url": "https://m.mobilelegends.com/en"
                                    }
                                ],
                                "websites": websites,
                                "apis": {
                                    "api": {
                                        "self": [
                                            "https://api-mobilelegends.glitch.me/api",
                                            "https://api-mobilelegends.glitch.me/api/home",
                                            "https://api-mobilelegends.glitch.me/api/icon",
                                            "https://api-mobilelegends.glitch.me/api/logo/list"
                                        ]
                                    },
                                    "hero": {
                                        "self": [
                                            "https://api-mobilelegends.glitch.me/api/hero/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/icon/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/detail/{hero_id}"
                                        ],
                                        "battlespell": [
                                            "https://api-mobilelegends.glitch.me/api/hero/battlespell/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/battlespell/icon/list"
                                        ],
                                        "power": [
                                            "https://api-mobilelegends.glitch.me/api/hero/power/icon/list"
                                        ],
                                        "role": [
                                            "https://api-mobilelegends.glitch.me/api/hero/role/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/role/icon/list",
                                        ],
                                        "emblem": [
                                            "https://api-mobilelegends.glitch.me/api/hero/emblem/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/emblem/icon/list"
                                        ],
                                        "talent": [
                                            "https://api-mobilelegends.glitch.me/api/hero/talent/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/talent/icon/list"
                                        ],
                                        "subtalent": [
                                            "https://api-mobilelegends.glitch.me/api/hero/subtalent/list",
                                            "https://api-mobilelegends.glitch.me/api/hero/subtalent/icon/list"
                                        ]
                                    },
                                    "rank": {
                                        "self": [
                                            "https://api-mobilelegends.glitch.me/api/rank/list",
                                            "https://api-mobilelegends.glitch.me/api/rank/icon/list"
                                        ]
                                    },
                                    "shop": {
                                        "item": [
                                            "https://api-mobilelegends.glitch.me/api/shop/item/list",
                                            "https://api-mobilelegends.glitch.me/api/shop/item/icon/list"
                                        ]
                                    },
                                    "events": {
                                        "match": [
                                            "https://api-mobilelegends.glitch.me/api/events/match/nationmatch"
                                        ],
                                        "mlbb": [
                                            "https://api-mobilelegends.glitch.me/api/events/mlbb/professional_league"
                                        ]
                                    }
                                }
                            })

                            got = 0

                            for ( wb in websites ){
                                delete websites[wb]
                            }
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Hero
Web.get("/api/hero/list", function(req, res){
    try{
        Request("https://mapi.mobilelegends.com/hero/list", function(err, rres, body){
            try{
                if(body.indexOf("FAIL") != -1){
                    res.json({
                        "api": "FAIL",
                        "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                    })
                    return
                }

                var APIReplacer = body.replace(/key/g, "head_key")
                var APIReplacer2 = APIReplacer.replace(/heroid/g, "heroid")
                var Obj = JSON.parse(APIReplacer2)

                if(body.indexOf("SUCCESS") != -1){
                    res.json({
                        "api": "SUCCESS",
                        "message": "API successfully retrieves the list of heroes information.",
                        "data": Obj.data
                    })
                }
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/detail/:id", function(req, res){
    try{
        if(!isNaN(req.params.id)){}else{
            res.json({
                "api": "FAIL",
                "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
            })
            return
        }
        Request(`https://mapi.mobilelegends.com/hero/detail?id=${req.params.id}`, function(err, rres, body){
            try{
                if(body.indexOf("FAIL") != -1){
                    res.json({
                        "api": "FAIL",
                        "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                    })
                    return
                }

                var Obj = JSON.parse(body)

                res.json({
                    "api": "SUCCESS",
                    "message": "API successfully retrieves the hero detail.",
                    "data": Obj.data
                })
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/icon/list", function(req, res){
    try{
        Request("https://mapi.mobilelegends.com/api/icon", function(err, rres, body){
            try{
                var regheadsicon = body.matchAll(/HeroHead\w+.png....\w+...img.\w+.\w+.*?"/g)
                var headiconarray = Array.from(regheadsicon)
                var headsicon = []

                var got = 0
                var IT = setInterval(function(){
                    try{
                        var headicon = headiconarray[got][0]
                        var headlength = headicon.length-1
                        var result = headicon.slice(18, headlength)
                        if(result === "https://img.mobilelegends.com/"){}else{
                            headsicon.push(result)
                        }
                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes icon.",
                            "data": headsicon
                        })
                        got = 0
                        for( head in headsicon ){
                            delete headsicon[head]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/battlespell/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regbs = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.spells.*?"/g)
                var bsarray = Array.from(regbs)
                var bs = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var bslist = bsarray[got][0]
                        var bslength = bslist.length-1
                        var resulticon = bslist.slice(8, bslength)
                        var result = resulticon.slice(40, resulticon.length-4)

                        bs.push({ "name": result, "icon": resulticon })

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes battlespell information.",
                            "data": bs
                        })
                        got = 0
                        for( battlespell in bs ){
                            delete bs[battlespell]
                        }
                    }
            }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/battlespell/icon/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regbs = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.spells.*?"/g)
                var bsarray = Array.from(regbs)
                var bs = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var bslist = bsarray[got][0]
                        var bslength = bslist.length-1
                        var resulticon = bslist.slice(8, bslength)

                        bs.push(resulticon)

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes battlespell icon.",
                            "data": bs
                        })
                        got = 0
                        for( battlespell in bs ){
                            delete bs[battlespell]
                        }
                    }
            }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/power/icon/list", function(req, res){
    try{
        Request("https://mapi.mobilelegends.com/api/icon", function(err, rres, body){
            try{
                var regpowers = body.matchAll(/S\w+.png....\w+...img.\w+.\w+.*?"/g)
                var powersarray = Array.from(regpowers)
                var powers = []
                var got = 0
                var IT = setInterval(function(){
                    try{
                        var powersicon = powersarray[got][0]
                        var powerslength = powersicon.length-1
                        var result = powersicon.slice(13, powerslength)

                        if(result.length == 79){
                            var result2 = powersicon.slice(11, powerslength)
                            if(result == "https://img.mobilelegends.com/" || result2 == "https://img.mobilelegends.com/" || result == "ttps://img.mobilelegends.com/" || result2 == "ttps://img.mobilelegends.com/"){}else{
                                powers.push(result2)
                            }
                        }else if(result.length == 80){
                            var result3 = powersicon.slice(12, powerslength)
                            if(result == "https://img.mobilelegends.com/" || result2 == "https://img.mobilelegends.com/" || result3 == "https://img.mobilelegends.com/" || result == "ttps://img.mobilelegends.com/" || result2 == "ttps://img.mobilelegends.com/" || result3 == "ttps://img.mobilelegends.com/"){}else{
                                powers.push(result3)
                            }
                        }else{
                            if(result == "https://img.mobilelegends.com/" || result == "ttps://img.mobilelegends.com/"){}else{
                                powers.push(result)
                            }
                        }

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes power icon.",
                            "data": powers
                        })
                        got = 0
                        for( power in powers ){
                            delete powers[power]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/role/list", function(req, res){
    try{
        var rolesicon = ["https://static.expertwm.com/mlbb/classes/marksman.png?w=64", "https://static.expertwm.com/mlbb/classes/fighter.png?w=64", "https://static.expertwm.com/mlbb/classes/assassin.png?w=64", "https://static.expertwm.com/mlbb/classes/mage.png?w=64", "https://static.expertwm.com/mlbb/classes/tank.png?w=64", "https://static.expertwm.com/mlbb/classes/support.png?w=64"]
        var rolesname = ["marksman", "fighter", "assassin", "mage", "tank", "support"]
        var rolesr = []
        var got = 0

        var IT = setInterval(function(){
            try{
                if(got >= 6){
                    clearInterval(IT)
                    res.json({
                        "api": "SUCCESS",
                        "message": "API successfully retrieves the list of heroes role information.",
                        "data": rolesr
                    })

                    got = 0
                    for( role in rolesr ){
                        delete rolesr[role]
                    }
                }else{
                    rolesr.push({ "name": rolesname[got], "icon": rolesicon[got]} )
                    got += 1
                }
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        }, 1)
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/role/icon/list", function(req, res){
    try{
        var rolesicon = ["https://static.expertwm.com/mlbb/classes/marksman.png?w=64", "https://static.expertwm.com/mlbb/classes/fighter.png?w=64", "https://static.expertwm.com/mlbb/classes/assassin.png?w=64", "https://static.expertwm.com/mlbb/classes/mage.png?w=64", "https://static.expertwm.com/mlbb/classes/tank.png?w=64", "https://static.expertwm.com/mlbb/classes/support.png?w=64"]

        res.json({
            "api": "SUCCESS",
            "message": "API successfully retrieves the list of heroes role icon.",
            "data": rolesicon
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/emblem/list", function(req, res){
    try{
        var emblemsicon = ["https://static.expertwm.com/mlbb/emblems/physical.png?w=64", "https://static.expertwm.com/mlbb/emblems/magic.png?w=64", "https://static.expertwm.com/mlbb/emblems/tank.png?w=64", "https://static.expertwm.com/mlbb/emblems/jungle.png?w=64", "https://static.expertwm.com/mlbb/emblems/assassin.png?w=64", "https://static.expertwm.com/mlbb/emblems/mage.png?w=64", "https://static.expertwm.com/mlbb/emblems/fighter.png?w=64", "https://static.expertwm.com/mlbb/emblems/support.png?w=64", "https://static.expertwm.com/mlbb/emblems/marksman.png?w=64"]
        var emblems = ["physical", "magic", "tank", "jungle", "assassin", "mage", "fighter", "support", "marksman"]
        var emblemsr = []
        var got = 0
        
        var IT = setInterval(function(){
            try{
                if(got >= emblems.length){
                    clearInterval(IT)
                    res.json({
                        "api": "SUCCESS",
                        "message": "API successfully retrieves the list of heroes emblem information.",
                        "data": emblemsr
                    })
                    got = 0
    
                    for( emblem in emblemsr){
                        delete emblemsr[emblem]
                    }
                }else{
                    emblemsr.push({ "name": emblems[got], "icon": emblemsicon[got] })
                    got += 1
                }
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        }, 1)

    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/emblem/icon/list", function(req, res){
    try{
        var emblemsicon = ["https://static.expertwm.com/mlbb/emblems/physical.png?w=64", "https://static.expertwm.com/mlbb/emblems/magic.png?w=64", "https://static.expertwm.com/mlbb/emblems/tank.png?w=64", "https://static.expertwm.com/mlbb/emblems/jungle.png?w=64", "https://static.expertwm.com/mlbb/emblems/assassin.png?w=64", "https://static.expertwm.com/mlbb/emblems/mage.png?w=64", "https://static.expertwm.com/mlbb/emblems/fighter.png?w=64", "https://static.expertwm.com/mlbb/emblems/support.png?w=64", "https://static.expertwm.com/mlbb/emblems/marksman.png?w=64"]

        res.json({
            "api": "SUCCESS",
            "message": "API successfully retrieves the list of heroes emblem icon.",
            "data": emblemsicon
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/talent/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regtalents = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.talents.*?"/g)
                var talentsarray = Array.from(regtalents)
                var talents = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var talent = talentsarray[got][0]
                        var talentlength = talent.length-1
                        var result = talent.slice(8, talentlength)
                        var resultname = result.slice(41, result.length-4)

                        talents.push({ "name": resultname, "icon": result })

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes talent information.",
                            "data": talents
                        })
                        got = 0
                        for( tl in talents ){
                            delete talents[tl]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/talent/icon/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regtalents = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.talents.*?"/g)
                var talentsarray = Array.from(regtalents)
                var talents = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var talent = talentsarray[got][0]
                        var talentlength = talent.length-1
                        var result = talent.slice(8, talentlength)

                        talents.push(result)

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes talent icon.",
                            "data": talents
                        })
                        got = 0
                        for( tl in talents ){
                            delete talents[tl]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/subtalent/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regsubtalents = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.subtalents.*?"/g)
                var subtalentsarray = Array.from(regsubtalents)
                var subtalents = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var subtalent = subtalentsarray[got][0]
                        var subtalentlength = subtalent.length-1
                        var result = subtalent.slice(8, subtalentlength)
                        var resultname = result.slice(44, result.length-4)

                        subtalents.push({"name": resultname, "icon": result })

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes subtalent information.",
                            "data": subtalents
                        })
                        got = 0
                        for( stl in subtalents ){
                            delete subtalents[stl]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/hero/subtalent/icon/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regsubtalents = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.subtalents.*?"/g)
                var subtalentsarray = Array.from(regsubtalents)
                var subtalents = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var subtalent = subtalentsarray[got][0]
                        var subtalentlength = subtalent.length-1
                        var result = subtalent.slice(8, subtalentlength)

                        subtalents.push(result)

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of heroes subtalent icon.",
                            "data": subtalents
                        })
                        got = 0
                        for( stl in subtalents ){
                            delete subtalents[stl]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Rank
Web.get("/api/rank/list", function(req, res){
    var ranksicon = ["https://i.ibb.co/P9fs95N/Warrior.png", "https://i.ibb.co/KmD0Xsg/Elite.png", "https://i.ibb.co/QpcJ82n/Master.png", "https://i.ibb.co/S78MqQd/Grandmaster.png", "https://i.ibb.co/hcxvRF7/Epic.png", "https://i.ibb.co/rbj7jXm/Legend.png", "https://i.ibb.co/QJ5KbSF/Mythic.png", "https://i.ibb.co/SybsqM7/Mythical-Glory.png"]
    var ranksname = ["warrior", "elite", "master", "grandmaster", "epic", "legend", "mythic", "mythic-glory"]
    var ranks = []
    var got = 0

    try{
        var IT = setInterval(function(){
            try{
                if(ranks.length <= 7){
                    ranks.push({ "name": ranksname[got], "icon": ranksicon[got] })
                    got += 1
                }else{
                    clearInterval(IT)

                    res.json({
                        "api": "SUCCESS",
                        "message": "API successfully retrieves the list of ranks information.",
                        "data": ranks
                    })
                    
                    got = 0
                    for( rank in ranks ){
                        delete ranks[rank]
                    }
                }
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        }, 1)
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/rank/icon/list", function(req, res){
    var ranksicon = ["https://i.ibb.co/P9fs95N/Warrior.png", "https://i.ibb.co/KmD0Xsg/Elite.png", "https://i.ibb.co/QpcJ82n/Master.png", "https://i.ibb.co/S78MqQd/Grandmaster.png", "https://i.ibb.co/hcxvRF7/Epic.png", "https://i.ibb.co/rbj7jXm/Legend.png", "https://i.ibb.co/QJ5KbSF/Mythic.png", "https://i.ibb.co/SybsqM7/Mythical-Glory.png"]

    try{
        res.json({
            "api": "SUCCESS",
            "message": "API successfully retrieves the list of ranks icon.",
            "data": ranksicon
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Shop
Web.get("/api/shop/item/list", function(req, res){
    try{
        Request("https://www.expertwm.com/icons", function(err, rres, body){
            try{
                var regitems = body.matchAll(/a href="https...\w+.\w+.\w+.\w+.items.*?"/g)
                var itemsarray = Array.from(regitems)
                var items = []
                var got = 0

                var IT = setInterval(function(){
                    try{
                        var itemsicon = itemsarray[got][0]
                        var itemslength = itemsicon.length-1
                        var result = itemsicon.slice(8, itemslength)
                        var resultname = result.slice(39, result.length-4)

                        if(result.indexOf("items") != -1){
                            items.push({ "name": resultname, "icon": result })
                        }

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of shop items information.",
                            "data": items
                        })
                        got = 0
                        for( item in items ){
                            delete items[item]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/shop/item/icon/list", function(req, res){
    try{
        Request("https://mapi.mobilelegends.com/api/icon", function(err, rres, body){
            try{
                var regitems = body.matchAll(/E\w+.png....\w+...img.\w+.\w+.*?"/g)
                var itemsarray = Array.from(regitems)
                var items = []
                var got = 0
                var IT = setInterval(function(){
                    try{
                        var itemsicon = itemsarray[got][0]
                        var itemslength = itemsicon.length-1
                        var result = itemsicon.slice(12, itemslength)
                        
                        if(result == "https://img.mobilelegends.com/" || result.indexOf("/4D/") != -1 || result.indexOf("/02/") != -1 || result.indexOf("M00") == -1){}else{
                            items.push(result)
                        }

                        got += 1
                    }catch{
                        clearInterval(IT)
                        res.json({
                            "api": "SUCCESS",
                            "message": "API successfully retrieves the list of shop items icon.",
                            "data": items
                        })
                        got = 0
                        for( item in items ){
                            delete items[item]
                        }
                    }
                }, 1)
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Icon
Web.get("/api/icon", function(req, res){
    try{
        res.json({
            "api": "SUCCESS",
            "message": "API successfully retrieves the game icon.",
            "icon": "https://i.ibb.co/zZ18T4z/Mobile-legends-icon-2020-new.jpg"
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Logo
Web.get("/api/logo/list", function(req, res){
    try{
        res.json({
            "api": "SUCCESS",
            "message": "API successfully retrieves the list of game logo's.",
            "data": [
                {
                    "id": "0",
                    "logo": "https://i.ibb.co/kB4Y10N/Cq2-Ixlts-Mn-KAc-Wq-OAAIIj-YTut-EM425.png"
                },
                {
                    "id": "1",
                    "logo": "https://i.ibb.co/PgJPtkF/ML-logo.png"
                }
            ]
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

//Events
Web.get("/api/events/mlbb/professional_league", function(req, res){
    try{
        Request("https://mysg.mpl.mobilelegends.com/wp-json/", function(err, rres, body){
            try{
                var Obj = JSON.parse(body)
                res.json({
                    "api": "SUCCESS",
                    "message": "API successfully retrieves the professinal league event information.",
                    "data": Obj
                })
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})

Web.get("/api/events/match/nationmatch", function(req, res){
    try{
        Request("https://mlapi.mobilelegends.com/webAPIData/nationMatch.json", function(err, rres, body){
            try{
                body = body.replace("var nationMatch = ", "")

                var Obj = JSON.parse(body)
                res.json({
                    "api": "SUCCESS",
                    "message": "API successfully retrieves the nation match event information.",
                    "data": Obj
                })
            }catch{
                res.json({
                    "api": "FAIL",
                    "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
                })
            }
        })
    }catch{
        res.json({
            "api": "FAIL",
            "message": "API failed to retrieve the information due to the website doesn't exist or script failure, but this mostly causes because of the invalid API parameters."
        })
    }
})