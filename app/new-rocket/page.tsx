'use client'

import debounce from 'lodash/debounce'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import InputField from '@/components/InputField'
import TextareaField from '@/components/TextareaField'
import { useRocketStore } from '@/src/store/store'

const AUTOCOMPLETE_DEBOUNCE_DELAY = 300

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NewRocket() {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [userLogin, setUserLogin] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userList, setUserList] = useState<{ login: string; avatar: string }[]>([])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const router = useRouter()
  const addRocket = useRocketStore((state) => state.addRocket)

  // I'm using the debounce function a debounced version of the setDebouncedSearchTerm function.
  // This debounced function is called every time the userLogin value changes, with a delay
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(userLogin)
    }, AUTOCOMPLETE_DEBOUNCE_DELAY)

    handler()

    return () => {
      handler.cancel()
    }
  }, [userLogin])

  // The useSWR hook is used to fetch data from the GitHub API.
  // If the debouncedSearchTerm value is not null, the fetcher function is called
  const { data } = useSWR(
    debouncedSearchTerm ? `https://api.github.com/search/users?q=${debouncedSearchTerm}` : null,
    fetcher,
  )

  useEffect(() => {
    if (data?.items) {
      setUserList(
        data.items.map((item: { login: string; avatar_url: string }) => ({
          login: item.login,
          avatar: item.avatar_url,
        })),
      )
    }
  }, [data])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addRocket({ title, name, description, user: { login: userLogin, avatar: userAvatar } })
    router.push('/')
  }

  const handleUserSelect = (login: string, avatar: string) => {
    setUserLogin(login)
    setUserAvatar(avatar)
    setUserList([])
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-xl font-bold mb-8 flex items-center">🚀 Add new Rocket</h1>

      <InputField
        label={'title'}
        type={'text'}
        placeholder={'Rocket review title'}
        value={title}
        handleChange={setTitle}
      />
      <InputField
        label={'name'}
        type={'text'}
        placeholder={'Rocket name'}
        value={name}
        handleChange={setName}
      />
      <TextareaField
        label={'description'}
        placeholder={'Rocket description'}
        value={description}
        handleChange={setDescription}
      />
      <div className={'relative'}>
        <InputField
          label={'user'}
          type={'text'}
          placeholder={'Github username'}
          value={userLogin}
          handleChange={setUserLogin}
        />

        {/*I don't want to use third party libraries here for autocomplete,
         so I created simple dropdown list of user login names*/}
        {userList.length > 1 && (
          <div className="absolute bg-white rounded-lg w-full shadow-lg">
            {userList.map(({ login, avatar }) => (
              <div
                key={login}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleUserSelect(login, avatar)}
              >
                {login}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
