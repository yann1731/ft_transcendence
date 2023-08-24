import React from 'react';
import { Box } from "@mui/material";
import { SocketContext, gameSocketContext } from 'Contexts/socketContext';
import { useContext } from "react";

function InvitationPopover({ onClose, userA, userB }: any) {
    const socket = useContext(SocketContext);
    const gameSocket = useContext(gameSocketContext);

    const createInvitation = () => {
        gameSocket.emit("invite", { userA: userA, userB: userB });
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