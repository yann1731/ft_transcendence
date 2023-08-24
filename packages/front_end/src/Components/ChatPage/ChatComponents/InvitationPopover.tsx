import React from 'react';
import { Box } from "@mui/material";
import { SocketContext } from 'Contexts/socketContext';
import { gameSocketContext } from 'Contexts/gameSocketContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { User, UserContext } from 'Contexts/userContext';

function InvitationPopover({ onClose, userA, userB }: any) {
    const socket = useContext(SocketContext);
    const gameSocket = useContext(gameSocketContext);
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
        <Box sx={{}} className="invitation-popover">
            <p>{userA} You've been invited to play pong by {userB}!</p>
            <button onClick={onClose}>Decline</button>
            <button onClick={createInvitation}>Accept</button>
        </Box>
    );
}

export default InvitationPopover;