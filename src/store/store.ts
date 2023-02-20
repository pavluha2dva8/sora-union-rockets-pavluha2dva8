import { nanoid } from 'nanoid'
import { create } from 'zustand'

interface User {
  login: string
  avatar: string
}

interface Rocket {
  id: string
  title: string
  name: string
  description: string
  user: User
}

interface RocketStore {
  rockets: Rocket[]
  loading: boolean
  error: string | null
  addRocket: (rocket: Omit<Rocket, 'id'>) => void
  deleteRocket: (id: string) => void
  editRocket: (editedRocket: Omit<Rocket, 'user'>) => void
}

export const useRocketStore = create<RocketStore>((set) => ({
  rockets: [],
  loading: false,
  error: null,
  addRocket: (rocket) =>
    set((state) => ({
      rockets: [...state.rockets, { id: nanoid(), ...rocket }],
    })),
  deleteRocket: (id) =>
    set((state) => ({
      rockets: state.rockets.filter((rocket) => id !== rocket.id),
    })),
  editRocket: ({ id, title, name, description }) =>
    set((state) => ({
      rockets: state.rockets.map((rocket) => {
        if (rocket.id === id) {
          return {
            ...rocket,
            title,
            name,
            description,
          }
        }
        return rocket
      }),
    })),
}))
