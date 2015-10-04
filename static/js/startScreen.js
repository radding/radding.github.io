function createBtn(text, id, optClass, onClick){
    var btnString = "<div class='pixel2 btn ";
    if(optClass)
        btnString += optClass ;
    btnString += "'";
    if(id)
        btnString += "id='" + id + "'";
    btnString += ">" + text + "</div>";
    console.log(btnString);
    var btn = $(btnString);
    btn.on("click", onClick);
    return btn;
}       

window.startMenuBtns = new Array();

function buildStart(callBack){
    var positionX = $(window).width() / 2 - $(window).width()/4;
    var positionY = $(window).height()/2 - 120;
    var menuContainer = $("<div id='startMenuContainer'></div>");
    var menu = $("<div id='startMenu'></div>");
    menuContainer.css("top", positionY);
    menuContainer.css("left", positionX);
    var buttonGroup = $("<div id='startBtnGroup'></div>");
    //var startBtn = $("<div class='pixel2 btn' id='startGame'>Start!</div>");
    
    var startBtn = createBtn("Start!", "startGame", "focused", function(){

    });
    buttonGroup.append(startBtn);
    window.startMenuBtns.push(startBtn);

    var howTo = createBtn("How To Play", "howTo", null, function(){

    });
    buttonGroup.append(howTo);
    window.startMenuBtns.push(howTo);

    var about = createBtn("About", "about", null, function(){

    });
    buttonGroup.append(about);
    window.startMenuBtns.push(about);

    var contact = createBtn("Contact", "contact", null, function(){

    });
    buttonGroup.append(contact);
    window.startMenuBtns.push(contact);
    
    menu.append(buttonGroup);
    $("#start_elements").append(menuContainer);
    menuContainer.append(menu);
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
        z = Math.random() > .7 ? -1 : 1; 
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
btnIndex = 0;
$(document).on("update", function(){
    if(Math.random() > .95)
        spawnAerial();
    //if(!$(focusedButton).hasClass(".focused"))
});

$(document).on("rightArrowKeyDown", function(){
    var btn = window.startMenuBtns[btnIndex];
    btn.removeClass("focused");
    btnIndex = (btnIndex + 1) % window.startMenuBtns.length;
    btn = window.startMenuBtns[btnIndex];
    btn.addClass("focused");
});

$(document).on("leftArrowKeyDown", function(){
    var btn = window.startMenuBtns[btnIndex];
    btn.removeClass("focused");
    btnIndex--;
    if(btnIndex < 0)
        btnIndex = window.startMenuBtns.length - 1;
    btn = window.startMenuBtns[btnIndex];
    btn.addClass("focused");
});

$(document).on("enterKeyDown", function(){
    var btn = window.startMenuBtns[btnIndex];
    btn.trigger("click");
    btn.addClass("clicked");
    setTimeout (function(){
        btn.removeClass("clicked");
    }, 100);
});
