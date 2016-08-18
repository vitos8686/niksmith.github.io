import React from 'react';
import UserList from './../components/userList'
import History from './../components/history'
import Scorocode from './../scorocode.min'

// Инициализируем SDK
Scorocode.Init({
    ApplicationID: '70f6e819afd1f1a8f68e77f36678c52c',
    WebSocketKey: 'd33558d45d33165a50506886a3ac78a9',
    JavaScriptKey: '631ab9e17ff112b191413512e1b2b515'
});

var WS = new Scorocode.WebSocket('scorochat');


class AppView extends React.Component{
    constructor () {
        super();

        this.state = {
            userList: {},
            user: {
                id: '',
                name: ''
            },
            history: []
        };
    }
    guid () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    onOpen () {
        setTimeout(() => {
            this.getUserList();
        }, 5000);
        this.getUserList ();
    }
    onError (err) {}
    onClose () {}
    addUser (user) {
        let userList = this.state.userList;
        if (!userList[user.id]) {
            userList[user.id] = {
                name: user.name
            };
        }
        this.setState({
            userList: userList
        });
    }
    getUserList () {
        var data = JSON.stringify({
            cmd: 'getUserList',
            from: this.state.user,
            text: ''
        });
        WS.send(data);
    }
    onMessage (data) {
        var result = JSON.parse(data);

        switch (result.cmd) {
            case 'message':
                let history = this.state.history.slice();
                history.push(result);

                this.setState({history: history});

                break;

            case 'getUserList':
                WS.send(JSON.stringify({
                    cmd: 'userList',
                    from: this.state.user,
                    text: ''
                }));

                break;

            case 'userList':
                this.addUser(result.from);
                break
        }

    }
    send (msg) {
        var data = JSON.stringify({
            cmd: 'message',
            from: this.state.user,
            text: msg
        });
        WS.send(data);
    }
    keyPressHandle(ev) {
        let value = ev.target.value;
        if (ev.charCode === 13 && !ev.shiftKey) {
            ev.preventDefault();

            if (!ev.target.value) {
                return;
            }

            this.send(value);
            ev.target.value = '';
        }
    }

    componentWillMount () {
        let userName = prompt('Укажите свое имя?');
        userName = userName || 'New User';
        this.setState({
            user: {
                name: userName,
                id: this.guid()
            }
        });
    }

    componentDidMount () {
        WS.on("open", this.onOpen.bind(this));
        WS.on("close", this.onClose.bind(this));
        WS.on("error", this.onError.bind(this));
        WS.on("message", this.onMessage.bind(this));
    }

    render () {
        return (
            <div className="viewport">
                <div className="header">
                    <h1>ScoroChat</h1>
                </div>
                <div className="main">
                    <div className="left_panel">
                        <UserList userList={this.state.userList}/>
                    </div>
                    <div className="content">
                        <div className="history">
                            <History history={this.state.history} />
                        </div>
                        <div className="control">
                            <div className="container">
                                <textarea placeholder="Введите сообщение" onKeyPress={this.keyPressHandle.bind(this)}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppView;