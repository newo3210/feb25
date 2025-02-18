document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const audio = document.getElementById("bg-music");
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const audioPlayer = document.getElementById("audio-player");

    let audioStarted = false;
    let titlesInvoked = {
        title1: false,
        title2: false,
        title3: false,
        title4: false,
        title5: false,
        title6: false,
        title7: false,
        title8: false,
        title9: false,
        title10: false,
        title11: false
    };

    function startAudio() {
        audio.play().catch(() => {
            document.body.addEventListener("click", () => {
                if (!audioStarted) {
                    audio.play();
                    audioStarted = true;
                }
            }, { once: true });
        });
    }

    startAudio();

    playBtn.addEventListener("click", () => audio.play());
    pauseBtn.addEventListener("click", () => audio.pause());

    makeDraggable(audioPlayer);

    canvas.addEventListener("click", (event) => {
        if (!titlesInvoked.title1) {
            createTitle(event.pageX, event.pageY, "title1", "bosque%20titulo.png", 1.5);
            titlesInvoked.title1 = true;
        } else if (!titlesInvoked.title2) {
            createTitle(event.pageX, event.pageY, "title2", "titulos%20nombres1.png", 2);
            titlesInvoked.title2 = true;
        } else if (!titlesInvoked.title3) {
            createText(event.pageX, event.pageY, "title3", "Art Residency - FEB25");
            titlesInvoked.title3 = true;
        } else {
            for (let i = 4; i <= 11; i++) {
                let titleKey = `title${i}`;
                if (!titlesInvoked[titleKey]) {
                    let imgSrc = `nube${i - 3}.png`;
                    createTitle(event.pageX, event.pageY, titleKey, imgSrc, 0.5);
                    titlesInvoked[titleKey] = true;
                    break;
                }
            }
        }
    });

    function createTitle(x, y, id, src, scale) {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("dialog-title");
        img.id = id;
        img.style.transform = `scale(${scale})`;
        img.style.position = "absolute";
        img.style.top = `${y}px`;
        img.style.left = `${x}px`;

        document.body.appendChild(img);
        makeDraggable(img);
    }

    function createText(x, y, id, text) {
        const div = document.createElement("div");
        div.textContent = text;
        div.classList.add("dialog-text");
        div.id = id;
        div.style.position = "absolute";
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;

        document.body.appendChild(div);
        makeDraggable(div);
    }

    function makeDraggable(element) {
        let offsetX, offsetY, isDragging = false;

        element.addEventListener("mousedown", (event) => {
            isDragging = true;
            offsetX = event.clientX - element.getBoundingClientRect().left;
            offsetY = event.clientY - element.getBoundingClientRect().top;
            element.style.position = "absolute";
        });

        document.addEventListener("mousemove", (event) => {
            if (isDragging) {
                element.style.left = `${event.clientX - offsetX}px`;
                element.style.top = `${event.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }
});
