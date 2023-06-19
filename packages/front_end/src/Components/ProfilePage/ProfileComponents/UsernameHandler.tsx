import { useState } from "react"
import { Button } from "@mui/material";
import { theme } from '../../../Theme';

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
        <Button variant="outlined" className="profilePageButtons" /*onClick={handleChangeUsername}*/>Change Username</Button>
    );
};

export default UserNameHandler;



