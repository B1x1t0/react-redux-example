/**
 * Created by inmaculada on 17/11/15.
 */
import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(
        ()=> io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        //Listener to emit the current state
        socket.emit('state', store.getState().toJS());
        // Clients emit action events
        socket.on('action', store.dispatch.bind(store));

    });
}