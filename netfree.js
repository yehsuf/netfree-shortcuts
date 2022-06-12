// ==UserScript==
// @name         css_save_button
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the wor
// @author       Yehsuf
// @match        https://netfree.link/app/
// @icon         https://www.google.com/s2/favicons?domain=netfree.link
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    // בחר דפי הגדרות סינון בלבד
    if (window.location.hash.match(/#\/(support\/control-user\/user-filter-settings\/*|user\/filter-settings)/)) {
        // קיבוע איזור הכותרת שמכילה את כפתור השמירה בראש העמוד
        // create a style element
        const style = document.createElement('style');
        // add the CSS as a string using template literals
        style.appendChild(document.createTextNode(`
.border-bottom.white-bg.page-heading {
    position: sticky;
    top: 60px;
    z-index: 1000;
}`));
        // add it to the head
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(style);

        // הוספת קיצור דרך ללחצן שמור בצירוף מקשים ctrl + s
        document.addEventListener("keydown", function(e) {
            if ((e.keyCode == 83 || e.keyCode == 32) && e.ctrlKey) {
                e.preventDefault();
                [...document.querySelectorAll('button.btn.btn-primary.pull-end')].filter(x => x.innerText.includes('שמור'))[0].click()
                if (window.location.hash.match(/#\/support\/control-user\/user-filter-settings\/(?!48079)/)) {
                    setTimeout(() => window.close(), 100); // סגירת הדף
                }
            }
        }, false);
    }

    // בחירת דף תמיכה בלבד
    if (window.location.hash.match(/#\/support\/tickets\/(ticket\/*|list)/)) {
        // קיבוע הכותרת לראש העמוד
        // create a style element
        const style = document.createElement('style');
        // add the CSS as a string using template literals
        style.appendChild(document.createTextNode(`
.ibox-title:not(.clearfix) {
    position: sticky;
    top: 60px;
    z-index: 1000;
}`));
        // add it to the head
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
        // קיצורי מקשים הכל יחד עם קונטרול
        // ctrl + s "טופל בהצלחה" וסגירת הפניה
        document.addEventListener("keydown", function(e) {
            if (e.keyCode == 83 && e.ctrlKey) {
                e.preventDefault();
                let aa = document.getElementById("respons-text")
                aa.value = "טופל\n\nבהצלחה!";
                aa.dispatchEvent(new Event('input', { bubbles: true }));
                [...document.querySelectorAll('button.btn.btn-primary')].filter(x => x.innerText.includes('שלח וסגור פניה וטאב'))[0].click();
            }
            // קונטרול רווח = שלח וסגור פניה
            else if (e.keyCode == 32 && e.ctrlKey) {
                e.preventDefault();
                [...document.querySelectorAll('button.btn.btn-primary')].filter(x => x.innerText.includes('שלח וסגור פניה'))[0].click();
            }
            // קונטרול אלט = הודעה פנימית
            else if (e.altKey && e.ctrlKey) {
                e.preventDefault();
                [...document.querySelectorAll('button.btn.btn-warning.btn-xs.btn-margin')].filter(x => x.innerText.includes('שלח הודעה פנימית'))[0].click();
            }
        }, false);
    }

})();