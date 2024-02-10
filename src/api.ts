import express from 'express';
import {
    fancyLightCtrlActionFromHexcolor,
    formatFancyLightCtrlTopic,
    mqttFancylightsAll,
    presetFunctions,
} from './meta';
import { getState, publish } from './mqtt';

const api = express.Router();

const endApi = (req: express.Request, res: express.Response): void => {
    // @ts-ignore
    res.setHeader('Location', req.enableJavascript ? '/?enableJavascript=true' : '/');
    res.sendStatus(307);
};

api.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');

    next();
});

api.get('/state', (req, res) => {
    res.json(getState());
});

api.get('/fancy-lights', (req, res) => {
    Object.entries(req.query).forEach(([key, value]) => {
        console.log('light', key, value);
        if (!mqttFancylightsAll.includes(key)) {
            console.error('light not found', key);
            return;
        }

        const topic = formatFancyLightCtrlTopic(key);
        const data = fancyLightCtrlActionFromHexcolor(value as string);

        publish(topic, JSON.stringify(data));
    });

    endApi(req, res);
});

api.get('/ctrl-script', (req, res) => {
    const { script } = req.query;

    if (script && Object.keys(presetFunctions).includes(script as string)) {
        presetFunctions[script as string]();
    }

    endApi(req, res);
});

export default api;
