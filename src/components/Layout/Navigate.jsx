import { useNavigate } from "react-router-dom"

// assets
import PreIcon from "../../assets/images/svg/arrow_back.svg"
import NavigateIcon from "../../assets/images/svg/navigate_icon.svg"

function Navigate(props) {
  const { options, isBackButton, backToLink } = props
  const navigate = useNavigate()
  return (
    <div className="bg-navigate">
      <div className="text-sm font-bold h-16 flex items-center justify-between  max-w-full md:max-w-screen-2xl mx-auto px-4 md:px-6 py-1 md:py-3">
        <div className="flex items-center">
          {options?.map((item, i) => {
            const { id, title, canNavigate, path } = item
            return (
              <div className="flex items-center" key={i}>
                <div key={id} className="flex items-center ">
                  <div
                    className={`${
                      canNavigate && "text-blue-500 cursor-pointer"
                    }`}
                  >
                    {path ? (
                      <span onClick={() => navigate(path)}>{title}</span>
                    ) : (
                      <span>{title}</span>
                    )}
                  </div>
                  {i === options.length - 1 ? (
                    ""
                  ) : (
                    <img src={NavigateIcon} alt="" className="px-2" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {isBackButton && (
          <div
            className="px-5 py-2 border-solid  border-primary border rounded-xl flex items-center cursor-pointer"
            onClick={() => navigate(backToLink || -1)}
          >
            <img src={PreIcon} width="14" alt="" />
            <span className="ml-2">Back</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navigate
