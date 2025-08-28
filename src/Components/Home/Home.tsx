import hero from "../../assets/home.jpg"

export default function Home() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-4'>
          <img src={hero} alt="" style={{width:'80%', height:'80vh' }} />

      </div>
    </>
  )
}
