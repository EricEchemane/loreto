import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import SignInButton from './SignInButton'
import Image from 'next/image'

const HomeLinkTitle = (
  <Link href={'/'}>
    <div className='font-bold flex items-center gap-3'>
      <Image
        src={'/logo.png'}
        alt=''
        width={30}
        height={30}
      />
      <span>Loreto Trading</span>
    </div>
  </Link>
)

export default async function Navbar() {
  const session = await getServerSession()

  const getAction = () => {
    if (!session?.user) return <SignInButton />
    return (
      <Link href={'/dashboard/home'}>
        <Button>Dashboard</Button>
      </Link>
    )
  }

  return (
    <nav className='flex gap-4 items-center max-w-4xl m-auto p-3'>
      {HomeLinkTitle}
      <div className='gap-8 ml-auto flex items-center'>
        <Link href={'/apartments'}>Apartments</Link>
        <Link href={'/vehicles/booking'}>Book a Vehicle</Link>
        <Link href={'/vehicles/booking'}>Custom Box</Link>

        {getAction()}
      </div>
    </nav>
  )
}
