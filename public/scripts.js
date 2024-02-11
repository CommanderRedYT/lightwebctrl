const endpoint = '/api/state';

const state = {};

const map = (x, in_min, in_max, out_min, out_max) => ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

const unfixRgb = (min, max) => ({
    r,
    g,
    b
}) => ({
    r: map(r, min, max, 0, 255),
    g: map(g, min, max, 0, 255),
    b: map(b, min, max, 0, 255),
});

const fancyLightCtrlActionToHexcolor = ({
    r,
    g,
    b
}) => {
    const hex = (c) => c.toString(16)
        .padStart(2, '0');

    if (r === undefined || g === undefined || b === undefined) {
        return '#000000';
    }

    const unfixRgb1000 = unfixRgb(0, 1000);

    const {
        r: ur,
        g: ug,
        b: ub
    } = unfixRgb1000({
        r,
        g,
        b
    });

    return `#${hex(Math.round(ur))}${hex(Math.round(ug))}${hex(Math.round(ub))}`;
};

function render() {
    console.log('state', state);

    if (state.fancyLightCtrl) {
        Object.entries(state.fancyLightCtrl)
            .forEach(([light, value]) => {
                // console.log('light', light, value);
                const lightEl = document.querySelector(`input#fancylight-${light}`);

                if (!lightEl) {
                    return;
                }

                const val = fancyLightCtrlActionToHexcolor(value);

                if (lightEl.getAttribute('data-previous-value') === val) {
                    return;
                }

                lightEl.value = val;
                lightEl.setAttribute('data-previous-value', val);
            });
    }
}

function requestState() {
    fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            Object.assign(state, data);
            render();
        });
}

function initUI() {
}

function handleLight(light) {
    console.log('handleLight', light);

    const handleLightEndpoint = '/api/handleLight';

    fetch(handleLightEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({light}),
    })
        .then(async (res) => {
            if (res.status !== 200) {
                console.error('Failed to handle light', light);
            }

            const {
                success,
                state
            } = await res.json();

            if (!success) {
                console.error('Failed to handle light', light, state);
                return;
            }

            Object.assign(state, state);
        })
        .catch((err) => {
            console.error('Failed to handle light', light, err);
        });
}

function main() {
    initUI();
    requestState();
    setInterval(requestState, 1000);
}

window.addEventListener('DOMContentLoaded', main);
