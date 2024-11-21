/* eslint-disable @next/next/no-img-element */
import Navbar from './Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />

      <main className='max-w-5xl m-auto p-3 mt-4'>
        <div className='grid grid-cols-2'>
          <div className='mt-16'>
            <h1>
              Loreto <span className='text-rose-600'>Trading</span>
            </h1>
            <p className='text-muted-foreground mt-3'>
              We are a company that specializes in providing packaging
              solutions. Our unique feature allows for the resizing of boxes and
              the addition of layout markings. With our services, you can
              customize boxes to perfectly fit your specific size requirements,
              complete with accurate markings for easy assembly and
              organization.
            </p>
          </div>
          <div className='mt-8'>
            <img
              src='/order_delivered.svg'
              alt='box'
            />
          </div>
        </div>
      </main>
    </div>
  )
}
