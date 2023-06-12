import { useState } from "react"
import { Button } from "@mui/material";

interface UserName {
    username: string;
}

const UserNameHandler = () => {
    const [username, setUserame] = useState('')
    const HandleChangeUsername = async () => {
     		try {
            const response = await fetch('http://localhost:4242/api/user/1');
            const user: UserName = await response.json();
            alert(user.username);
            setUserame(user.username);
            }
            catch(err) {
                console.error(err)
            };
    };
    return (
        <Button variant="contained" onClick={HandleChangeUsername} sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>Change Username</Button>
    );
};

export default UserNameHandler;