import { useState } from "react"
import { Button } from "@mui/material";

const PassWordHandler = () => {
    const HandleChangePassword = async () => {
        const [Password, setPassword] = useState('')
    /* 		try {
            const response = await axios.put('http://localhost:4242/api/user')
            setUserame(response.data.Username);
            }
            catch(err) {
                console.error(err)
            };*/
    };
    return (
        <Button variant="contained" /*onClick={}*/ sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>Change Password</Button>
    );
};

export default PassWordHandler;