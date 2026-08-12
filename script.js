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

let bootHidden = false;
function hideBoot() {
    if (bootHidden) return;
    bootHidden = true;

    const boot = document.getElementById('boot');
    if (!boot) return;

    boot.classList.add('hide');
    setTimeout(() => boot.remove(), 550);
}

window.addEventListener('load', () => {
    setTimeout(hideBoot, 1650);
});

setTimeout(hideBoot, 4000);

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

const trackList = [
    { title: 'call of the night', mood: 'synthwave · night drive' },
    { title: 'ghost in the terminal', mood: 'darksynth · low fi' },
    { title: 'neon haven', mood: 'ambient · glitch' },
    { title: 'SuperNova lullaby', mood: 'synthwave · slow' },
    { title: 'chrome heart failure', mood: 'low fi · night drive' },
    { title: 'firewall town', mood: 'darksynth · hypnotic' },
    { title: 'phantom symphony', mood: 'somber · cinematic' },
    { title: 'Skyline', mood: 'grand · slow' },
    { title: 'Glitch in the Soul', mood: 'Paranoid · hypnotic' },
]

const galleryFolders = [
    { id: 'set-a', name: 'ARCHIVE_A', images: [1, 2, 3, 7, 8, 9, 10, 11, 19, 20, 22, 23] },
    { id: 'set-b', name: 'ARCHIVE_B', images: [4, 5, 6, 12, 13, 14, 15, 16, 17, 18, 21] }
];

const pgUsernames = [
    'neon_wraith', 'glitch.queen', 'chrome_habit', 'nullhead_04', 'synth.siren',
    '0xdrift', 'static_moth', 'voidjacker', 'pixel_ronin', 'ghostwire_99',
    'lofi_lurker', 'neonfeather', 'razorlily', 'datastream_dee', 'holo_hank',
    'crash_queen', 'wire_monk', 'echo_vex', 'midnight_byte', 'flicker_fox'
];

const pgCaptions = [
    'chasing neon through the wet streets tonight',
    '3am and the city still hasn\'t slept',
    'new rig, who dis',
    'server room vibes only',
    'found this alley and had to stop',
    'running on synth and bad decisions',
    'glitch in the matrix or just my wifi',
    'rooftop signal, city static',
    'plugged in and powered up',
    'low battery, high energy',
    'static on the skyline tonight',
    'chrome dreams and neon screams',
    'another night in the grid',
    'error 404: sleep not found',
    'hacked the sunset filter',
    'wires crossed, vibes intact',
    'downtown after the rain hits different',
    'lost signal, found the view',
    'this city never logs off',
    'byte sized adventure today'
];

const pgMessages = [
    'hey are you around later?',
    'did you catch the drop last night?',
    'lol yeah that was wild',
    'sending the files over now',
    'meet at the usual spot?',
    'you still up for tonight?',
    'that gig was insane',
    'check your inbox, sent something',
    'omw, 10 mins',
    'can\'t talk rn, ttyl',
    'that last post is fire',
    'let\'s link up this weekend'
];

const pgBios = [
    'building things in the dark // signal lost',
    'chasing neon since 2049',
    'wires, static & bad wifi',
    'just here for the glitch',
    'professional night owl // amateur hacker'
];

function pgRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function generatePosts(count) {
    const posts = [];
    for (let i = 0; i < count; i++) {
        const imageNum = Math.floor(Math.random() * 15) + 1;
        posts.push({
            user: pgRandom(pgUsernames),
            caption: pgRandom(pgCaptions),
            likes: Math.floor(Math.random() * 4000) + 20,
            comments: Math.floor(Math.random() * 120),
            time: (Math.floor(Math.random() * 47) + 1) + 'h',
            hue: Math.floor(Math.random() * 360),
            image: 'gallery/insta' + imageNum + '.png'
        });
    }
    return posts;
}

function generateMessages(count) {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push({
            user: pgRandom(pgUsernames),
            msg: pgRandom(pgMessages),
            time: (Math.floor(Math.random() * 23) + 1) + 'h',
            unread: Math.random() < 0.4
        });
    }
    return list;
}

function generateProfile() {
    return {
        username: pgRandom(pgUsernames),
        followers: Math.floor(Math.random() * 101) + 100,
        following: Math.floor(Math.random() * 180) + 30,
        bio: pgRandom(pgBios)
    };
}

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
            output.textContent = 'CYBER_OS TERMINAL v1.0\ntype \'help\' for commands.';

            const inputLine = document.createElement('div');
            inputLine.className = 'term-input-line';

            const prompt = document.createElement('span');
            prompt.textContent = '>';

            const input = document.createElement('input');
            input.className = 'term-input';
            input.autocomplete = 'off';

            inputLine.appendChild(prompt);
            inputLine.appendChild(input);

            container.appendChild(output);
            container.appendChild(inputLine);

            return container;
        },

        init(container) {
            const output = container.querySelector('.term-output');
            const input = container.querySelector('.term-input');

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
            textarea.className = 'notes-area';
            textarea.placeholder = 'Write something...';
            
            const status = document.createElement('div');
            status.className = 'notes-status';
            status.textContent = 'loading...';
            
            container.appendChild(textarea);
            container.appendChild(status);
            
            return container;
        },
        init(container) {
            const textarea = container.querySelector('.notes-area');
            const status = container.querySelector('.notes-status');

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

            textarea.focus();
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
            brushSize.className = 'brush-size';
            brushSize.min = '1';
            brushSize.max = '20';
            brushSize.value = '4';
            
            const clearBtn = document.createElement('button');
            clearBtn.className = 'paint-clear';
            clearBtn.textContent = 'CLEAR';
            
            toolbar.appendChild(brushSize);
            toolbar.appendChild(clearBtn);

            const canvas = document.createElement('canvas');
            canvas.className = 'paint-canvas';
            canvas.width = 392;
            canvas.height = 300;
            
            container.appendChild(toolbar);
            container.appendChild(canvas);
            
            return container;
        },

        init(container) {
            const canvas = container.querySelector('.paint-canvas');
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#03040a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let drawing = false;
            let currentColor = '#00F0FF';
            let brushSize = 4;
            let lastPos = null;

            container.querySelectorAll('.swatch').forEach(swatch => {
                swatch.addEventListener('click', () => {
                    container.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                    currentColor = swatch.dataset.color;
                });
            });

            container.querySelector('.brush-size').addEventListener('input', (e) => {
                brushSize = parseInt(e.target.value, 10);
            });

            container.querySelector('.paint-clear').addEventListener('click', () => {
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
            art.textContent = '⋆༺𓆩☠︎︎𓆪༻⋆';
            
            const title = document.createElement('div');
            title.className = 'track-title mp-title';
            title.textContent = trackList[0].title;
            
            const mood = document.createElement('div');
            mood.className = 'track-sub mp-sub';
            mood.textContent = trackList[0].mood;
            
            const bars = document.createElement('div');
            bars.className = 'bars mp-bars';
            
            for (let i = 0; i < 9; i++) {
                const bar = document.createElement('span');
                bar.style.animationDelay = (i * 0.08) + 's';
                bars.appendChild(bar);
            }
            
            const controls = document.createElement('div');
            controls.className = 'music-controls';
            
            const prevBtn = document.createElement('button');
            prevBtn.className = 'mp-prev';
            prevBtn.textContent = '⏮';
            
            const playBtn = document.createElement('button');
            playBtn.className = 'play mp-play';
            playBtn.textContent = '▶';
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'mp-next';
            nextBtn.textContent = '⏭';
            
            controls.appendChild(prevBtn);
            controls.appendChild(playBtn);
            controls.appendChild(nextBtn);
            
            const list = document.createElement('div');
            list.className = 'track-list mp-list';
            
            container.appendChild(art);
            container.appendChild(title);
            container.appendChild(mood);
            container.appendChild(bars);
            container.appendChild(controls);
            container.appendChild(list);
            
            return container;
        },
        
        init(container) {
            let currentTrack = 0;
            let isPlaying = false;

            const titleEl = container.querySelector('.mp-title');
            const moodEl = container.querySelector('.mp-sub');
            const barsEl = container.querySelector('.mp-bars');
            const playBtn = container.querySelector('.mp-play');
            const listEl = container.querySelector('.mp-list');

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

            playBtn.addEventListener('click', () => {
                isPlaying = !isPlaying;
                updateDisplay();
            });

            container.querySelector('.mp-prev').addEventListener('click', () => {
                currentTrack = (currentTrack - 1 + trackList.length) % trackList.length;
                updateDisplay();
            });

            container.querySelector('.mp-next').addEventListener('click', () => {
                currentTrack = (currentTrack + 1) % trackList.length;
                updateDisplay();
            });

            updateDisplay();
        }
    },

    gallery: {
        title: 'Gallery',
        icon: '🗁',
        width: 420,
        height: 420,

        createContent() {
            const container = document.createElement('div');
            container.className = 'gallery-app';
            return container;
        },

        init(container) {
            function renderFolders() {
                container.innerHTML = '';

                const grid = document.createElement('div');
                grid.className = 'gallery-folders';

                galleryFolders.forEach(folder => {
                    const card = document.createElement('div');
                    card.className = 'folder-card';

                    const icon = document.createElement('div');
                    icon.className = 'folder-icon';
                    icon.textContent = '📁';

                    const name = document.createElement('div');
                    name.className = 'folder-name';
                    name.textContent = folder.name;

                    const count = document.createElement('div');
                    count.className = 'folder-count';
                    count.textContent = folder.images.length + ' photos';

                    card.appendChild(icon);
                    card.appendChild(name);
                    card.appendChild(count);

                    card.addEventListener('click', () => renderPhotos(folder));
                    grid.appendChild(card);
                });

                container.appendChild(grid);
            }

            function renderPhotos(folder) {
                container.innerHTML = '';

                const header = document.createElement('div');
                header.className = 'gallery-header';

                const backBtn = document.createElement('button');
                backBtn.className = 'gallery-back';
                backBtn.textContent = '← BACK';
                backBtn.addEventListener('click', renderFolders);

                const title = document.createElement('div');
                title.className = 'gallery-folder-title';
                title.textContent = folder.name;

                header.appendChild(backBtn);
                header.appendChild(title);
                container.appendChild(header);

                const photoGrid = document.createElement('div');
                photoGrid.className = 'gallery-photos';

                folder.images.forEach(i => {
                    const tile = document.createElement('div');
                    tile.className = 'photo-tile';

                    const img = document.createElement('img');
                    img.src = 'gallery/image' + i + '.png';
                    img.alt = 'image' + i + '.png';
                    img.loading = 'lazy';

                    const fallback = document.createElement('div');
                    fallback.className = 'photo-fallback';

                    const fbIcon = document.createElement('span');
                    fbIcon.textContent = '🖼';
                    const fbLabel = document.createElement('small');
                    fbLabel.textContent = 'image' + i + '.png';

                    fallback.appendChild(fbIcon);
                    fallback.appendChild(fbLabel);

                    img.addEventListener('error', () => {
                        tile.classList.add('broken');
                    });

                    tile.appendChild(img);
                    tile.appendChild(fallback);
                    photoGrid.appendChild(tile);
                });

                container.appendChild(photoGrid);
            }

            renderFolders();
        }
    },

    cybergram: {
        title: 'Cybergram',
        icon: '✦',
        width: 380,
        height: 560,

        createContent() {
            const container = document.createElement('div');
            container.className = 'cybergram';

            const topbar = document.createElement('div');
            topbar.className = 'pg-topbar';
            const logo = document.createElement('span');
            logo.className = 'pg-logo';
            logo.textContent = 'CYBERGRAM';
            topbar.appendChild(logo);

            const pages = document.createElement('div');
            pages.className = 'pg-pages';

            const home = document.createElement('div');
            home.className = 'pg-page pg-home active';

            const messages = document.createElement('div');
            messages.className = 'pg-page pg-messages';

            const profile = document.createElement('div');
            profile.className = 'pg-page pg-profile';

            pages.appendChild(home);
            pages.appendChild(messages);
            pages.appendChild(profile);

            const tabbar = document.createElement('div');
            tabbar.className = 'pg-tabbar';

            const tabs = [
                { id: 'home', icon: '⌂', label: 'Home' },
                { id: 'messages', icon: '⌯⌲', label: 'Messages' },
                { id: 'profile', icon: '♡', label: 'Profile' }
            ];

            tabs.forEach((tab, i) => {
                const btn = document.createElement('button');
                btn.className = 'pg-tab' + (i === 0 ? ' active' : '');
                btn.dataset.tab = tab.id;

                const iconSpan = document.createElement('span');
                iconSpan.textContent = tab.icon;
                const labelSmall = document.createElement('small');
                labelSmall.textContent = tab.label;

                btn.appendChild(iconSpan);
                btn.appendChild(labelSmall);
                tabbar.appendChild(btn);
            });

            container.appendChild(topbar);
            container.appendChild(pages);
            container.appendChild(tabbar);

            return container;
        },

        init(container) {
            const homePage = container.querySelector('.pg-home');
            const messagesPage = container.querySelector('.pg-messages');
            const profilePage = container.querySelector('.pg-profile');
            const tabs = container.querySelectorAll('.pg-tab');
            const pages = { home: homePage, messages: messagesPage, profile: profilePage };

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    Object.values(pages).forEach(p => p.classList.remove('active'));
                    pages[tab.dataset.tab].classList.add('active');
                });
            });

            function buildPhoto(hue) {
                const photo = document.createElement('div');
                photo.className = 'pg-photo';
                photo.style.background = 'linear-gradient(135deg, hsl(' + hue + ',80%,55%), hsl(' + ((hue + 70) % 360) + ',75%,45%))';
                return photo;
            }

            function buildAvatar(sizeClass, hue, letter) {
                const avatar = document.createElement('div');
                avatar.className = 'pg-avatar' + (sizeClass ? ' ' + sizeClass : '');
                avatar.style.background = 'linear-gradient(135deg, hsl(' + hue + ',80%,55%), hsl(' + ((hue + 70) % 360) + ',75%,45%))';
                avatar.textContent = letter;
                return avatar;
            }

            function renderHome() {
                const posts = generatePosts(20);
                posts.forEach(post => {
                    const card = document.createElement('div');
                    card.className = 'pg-post';

                    const head = document.createElement('div');
                    head.className = 'pg-post-head';

                    const avatar = buildAvatar('', post.hue, post.user.charAt(0).toUpperCase());

                    const uname = document.createElement('div');
                    uname.className = 'pg-post-user';
                    const unameB = document.createElement('b');
                    unameB.textContent = post.user;
                    const unameS = document.createElement('small');
                    unameS.textContent = post.time + ' ago';
                    uname.appendChild(unameB);
                    uname.appendChild(unameS);

                    head.appendChild(avatar);
                    head.appendChild(uname);

                    const photo = document.createElement('div');
                    photo.className = 'pg-photo';
                    const img = document.createElement('img');
                    img.src = post.image;
                    img.alt = 'post image';
                    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                    photo.appendChild(img);

                    const actions = document.createElement('div');
                    actions.className = 'pg-post-actions';

                    const likeBtn = document.createElement('button');
                    likeBtn.className = 'pg-like-btn';
                    likeBtn.textContent = '♡';

                    const commentIcon = document.createElement('span');
                    commentIcon.textContent = '💬';

                    const shareIcon = document.createElement('span');
                    shareIcon.textContent = '↗';

                    actions.appendChild(likeBtn);
                    actions.appendChild(commentIcon);
                    actions.appendChild(shareIcon);

                    const likesRow = document.createElement('div');
                    likesRow.className = 'pg-likes';
                    let likeCount = post.likes;
                    let liked = false;
                    likesRow.textContent = likeCount.toLocaleString() + ' likes';

                    likeBtn.addEventListener('click', () => {
                        liked = !liked;
                        likeBtn.textContent = liked ? '♥' : '♡';
                        likeBtn.classList.toggle('liked', liked);
                        likeCount += liked ? 1 : -1;
                        likesRow.textContent = likeCount.toLocaleString() + ' likes';
                    });

                    const captionRow = document.createElement('div');
                    captionRow.className = 'pg-caption';
                    const capB = document.createElement('b');
                    capB.textContent = post.user;
                    captionRow.appendChild(capB);
                    captionRow.appendChild(document.createTextNode(' ' + post.caption));

                    const commentsRow = document.createElement('div');
                    commentsRow.className = 'pg-comments-link';
                    commentsRow.textContent = post.comments > 0 ? 'View all ' + post.comments + ' comments' : 'No comments yet';

                    card.appendChild(head);
                    card.appendChild(photo);
                    card.appendChild(actions);
                    card.appendChild(likesRow);
                    card.appendChild(captionRow);
                    card.appendChild(commentsRow);

                    homePage.appendChild(card);
                });
            }

            function renderMessages() {
                const convos = generateMessages(5);
                convos.forEach(convo => {
                    const row = document.createElement('div');
                    row.className = 'pg-msg-row' + (convo.unread ? ' unread' : '');

                    const hue = Math.floor(Math.random() * 360);
                    const avatar = buildAvatar('sm', hue, convo.user.charAt(0).toUpperCase());

                    const info = document.createElement('div');
                    info.className = 'pg-msg-info';
                    const infoB = document.createElement('b');
                    infoB.textContent = convo.user;
                    const infoS = document.createElement('small');
                    infoS.textContent = convo.msg;
                    info.appendChild(infoB);
                    info.appendChild(infoS);

                    const meta = document.createElement('div');
                    meta.className = 'pg-msg-meta';
                    const metaS = document.createElement('small');
                    metaS.textContent = convo.time;
                    meta.appendChild(metaS);
                    if (convo.unread) {
                        const dot = document.createElement('span');
                        dot.className = 'dot';
                        meta.appendChild(dot);
                    }

                    row.appendChild(avatar);
                    row.appendChild(info);
                    row.appendChild(meta);

                    row.addEventListener('click', () => {
                        row.classList.remove('unread');
                    });

                    messagesPage.appendChild(row);
                });
            }

            function renderProfile() {
                const profile = generateProfile();

                const head = document.createElement('div');
                head.className = 'pg-profile-head';

                const avatar = buildAvatar('lg', 195, profile.username.charAt(0).toUpperCase());

                const stats = document.createElement('div');
                stats.className = 'pg-stats';

                const statData = [
                    ['6', 'Posts'],
                    [String(profile.followers), 'Followers'],
                    [String(profile.following), 'Following']
                ];

                statData.forEach(([num, label]) => {
                    const statBox = document.createElement('div');
                    const b = document.createElement('b');
                    b.textContent = num;
                    const small = document.createElement('small');
                    small.textContent = label;
                    statBox.appendChild(b);
                    statBox.appendChild(small);
                    stats.appendChild(statBox);
                });

                head.appendChild(avatar);
                head.appendChild(stats);

                const uname = document.createElement('div');
                uname.className = 'pg-profile-name';
                uname.textContent = profile.username;

                const bio = document.createElement('div');
                bio.className = 'pg-profile-bio';
                bio.textContent = profile.bio;

                const editBtn = document.createElement('button');
                editBtn.className = 'pg-edit-btn';
                editBtn.textContent = 'EDIT PROFILE';

                const postsGrid = document.createElement('div');
                postsGrid.className = 'pg-profile-grid';

                for (let i = 0; i < 6; i++) {
                    const imageNum = Math.floor(Math.random() * 15) + 1;
                    const tile = document.createElement('div');
                    tile.className = 'pg-profile-tile';
                    
                    const img = document.createElement('img');
                    img.src = 'gallery/image' + imageNum + '.png';
                    img.alt = 'post';
                    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                    
                    tile.appendChild(img);
                    postsGrid.appendChild(tile);
}

                profilePage.appendChild(head);
                profilePage.appendChild(uname);
                profilePage.appendChild(bio);
                profilePage.appendChild(editBtn);
                profilePage.appendChild(postsGrid);
            }

            renderHome();
            renderMessages();
            renderProfile();
        }
    },

    browser: {
        title: 'Browser',
        icon: '🌐',
        width: 600,
        height: 500,

        createContent() {
            const container = document.createElement('div');
            container.style.cssText = 'display: flex; flex-direction: column; height: 100%; gap: 8px;';

            const urlBar = document.createElement('div');
            urlBar.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-shrink: 0;';

            const backBtn = document.createElement('button');
            backBtn.style.cssText = `
                padding: 6px 10px;
                border: 1px solid var(--glow-line);
                border-radius: var(--round-corners);
                background: var(--panel-bg);
                color: var(--text-color);
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s;
            `;
            backBtn.textContent = '◀';
            backBtn.id = 'browser-back';

            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.placeholder = 'Enter URL...';
            urlInput.style.cssText = `
                flex: 1;
                padding: 8px 12px;
                border: 1px solid var(--glow-line);
                border-radius: var(--round-corners);
                background: var(--dark-bg);
                color: var(--text-color);
                font-family: 'Share Tech Mono', monospace;
                font-size: 13px;
                outline: none;
            `;
            urlInput.id = 'browser-url';

            const goBtn = document.createElement('button');
            goBtn.style.cssText = `
                padding: 8px 16px;
                border: 1px solid var(--neon-blue);
                border-radius: var(--round-corners);
                background: rgba(0,240,255,0.1);
                color: var(--neon-blue);
                cursor: pointer;
                font-family: Orbitron, sans-serif;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 1px;
                transition: all 0.2s;
            `;
            goBtn.textContent = 'GO';
            goBtn.id = 'browser-go';

            urlBar.appendChild(backBtn);
            urlBar.appendChild(urlInput);
            urlBar.appendChild(goBtn);

            const proxyUrl = 'https://corsproxy.io/?';

            const iframe = document.createElement('iframe');
            iframe.style.cssText = `
                flex: 1;
                border: 1px solid var(--glow-line);
                border-radius: var(--round-corners);
                background: #fff;
                width: 100%;
                min-height: 350px;
            `;
            iframe.id = 'browser-frame';
            iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms allow-modals';
            iframe.allow = 'fullscreen';
            iframe.src = 'about:blank';

            const loadingDiv = document.createElement('div');
            loadingDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: var(--dim-text);
                font-family: 'Share Tech Mono', monospace;
                font-size: 12px;
                display: none;
                z-index: 5;
            `;
            loadingDiv.id = 'browser-loading';
            loadingDiv.textContent = 'LOADING...';

            const frameContainer = document.createElement('div');
            frameContainer.style.cssText = 'flex: 1; position: relative;';
            frameContainer.appendChild(iframe);
            frameContainer.appendChild(loadingDiv);

            const quickLinks = document.createElement('div');
            quickLinks.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 0; flex-shrink: 0;';

            const links = [
                { label: 'Google', url: 'https://google.com' },
                { label: 'GitHub', url: 'https://github.com/zvythrox67' },
                { label: 'Hack Club', url: 'https://hackclub.com' },
                { label: 'Stardance', url: 'https://stardance.hackclub.com/home' },
            ];

            links.forEach(l => {
                const tag = document.createElement('span');
                tag.style.cssText = `
                    padding: 4px 12px;
                    border: 1px solid var(--glow-line);
                    border-radius: 12px;
                    font-size: 11px;
                    color: var(--dim-text);
                    cursor: pointer;
                    font-family: 'Share Tech Mono', monospace;
                    transition: all 0.2s;
                `;
                tag.textContent = l.label;
                tag.addEventListener('click', () => {
                    urlInput.value = l.url;
                    loadUrl(l.url);
                });
                tag.addEventListener('mouseenter', () => {
                    tag.style.borderColor = 'var(--neon-blue)';
                    tag.style.color = 'var(--neon-blue)';
                });
                tag.addEventListener('mouseleave', () => {
                    tag.style.borderColor = 'var(--glow-line)';
                    tag.style.color = 'var(--dim-text)';
                });
                quickLinks.appendChild(tag);
            });

            container.appendChild(urlBar);
            container.appendChild(quickLinks);
            container.appendChild(frameContainer);

            function loadUrl(url) {
                if (!url) return;
                
                loadingDiv.style.display = 'block';
                iframe.style.opacity = '0.4';

                let cleanUrl = url.trim();
                if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
                    if (cleanUrl.includes('.') && !cleanUrl.includes(' ')) {
                        cleanUrl = 'https://' + cleanUrl;
                    } else {
                        cleanUrl = 'https://www.google.com/search?q=' + encodeURIComponent(cleanUrl);
                    }
                }

                const proxyUrl = 'https://corsproxy.io/?';
                const finalUrl = proxyUrl + encodeURIComponent(cleanUrl);
                
                iframe.onload = function() {
                    loadingDiv.style.display = 'none';
                    iframe.style.opacity = '1';
                };

                iframe.onerror = function() {
                    loadingDiv.style.display = 'none';
                    iframe.style.opacity = '1';
                    if (iframe.src.includes('corsproxy.io')) {
                        iframe.src = cleanUrl;
                    }
                };

                iframe.src = finalUrl;
                urlInput.value = cleanUrl;
            }

            goBtn.addEventListener('click', () => {
                loadUrl(urlInput.value);
            });

            urlInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') loadUrl(urlInput.value);
            });

            backBtn.addEventListener('click', () => {
                try {
                    iframe.contentWindow.history.back();
                } catch(e) {
                    iframe.src = 'about:blank';
                }
            });

            container.loadUrl = loadUrl;

            return container;
        },
        init(container) {
            if (container.loadUrl) {
                setTimeout(() => {
                    container.loadUrl('https://hackclub.com');
                }, 300);
            }
        }
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
            display.className = 'calc-display';
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
        
        init(container) {
            const display = container.querySelector('.calc-display');
            let expression = '';

            container.querySelectorAll('.calc-grid button').forEach(btn => {
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
        icon: 'ⓘ',
        width: 300,
        height: 370,
        
        createContent() {
            const container = document.createElement('div');
            container.className = 'about-box';
            
            const ascii = document.createElement('div');
            ascii.className = 'ascii';
            ascii.textContent = '<   CYBER_OS v1.0    >';
            
            const specs = [
                ['USERNAME: ', 'zvythrox'],
                ['APPS: ', '9 installed'],
                ['VIBE: ', 'cyberpunk']
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
            footer.textContent = 'Hi! Welcome to my WebOS!';
            container.appendChild(footer);
            
            return container;
        },
        
        init() {}
    },

    trash: {
        title: 'Trash',
        icon: '🗑',
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
    try {
        _openApp(id);
    } catch (err) {
        console.error('CYBER_OS: failed to open app "' + id + '"', err);
    }
}

function _openApp(id) {
    if (openWindows[id]) {
        if (openWindows[id].element.style.display === 'none') {
            toggleMinimize(id);
        }
        bringToFront(id);
        return;
    }

    const app = APPS[id];
    if (!app) {
        console.error('CYBER_OS: no app registered with id "' + id + '"');
        return;
    }

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

    if (app.init) app.init(appContent);
}

const iconsContainer = document.getElementById('icons');
const startAppsContainer = document.getElementById('start-apps');

iconsContainer.innerHTML = '';
startAppsContainer.innerHTML = '';

Object.keys(APPS).forEach(id => {
    const app = APPS[id];

    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.dataset.app = id;
    
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = app.icon;
    
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = app.title;
    
    icon.appendChild(emoji);
    icon.appendChild(label);
    iconsContainer.appendChild(icon);
});

iconsContainer.addEventListener('click', function(e) {
    const icon = e.target.closest('.icon');
    if (!icon) return;
    
    const appId = icon.dataset.app;
    if (appId) {
        console.log('Desktop icon clicked via delegation:', appId);
        openApp(appId);
    }
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