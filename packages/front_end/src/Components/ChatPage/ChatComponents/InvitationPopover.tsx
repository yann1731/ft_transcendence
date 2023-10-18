import React from 'react';
import { Box, Button } from "@mui/material";
import { SocketContext } from 'Contexts/socketContext';
import { useContext } from "react";
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import { User, UserContext } from 'Contexts/userContext';
import { useEffect, useRef, useState } from 'react';
import myAxios from 'Components/axiosInstance';
import toggleShowInvitation  from '../ChatBoxes/ChatBox';

function InvitationPopover({ onClose, userA, userB}: any) {
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const socket = useContext(SocketContext);
    const [ game, setGame ] = useState("invited")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
        socket.emit("refused", userB);
        onClose(false);
    }
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [userBName, setUserBName] = useState("")

    useEffect(() => {
        if (anchorRef.current) {
            setAnchorEl(anchorRef.current);
        }
        const fetchUsers = async () => {
              await myAxios.get(`/api/user/${userB}`, {headers: {
                'Authorization': sessionStorage.getItem("at"),
                'userId': user?.id
              }}).then((response: any) => {
                setUserBName(response.data.nickname)
            }).catch((error: any) => {
              console.error('Error fetching users', error);
              })
        }
        fetchUsers()
    }, []);


    const createInvitation = () => {
        socket.emit("invite", { userA: userA, userB: userB });
        onClose();
        navigate("/home", {state: { game }})
    }

    return (
        <div>
            <div ref={anchorRef} id="invitation-popover-anchor">
            </div>
            <Popover
                id="invitation-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                style={{ top: '40%' }}
            >
            <Box className="invitationBox">
                You've been invited to play pong by {userBName}!
                <Box className="invitationButtonsBox">
                    <Button onClick={handleClose} className="profilePageButtons" sx={{ width: '150px', mt: 5 }}>Decline</Button>
                    <Button onClick={createInvitation} className="profilePageButtons" sx={{ width: '150px' }}>Accept</Button>
                </Box>
            </Box>
            </Popover>
        </div>
    );
}

export default InvitationPopover;