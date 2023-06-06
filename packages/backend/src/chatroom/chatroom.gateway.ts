import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@WebSocketGateway()
export class ChatroomGateway {
  constructor(private readonly chatroomService: ChatroomService) {}

  @SubscribeMessage('createChatroom')
  create(@MessageBody() createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  @SubscribeMessage('findAllChatroom')
  findAll() {
    return this.chatroomService.findAll();
  }

  @SubscribeMessage('findOneChatroom')
  findOne(@MessageBody() id: number) {
    return this.chatroomService.findOne(id);
  }

  @SubscribeMessage('updateChatroom')
  update(@MessageBody() updateChatroomDto: UpdateChatroomDto) {
    return this.chatroomService.update(updateChatroomDto.id, updateChatroomDto);
  }

  @SubscribeMessage('removeChatroom')
  remove(@MessageBody() id: number) {
    return this.chatroomService.remove(id);
  }
}
