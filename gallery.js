const topoImages = document.getElementsByClassName("image ");

let topoGlobalIndex = 0,
    topoLast = { x: 0, y: 0 };

const topoActivate = (image, x, y) => {
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.zIndex = topoGlobalIndex;

    image.dataset.status = "active ";

    topoLast = { x, y };
}

const topoDistanceFromLast = (x, y) => {
    return Math.hypot(x - topoLast.x, y - topoLast.y);
}

const topoHandleOnMove = e => {
    if (topoDistanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) {
        const topoLead = topoImages[topoGlobalIndex % topoImages.length],
            topoTail = topoImages[(topoGlobalIndex - 5) % topoImages.length];

        topoActivate(topoLead, e.clientX, e.clientY);

        if (topoTail) topoTail.dataset.status = "inactive ";

        topoGlobalIndex++;
    }
}

window.onmousemove = e => topoHandleOnMove(e);

window.ontouchmove = e => topoHandleOnMove(e.touches[0]);