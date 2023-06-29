import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { channel } from 'diagnostics_channel';
import FriendBox from '../FriendBox';

interface MyChannelsProps {
    searchText: string;
}

const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const channelsList = [
        { id: '1', name: 'chat normal', avatar: 'https://www.zooplus.fr/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg'},
        { id: '2', name: 'un TCHat', avatar: 'https://i.pinimg.com/originals/f7/9c/c2/f79cc2f84d191f00b5198ca860075191.jpg' },
        { id: '3', name: 'Ze Tchatte', avatar: 'https://lemagduchat.ouest-france.fr/images/dossiers/2023-06/mini/chat-cinema-061232-650-400.jpg' },
        { id: '4', name: 'Chatterine Zeta-Jones', avatar: 'https://nationaltoday.com/wp-content/uploads/2022/10/456841256-min-1200x834.jpg' },
        { id: '5', name: 'Chatck Norris', avatar: 'https://images02.military.com/sites/default/files/2021-04/chucknorris.jpeg' }
    ];

    const filteredChannels = channelsList.filter(( channel ) =>
        channel.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
    <List>
        {filteredChannels.map((channel) => (
            <ListItemButton key={channel.id}>
                <ListItemIcon>
                    <Avatar alt={channel.name} src={channel.avatar} />
                </ListItemIcon>
                <ListItemText primary={channel.name} />
            </ListItemButton>
        ))}
    </List>
    );
};

export default MyChannels;