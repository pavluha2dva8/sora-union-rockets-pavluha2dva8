import Image from 'next/image'
import { useState } from 'react'
import { useRocketStore } from '@/src/store/store'

interface RocketItemProps {
  id: string
  title: string
  name: string
  description: string
  userName: string
  avatar: string
}

export default function RocketItem({
  id,
  title: initialTitle,
  name: initialName,
  description: initialDescription,
  userName,
  avatar,
}: RocketItemProps) {
  const deleteRocket = useRocketStore((state) => state.deleteRocket)
  const editRocket = useRocketStore((state) => state.editRocket)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    editRocket({ id, title, name, description })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTitle(initialTitle)
    setName(initialName)
    setDescription(initialDescription)
  }

  return (
    <li className="flex gap-4 p-4 rounded-lg shadow-md bg-white">
      <div className={`border border-blue-200 shadow-lg rounded-lg bg-cyan-100`}>
        <Image
          src={'/rocket.png'}
          alt={'rocket'}
          width={10}
          height={30}
          className="w-28 h-48 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 p-1 text-lg text-gray-700 font-bold capitalize border-b border-gray-400 focus:outline-none focus:border-blue-400"
              />
              <div className="flex gap-2">
                <button onClick={handleSave} className="text-green-500 hover:text-green-700">
                  Save
                </button>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="flex-1 p-1 text-lg text-gray-700 font-bold capitalize">{title}</h2>
              <div className="flex gap-2">
                <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
                  Edit
                </button>
                <button
                  onClick={() => deleteRocket(id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 text-gray-600 font-medium capitalize border-b border-gray-400 focus:outline-none focus:border-blue-400"
            />
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 sw-full p-1 text-gray-500 text-sm capitalize border border-gray-400 focus:outline-none focus:border-blue-400"
            />
          </>
        ) : (
          <>
            <p className="p-1 text-gray-600 font-medium capitalize">{name}</p>
            <p className="flex-1 p-1 text-gray-500 text-sm capitalize">{description}</p>
          </>
        )}
        <div className="flex items-center gap-2">
          <Image
            src={avatar}
            alt={'avatar'}
            className="w-10 h-10 rounded-full"
            width={10}
            height={10}
          />
          <p className="text-gray-600 font-medium capitalize">{userName}</p>
        </div>
      </div>
    </li>
  )
}
