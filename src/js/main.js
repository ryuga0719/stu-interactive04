import {ScrollProgress} from "./modules/ScrollProgress";



const scrollProgress = new ScrollProgress();
scrollProgress.createBarProgress(".js-meter");
scrollProgress.getScrollRatio(".wrapper");
scrollProgress.rotateByProgress(".js-bar");
scrollProgress.rotateHalfByProgress(".js-half-bar");