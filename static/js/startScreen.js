

function buildStart(callBack){
    var positionX = $(window).width() / 2 - $(window).width()/4;
    var positionY = $(window).height()/2 - 120;
    var menuContainer = $("<div id='startMenuContainer'></div>");
    var menu = $("<div id='startMenu'></div>");
    var posts = $("<div id='startPosts'></div>");
    menuContainer.css("top", positionY);
    menuContainer.css("left", positionX);
    menu.append($("<center><h3 class='brand'>Coming Soon!</h3></center>"));
    $("#start_elements").append(menuContainer);
    menuContainer.append(menu);
    menuContainer.append(posts);
    TweenMax.from(menuContainer, 1, {"y" : "1500" });
}


function start(){
    var mainTitle = $(".brand.main");
    var mainTitleWrapper = $("#mainBrandWrapper");
    var subTitle = $("h2.brand");
    subTitle.toggle();
    var bounceTime = 2;
    TweenLite.from(mainTitle, bounceTime, {y:"-500", ease:Bounce.easeOut, onComplete: function(){subTitle.fadeIn(); buildStart();}});
    TweenLite.from(mainTitleWrapper, bounceTime, {x: "-500"});
}

function guid() {
      function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                              .substring(1);
                }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
}

var objects = [
    {url:"static/img/cloud2.png",size:{x: 565, y: 338}, scale: .4, timeScale: 1},
    {url:"static/img/cloud3.png",size:{x: 485, y: 228}, scale: .3, timeScale: 1}, 
    {url:"static/img/plane.png",size:{x: 128, y: 56},scale: 1, timeScale: .1, canBeInFront: true, chance: .01}
];

function spawnAerial(){
    var aerialString = "<div id='"+guid()+"'></div>";
    var aerialObject = $(aerialString);
    var index = Math.floor(Math.random() * 3);
    var obj = objects[index];
    if(obj.chance){
        var getNew = Math.random() < obj.chance;
        while(getNew){
            index = Math.floor(Math.random() * 3);
            obj = objects[index];
            if(obj.chance)
                getNew = Math.random() < obj.chance;
            else
                getNew = false;
        }
        
    }
    aerialObject.css("background-image", "url("+ obj.url + ")");
    aerialObject.css("position", "absolute");
    topStart = Math.floor(Math.random() * (50 - 5) + 5);
    aerialObject.css("top", "" +  topStart + "vh");
    var sizeX = obj.size.x * obj.scale;
    var sizeY = obj.size.y * obj.scale
    aerialObject.css("width", sizeX);
    aerialObject.css("height", sizeY);
    aerialObject.css("background-size", "" + sizeX + "px " + sizeY + "px"); 
    var loc = Math.random() > .5;
    var startLocation =  loc ? -obj.size.x : $(window).width() +1500;
    var endLocation = loc ? $(window).width() + 1500 : -obj.size.x;

    aerialObject.css("left", startLocation);
    var z = 1;
    if(!obj.canBeInFront)
        z = Math.random() > .7 ? 1 : -1; 
    aerialObject.css("z-index", z * z_index);
    z_index--;
    if(z_index <= -100000)
        z_index = -99999;
    var min = 100 * obj.timeScale;
    var max = 300 * obj.timeScale;
    var time = Math.floor(Math.random() * (max - min)) + min;
    TweenMax.to(aerialObject, time, {x:endLocation, onComplete: function() { aerialObject.remove(); }});
    $("#start_elements").append(aerialObject);
}

loc = false;
z_index = 0;
$(document).on("update", function(){
    if(Math.random() > .95)
        spawnAerial();
});
