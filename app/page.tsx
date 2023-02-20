import Link from 'next/link'
import RocketsList from '@/components/RocketsList'

export default function Home() {
  return (
    <div className={'max-w-xl w-full border border-gray-300 rounded-lg bg-gray-100 p-10'}>
      <header className={'flex justify-between p-2 mb-4'}>
        <h1 className="text-xl font-bold flex items-center">🚀 List of Rockets</h1>
        <Link
          href={'/new-rocket'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          +
        </Link>
      </header>
      <RocketsList />
    </div>
  )
}
