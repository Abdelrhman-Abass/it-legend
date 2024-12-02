import Image from 'next/image'
import Link from 'next/link'

export default function Error() {
  const direction = "ltr"
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src={"/assets/images/others/404.png"} width={350} height={350} />
      <h2 className="title text-6xl pt-[30px] pb-[10px] font-bold mb-4 text-center ">We are sorry</h2>
      <p className="mb-4 text-center">The page you are looking for having issue</p>
      {/* <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Return Home
      </Link> */}
      <Link className="m-0 edu-btn m-0" href="/learning-path" style={{ cursor: "pointer" }}>
        
          <i className="icon-4 mr-2"></i>
        <span>Return Home</span>
      </Link>
    </div>
  )
}