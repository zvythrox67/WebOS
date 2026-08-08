function saveData(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch(e) {

    }
}

function getData(key) {
    try {
        return localStorage.getItem(key);
    } catch(e) {
        return null;
    }
}

const bootMessages = [
    'loading system files v19.2..........[ok]',
    'mounting cloud storage..........[ok]',
    'setting up environment..........[ok]',
    'mounting filesystem..........[ok]',
    'initializing display server..........[ok]',
    'Connecting to network..........[ok]',
    'Starting System..........[ok]',
    '[System Ready] welcome!'
];

const bootLog = document.getElementById('boot-log');

bootMessages.forEach((msg, i) => {
    setTimeout(() => {
        const line = document.createElement('div');
        line.textContent = msg;
        bootLog.appendChild(line);
    }, i * 230 )
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('boot').classList.add('hide');
        setTimeout(() => {
            document.getElementById('boot').remove();
        }, 550);
    }, 1650);
})

function updateClock() {
    const clockEl = document.getElementById('clock');
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    if (hours === 0) hours = 12;

    const minsStr = String(minutes).padStart(2, '0');

    clockEl.textContent = hours + ':' + minsStr + ' ' + ampm;
}

updateClock();

setInterval(updateClock, 10000);

const themes = [
    { cyan: '#00F0FF', magenta: '#FF2E92' },
    { cyan: '#39FF88', magenta: '#B14EFF' },
    { cyan: '#FFC24B', magenta: '#00F0FF' },
    { cyan: '#FF2E92', magenta: '#39FF88' } 
]

let currentTheme = 0;

function changeTheme(index) {
    currentTheme = ((index % themes.length) + themes.length) % themes.length;
    const theme = themes[currentTheme];

    document.documentElement.style.setProperty('--cyan', theme.cyan);
    document.documentElement.style.setProperty('--magenta', theme.magenta);

    saveData('theme-index', String(currentTheme));
}

const savedTheme = getData('theme-index');
if(savedTheme  !== null) {
    changeTheme(parseInt(savedTheme, 10) || 0);
}

const catArt = [
    { color: '#ff2ed1', name: 'Flamingo' },
    { color: '#fe1602', name: 'Apple' },
    { color: '#8201fe', name: 'Violet' },
    { color: '#00fe66', name: 'Sage' },
    { color: '#fefe00', name: 'Mango' },
    { color: '#00F0FF', name: 'Cyan' }
];

const catSVGs = catArt.map(cat => {
    const c = cat.color;
    const name = cat.name.toUpperCase();
    
    return `
        <svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#03040a"/>
            <!-- Cat ears -->
            <polygon points="28,32 20,10 40,26" fill="none" stroke="${c}" stroke-width="2.5"/>
            <polygon points="72,32 80,10 60,26" fill="none" stroke="${c}" stroke-width="2.5"/>
            <!-- Cat face -->
            <ellipse cx="50" cy="55" rx="28" ry="24" fill="none" stroke="${c}" stroke-width="2.5"/>
            <!-- Eyes -->
            <circle cx="38" cy="52" r="3" fill="${c}"/>
            <circle cx="62" cy="52" r="3" fill="${c}"/>
            <!-- Mouth -->
            <path d="M45 62 Q50 66 55 62" stroke="${c}" stroke-width="2" fill="none"/>
            <!-- Name -->
            <text x="50" y="94" font-size="9" text-anchor="middle" fill="${c}">${name}</text>
        </svg>
  `;
});

const trackList = [
    { title: 'call of the night', mood: 'synthwave · night drive' },
    { title: 'ghost in the terminal', mood: 'darksynth · low fi' },
    { title: 'neon haven', mood: 'ambient · glitch' },
    { title: 'SuperNova lullaby', mood: 'synthwave · slow' }
]

const APPS = {
    terminal: {
        title: 'Terminal',
        icon: '⌨',
        width: 440,
        height: 340,

        createContent() {
            const container = document.createElement('div');
            container.className = 'terminal';

            const output = document.createElement('div');
            output.className = 'term-output';
            output.id = 'terminal-out';
            output.textContent = 'CYBER_OS TERMINAL v1.0\ntype \'help\' for commands.';

            const inputLine = document.createElement('div');
            inputLine.className = 'term-input-line';

            const prompt = document.createElement('span');
            prompt.textContent = '>';

            const input = document.createElement('input');
            input.className = 'term-input';
            input.id = 'term-in';
            input.autocomplete = 'off';

            inputLine.appendChild(prompt);
            inputLine.appendChild(input);

            container.appendChild(output);
            container.appendChild(inputLine);

            return container;
        },

        init() {
            const output = document.getElementById('term-out');
            const input = document.getElementById('term-in');

            function printLine(text){
                output.textContent += text + "\n";
                output.scrollTop = output.scrollHeight;
            }

            const files = {
                'todo.txt': '- homework\n- clean room\n- pet the cat',
                'fortune.txt': 'A clean room is a myth. Just build stuff.'
            }

            input.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter') return;

                const command = input.value.trim();
                output.textContent += "\n> " + command;
                input.value = '';

                const parts = command.split(' ');
                const cmd = parts[0];
                const args = parts.slice(1);

                switch (cmd) {
                    case 'help':
                        printLine('\ncommands: help, whoami, date, meow, echo, ls, cat, theme, clear, exit');
                        break;
                    case 'whoami':
                        printLine('\nYou are a cyberpunk hacker');
                        break;
                    case 'date':
                        printLine('\n' + new Date().toString());
                        break;
                    case 'meow':
                        printLine('\n /\\_/\\ \n( o.o )  meow!');
                        break;
                    case 'echo':
                        printLine('\n' + args.join(' '));
                        break;
                    case 'ls':
                        printLine('\n' + Object.keys(files).join('   '));
                        break;
                    case 'cat':
                        if (files[args[0]]) {
                            printLine('\n' + files[args[0]]);
                        } else {
                            printLine('\nFile not found: ' + (args[0] || ''));
                        }
                        break;
                    case 'theme':
                        const idx = parseInt(args[0], 10);
                        if (!isNaN(idx) && idx >= 0 && idx < 4) {
                            changeTheme(idx);
                            printLine('\nTheme changed!');
                        } else {
                            printLine('\nUsage: theme [0-3]');
                        }
                        break;
                    case 'clear':
                        output.textContent = '';
                        break;
                    case 'exit':
                        closeWindow('terminal');
                        break;
                    default:
                        if (cmd) {
                            printLine('\nCommand not found: ' + cmd + ' (try help)');
                        }
                }
            });

            input.focus();
        }
    },

    notes: {
        title: 'Notes',
        icon: '▤',
        width: 340,
        height: 320,

        createContent() {
            const container = document.createElement('div');
            
            const textarea = document.createElement('textarea');
            textarea.id = 'notes-area';
            textarea.placeholder = 'Write something...';
            
            const status = document.createElement('div');
            status.className = 'notes-status';
            status.id = 'notes-status';
            status.textContent = 'loading...';
            
            container.appendChild(textarea);
            container.appendChild(status);
            
            return container;
        },
        init() {
            const textarea = document.getElementById('notes-area');
            const status = document.getElementById('notes-status');

            const savedNotes = getData('notes-content');
            textarea.value = savedNotes || '';
            status.textContent = savedNotes ? 'loaded ✓' : 'new note';

            let timeoutId;
            textarea.addEventListener('input', () => {
                status.textContent = 'saving...';
                clearTimeout(timeoutId);

                timeoutId = setTimeout(() => {
                    saveData('notes-content', textarea.value);
                    status.textContent = 'saved ✓';
                }, 500);
            });
        }
    },

    paint: {
        title: 'Sketch',
        icon: '✎',
        width: 440,
        height: 420,

        createContent() {
            const container = document.createElement('div');
            
            const toolbar = document.createElement('div');
            toolbar.className = 'paint-toolbar';
            
            const colors = ['#00F0FF', '#FF2E92', '#B14EFF', '#39FF88', '#FFC24B', '#DCEBFF'];
            
            colors.forEach((c, i) => {
                const swatch = document.createElement('div');
                swatch.className = 'swatch' + (i === 0 ? ' active' : '');
                swatch.dataset.color = c;
                swatch.style.background = c;
                toolbar.appendChild(swatch);
            });

            const brushSize = document.createElement('input');
            brushSize.type = 'range';
            brushSize.id = 'brush-size';
            brushSize.min = '1';
            brushSize.max = '20';
            brushSize.value = '4';
            
            const clearBtn = document.createElement('button');
            clearBtn.id = 'paint-clear';
            clearBtn.textContent = 'CLEAR';
            
            toolbar.appendChild(brushSize);
            toolbar.appendChild(clearBtn);

            const canvas = document.createElement('canvas');
            canvas.id = 'paint-canvas';
            canvas.width = 392;
            canvas.height = 300;
            
            container.appendChild(toolbar);
            container.appendChild(canvas);
            
            return container;
        },

        init() {
            const canvas = document.getElementById('paint-canvas');
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#03040a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let drawing = false;
            let currentColor = '#00F0FF';
            let brushSize = 4;
            let lastPos = null;

            document.querySelectorAll('.swatch').forEach(swatch => {
                swatch.addEventListener('click', () => {
                    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                    currentColor = swatch.dataset.color;
                });
            });

            document.getElementById('brush-size').addEventListener('input', (e) => {
                brushSize = parseInt(e.target.value, 10);
            });

            document.getElementById('paint-clear').addEventListener('click', () => {
                ctx.fillStyle = '#03040a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            function getPos(e) {
                const rect = canvas.getBoundingClientRect();
                return {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }

            canvas.addEventListener('pointerdown', (e) => {
                drawing = true;
                lastPos = getPos(e);
                canvas.setPointerCapture(e.pointerId);
            });

            canvas.addEventListener('pointermove', (e) => {
                if (!drawing) return;

                const pos = getPos(e);

                ctx.strokeStyle = currentColor;
                ctx.lineWidth = brushSize;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowColor = currentColor;
                ctx.shadowBlur = 6;

                ctx.beginPath();
                ctx.moveTo(lastPos.x, lastPos.y);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();

                lastPos = pos;
            });

            window.addEventListener('pointerup', () => {
                drawing = false;
            });
        }
    },
    music: {
        title: 'Music',
        icon: '♪',
        width: 300,
        height: 360,
        
        createContent() {
            const container = document.createElement('div');
            container.className = 'music-player';
            
            const art = document.createElement('div');
            art.className = 'music-art';
            art.textContent = '📡';
            
            const title = document.createElement('div');
            title.className = 'track-title';
            title.id = 'mp-title';
            title.textContent = trackList[0].title;
            
            const mood = document.createElement('div');
            mood.className = 'track-sub';
            mood.id = 'mp-sub';
            mood.textContent = trackList[0].mood;
            
            const bars = document.createElement('div');
            bars.className = 'bars';
            bars.id = 'mp-bars';
            
            for (let i = 0; i < 9; i++) {
                const bar = document.createElement('span');
                bar.style.animationDelay = (i * 0.08) + 's';
                bars.appendChild(bar);
            }
            
            const controls = document.createElement('div');
            controls.className = 'music-controls';
            
            const prevBtn = document.createElement('button');
            prevBtn.id = 'mp-prev';
            prevBtn.textContent = '⏮';
            
            const playBtn = document.createElement('button');
            playBtn.id = 'mp-play';
            playBtn.className = 'play';
            playBtn.textContent = '▶';
            
            const nextBtn = document.createElement('button');
            nextBtn.id = 'mp-next';
            nextBtn.textContent = '⏭';
            
            controls.appendChild(prevBtn);
            controls.appendChild(playBtn);
            controls.appendChild(nextBtn);
            
            const list = document.createElement('div');
            list.className = 'track-list';
            list.id = 'mp-list';
            
            container.appendChild(art);
            container.appendChild(title);
            container.appendChild(mood);
            container.appendChild(bars);
            container.appendChild(controls);
            container.appendChild(list);
            
            return container;
        },
        
        init() {
            let currentTrack = 0;
            let isPlaying = false;

            const titleEl = document.getElementById('mp-title');
            const moodEl = document.getElementById('mp-sub');
            const barsEl = document.getElementById('mp-bars');
            const playBtn = document.getElementById('mp-play');
            const listEl = document.getElementById('mp-list');

            function renderTrackList() {
                listEl.innerHTML = '';
                trackList.forEach((track, i) => {
                    const row = document.createElement('div');
                    row.className = 'track-row' + (i === currentTrack ? ' playing' : '');
                    row.dataset.index = i;
                    
                    const titleSpan = document.createElement('span');
                    titleSpan.textContent = track.title;
                    
                    const statusSpan = document.createElement('span');
                    statusSpan.textContent = (isPlaying && i === currentTrack) ? '▮▮' : '';
                    
                    row.appendChild(titleSpan);
                    row.appendChild(statusSpan);
                    
                    row.addEventListener('click', () => {
                        currentTrack = parseInt(row.dataset.index, 10);
                        updateDisplay();
                    });
                    
                    listEl.appendChild(row);
                });
            }

            function updateDisplay() {
                titleEl.textContent = trackList[currentTrack].title;
                moodEl.textContent = trackList[currentTrack].mood;

                barsEl.style.opacity = isPlaying ? '1' : '0.3';
                barsEl.style.animationPlayState = isPlaying ? 'running' : 'paused';

                playBtn.textContent = isPlaying ? '⏸' : '▶';

                renderTrackList();
            }

            document.getElementById('mp-play').addEventListener('click', () => {
                isPlaying = !isPlaying;
                updateDisplay();
            });

            document.getElementById('mp-prev').addEventListener('click', () => {
                currentTrack = (currentTrack - 1 + trackList.length) % trackList.length;
                updateDisplay();
            });

            document.getElementById('mp-next').addEventListener('click', () => {
                currentTrack = (currentTrack + 1) % trackList.length;
                updateDisplay();
            });

            updateDisplay();
        }
    },

    gallery: {
        title: 'Gallery',
        icon: '▧',
        width: 380,
        height: 360,
        
        createContent() {
            const container = document.createElement('div');
            container.className = 'gallery-grid';
            
            catSVGs.forEach(svg => {
                const card = document.createElement('div');
                card.className = 'gallery-card';
                card.innerHTML = svg;
                container.appendChild(card);
            });
            
            return container;
        },
        
        init() {}
    },

    calculator: {
        title: 'Calculator',
        icon: '▦',
        width: 260,
        height: 340,
        
        createContent() {
            const container = document.createElement('div');
            container.className = 'calc';
            
            const display = document.createElement('div');
            display.id = 'calc-display';
            display.textContent = '0';
            
            const grid = document.createElement('div');
            grid.className = 'calc-grid';
            
            const keys = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', 'C', '+', '='];
            
            keys.forEach(key => {
                const btn = document.createElement('button');
                btn.dataset.key = key;
                btn.textContent = key;
                
                if (['/', '*', '-', '+'].includes(key)) {
                    btn.className = 'op';
                }
                if (key === '=') {
                    btn.className = 'eq';
                }
                
                grid.appendChild(btn);
            });
            
            container.appendChild(display);
            container.appendChild(grid);
            
            return container;
        },
        
        init() {
            const display = document.getElementById('calc-display');
            let expression = '';

            document.querySelectorAll('.calc-grid button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const key = btn.dataset.key;

                    if (key === 'C') {
                        expression = '';
                        display.textContent = '0';
                        return;
                    }

                    if (key === '=') {
                        try {
                            if (!/^[0-9+\-*/.\s]+$/.test(expression)) {
                                display.textContent = 'ERR';
                                expression = '';
                                return;
                            }
                            const result = Function('"use strict";return (' + expression + ')')();
                            display.textContent = String(result);
                            expression = String(result);
                        } catch(e) {
                            display.textContent = 'ERR';
                            expression = '';
                        }
                        return;
                    }

                    expression += key;
                    display.textContent = expression;
                });
            });
        }
    },

    about: {
        title: 'About',
        icon: 'i',
        width: 300,
        height: 370,
        
        createContent() {
            const container = document.createElement('div');
            container.className = 'about-box';
            
            const ascii = document.createElement('div');
            ascii.className = 'ascii';
            ascii.textContent = '   /\\_/\\\n  ( 0.0 )\n   > ^ <   CYBER_OS v1.0';
            
            const specs = [
                ['USER', 'cyberhacker'],
                ['KERNEL', 'cyberpunk core'],
                ['APPS', '7 installed'],
                ['VIBE', 'cyberpunk']
            ];
            
            container.appendChild(ascii);
            
            specs.forEach(([label, value]) => {
                const row = document.createElement('div');
                row.className = 'spec-row';
                
                const labelSpan = document.createElement('span');
                labelSpan.textContent = label;
                
                const valueSpan = document.createElement('span');
                valueSpan.textContent = value;
                
                row.appendChild(labelSpan);
                row.appendChild(valueSpan);
                container.appendChild(row);
            });
            
            const footer = document.createElement('p');
            footer.style.cssText = 'font-size:11px;margin-top:10px;opacity:0.6;';
            footer.textContent = 'A personal cyberpunk desktop. Right-click for more options.';
            container.appendChild(footer);
            
            return container;
        },
        
        init() {}
    },

    trash: {
        title: 'Trash',
        icon: '⌫',
        width: 260,
        height: 200,
        
        createContent() {
            const container = document.createElement('div');
            container.className = 'trash-box';
            
            const big = document.createElement('div');
            big.className = 'big';
            big.textContent = '⌫';
            
            const msg = document.createElement('p');
            msg.textContent = 'Empty. Too tidy for your own good.';
            
            container.appendChild(big);
            container.appendChild(msg);
            
            return container;
        },
        
        init() {}
    }
};

const windowLayer = document.getElementById('windows-layer');
const taskbarWindows = document.getElementById('open-windows');
const openWindows = {};
let highestZIndex = 10;
let windowCascade = 0;

function bringToFront(id) {
    highestZIndex += 1;
    openWindows[id].element.style.zIndex = highestZIndex;

    document.querySelectorAll('.taskbtn').forEach(btn => btn.classList.remove('active'));
    if (openWindows[id].taskButton) {
        openWindows[id].taskButton.classList.add('active');
    }
}

function closeWindow(id) {
    if (!openWindows[id]) return;

    openWindows[id].element.remove();
    if (openWindows[id].taskButton) {
        openWindows[id].taskButton.remove();
    }
    delete openWindows[id];
}

function toggleMinimize(id) {
    const win = openWindows[id];
    const isHidden = win.element.style.display === 'none';

    win.element.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) bringToFront(id);
}

function toggleMaximize(id) {
    const win = openWindows[id];

    if (!win.element.classList.contains('maximized')) {
        win.prevRect = {
            left: win.element.style.left,
            top: win.element.style.top,
            width: win.element.style.width,
            height: win.element.style.height
        };
        win.element.classList.add('maximized');
    } else {
        win.element.classList.remove('maximized');
        win.element.style.left = win.prevRect.left;
        win.element.style.top = win.prevRect.top;
        win.element.style.width = win.prevRect.width;
        win.element.style.height = win.prevRect.height;
    }
}

function openApp(id) {
    if (openWindows[id]) {
        if (openWindows[id].element.style.display === 'none') {
            toggleMinimize(id);
        }
        bringToFront(id);
        return;
    }

    const app = APPS[id];

    const maxWidth = Math.min(app.width, window.innerWidth - 30);
    const maxHeight = Math.min(app.height, window.innerHeight - 106);

    const el = document.createElement('div');
    el.className = 'window';
    el.style.width = maxWidth + 'px';
    el.style.height = maxHeight + 'px';
    el.style.left = (30 + (windowCascade % 6) * 26) + 'px';
    el.style.top = (24 + (windowCascade % 6) * 24) + 'px';
    windowCascade++;

    const titlebar = document.createElement('div');
    titlebar.className = 'titlebar';
    
    const title = document.createElement('div');
    title.className = 'title';
    const iconSpan = document.createElement('span');
    iconSpan.textContent = app.icon;
    title.appendChild(iconSpan);
    title.appendChild(document.createTextNode(app.title));
    
    const controls = document.createElement('div');
    controls.className = 'win-controls';
    
    const minBtn = document.createElement('button');
    minBtn.className = 'win-btn min';
    minBtn.textContent = '–';
    
    const maxBtn = document.createElement('button');
    maxBtn.className = 'win-btn max';
    maxBtn.textContent = '▢';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'win-btn close';
    closeBtn.textContent = '×';
    
    controls.appendChild(minBtn);
    controls.appendChild(maxBtn);
    controls.appendChild(closeBtn);
    
    titlebar.appendChild(title);
    titlebar.appendChild(controls);
    
    const content = document.createElement('div');
    content.className = 'win-content';
    const appContent = app.createContent();
    content.appendChild(appContent);
    
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    
    el.appendChild(titlebar);
    el.appendChild(content);
    el.appendChild(resizeHandle);
    
    windowLayer.appendChild(el);

    const taskBtn = document.createElement('button');
    taskBtn.className = 'taskbtn';
    const taskIcon = document.createElement('span');
    taskIcon.textContent = app.icon;
    const taskLabel = document.createElement('span');
    taskLabel.textContent = app.title.toUpperCase();
    taskBtn.appendChild(taskIcon);
    taskBtn.appendChild(taskLabel);
    taskBtn.addEventListener('click', () => toggleMinimize(id));
    taskbarWindows.appendChild(taskBtn);

    openWindows[id] = {
        element: el,
        taskButton: taskBtn
    };

    bringToFront(id);

    el.addEventListener('pointerdown', () => bringToFront(id));

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow(id);
    });

    minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMinimize(id);
    });

    maxBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMaximize(id);
    });

    let isDragging = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;

    titlebar.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.win-btn')) return;
        if (el.classList.contains('maximized')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        offsetX = el.offsetLeft;
        offsetY = el.offsetTop;
        titlebar.setPointerCapture(e.pointerId);
    });

    titlebar.addEventListener('pointermove', (e) => {
        if (!isDragging) return;

        el.style.left = Math.max(0, offsetX + (e.clientX - startX)) + 'px';
        el.style.top = Math.max(0, offsetY + (e.clientY - startY)) + 'px';
    });

    titlebar.addEventListener('pointerup', () => {
        isDragging = false;
    });

    let isResizing = false;
    let resizeStartX = 0, resizeStartY = 0;
    let startWidth = 0, startHeight = 0;

    resizeHandle.addEventListener('pointerdown', (e) => {
        isResizing = true;
        resizeStartX = e.clientX;
        resizeStartY = e.clientY;
        startWidth = el.offsetWidth;
        startHeight = el.offsetHeight;
        resizeHandle.setPointerCapture(e.pointerId);
        e.stopPropagation();
    });

    resizeHandle.addEventListener('pointermove', (e) => {
        if (!isResizing) return;

        el.style.width = Math.max(260, startWidth + (e.clientX - resizeStartX)) + 'px';
        el.style.height = Math.max(180, startHeight + (e.clientY - resizeStartY)) + 'px';
    });

    resizeHandle.addEventListener('pointerup', () => {
        isResizing = false;
    });

    if (app.init) app.init();
}

const iconsContainer = document.getElementById('icons');
const startAppsContainer = document.getElementById('start-apps');

Object.keys(APPS).forEach(id => {
    const app = APPS[id];

    const icon = document.createElement('div');
    icon.className = 'icon';
    
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = app.icon;
    
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = app.title;
    
    icon.appendChild(emoji);
    icon.appendChild(label);
    icon.addEventListener('click', () => openApp(id));
    iconsContainer.appendChild(icon);

    const item = document.createElement('div');
    item.className = 'start-item';
    item.dataset.title = app.title.toLowerCase();
    
    const itemEmoji = document.createElement('span');
    itemEmoji.className = 'emoji';
    itemEmoji.textContent = app.icon;
    
    const itemLabel = document.createElement('span');
    itemLabel.textContent = app.title;
    
    item.appendChild(itemEmoji);
    item.appendChild(itemLabel);
    item.addEventListener('click', () => {
        openApp(id);
        document.getElementById('start-menu').classList.remove('show');
    });
    startAppsContainer.appendChild(item);
});

const startMenu = document.getElementById('start-menu');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && e.target.id !== 'start-btn') {
        startMenu.classList.remove('show');
    }
});

document.getElementById('start-search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    startAppsContainer.querySelectorAll('.start-item').forEach(item => {
        const matches = item.dataset.title.includes(query);
        item.style.display = matches ? 'flex' : 'none';
    });
});

const sleepOverlay = document.getElementById('sleep-overlay');

document.getElementById('shutdown-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    sleepOverlay.classList.add('show');
    startMenu.classList.remove('show');
});

sleepOverlay.addEventListener('click', () => {
    sleepOverlay.classList.remove('show');
});

const contextMenu = document.getElementById('context-menu');

document.getElementById('desktop').addEventListener('contextmenu', (e) => {
    e.preventDefault();

    contextMenu.style.display = 'block';
    contextMenu.style.left = Math.min(e.clientX, window.innerWidth - 210) + 'px';
    contextMenu.style.top = Math.min(e.clientY, window.innerHeight - 200) + 'px';
});

document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});

contextMenu.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    switch (action) {
        case 'wallpaper':
            changeTheme(currentTheme + 1);
            break;
        case 'note':
            openApp('notes');
            break;
        case 'about':
            openApp('about');
            break;
        case 'refresh':
            break;
    }
});

window.closeWindow = closeWindow;

console.log('🖥️ CYBER_OS ready!');