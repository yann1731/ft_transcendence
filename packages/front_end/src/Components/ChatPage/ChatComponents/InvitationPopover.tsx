import React from 'react';
import { Box, Button } from "@mui/material";
import { SocketContext } from 'Contexts/socketContext';
import { gameSocketContext } from 'Contexts/gameSocketContext';
import { useContext } from "react";
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import { User, UserContext } from 'Contexts/userContext';
import { useEffect, useRef, useState } from 'react';

function InvitationPopover({ onClose, userA, userB }: any) {
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const socket = useContext(SocketContext);
    const gameSocket = useContext(gameSocketContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'invitation-popover' : undefined;
    const navigate = useNavigate();
    const {user, updateUser} = useContext(UserContext)

    useEffect(() => {
        if (anchorRef.current) {
            setAnchorEl(anchorRef.current);
        }
    }, []);


    const createInvitation = () => {
        gameSocket.emit("invite", { userA: userA, userB: userB });

        localStorage.setItem("host" + user?.username, "false")
        localStorage.setItem("invite" + user?.username, "true")
        navigate("/home")
        onClose();
    }

    console.log("youpi")
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
                {userA} You've been invited to play pong by {userB}!
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