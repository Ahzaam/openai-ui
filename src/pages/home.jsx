import {getUser} from '../service/authentication'


export default function Home(){
    // getUser().then((user) => {
    //     console.log(user._delegate)
    // })
  return (
    <>
    <div className='w-full h-full  flex items-center justify-center'>
        <div className='grid grid-cols-3 gap-3'>
            <div className='bg-red-100 '>
                a
            </div>
            <div className='bg-red-100'>a</div>
            <div className='bg-red-100'>s</div>
        </div>

    </div>
    </>
  )  
}

