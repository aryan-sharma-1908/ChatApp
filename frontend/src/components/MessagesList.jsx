import React, { useEffect } from 'react'
import MessageBubble from './MessageBubble'
const DummyMessages = [
    { id: 1, text: "Hi", from: "me", time: "23:30", status:'pending' },
    { id: 2, text: "Hey", from: "them", time: "23:32", status:'pending' },
    { id: 3, text: "What are you doing?", from: "me", time: "23:35", status:'pending' },
    { id: 4, text: "Nothing just chilling.", from: "them", time: "23:36", status:'pending' },
    { id: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel venenatis ex, et hendrerit urna. Nunc varius, nunc non cursus auctor, lectus turpis dapibus urna, in scelerisque justo urna id justo. Nunc et tellus consectetur, venenatis dui egestas, scelerisque felis. Nulla facilisi. Aenean placerat arcu sapien, at auctor felis condimentum eu. Donec magna ligula, malesuada ac quam a, mattis cursus dui. Duis sit amet magna quis ante molestie semper.", from: "them", time: "23:38", status:'pending' },
    { id: 6, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel venenatis ex, et hendrerit urna. Nunc varius, nunc non cursus auctor, lectus turpis dapibus urna, in scelerisque justo urna id justo. Nunc et tellus consectetur, venenatis dui egestas, scelerisque felis. Nulla facilisi. Aenean placerat arcu sapien, at auctor felis condimentum eu. Donec magna ligula, malesuada ac quam a, mattis cursus dui. Duis sit amet magna quis ante molestie semper.", from: "me", time: "23:40", status:'pending' },
    { id: 6, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel venenatis ex, et hendrerit urna. Nunc varius, nunc non cursus auctor, lectus turpis dapibus urna, in scelerisque justo urna id justo. Nunc et tellus consectetur, venenatis dui egestas, scelerisque felis. Nulla facilisi. Aenean placerat arcu sapien, at auctor felis condimentum eu. Donec magna ligula, malesuada ac quam a, mattis cursus dui. Duis sit amet magna quis ante molestie semper.", from: "me", time: "23:40", status:'pending' },
    { id: 6, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel venenatis ex, et hendrerit urna. Nunc varius, nunc non cursus auctor, lectus turpis dapibus urna, in scelerisque justo urna id justo. Nunc et tellus consectetur, venenatis dui egestas, scelerisque felis. Nulla facilisi. Aenean placerat arcu sapien, at auctor felis condimentum eu. Donec magna ligula, malesuada ac quam a, mattis cursus dui. Duis sit amet magna quis ante molestie semper.", from: "me", time: "23:40", status:'pending' },
]
const MessagesList = () => {
    useEffect(() => {
        
    },[])
    return (
        <div className='flex flex-col gap-2 py-2 px-2'>
                {DummyMessages.map(message => (
                    <MessageBubble key={message.id} text={message.text} from={message.from} time={message.time}/>
                ))}
        </div>
    )
}

export default MessagesList
