import "./index.css"

function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-20 z-[1000]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
          <div className="loaderSpinner"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
