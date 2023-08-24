import React from 'react';
import { Box } from "@mui/material";
import { SocketContext } from 'Contexts/socketContext';
import { gameSocketContext } from 'Contexts/gameSocketContext';
import { useContext } from "react";
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import { User, UserContext } from 'Contexts/userContext';

function InvitationPopover({ onClose, userA, userB }: any) {
    const socket = useContext(SocketContext);
    const gameSocket = useContext(gameSocketContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

    const createInvitation = () => {
        gameSocket.emit("invite", { userA: userA, userB: userB });

        const newUser: Partial<User> = {
            ...user,
            isInvited: true,
            host: false
        }
        updateUser(newUser)
        navigate("/home")
        onClose();
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
        >
            <Box>
                <p>{userA} You've been invited to play pong by {userB}!</p>
                <button onClick={onClose}>Decline</button>
                <button onClick={createInvitation}>Accept</button>
            </Box>
        </Popover>
    );
}

export default InvitationPopover;