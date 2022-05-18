import { log } from "./modules/core/Debug";
import $ from "jquery";
import ripples from "jquery.ripples";
import bgUrl from "/src/img/bg.jpg";
import bugUrl from "/src/img/bug.png";
import gsap from "gsap";
import { radian2Degree } from "./modules/core/MathUtils";
log("sample", null);

const elem = document.getElementById("target");
gsap.set(elem, {
    backgroundImage: "url(" + bugUrl + ")",
});

// 水面
$("#wrap").ripples({
    resolution: 128, // 揺らぐスピード
    dropRadius: 50,
    perturbance: 0.02,
    imageUrl: bgUrl,
});

// ターゲットのポジション
let pos = {
    x: 0,
    y: 0,
};

// マウスのポジション
let mousePos = {
    x: 0,
    y: 0,
};

const calcRotation = (mouseX, mouseY, targetX, targetY) => {
    // マウス座標との差分を計算
    const dx = mouseX - targetX;
    const dy = mouseY - targetY;
    // 差分を元に方向を計算
    const radians = Math.atan2(dy, dx);
    // ラジアンを角度に変換
    return radian2Degree(radians);
};

$("#wrap").on("click", function (e) {
    const radius = 75;
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;

    const tl = gsap.timeline({
        repeat: 0, // アニメーションの繰り返し回数
        defaults: { duration: 0.5, ease: "power4.out" },
    });

    const mouseCenter = {
        x: mousePos.x - radius,
        y: mousePos.y - radius,
    };

    const newX = (pos.x + mouseCenter.x) / 2;
    const newY = (pos.y + mouseCenter.y) / 2;

    const degree = calcRotation(mouseCenter.x, mouseCenter.y, pos.x, pos.y);
    log("degree", degree);

    // 回転
    gsap.set(elem, {
        rotate: degree,
    });

    // アニメーションを実行
    tl.to(elem, {
        x: newX,
        y: newY,
    }).to(elem, {
        x: mouseCenter.x,
        y: mouseCenter.y,
    });

    // ターゲットの座標を更新
    pos.x = mouseCenter.x;
    pos.y = mouseCenter.y;
});
