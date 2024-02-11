import express from 'express';

import fs from 'fs';
import {
    fancyLightCtrlActionToHexcolor, mqttFancylightsAll, mqttScriptCtrlScripts, presetFunctions,
} from './meta';

import api from './api';
import { getState } from './mqtt';

const app = express();

const importSvg = (name: string): string => fs.readFileSync(`public/${name}`).toString();

const render = (req: express.Request, res: express.Response): void => {
    let path = 'index';

    if (req.path !== '/') {
        path = req.path.substring(1);
    }

    // remove trailing slash and file extension if present
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }

    console.log('rendering', path);

    res.render(path, {
        mqttFancylightsAll,
        mqttScriptCtrlScripts,
        importSvg,
        fancyLightCtrlActionToHexcolor,
        presetFunctions,
        state: getState(),
    });
};

app.set('view engine', 'ejs');
app.set('views', 'public');
app.use(express.static('public'));

app.use('/api', api);

app.get('/', (req, res) => {
    render(req, res);
});

app.get('/fancy', (req, res) => {
    render(req, res);
});

export default app;
