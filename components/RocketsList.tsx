'use client'

import RocketItem from '@/components/RocketItem'
import { useRocketStore } from '@/src/store/store'

export default function RocketsList() {
  const rockets = useRocketStore((state) => state.rockets)
  // We should use a Client Component because we cannot use hooks in Server-Side Components.
  // Additionally, using `useRocketStore.getState().rockets` would not cause a re-render of the component.

  return (
    <ul className={'flex flex-col  gap-4'}>
      {rockets.map(({ id, title, name, description, user }) => (
        <RocketItem
          key={id}
          id={id}
          title={title}
          name={name}
          description={description}
          userName={user.login}
          avatar={user.avatar}
        />
      ))}
    </ul>
  )
}
