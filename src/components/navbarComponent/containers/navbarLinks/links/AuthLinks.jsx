import React, { useState, useEffect, useContext } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import '../../../../../styles/styles.css';
import MessagesPopUp from '../MessagesPopup/MessagesPopUp';
import AccountPopup from '../AccountPopup/AccountPopup';
import { Link, NavLink } from 'react-router-dom';
import UnReadMsg from './UnReadMsg';
import { ChatContext } from '../../../../../contexts/chatContext/chatContext';
/**
 * Navbar AuthLinks: includes all links dashboard and inbox and expolre ...
 * @function NavbarAuthLinks
 * @property {boolean} openMessagePopup - Open message popup state open drop down list for messages
 * @property {function} setOpenMessagePopup - Open message popup Setter state
 * @property {boolean} openNotificationsPopup - Open notifications popup state open drop down list for notifications
 * @property {function} setOpenNotificationsPopup - Open notifications popup Setter state
 * @property {boolean} openAccountPopup - Open account popup state open drop down list for account
 * @property {function} setOpenAccountPopup - Open account popup Setter state
 * @returns {Component} links to all pages and drop down lists
 */
export default function AuthLinks() {
    //dropdown lists
    const [openMessagePopup, setOpenMessagePopup] = useState(false);
    const [openNotificationsPopup, setOpenNotificationsPopup] = useState(false);
    const [openAccountPopup, setOpenAccountPopup] = useState(false);

    //const [openPopup, setOpenPopup] = useState(false);

    // when the navbar run go loadChat and count the unreadMsgs
    let { loadChats, chats } = useContext(ChatContext);
    const [unReadMsgs, setUnReadMsgs] = useState(0);

    useEffect(async () => {
        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true
        let timer1 = setTimeout(async () => {
            await loadChats();
            let count = 0;
            // if (chats) {
            //     chats?.map(chat => {
            //         if (!chat.is_read) count++;
            //     });
            // }
            setUnReadMsgs(count);
        }, 2000);

        return () => {
            clearTimeout(timer1);
        };
    }, []);

    //close dropdown message list
    const closeMessagePopup = () => {
        setOpenMessagePopup(false);
        //console.log("colse");
    };
    const closeAccountPopup = () => {
        setOpenAccountPopup(false);
        //console.log("colse");
    };
    const clickMessagePopup = () => {
        // if i open it
        if (!openMessagePopup) {
            //close other popup
            setOpenNotificationsPopup(false);
            setOpenAccountPopup(false);
        }
        setOpenMessagePopup(!openMessagePopup);
    };
    const clickNotificationsPopup = () => {
        // if i open it
        if (!openNotificationsPopup) {
            //close other popup
            setOpenMessagePopup(false);
            setOpenAccountPopup(false);
        }
        setOpenNotificationsPopup(!openNotificationsPopup);
    };
    const clickAccountPopup = () => {
        // if i open it
        if (!openAccountPopup) {
            //close other popup
            setOpenMessagePopup(false);
            setOpenNotificationsPopup(false);
        }
        setOpenAccountPopup(!openAccountPopup);
    };

    /*  const clickOpenPopup = () => {
    console.log("closeg");
    setOpenPopup(!openPopup);
  };*/
    return (
        <>
            {/*TODO make this link to dashboard */}
            <li className="link-icon">
                <NavLink
                    className={navData => (navData.isActive ? 'active' : '')}
                    to="/dashboard"
                >
                    <i className="fas fa-home"></i>
                </NavLink>
            </li>
            {/*TODO make this link to recommended for you */}
            <li className="link-icon">
                <NavLink
                    className={navData => (navData.isActive ? 'active' : '')}
                    to="/explore/recommended-for-you"
                >
                    <i className="far fa-compass"></i>
                </NavLink>
            </li>
            {/*TODO make this link to inbox */}
            <li className="link-icon">
                <NavLink
                    className={navData => (navData.isActive ? 'active' : '')}
                    to="/inbox"
                >
                    <i className="fas fa-envelope"></i>
                </NavLink>
            </li>

            <ClickAwayListener onClickAway={closeMessagePopup}>
                <div className="link-popup">
                    <li
                        onClick={clickMessagePopup}
                        className={`link-icon message ${
                            openMessagePopup ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-comment-dots"></i>
                        {unReadMsgs !== 0 && (
                            <UnReadMsg unReadMsgs={unReadMsgs} />
                        )}
                    </li>
                    {openMessagePopup && (
                        <MessagesPopUp clickMessagePopup={clickMessagePopup} />
                    )}
                </div>
            </ClickAwayListener>

            <li
                onClick={clickNotificationsPopup}
                className={`link-icon  ${
                    openNotificationsPopup ? 'active' : ''
                }`}
            >
                <i className="fas fa-bolt"></i>
            </li>
            <ClickAwayListener onClickAway={closeAccountPopup}>
                <div className="link-popup">
                    <li
                        onClick={clickAccountPopup}
                        className={`link-icon  ${
                            openAccountPopup ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-user"></i>
                    </li>
                    {openAccountPopup && <AccountPopup />}
                </div>
            </ClickAwayListener>
            <Link to="/new">
                <li className="link-icon pen">
                    <i className="fas fa-pen"></i>
                </li>
            </Link>
            {/* <Route
        path="/new"
        children={({ match }) => (
          <NewPostPopup onClose={history.goBack} open={match} />
        )}
        />*/}
        </>
    );
}
