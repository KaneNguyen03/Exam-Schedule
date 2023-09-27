const Header = () => {
  return (
    <div>
      <div className="flex p-6  rgb(59 130 246 / 0.5); justify-between items-center bg-gray-900">
        <div></div>
        <div className="flex space-x-3">
          <img
            src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
            className="h-8 mr-3"
            alt="ESM"
          />
          <div className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Exam Schedule Manage{" "}
          </div>
        </div>
        <div className="border-solid border-5 border-sky-500 text-xl"></div>
      </div>
    </div>
  )
}

export default Header
