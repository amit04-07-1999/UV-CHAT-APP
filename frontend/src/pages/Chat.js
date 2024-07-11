import "./Chat.css"
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        withCredentials: true,  // Ensure credentials are sent
        extraHeaders: {
          "my-custom-header": "value"  // Add any necessary headers
        }
      });
      socket.current.emit("add-user", currentUser._id);
      socket.current.on("connect", () => {
        console.log("Socket connected: ", socket.current.id);
      });
      socket.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }
  }, [currentUser]);


  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}/${currentUser._id}`)
          .then(response => {
            setContacts(response.data);
          })
          .catch(error => {
            console.error('Error fetching contacts:', error);
          });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <>
      <div>
        <div className="container-1">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}

