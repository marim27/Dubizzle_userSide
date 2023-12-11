import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Chat.css";
import { LuSendHorizonal } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { IDContext } from "../../Context/IDContext";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { useParams } from "react-router";

const Chat = () => {
  const { user, setUser } = useContext(IDContext);
  const [senderchat, setSenderChat] = useState([]);
  const [reciverchat, setReciverchat] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const senderResponse = await axiosInstanceProducts.get(
        `/chats/senderId?senderId=${user._id}`
      );
      const senderChats = senderResponse.data;
      const receiverResponse = await axiosInstanceProducts.get(
        `/chats/receiverId?receiverId=${user._id}`
      );
      const receiverChats = receiverResponse.data;
      const senderPromises = senderChats.map(async (chat) => {
        const userResponse = await axiosInstanceProducts.get(
          `/users/${chat.receiverId}`
        );
        chat.receiverName = userResponse.data.data.user.username;
        return chat;
      });
      const receiverPromises = receiverChats.map(async (chat) => {
        const userResponse = await axiosInstanceProducts.get(
          `/users/${chat.senderId}`
        );
        chat.senderName = userResponse.data.data.user.username;
        return chat;
      });
      const senderChatsWithUsernames = await Promise.all(senderPromises);
      const receiverChatsWithUsernames = await Promise.all(receiverPromises);
      setSenderChat(senderChatsWithUsernames);
      setReciverchat(receiverChatsWithUsernames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let { id } = useParams();

  const GetChatUsingParams = async (id)=>{
    try {
      const Response = await axiosInstanceProducts.get(`/chats`);
      const allChats = Response.data;
      console.log(allChats);

      let isFoundChat = allChats.some((chat)=> chat.receiverId === id && chat.senderId === user._id);

      if(isFoundChat){
        let isFound = allChats.filter((chat)=> chat.receiverId === id && chat.senderId === user._id);
        console.log(isFound[0].senderId)
        const userResponse = await axiosInstanceProducts.get(
          `/users/${isFound[0].receiverId}`
          );
          isFound[0].receiverName = userResponse.data.data.user.username;
          console.log(isFound[0]);
          setCurrentChat(isFound[0]);
          setShowChat(true);
          setStatus("sender");
        }else{
          isFoundChat = allChats.some((chat)=> chat.senderId === id && chat.receiverId === user._id);
          if(isFoundChat){
            let isFoundSender = allChats.filter((chat)=> chat.senderId === id && chat.receiverId === user._id);
            console.log(isFoundSender[0].senderId)
            console.log(isFoundSender)
          const userResponse = await axiosInstanceProducts.get(
            `/users/${isFoundSender[0].senderId}`
          );
          isFoundSender[0].senderName = userResponse.data.data.user.username;
          console.log(isFoundSender[0]);
          setCurrentChat(isFoundSender[0]);
          setShowChat(true);
          setStatus("receiver");
          }else{
            let newChat = {
              senderId: user._id,
              receiverId: id,
              chat:[]
            }
            const userResponse = await axiosInstanceProducts.get(
              `/users/${id}`
            );
            newChat.receiverName = userResponse.data.data.user.username;
            setCurrentChat(newChat);
          setShowChat(true);
          setStatus("sender");
          }

      }
    } catch (error) {
      console.error("Error fetching data");
    } 
      
  }

  useEffect(() => {
    fetchData();
    if(id){
      GetChatUsingParams(id);
    }
    }, []);
    
  // console.log(senderchat)

  const openChatSender = (chat) => {
    changeIdInParams(chat.receiverId)
  };

  const openChatReceiver = (chat) => {
    changeIdInParams(chat.senderId)
  };

  const sentMessage = ()=>{
    const fetchData = async () => {
      try {
      const Response = await axiosInstanceProducts.get(`/chats`);
      const allChats = Response.data;
      console.log(allChats);

      let isFoundChat1 = allChats.some((chat)=> chat.receiverId === id && chat.senderId === user._id);
      let isFoundChat2 = allChats.some((chat)=> chat.senderId === id && chat.receiverId === user._id);
      if(isFoundChat1 || isFoundChat2){
          const response = await axiosInstanceProducts.get(
            `/chats/${currentChat._id}`
          );
          let chat = response.data;
          chat.chat.push({id:user._id, message:message})
          setCurrentChat({...currentChat, chat:chat.chat})
          setMessage("")
          console.log(chat);
          axiosInstanceProducts.patch(
            `/chats/${currentChat._id}`,chat
          );
        }
        else{
          let chat ={
              senderId: user._id,
              receiverId: id,
              chat:[]
          }
          chat.chat.push({id:user._id, message:message})
          setCurrentChat({...currentChat, chat:chat.chat})
          senderchat.push({...currentChat, chat:chat.chat})  
          setMessage("")
          console.log(chat);
          console.log(chat);

          axiosInstanceProducts.post(
            `/chats`,chat
          );
          }
        }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }

  const navigate = useNavigate();
  const changeIdInParams = (id)=>{
    navigate(`/chat/${id}`) 
    GetChatUsingParams(id); 
  }

  return (
    <>
      <Container className="my-5 chat-body p-0">
        <Row>
          <Col md={"5"} className="chat-body border px-0 rounded">
            <h3 className="bg-light ps-4 fw-bold border-bottom chat-header mb-0  d-flex align-items-center">
              Inbox
            </h3>
            <div className="chat-side-left">

            {reciverchat.map((chat) => (
              <>
                <div
                  onClick={() => {
                    openChatReceiver(chat);
                  }}
                  className={`d-flex align-items-center px-3 py-2 border-bottom ${
                    currentChat._id == chat._id && "current-chat"
                  }`}
                  key={chat._id}
                  role="button"
                >
                  <div className="chat-avatar me-2">{chat.senderName[0]}</div>
                  <div className="col-10 ">
                    <h6 className="fw-bold mb-0">{chat.senderName}</h6>
                    <h6 className="fw-bold text-end">{chat.chat[chat.chat.length-1].message}</h6>
                  </div>
                </div>
              </>
            ))}
            {senderchat.map((chat) => (
              <>
                <div
                  onClick={() => {
                    openChatSender(chat);
                  }}
                  className={`d-flex align-items-center px-3 py-2 border-bottom  ${
                    currentChat == chat._id && "current-chat"
                  }`}
                  key={chat._id}
                  role="button"
                >
                  <div className="chat-avatar me-2">{chat.receiverName[0]}</div>
                  <h6 className="fw-bold">{chat.receiverName}</h6>
                </div>
              </>
            ))}
            </div>
          </Col>
          <Col
            md={"7"}
            className="chat-body bg-light border-bottom border-top border-end rounded px-0"
          >
            {showChat && (
              <>
                <div className="bg-white d-flex align-items-center px-3 py-2 border-bottom chat-header">
                  <div className="chat-avatar me-2">
                    {status === "receiver"
                      ? currentChat.senderName[0]
                      : currentChat.receiverName[0]}
                  </div>
                  <h6 className="fw-bold">
                    {status === "receiver"
                      ? currentChat.senderName
                      : currentChat.receiverName}
                  </h6>
                </div>
                <div className="chat-log p-2">
                  {currentChat?.chat?.map((message) => (
                    <>
                      {message.id == user._id ? (
                        <div className="d-flex justify-content-end my-2">
                          <span className="sender-bubble">
                            {message.message}
                          </span>
                        </div>
                      ) : (
                        <span className="receiver-bubble">
                          {message.message}
                        </span>
                      )}
                      <div className="my-2"></div>
                    </>
                  ))}
                </div>
                <div className="chat-input-message border-top d-flex">
                  <input
                    type="text"
                    className="col-11 chat-input-message border-0 fs-4"
                    value={message}
                    onChange={(e)=>{setMessage(e.target.value)}}
                  />
                  <div
                    className="col-1 d-flex align-items-center justify-content-center chat-input-icon"
                    role="button" onClick={sentMessage}
                  >
                    <LuSendHorizonal className="fs-1 bg-dark text-white p-2 rounded-circle"/>
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
