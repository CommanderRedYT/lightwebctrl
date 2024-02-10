import { initMqtt, disconnect } from './mqtt';
import app from './server';

const main = async () => {
    process.on('SIGINT', () => {
        console.log('SIGINT received');
        disconnect();
    });

    await initMqtt();

    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
};

main();
