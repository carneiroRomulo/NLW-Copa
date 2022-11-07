import Image from 'next/image'
import imageAppPreview from '../assets/app-nlw-copa-preview.png'
import imageLogo from '../assets/logo.svg'
import imageUsersAvatarExample from '../assets/users-avatar-example.png'
import imageIconCheck from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent ) {
    event.preventDefault()
    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, código copiado para a área de transferência')
      setPoolTitle('')
    } catch (error) {
      console.log(error)
      alert('Falha ao criar o bolão, tente novamente')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-32 items-center">
      <main>
        <Image src={imageLogo} alt="Logo" />
        <h1 className="mt-10 text-white text-4xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center grap-2">
          <Image src={imageUsersAvatarExample} alt=""/>
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.usersCount}</span> pessoas já usando
          </strong>
        </div>
        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder='Qual o nome do seu bolão?'
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className='px-6 py-4 bg-yellow-500 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>
        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={imageIconCheck} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={imageIconCheck} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={imageAppPreview}
        alt="Two smartphones"
        quality={100}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
