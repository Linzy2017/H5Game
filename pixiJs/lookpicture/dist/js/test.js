const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text
const BG_W = 640,
    BG_H = 16273
let BG_vy = 1 //屏幕位移速度
let masterSwitch = true, //总开关
    touchSwitch = false
let btn_move = $('#btn_move');
const imagesGroup = [
    'images/bg.jpg',
    'images/bg-far.png',
    'images/girl.png',
    'images/scene1_bg.jpg',
    'images/people1.png',
    'images/people2.png'
]

let screen_H = $(window).height() //屏幕高度
let screen_W = 640 * window.adaptive.newBase / 100 //屏幕宽度
let APP = new Application({
        width: screen_W,
        height: screen_H,
        antialiasing: true,
        transparent: false,
        resolution: 1
    }
);
$('#contain').append(APP.view);


//高清屏的适配
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
function getPixelRatio (context) {
    let backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};
let ratio = getPixelRatio(ctx);
let scale = window.adaptive.newBase / 100 * ratio;
screen_H *= ratio;
screen_W *= ratio;

$(function () {
    init()
});

function init() {
    loader.add(imagesGroup)
        .on("progress", loadProgressHandler)
        .load(setup);
}

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
}

let test = true
// 主程序
function setup() {
    _createBg()

    let con_people = new Container
    let people = _createSprise('images/people1.png')
    people.texture.textureCacheIds = resources['images/test.png'].texture
    con_people.position.y = 0
    con_people.addChild(people)
    con_bg.addChild(con_people)
    var tweenWithCallback = new Tween(con_people, "position.x", 100, 150, true)
    tweenWithCallback.setOnComplete(function () {
        test = false
    })
    APP.ticker.add(function (delta) {
        if (masterSwitch && touchSwitch)  {
            con_bg.position.y = con_bg.position.y - BG_vy * scale
            listenMove()
        }
        Tween.runTweens();
    });

    btn_move.on('touchstart', function () {
        touchSwitch = true
    })
    btn_move.on('touchend', function () {
        touchSwitch = false
    })
}

let con_bg
function _createBg() {
    con_bg = new Container;
    let bg = _createSprise('images/bg.jpg')
    con_bg.addChild(bg)
    setBgY(0)
    APP.stage.addChild(con_bg);
}

function _createSprise(source) {
    let sprite = new Sprite(resources[source].texture);
    sprite.scale.x = sprite.scale.y = scale;
    return sprite
}

//设置背景位移高度
function setBgY(num) {
    if (-num <= - (BG_H * scale - screen_H)) {
        console.log('超出画布')
    } else {
        con_bg.position.y =  - num * scale
    }
}

function listenMove() {
    if (con_bg.position.y <= - (BG_H * scale - screen_H)) {
        masterSwitch = false
    }
}
