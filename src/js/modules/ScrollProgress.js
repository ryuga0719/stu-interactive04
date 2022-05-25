import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class ScrollProgress {
    /**
     * windowの縦横幅
     */
    windowInfo = {
        width: 0,
        height: 0,
    };

    ratio = 0;

    constructor() {
        // 初期化
        this.init();
    }

    /**
     * 初期化処理
     */
    init() {
        this.windowInfo.width = window.innerWidth;
        this.windowInfo.height = window.innerHeight;
        // ScrollTriggerプラグインの登録
        gsap.registerPlugin(ScrollTrigger);
    }

    /**
     * プログレスバーの生成
     * @param { string } targetClassName - バーの要素
     */
    createBarProgress(targetClassName) {
        gsap.set(targetClassName, { width: 0 });
        gsap.to(targetClassName, {
            width: this.windowInfo.width,
            scrollTrigger: {
                start: "top top", // アニメーション開始位置
                end: "bottom bottom", // アニメーション終了位置
                scrub: true, // アニメーションをスクロール位置にリンクさせる
            },
        });
    }

    /**
     * スクロール比率を取得する
     * @param {string} scrollTarget - スクロール対象のHTML要素のセレクタ
     */
    getScrollRatio(scrollTarget) {
        ScrollTrigger.create({
            trigger: scrollTarget,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => this.#addScrollRatio2DOM(self.progress),
        });
    }

    /**
     * スクロール比率をDOMに挿入する
     * @param {number} progress - スクロール比率(小数)
     */
    #addScrollRatio2DOM(progress) {
        this.ratio = Math.floor(progress * 100); // スクロール比率を計算
        const elem = document.querySelector(".js-rate-text");
        elem.innerText = this.ratio + "%";
    }

    /**
     * スクロール比率によってバーを回転させる
     */
    rotateByProgress(targetClassName) {
        gsap.set(targetClassName, { rotate: 0 });
        gsap.to(targetClassName, {
            rotate: 360,
            scrollTrigger: {
                start: "top top", // アニメーション開始位置
                end: "bottom bottom", // アニメーション終了位置
                scrub: true, // アニメーションをスクロール位置にリンクさせる
            },
        });
    }

    /**
     * スクロール比率によってバーを半回転させる
     */
    rotateHalfByProgress(targetClassName) {
      gsap.set(targetClassName, { rotate: 0 });
      gsap.to(targetClassName, {
          rotate: 180,
          scrollTrigger: {
              start: "top top", // アニメーション開始位置
              end: "bottom bottom", // アニメーション終了位置
              scrub: true, // アニメーションをスクロール位置にリンクさせる
          },
      });
    }
}
