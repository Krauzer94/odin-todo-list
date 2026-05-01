import './style.css';

import { helloWorld } from './home.js';

document.addEventListener('DOMContentLoaded', () => {
    function loadHelloWorld() {
        helloWorld();
    };
    loadHelloWorld();
});
