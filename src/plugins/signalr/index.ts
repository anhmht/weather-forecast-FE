
import _Vue from 'vue';
import * as signalR from '@microsoft/signalr';

interface ISocketConnection {
    isReady: boolean;
    options: any;
    connection: any;
    socket: any;
    start: () => Promise<any>;
    onEvent: (method: string, callback: any) => void;
    invoke: (remoteId: string) => void;
    sendMessage: (message: string) => void;
}

class SocketConnection implements ISocketConnection {
    options: any;
    connection: any;
    socket: any;
    remoteId: any;
    isReady: boolean;

    constructor(connection) {
        this.connection = connection;
        this.socket = false;
        this.options = {};
        this.remoteId = null;
        this.isReady = false;
    }

    async _initialize(connection = "") {
        try {
            const con = connection || this.connection;
            // const token = 'jJYZt8RiYSSxSWORpfx8h4e3iHNX+OmNLVhndVra00w='
            if (this.socket) this.socket = false;
            this.socket = new signalR.HubConnectionBuilder().withUrl(con, {
                // accessTokenFactory: () => token,
                // skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }).build();
            await this.socket.start();
            this.isReady = true;
        } catch (error) {
            console.log(error);

        }
    }

    async start() {
        await this._initialize();
    }

    onEvent(method, callback) {
        console.log('socket onEvent');
        this.socket.on(method, (message) => {
            const result = JSON.parse(message);
            callback(result);
        });
    }

    invoke(remoteID: string) {
        this.remoteId = remoteID;
        this.socket.invoke("JoinGroup", this.remoteId);
    }

    sendMessage(message) {
        this.socket.invoke("SendMessage", this.remoteId, message);
    }
}

const SignalRPlugin = {
    install(Vue: typeof _Vue, options?: any | {}) {
        const Socket = new SocketConnection(options.url);
        Object.defineProperties(Vue.prototype, {
            $socket: {
                get() {
                    return Socket;
                }
            }
        });
    }
};

export default SignalRPlugin;

declare module 'vue/types/vue' {
    interface Vue {
        $socket: ISocketConnection;
    }
}
