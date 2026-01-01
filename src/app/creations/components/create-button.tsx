"use client"

import { CreationButtonAction } from "../actions/create-button-action"

export default function CreationsButton() {
  return (
    <button onClick={CreationButtonAction} className="btn">Create post</button>
  )
}
