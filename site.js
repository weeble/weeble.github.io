const zoomables = document.querySelectorAll('.zoomable');
const zoom_holder = document.querySelector('#zoom_holder');
const zoom = (element) => {
    const clone = element.cloneNode();
    clone.removeAttribute('id');
    zoom_holder.replaceChildren(clone);
    zoom_holder.style.display = 'grid';
};
window.addEventListener("popstate", (event) => {
    // console.log("popstate %o", event.state)
    if (event.state) {
        if (event.state.state === 'zoomed') {
            const element = document.getElementById(event.state.id);
            if (element) {
                zoom(element);
            }
        } else {
            zoom_holder.style.display = 'none';
        }
    }
});
zoomables.forEach((z, index) => {
    if (!z.id) {
        z.id = 'zoomable' + index;
    }
    z.addEventListener('click', function() {
        zoom(this);
        history.pushState({'state':'zoomed','id':z.id}, "", window.location.href);
    });
});
// console.log(history.state);
if (history.state) {
    if (history.state.state === 'zoomed') {
        // console.log('zooming');
        const element = document.getElementById(history.state.id);
        if (element) {
            zoom(element);
        } else {
            console.log('no element with id %o', );
        }
    }
} else {
    // console.log('reset');
    history.replaceState({'state':'unzoomed'}, "", window.location.href);
}
