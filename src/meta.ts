import { publish } from './mqtt';

const mqtttopicActivatescript = 'action/ceilingscripts/activatescript';
const mqtttopicPipeledpattern = 'action/PipeLEDs/pattern';

export const mqttFancyLights = [
    'ceiling1',
    'ceiling2',
    'ceiling3',
    'ceiling4',
    'ceiling5',
    'ceiling6',
    'abwasch',
    'flooddoor',
    'funkbude',
    'ceilingAll',
    'memberregal',
];

export const mqttScriptCtrlScripts = [
    'off',
    'redshift',
    'ceilingsinus',
    'colorfade',
    'randomcolor',
    'wave',
    'sparkle',
];

export const mqttScriptCtrlScriptsUsesLoop = [
    'randomcolor',
    'sparkle',
];

export const mqttScriptCtrlScriptUsesTriggerForEachLight = [
    'redshift',
];

export const mqttScriptCtrlScriptSupportParticipating = [
    'redshift',
    'randomcolor',
    'wave',
    'colorfade',
    'ceilingsinus',
    'sparkle',
];

export const mqttFancylightsAll = [
    'ceiling1',
    'ceiling2',
    'ceiling3',
    'ceiling4',
    'ceiling5',
    'ceiling6',
    'abwasch',
    'flooddoor',
    'memberregal',
];

export const mqttFancylightsAllWithCeilingAll = [
    'ceiling1',
    'ceiling2',
    'ceiling3',
    'ceiling4',
    'ceiling5',
    'ceiling6',
    'abwasch',
    'flooddoor',
    'ceilingAll',
    'memberregal',
];

export const mqttFancylightsCeilingonly = [
    'ceiling1',
    'ceiling2',
    'ceiling3',
    'ceiling4',
    'ceiling5',
    'ceiling6',
];

export const mqttFancylightsW2realfunk = [
    'funkbude',
];

export interface LedFactors {
    r_factor: number;
    g_factor: number;
    b_factor: number;
    ww_factor: number;
    cw_factor: number;
}

export const r3LedFactors: Record<string, LedFactors> = {
    _default_: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    flooddoor: {
        r_factor: 4,
        g_factor: 4,
        b_factor: 4,
        ww_factor: 12,
        cw_factor: 12,
    },
    ceiling1: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    ceiling2: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    ceiling3: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    ceiling4: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    ceiling5: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    ceiling6: {
        r_factor: 1,
        g_factor: 5, // green 5 times as bright as red
        b_factor: 10, // blue 2 times as bright as green
        ww_factor: 22, // yes warmwhite is about 22 times as bright as red
        cw_factor: 18,
    },
    abwasch: {
        r_factor: 4,
        g_factor: 4,
        b_factor: 4,
        ww_factor: 12,
        cw_factor: 12,
    },
    memberregal: {
        r_factor: 4,
        g_factor: 4,
        b_factor: 4,
        ww_factor: 12,
        cw_factor: 12,
    },
    funkbude: {
        r_factor: 4,
        g_factor: 4,
        b_factor: 4,
        ww_factor: 12,
        cw_factor: 12,
    },
};

export const formatLightCtrlTopic = (light: string): string => `action/GoLightCtrl/${light}`;

export interface FancyLightCtrlAction {
    r: number;
    g: number;
    b: number;
    ww: number;
    cw: number;
}

export const formatFancyLightCtrlTopic = (light: string): string => `action/${light}/light`;

export const isFancyLightCtrlTopic = (topic: string): boolean => /^action\/[^/]+\/light$/.test(topic);

export const formatSonoffTopic = (sonoff: string): string => `action/${sonoff}/POWER`;

export const isSonoffTopic = (topic: string): boolean => /^action\/[^/]+\/POWER$/.test(topic);

export const esphomeR3ActionTopic = (light: string): string => `action/${light}/command`;

export const isEsphomeR3ActionTopic = (topic: string): boolean => /^action\/[^/]+\/command$/.test(topic);

export const esphomeR3StatusTopic = (light: string): string => `status/${light}/state`;

export const isEsphomeR3StatusTopic = (topic: string): boolean => /^status\/[^/]+\/state$/.test(topic);

export const zigbee2mqttStatusTopic = (light: string): string => `zigbee2mqtt/${light}`;

export const isZigbee2mqttStatusTopic = (topic: string): boolean => /^zigbee2mqtt\/[^/]+\/state$/.test(topic);

export const zigbee2mqttActionTopic = (light: string): string => `zigbee2mqtt/${light}/set`;

export const isZigbee2mqttActionTopic = (topic: string): boolean => /^zigbee2mqtt\/[^/]+\/set$/.test(topic);

export const formatWledActionTopic = (light: string): string => `action/wled/${light}/api`;

export const isWledActionTopic = (topic: string): boolean => /^action\/wled\/[^/]+\/api$/.test(topic);

export const hex2rgb = (hex: string): { r: number; g: number; b: number } => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
        // eslint-disable-next-line no-bitwise
        r: (bigint >> 16) & 255,
        // eslint-disable-next-line no-bitwise
        g: (bigint >> 8) & 255,
        // eslint-disable-next-line no-bitwise
        b: bigint & 255,
    };
};

export const map = (x: number, in_min: number, in_max: number, out_min: number, out_max: number): number => ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

export const fixRgb = (min: number, max: number): ({ r, g, b }: { r: number; g: number; b: number }) => { r: number; g: number; b: number } => ({ r, g, b }) => ({
    r: map(r, 0, 255, min, max),
    g: map(g, 0, 255, min, max),
    b: map(b, 0, 255, min, max),
});

export const unfixRgb = (min: number, max: number): ({ r, g, b }: { r: number; g: number; b: number }) => { r: number; g: number; b: number } => ({ r, g, b }) => ({
    r: map(r, min, max, 0, 255),
    g: map(g, min, max, 0, 255),
    b: map(b, min, max, 0, 255),
});

export const fancyLightCtrlActionFromHexcolor = (hexcolor: string): FancyLightCtrlAction => {
    const { r, g, b } = hex2rgb(hexcolor);
    // values are from 0 to 1000

    const fixedRgb = fixRgb(0, 1000);
    const { r: fr, g: fg, b: fb } = fixedRgb({ r, g, b });

    return {
        r: Math.round(fr),
        g: Math.round(fg),
        b: Math.round(fb),
        ww: 0,
        cw: 0,
    };
};

export const fancyLightCtrlActionToHexcolor = ({ r, g, b }: Partial<FancyLightCtrlAction>): string => {
    console.log('fancyLightCtrlActionToHexcolor', r, g, b);

    const hex = (c: number): string => c.toString(16).padStart(2, '0');

    if (r === undefined || g === undefined || b === undefined) {
        return '#000000';
    }

    const unfixRgb1000 = unfixRgb(0, 1000);

    const { r: ur, g: ug, b: ub } = unfixRgb1000({ r, g, b });

    const out = `#${hex(Math.round(ur))}${hex(Math.round(ug))}${hex(Math.round(ub))}`;

    console.log('fancyLightCtrlActionToHexcolor', out);

    return out;
};

export function ceilingPreset_BeamerTalkMode() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclight1'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight2'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight3'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight4'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight5'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight6'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceiling1'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling2'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 900, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling3'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling4'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling5'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 900, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling6'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('abwasch'), {
        r: 0, g: 660, b: 0, ww: 500, cw: 500, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('memberregal'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('flooddoor'), {
        r: 0, g: 0, b: 0, ww: 800, cw: 800, fade: { duration: 8000 },
    });
    publish(formatLightCtrlTopic('floodtesla'), { Action: 'off' });
    publish(formatLightCtrlTopic('subtable'), { Action: 'on' });
}

export function ceilingPreset_BeamerTalkPauseMode() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclight1'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight2'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight3'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight4'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight5'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight6'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceiling1'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 500, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling2'), {
        r: 0, g: 0, b: 0, ww: 1000, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling3'), {
        r: 800, g: 0, b: 0, ww: 1000, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling4'), {
        r: 800, g: 0, b: 0, ww: 1000, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling5'), {
        r: 0, g: 0, b: 0, ww: 1000, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('ceiling6'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 500, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('abwasch'), {
        r: 0, g: 1000, b: 0, ww: 1000, cw: 800, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('memberregal'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: { duration: 8000 },
    });
    publish(formatFancyLightCtrlTopic('flooddoor'), {
        r: 800, g: 0, b: 0, ww: 1000, cw: 1000, fade: { duration: 8000 },
    });
    publish(formatLightCtrlTopic('floodtesla'), { Action: 'on' });
    publish(formatLightCtrlTopic('subtable'), { Action: 'on' });
}

export function ceilingPreset_BeamerMovieMode() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceiling1'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('ceiling2'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('ceiling3'), {
        r: 50, g: 0, b: 0, ww: 100, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('ceiling4'), {
        r: 50, g: 0, b: 0, ww: 100, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('ceiling5'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('ceiling6'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('flooddoor'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('abwasch'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatFancyLightCtrlTopic('memberregal'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0, fade: {},
    });
    publish(formatLightCtrlTopic('floodtesla'), { Action: 'off' });
    publish(formatLightCtrlTopic('subtable'), { Action: 'off' });
}

export function ceilingPreset_RedShiftMost() {
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(mqtttopicActivatescript, { script: 'redshift', participating: ['ceiling1', 'ceiling2', 'ceiling3', 'ceiling6'], value: 0.99 });
}

export function ceilingPreset_AlienSky() {
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(mqtttopicActivatescript, {
        script: 'ceilingsinus',
        g: { amplitude: 200, offset: 300, phase: 0 },
        ww: { amplitude: 90, offset: 300, phase: 1 },
        r: { amplitude: 400, offset: 1000, phase: 2 },
        b: { amplitude: 150, offset: 250, phase: 4 },
        cw: { amplitude: 80, offset: 300, phase: 4 },
        fadeduration: 3000,
    });
    publish(formatLightCtrlTopic('subtable'), { Action: 'on' });
}

export function ceilingPreset_DimRandomColor() {
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(mqtttopicActivatescript, { script: 'randomcolor', value: 0.3 });
}

export function ceilingPreset_SuperFullEverything() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'on' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 1000, g: 500, b: 200, ww: 1000, cw: 1000,
    });
    publish(formatLightCtrlTopic('floodtesla'), { Action: 'on' });
    publish(formatLightCtrlTopic('subtable'), { Action: 'on' });
}

export function ceilingPreset_AlmostEverything() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'on' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 1000, g: 500, b: 200, ww: 1000, cw: 1000,
    });
    publish(formatLightCtrlTopic('subtable'), { Action: 'on' });
}

export function ceilingPreset_MostBasic() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclight1'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight2'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight3'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight4'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight5'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight6'), { Action: 'on' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
}

export function ceilingPreset_MixedForWork() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclight1'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight2'), { Action: 'on' });
    publish(formatLightCtrlTopic('basiclight3'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight4'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight5'), { Action: 'off' });
    publish(formatLightCtrlTopic('basiclight6'), { Action: 'on' });
    publish(formatFancyLightCtrlTopic('ceiling1'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(formatFancyLightCtrlTopic('ceiling2'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(formatFancyLightCtrlTopic('ceiling3'), {
        r: 0, g: 0, b: 0, ww: 1000, cw: 0,
    });
    publish(formatFancyLightCtrlTopic('ceiling4'), {
        r: 0, g: 0, b: 0, ww: 600, cw: 0,
    });
    publish(formatFancyLightCtrlTopic('ceiling5'), {
        r: 0, g: 0, b: 0, ww: 600, cw: 0,
    });
    publish(formatFancyLightCtrlTopic('ceiling6'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(formatFancyLightCtrlTopic('flooddoor'), {
        r: 0, g: 0, b: 0, ww: 600, cw: 300,
    });
}

export function ceilingPreset_AllOff() {
    publish(mqtttopicActivatescript, { script: 'off' });
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(formatLightCtrlTopic('floodtesla'), { Action: 'off' });
    publish(formatLightCtrlTopic('bluebar'), { Action: 'off' });
    publish(formatLightCtrlTopic('regalleinwand'), { Action: 'off' });
    publish(formatLightCtrlTopic('couchred'), { Action: 'off' });
    publish(formatLightCtrlTopic('subtable'), { Action: 'off' });
}

export function ceilingPreset_ColorWave() {
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(mqtttopicActivatescript, {
        script: 'wave',
        colourlist: [
            {
                r: 1000, g: 0, b: 0, ww: 0, cw: 0,
            },
            {
                r: 800, g: 0, b: 100, ww: 0, cw: 0,
            },
            {
                r: 0, g: 0, b: 300, ww: 0, cw: 0,
            },
            {
                r: 0, g: 500, b: 100, ww: 0, cw: 0,
            },
            {
                r: 0, g: 800, b: 0, ww: 0, cw: 0,
            },
            {
                r: 800, g: 200, b: 0, ww: 0, cw: 0,
            },
        ],
        fadeduration: 5000,
    });
}

export function ceilingPreset_BlueWave() {
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(mqtttopicActivatescript, {
        script: 'wave',
        colourlist: [
            {
                r: 200, g: 0, b: 1000, cw: 0, ww: 0,
            },
            {
                r: 0, g: 0, b: 0, cw: 50, ww: 50,
            },
            {
                r: 0, g: 0, b: 0, cw: 50, ww: 50,
            },
            {
                r: 0, g: 0, b: 0, cw: 50, ww: 50,
            },
        ],
        fadeduration: 2000,
        reversed: 1,
    });
}

export function ceilingPreset_SkyWithClouds() {
    publish(formatLightCtrlTopic('basiclightAll'), { Action: 'off' });
    publish(formatFancyLightCtrlTopic('ceilingAll'), {
        r: 0, g: 0, b: 0, ww: 0, cw: 0,
    });
    publish(mqtttopicActivatescript, { script: 'ceilingsinus', value: 1.0 });
}

export const presetFunctions: Record<string, () => void> = {
    BeamerTalkMode: ceilingPreset_BeamerTalkMode,
    BeamerTalkPauseMode: ceilingPreset_BeamerTalkPauseMode,
    BeamerMovieMode: ceilingPreset_BeamerMovieMode,
    RedShiftMost: ceilingPreset_RedShiftMost,
    AlienSky: ceilingPreset_AlienSky,
    DimRandomColor: ceilingPreset_DimRandomColor,
    SuperFullEverything: ceilingPreset_SuperFullEverything,
    AlmostEverything: ceilingPreset_AlmostEverything,
    MostBasic: ceilingPreset_MostBasic,
    MixedForWork: ceilingPreset_MixedForWork,
    AllOff: ceilingPreset_AllOff,
    ColorWave: ceilingPreset_ColorWave,
    BlueWave: ceilingPreset_BlueWave,
    SkyWithClouds: ceilingPreset_SkyWithClouds,
};
