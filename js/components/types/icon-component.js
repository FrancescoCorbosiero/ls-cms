import { MAIL_SVG } from "../../constant/svg.js";

export function createIcon(icon){
    return `<span class="fs-1 material-icons mdc-fab__icon">${icon}</span>`;
}

export function createAnimatedSvgIcon(svgIcon, animation){
    return `<div class="${animation}">${svgIcon}</div>`;
}