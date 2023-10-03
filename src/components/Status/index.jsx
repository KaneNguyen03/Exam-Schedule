import React from "react"

const StatusButton = (props) => {
  const { title, color, bgColor } = props
  return (
    <div>
      <div
        style={{ background: `${bgColor}` }}
        className="group-hover:bg-white inline-flex items-center justify-center px-3 py-1 rounded-3xl"
      >
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ background: `${color}` }}
        ></div>
        <div
          className="text-gray-500 font-medium"
          style={{ color: `${color}` }}
        >
          {title}
        </div>
      </div>
    </div>
  )
}

export default StatusButton
