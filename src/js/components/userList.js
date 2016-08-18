import React from "react";
var avatar = require('./../../img/avatar.png');

export default class UserList extends React.Component{
    constructor(props){
        super(props);
    }

    render () {
        const historyIds = Object.keys(this.props.userList);

        return (
            <div id="members">
                {historyIds.map((id) => {
                    return (
                        <div className='userList' key={id}>
                            <div className='userList_avatar'>
                                <img src={avatar} />
                            </div>
                            <div className='userList_info'>
                                <span>{this.props.userList[id].name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}