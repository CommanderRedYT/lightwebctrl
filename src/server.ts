import express from 'express';

import {fancyLightCtrlActionToHexcolor, mqttFancylightsAll, mqttScriptCtrlScripts, presetFunctions} from './meta';

import api from './api';
import { getState } from './mqtt';

const app = express();

app.use((req, res, next) => {
    if (req.query.enableJavascript === 'true') {
        // @ts-ignore
        req.javascriptEnabled = true;
    }

    next();
});

app.set('view engine', 'ejs');
app.set('views', 'public');
app.use(express.static('public'));

app.use('/api', api);

app.get('/', (req, res) => {
    res.render('index', {
        mqttFancylightsAll,
        mqttScriptCtrlScripts,
        fancyLightCtrlActionToHexcolor,
        presetFunctions,
        // @ts-ignore
        enableJavascript: req.javascriptEnabled,
        state: getState(),
    });
});

export default app;
