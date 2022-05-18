import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class ScrollProgress {
    /**
     * windowInfo
     */
    windowInfo = {
        width: 0,
        height: 0,
    };

    constructor() {
      // 初期化
      this.init();
    }

    /**
     * init
     * 初期化処理
     */
    init() {
        this.windowInfo.width = window.innerWidth;
        this.windowInfo.height = window.innerHeight;
        // ScrollTriggerプラグインの登録
        gsap.registerPlugin(ScrollTrigger);
    }

    /**
     * createBarProgress
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
                markers: true, // マーカー表示
            },
        });
    }
}
