import React, { useContext } from 'react';
import { ChatContext } from '../../contexts/chatContext/ChatContext';
import { ThemeContext, themes } from '../../contexts/themeContext/ThemeContext';

import ChatPopUp from './containers/ChatPopUp';
import ChatSideIcons from './containers/ChatSideIcons';
/**
 * Chat Main Component
 * @function Chat
 * @description this is the main Component chat navbar contains in it's body all the chat components
 * @returns {Component} ChatPopUp & ChatSideIcons
 */
export default function View() {
    let { currPopUpOpenChat } = useContext(ChatContext);
    const theme = useContext(ThemeContext)[0];
    const css = `
    .chat-popup-footer{
        background-color: rgba(${themes[theme].white});
    }
    .chat-popup-footer textarea{
        background-color: rgba(${themes[theme].white});
        color:rgba(${themes[theme].black});
    }
    @media screen and (max-width: 960px) {
        .chat-popup-footer,.send{
            background-color: rgba(${themes[theme].white});
        }
        .chat-popup-footer textarea{
            background-color: rgba(${themes[theme].white});
            color:rgba(${themes[theme].black});
        }
    }
    `;
    return (
        <div className='chat-container'>
            {currPopUpOpenChat && (
                <ChatPopUp
                    sender="gaser"
                    senderLink="#"
                    receiver="omda"
                    receiverLink="#"
                />
            )}
            <ChatSideIcons />
            <style>{css}</style>
        </div>
    );
}
