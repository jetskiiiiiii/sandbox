"use client"

import { PostMetadataType } from "@/utils/interface";
import CreationsButton from "./create-button";

export default function CreationsDashboard({ userId, postMetadata }: {userId: string; postMetadata: PostMetadataType[] | null}) {
  if (!postMetadata || postMetadata.length === 0) {
    return (
      <div>
        <p>No creations yet.</p>
        <CreationsButton />
      </div>
    )
  }

  return (
    <div>
      <CreationsButton />
      <ul>
        {postMetadata.map((post) => (
          <li key={post.id}>
            <a href={`/creations/${post.post_id}`}>
              <p>{post.title}</p>
              <p>Created at {post.created_at}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
