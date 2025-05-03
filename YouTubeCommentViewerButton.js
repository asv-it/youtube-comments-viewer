// ==UserScript==
// @name         YouTube CommentViewer Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Кнопка при нажатии которой открывается сайт https://commentviewer.com/, где можно сортировать и фильтровать комментарии к видео на YouTube.
// @author       asv-it
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function addButton() {
        if (document.getElementById('commentviewer-btn')) return;

        const button = document.createElement('button');
        button.id = 'commentviewer-btn';
        button.textContent = 'Open in CommentViewer';

        // Стилизация под YouTube
        Object.assign(button.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '9999',
            padding: '10px 16px',
            backgroundColor: '#282828',
            color: '#ffffff',
            border: '1px solid #3e3e3e',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'Roboto, Arial, sans-serif',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            transition: 'background-color 0.3s ease',
        });

        // Эффект при наведении
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#383838';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#282828';
        });

        // Переход по ссылке
        button.addEventListener('click', function () {
            const currentUrl = window.location.href;
            const viewerUrl = 'https://commentviewer.com/?v=' + encodeURIComponent(currentUrl);
            window.open(viewerUrl, '_blank');
        });

        document.body.appendChild(button);
    }

    // Прячем кнопку в fullscreen
    document.addEventListener('fullscreenchange', () => {
        const btn = document.getElementById('commentviewer-btn');
        if (!btn) return;

        btn.style.display = document.fullscreenElement ? 'none' : 'block';
    });

    addButton();
})();
