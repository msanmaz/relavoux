import clsx from "clsx"
import React from "react"



const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-small-regular border transition-colors duration-200 disabled:opacity-50",
        {
          "text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white":
            variant === "primary",
          "text-gray-900 bg-transparent border-gray-920 hover:bg-gray-100":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
