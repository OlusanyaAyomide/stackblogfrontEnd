import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function UserAvatar({className,src}:{className?:string,src?:string}) {
  return (
    <Avatar className={className}>
        <AvatarFallback>Bl</AvatarFallback>
        <AvatarImage src={src || 'profile.png'}/>
    </Avatar>
  )
}
