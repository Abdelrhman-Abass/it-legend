// This will be specific to your locale routes
import Image from 'next/image'
import { Link } from "@/navigation";

export default function LocaleNotFound() {
  const direction = "ltr"
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src={"/assets/images/others/404.png"} width={350} height={350} />
      <h2 className="title text-6xl pt-[30px] pb-[10px] font-bold mb-4 text-center ">404 - Page Not Found</h2>
      <p className="mb-4 text-center">The page you are looking for doesn't exist</p>
      <Link className="m-0 edu-btn m-0" href="/" style={{ cursor: "pointer" }}>
          <i className="icon-4 mr-2"></i>
        <span>Return Home</span>
      </Link>
    </div>
  )
}