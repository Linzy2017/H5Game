const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text
const BG_W = 640,
       BG_H = 17957
let BG_vy = 2 //屏幕位移速度
let masterSwitch = true, //总开关
    touchSwitch = false
let btn_move = $('#btn_move');
const imagesGroup = [
    'images/bg.jpg',
    'images/bg-far.png',
    'images/girl.png',
    'images/scene1_bg.jpg',
    'images/txt_01.png',
    'images/txt_02.png',
    'images/txt_03.png',
    'images/txt_04.png',
    'images/txt_05.png',
    'images/people1.png',
    'images/people2.png',
    'images/solider_a_1.png',
    'images/solider_a_2.png',
    'images/gun_fire.png',
    'images/dialog_01.png',
    'images/dialog_ship_1.png',
    'images/dialog_ship_2.png',
    'images/ship_black_a_1.png',
    'images/ship_black_a_2.png',
    'images/ship_white_a_1.png',
    'images/ship_white_a_2.png',
    'images/ico_close.png',
    'images/slogan_close.png',
    'images/ico_money.png',
    'images/dialog_bao_1.png',
    'images/dialog_bao_2.png',
    'images/dialog_bao_3.png',
    'images/ppl_a_1.png',
    'images/ppl_a_2.png',
    'images/bulb_1.png',
    'images/bulb_2.png',
    'images/dialog_paper.png',
    'images/dialog_paper_2.png',
    'images/newspaper.png',
    'images/ppl_paper_1.png',
    'images/ppl_paper_2.png',
    'images/ppl_crowd_1.png',
    'images/ppl_crowd_2.png',
    'images/net.png',
    'images/dialog_fail.png',
    'images/ppl_black_b_1.png',
    'images/ppl_black_b_2.png',
    'images/bao_a.png',
    'images/bao_b.png',
    'images/bao_c.png',
    'images/boat.png',
    'images/contract_1.png',
    'images/contract_2.png',
    'images/dialog_good_1.png',
    'images/dialog_good_2.png',
    'images/ppl_good_a_1.png',
    'images/ppl_good_a_2.png',
    'images/ppl_good_b.png',
    'images/ppl_good_c.png',
    'images/ppl_good_d.png',
    'images/ppl_good_e.png',
    'images/test.gif',
    'images/light_1.png',
    'images/light_2.png',
]
let sound01 = new Howl({
    src: 'mp3/1.mp3',
    preload: true
});

let sound02 = new Howl({
    src: 'mp3/2.mp3',
    preload: true
});

let sound03 = new Howl({
    src: 'mp3/3.mp3',
    preload: true
});

let sound04 = new Howl({
    src: 'mp3/4.mp3',
    preload: true
});

let sound05 = new Howl({
    src: 'mp3/5.mp3',
    preload: true
});

let sound06 = new Howl({
    src: 'mp3/6.mp3',
    preload: true
});

let sound07 = new Howl({
    src: 'mp3/7.mp3',
    preload: true
});

let sound08 = new Howl({
    src: 'mp3/8.mp3',
    preload: true
});

let sound09 = new Howl({
    src: 'mp3/10.mp3',
    preload: true
});

let sound10 = new Howl({
    src: 'mp3/11.mp3',
    preload: true
});

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
let isLoad = false; //图片是否加载完毕

$(function () {
   progressInit();
   init();
});

function init() {
    playAudio()
    loader.add(imagesGroup)
        .on("progress", loadProgressHandler)
        .load(setup);

    //阻止长按菜单行为
    window.document.oncontextmenu = function (e) {
        e.preventDefault();
    };
}

function progressInit() {
    let loadNumWarp = $('.mask .progress .num');
    let loadNum = 0;
    let loadNumRamdom =  Math.floor(Math.random() * 10) + 70;
    let loadNumRamdom2 = loadNumRamdom + 5 + Math.floor(Math.random() * 5);
    let timer = setInterval(() => {
        if (loadNum >= 100) {
            loadNumWarp.text(100);
            clearInterval(timer);
            setTimeout(() => {
                $('.mask').hide();
                $('#contain').show();
            }, 500);
        } else {
            if (loadNum < loadNumRamdom) {
                loadNum++;
            } else if (!isLoad) {
                let isAdd =  Math.floor(Math.random() * 10) <= 1
                if (loadNum < loadNumRamdom2 && isAdd) {
                    loadNum++;
                }
            } else {
                loadNum++;
            }
            loadNumWarp.text(loadNum)
        }
    }, 60)
}


function loadProgressHandler(loader, resource) {
    let progress = Math.round(loader.progress);
    console.log("loading: " + resource.url);
    console.log("progress: " + progress + "%");
    if (progress>= 100) {
        isLoad = true
    }
}

let test = true
// 主程序
function setup() {
    _createBg()

    APP.ticker.add(function (delta) {
         if (masterSwitch && touchSwitch)  {
             con_bg.position.y = con_bg.position.y - BG_vy * scale
             listenMove()
         }
        TWEEN.update();
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
    let bg = _createSprite('images/bg.jpg', {})
    con_bg.addChild(bg)
    setBgY(0)
    APP.stage.addChild(con_bg);
}

function _createSprite(source, params) {
    let sprite = new Sprite(resources[source].texture);
    sprite.scale.x = sprite.scale.y = scale * (params.scale || 1);
    sprite.position.x = (params.x || 0) * scale;
    sprite.position.y = (params.y || 0) *  scale;
    sprite.alpha = params.alpha || 1;
    return sprite
}

function _createAnimateSprite(sourceGroup, params) {
    let _textureGroup = []
    for(let i = 0; i < sourceGroup.length; i++) {
        let _texture = new PIXI.Texture(resources[sourceGroup[i]].texture)
        _textureGroup.push(_texture)
    }

    let movieClip = new PIXI.extras.AnimatedSprite(_textureGroup);
    movieClip.scale.x = movieClip.scale.y = scale;
    movieClip.position.x = (params.x || 0) * scale;
    movieClip.position.y = (params.y || 0) *  scale;
    movieClip.alpha = params.alpha || 1;
    movieClip.animationSpeed = parseFloat((10 / 120).toFixed(2)) * (params.speed || 1);
    movieClip.play();
    return movieClip
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

    //旁白01
    if (con_bg.position.y == - 50 * scale) {
        let movieClip = _createSprite('images/txt_01.png', {
            x: 100,
            y: 900,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:992 * scale
            },2000).start()
    }

    //士兵开火
    if (con_bg.position.y == - 800 * scale) {
        let movieClip = _createAnimateSprite(['images/people1.png', 'images/people2.png'], {
            x: -100,
            y: 1660,
            alpha: 0
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createAnimateSprite(['images/solider_a_1.png', 'images/solider_a_2.png'], {
            x: 640,
            y: 1660,
            alpha: 0
        })
        con_bg.addChild(movieClip2)

        let movieClip3 = _createSprite('images/gun_fire.png', {
            x: 210,
            y: 1630,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip3)

        new TWEEN.Tween(movieClip).to({
            x :65 * scale,
            alpha: 1
        }).start().
        onStart(function() {
            //动画开始回调
            sound01.play()
        })

        new TWEEN.Tween(movieClip2).to({
            x :380 * scale,
            alpha: 1
        }).start()

        new TWEEN.Tween(movieClip3).to({
            alpha: 1
        }).delay(1000).start()
    }


    //旁白2
    if (con_bg.position.y == - 1650 * scale) {
        let movieClip = _createSprite('images/txt_02.png', {
            x: 169,
            y: 2500,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)



        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:2600 * scale
            },2000).start()


    }


    //禁止标识
    if (con_bg.position.y == - 2000 * scale) {

        let movieClip2 = _createSprite('images/ico_close.png', {
            x: 250,
            y: 2836,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        let movieClip3 = _createSprite('images/slogan_close.png', {
            x: 400,
            y: 2848,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip3)

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:2936 * scale
            },2000).start()
            .onStart(function() {
                //动画开始回调
                sound02.play()
            })

        new TWEEN.Tween(movieClip3)
            .to({
                alpha: 1,
            },1000).delay(2000).start()
    }

    //士兵说话，禁行
    if (con_bg.position.y == - 2500 * scale) {

        let movieClip = _createSprite('images/dialog_01.png', {
            x: 230,
            y: 3254,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:3210 * scale
            },2000).start()


    }

    //元宝
    if (con_bg.position.y == - 4000 * scale) {

        let movieClip = _createSprite('images/ico_money.png', {
            x: 96,
            y: 4415,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:4515 * scale
            },2000).start()
    }

    //黑船
    if (con_bg.position.y == - 4100 * scale) {

        let movieClip = _createAnimateSprite(['images/ship_black_a_1.png', 'images/ship_black_a_2.png'], {
            x: 640,
            y: 5100,
            alpha: 0
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createSprite('images/dialog_ship_1.png', {
            x: 127,
            y: 5015,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                x:250 * scale
            },2000).start()
            .onStart(function() {
                //动画开始回调
                sound03.play()
            })


        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:4995 * scale
            },2000).delay(200).start()

    }

    //白船
    if (con_bg.position.y == - 4600 * scale) {


        let movieClip = _createAnimateSprite(['images/ship_white_a_1.png', 'images/ship_white_a_2.png'], {
            x: -200,
            y: 5650,
            alpha: 0
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createSprite('images/dialog_ship_2.png', {
            x: 396,
            y: 5572,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                x:75 * scale
            },2000).start()

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:5542 * scale
            },2000).delay(1000).start()
            .onStart(function() {
                //动画开始回调
                sound04.play()
            })

    }

    //绿人左
    if (con_bg.position.y == - 5200 * scale) {

        let movieClip = _createAnimateSprite(['images/ppl_a_1.png', 'images/ppl_a_2.png'], {
            x: -25,
            y: 6015,
            alpha: 0
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                x:83 * scale
            },2000).start()
    }

    //包玉刚心理活动
    if (con_bg.position.y == - 5600 * scale) {

        let movieClip = _createSprite('images/dialog_bao_1.png', {
            x: 255,
            y: 6462,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:6412 * scale
            },2000).start()
    }

    //包玉刚对话
    if (con_bg.position.y == - 6000 * scale) {

        let movieClip = _createSprite('images/dialog_bao_2.png', {
            x: 143,
            y: 7600,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:7579 * scale
            },1500).delay(2000).start()
            .onStart(function() {
                //动画开始回调
                sound05.play()
            })

        let movieClip2 = _createSprite('images/dialog_bao_3.png', {
            x: 445,
            y: 7585,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:7555 * scale
            },1500).delay(3500).start()
    }

    //路灯、报纸
    if (con_bg.position.y == - 8400 * scale) {

        let movieClip = _createAnimateSprite(['images/bulb_1.png', 'images/bulb_2.png'], {
            x: 50,
            y: 9375,
            alpha: 0
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createSprite('images/newspaper.png', {
            x: 34,
            y: 9300,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:9430 * scale,
                x: 64 * scale
            },2000).delay(1500).start()


    }


    //卖报纸人
    if (con_bg.position.y == - 9050 * scale) {

        let movieClip = _createAnimateSprite(['images/ppl_paper_1.png', 'images/ppl_paper_2.png'], {
            x: 650,
            y: 9657,
            alpha: 0
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createSprite('images/dialog_paper.png', {
            x: 320,
            y: 10025,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                x: 200 * scale,
                y: 10000 * scale
            },3000).start()
            .onStart(function() {
                //动画开始回调
                sound06.play()
            })

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:9985 * scale
            },2000).delay(2500).start()



    }

    //人群
    if (con_bg.position.y == - 9720 * scale) {

        let movieClip = _createAnimateSprite(['images/ppl_crowd_1.png', 'images/ppl_crowd_2.png'], {
            x: 25,
            y: 10438,
            alpha: 0.1
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createSprite('images/dialog_paper_2.png', {
            x: 153,
            y: 10394,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
            },1000).start()
            .onStart(function() {
                //动画开始回调
                sound07.play()
            })

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:10384 * scale
            },2000).delay(1500).start()

    }

    //码头
    if (con_bg.position.y == - 10400* scale) {

        let movieClip3 = _createSprite('images/net.png', {
            x: 232,
            y: 11241,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip3)

        let movieClip = _createAnimateSprite(['images/ppl_black_b_1.png', 'images/ppl_black_b_2.png'], {
            x: 360,
            y: 11519,
            alpha: 0.1
        })
        con_bg.addChild(movieClip)

        let movieClip2 = _createSprite('images/dialog_fail.png', {
            x: 404,
            y: 11406,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip2)


        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
            }).start()
            .onStart(function() {
                //动画开始回调
                sound08.play()
            })

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
                y:11356 * scale
            },2000).delay(1500).start()

        new TWEEN.Tween(movieClip3)
            .to({
                alpha: 1,
            },2000).delay(1500).start()

    }



    //人群赞赏
    if (con_bg.position.y == - 11580 * scale) {

        let movieClip = _createAnimateSprite(['images/ppl_good_a_1.png', 'images/ppl_good_a_2.png'], {
            x: 126,
            y: 12488,
            alpha: 0.1
        })

        let movieClip2 = _createSprite('images/ppl_good_b.png', {
            x: 290,
            y: 12486,
            alpha: 0.01,
        })

        let movieClip3 = _createSprite('images/ppl_good_c.png', {
            x: 455,
            y: 12570,
            alpha: 0.01,
        })

        let movieClip4 = _createSprite('images/ppl_good_d.png', {
            x: 350,
            y: 12378,
            alpha: 0.01,
        })

        let movieClip5 = _createSprite('images/ppl_good_e.png', {
            x: 496,
            y: 12223,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip5)
        con_bg.addChild(movieClip4)
        con_bg.addChild(movieClip3)
        con_bg.addChild(movieClip2)
        con_bg.addChild(movieClip)

        let movieClip6 = _createSprite('images/dialog_good_1.png', {
            x: 48,
            y: 12382,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip6)

        let movieClip7 = _createSprite('images/dialog_good_2.png', {
            x: 295,
            y: 12233,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip7)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
            }).start()

        new TWEEN.Tween(movieClip2)
            .to({
                alpha: 1,
            }).delay(800).start()

        new TWEEN.Tween(movieClip3)
            .to({
                alpha: 1,
            }).delay(1200).start()

        new TWEEN.Tween(movieClip4)
            .to({
                alpha: 1,
            }).delay(1400).start()

        new TWEEN.Tween(movieClip5)
            .to({
                alpha: 1,
            }).delay(1500).start()

        new TWEEN.Tween(movieClip6)
            .to({
                alpha: 1,
                y: 12362 * scale
            },1000).delay(200).start()

        new TWEEN.Tween(movieClip7)
            .to({
                alpha: 1,
                y: 12223 * scale
            }).delay(1500).start()

    }

    //合同飘下
    if (con_bg.position.y == - 11688 * scale) {

        let movieClip = _createSprite('images/contract_1.png', {
            x: 38,
            y: 12259,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:12299 * scale
            },2000).start()

    }

    //合同飘下2
    if (con_bg.position.y == - 12250 * scale) {

        let movieClip = _createSprite('images/contract_2.png', {
            x: 100,
            y: 13000,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y:13150 * scale
            },3000).start()

    }

    //包玉刚拿合同前，船开出
    if (con_bg.position.y == - 12600 * scale) {

        let movieClip = _createSprite('images/boat.png', {
            x: -600,
            y: 13620,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                x: -100 * scale
            },2000).start()

    }

    //包玉刚拿合同
    if (con_bg.position.y == - 12850 * scale) {

        let movieClip = _createAnimateSprite(['images/bao_a.png', 'images/bao_b.png', 'images/bao_c.png'], {
            x: 334,
            y: 13676,
            alpha: 0.1
        })
        movieClip.animationSpeed = parseFloat((10 / 960).toFixed(2))
        movieClip.loop = false
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
            }).start()
            .onStart(function() {
                //动画开始回调
                sound09.play()
            })

    }

    //旁白03
    if (con_bg.position.y == - 13560 * scale) {

        let movieClip = _createSprite('images/txt_03.png', {
            x: 47,
            y: 14430,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y: 14460 * scale
            },2000).start()
            .onStart(function() {
                //动画开始回调
                sound10.play()
            })

    }

    //包玉刚发光
    if (con_bg.position.y == - 14710 * scale) {

        let movieClip = _createAnimateSprite(['images/light_1.png', 'images/light_2.png'], {
            x: 90,
            y: 15520,
            alpha: 0.1
        })
        movieClip.animationSpeed = parseFloat((10 / 240).toFixed(2))
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
            },2000).start()


    }

    //旁白04
    if (con_bg.position.y == - 15742 * scale) {

        let movieClip = _createSprite('images/txt_04.png', {
            x: 60,
            y: 16742,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y: 16842 * scale
            },2000).start()


    }



    //旁白05
    if (con_bg.position.y == - 16542 * scale) {

        let movieClip = _createSprite('images/txt_05.png', {
            x: 85,
            y: 17514,
            alpha: 0.01,
        })
        con_bg.addChild(movieClip)

        new TWEEN.Tween(movieClip)
            .to({
                alpha: 1,
                y: 17614 * scale
            },2000).start()


    }

}

function playAudio() {
    let audio= $('#myAudio')[0]
    let play = () => {
        audio.play()
        document.removeEventListener('touchstart', play, false)
    }
    audio.play()
    document.addEventListener('WeixinJSBridgeReady', function () {
        play()
    }, false)
    document.addEventListener('YixinJSBridgeReady', function () {
        play()
    }, false)
    document.addEventListener('touchstart', play, false)
}
