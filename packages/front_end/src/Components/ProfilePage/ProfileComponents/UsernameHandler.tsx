import { useState } from "react"
import { Button } from "@mui/material";

const UserNameHandler = () => {
    const HandleChangeUsername = async () => {
        const [Username, setUserame] = useState('')
    /* 		try {
            const response = await axios.put('http://localhost:4242/api/user')
            setUserame(response.data.Username);
            }
            catch(err) {
                console.error(err)
            };*/
    };
    return (
        <Button variant="contained" /*onClick={handleChangeUsername}*/ sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>Change Username</Button>
    );
};

export default UserNameHandler;