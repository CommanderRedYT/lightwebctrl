import mqtt, { MqttClient } from 'mqtt';
import type { Request, Response } from 'express';
// eslint-disable-next-line import/no-cycle
import {
    esphomeR3ActionTopic, EspHomeR3Toggles, formatLightCtrlTopic,
    GoLightCtrlToggles,
    isEsphomeR3StatusTopic,
    isFancyLightCtrlTopic,
    isLightCtrlTopic, zigbee2mqttActionTopic, Zigbee2mqttToggles,
} from './meta';

let mqttClient: MqttClient | null = null;

const url = 'mqtt://mqtt.realraum.at:1883';

export interface State {
    fancyLightCtrl: {
        [key: string]: {
            r: number;
            g: number;
            b: number;
            ww: number;
            cw: number;
        };
    },
    goLightCtrl: {
        [key: string]: {
            Action: string;
        }
    },
    realraum: {
        [key: string]: {
            status: string;
            state: string;
        }
    }
}

const state: State = {
    fancyLightCtrl: {},
    goLightCtrl: {},
    realraum: {},
};

export const getState = (): State => state;

/*
setInterval(() => {
    console.dir(state.realraum);
}, 1000);
*/

export const subscribe = (topic: string): void => {
    if (mqttClient) {
        mqttClient.subscribe(topic);
    } else {
        console.error('mqttClient not initialized');
    }
};

export const publish = (topic: string, message: string | object): void => {
    let msg = message;
    if (mqttClient) {
        console.log('publishing to', topic);

        if (typeof msg !== 'string') {
            msg = JSON.stringify(message);
        }

        console.log('publishing', topic, msg);

        mqttClient.publish(topic, msg, { retain: true });
    } else {
        console.error('mqttClient not initialized');
    }
};

export const disconnect = (): void => {
    console.log('disconnect() called');
    if (mqttClient) {
        mqttClient.end();
    } else {
        console.error('mqttClient not initialized');
    }
};

export const handleFancyLightCtrlMessage = (light: string, message: Buffer): void => {
    const data = JSON.parse(message.toString());

    state.fancyLightCtrl[light] = data;
    // console.log('handleFancyLightCtrlMessage', light, data);
};

export const handleLightCtrlMessage = (light: string, message: Buffer): void => {
    const data = JSON.parse(message.toString());

    state.goLightCtrl[light] = data;
    // console.log('handleLightCtrlMessage', light, data);
};

export const handleRealraumMessage = (light: string, message: Buffer): void => {
    const data = JSON.parse(message.toString());

    console.log('handleRealraumMessage', light, data);

    state.realraum[light] = data;
    // console.log('handleRealraumMessage', light, data);
};

export const initMqtt = async (): Promise<void> => {
    console.log('initMqtt() called');

    mqttClient = await mqtt.connectAsync(url);

    mqttClient.on('connect', () => {
        console.log('mqtt connected');
    });

    mqttClient.on('error', (error) => {
        console.error('mqtt error', error);
    });

    mqttClient.on('close', () => {
        console.log('mqtt closed');
    });

    mqttClient.on('message', (topic, message) => {
        // console.log('mqtt message', topic, message.toString());
        try {
            const lightCtrlTopic = isLightCtrlTopic(topic);
            const fancyLightCtrlTopic = isFancyLightCtrlTopic(topic);
            const esphomeR3StatusTopic = isEsphomeR3StatusTopic(topic);

            if (lightCtrlTopic) {
                handleLightCtrlMessage(lightCtrlTopic, message);
                return;
            }

            if (fancyLightCtrlTopic) {
                handleFancyLightCtrlMessage(fancyLightCtrlTopic, message);
                return;
            }

            if (esphomeR3StatusTopic) {
                handleRealraumMessage(esphomeR3StatusTopic, message);
                return;
            }

            // console.error('unknown mqtt topic', topic);
        } catch (e) {
            console.error('error handling mqtt message', e);
        }
    });

    subscribe('realraum/#');
    subscribe('action/#');
    subscribe('zigbee2mqtt/#');
};

const getMqttClient = (): MqttClient | null => mqttClient;

export const handleLightRequest = async (req: Request, res: Response): Promise<void> => {
    console.log('handleLightRequest', req.body);

    const { light } = req.body;

    if (light && GoLightCtrlToggles.includes(light)) {
        const topic = formatLightCtrlTopic(light);
        const currentStatus = state.realraum[light] ?? { state: 'on' };

        if (!currentStatus) {
            console.error('currentStatus not found', light);
            return;
        }

        console.log('currentStatus', currentStatus);

        const newStatus = currentStatus.state.toLowerCase() === 'on' ? 'off' : 'on';

        publish(topic, { Action: newStatus });
        state.realraum[light] = { ...currentStatus, state: newStatus };
    }

    if (light && EspHomeR3Toggles.includes(light)) {
        const topic = esphomeR3ActionTopic(light);
        const currentStatus = state.realraum[light] ?? { state: 'on' };

        if (!currentStatus) {
            console.error('currentStatus not found', light);
            return;
        }

        console.log('currentStatus', currentStatus);

        const newStatus = currentStatus.state.toLowerCase() === 'on' ? 'off' : 'on';

        publish(topic, { state: newStatus });
        state.realraum[light] = { ...currentStatus, state: newStatus };
    }

    if (light && Zigbee2mqttToggles.includes(light)) {
        const topic = zigbee2mqttActionTopic(light);
        const currentStatus = state.realraum[light] ?? { state: 'ON' };

        if (!currentStatus) {
            console.error('currentStatus not found', light);
            return;
        }

        console.log('currentStatus', currentStatus);

        const newStatus = currentStatus.state.toLowerCase() === 'on' ? 'off' : 'on';

        publish(topic, { state: newStatus });
        state.realraum[light] = { ...currentStatus, state: newStatus };
    }
};

export default getMqttClient;
