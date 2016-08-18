import React from 'react'

var avatar = require('./../../img/avatar.png');

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    getDate () {
        let dt = new Date();
        return ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) + ' '
            + ('0' + dt.getDate()).slice(-2) + '.' + ('0' + (dt.getMonth() + 1)).slice(-2) + '.' + dt.getFullYear();
    }

    render () {
        return (
            <div id="msgContainer" className="container">
                {this.props.history.map((item, ind) => {
                    return (
                        <div className="msg_container" key={ind}>
                            <div className="avatar">
                                <img src={avatar} />
                            </div>
                            <div className="msg_content">
                                <div className="title">
                                    <a className="author" href="javascript:void(0)">{item.from.name}</a>
                                    <span>{this.getDate()}</span>
                                </div>
                                <div className="msg_body">
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                        )
                })}
            </div>
        );
    }

    componentDidUpdate() {
        var historyContainer = document.getElementsByClassName('history')[0];
        var msgContainer = document.getElementById('msgContainer');

        // Скролим чат
        if (msgContainer.offsetHeight - (historyContainer.scrollTop + historyContainer.offsetHeight) < 200) {
            historyContainer.scrollTop = msgContainer.offsetHeight - historyContainer.offsetHeight;
        }
    }
}

export default History;