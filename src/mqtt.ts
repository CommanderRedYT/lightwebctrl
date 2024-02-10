import mqtt, { MqttClient } from 'mqtt';
import { isFancyLightCtrlTopic } from './meta';

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
    }
}

const state: State = {
    fancyLightCtrl: {},
};

export const getState = (): State => state;

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

export const handleFancyLightCtrlMessage = (topic: string, message: Buffer): void => {
    const light = topic.split('/')[1];
    const data = JSON.parse(message.toString());

    state.fancyLightCtrl[light] = data;
    console.log('handleFancyLightCtrlMessage', light, data);
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
        if (isFancyLightCtrlTopic(topic)) {
            handleFancyLightCtrlMessage(topic, message);
        }
    });

    subscribe('realraum/#');
    subscribe('action/#');
    subscribe('zigbee2mqtt/#');
};

const getMqttClient = (): MqttClient | null => mqttClient;

export default getMqttClient;
