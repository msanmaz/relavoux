import clsx from "clsx"
import React from "react"


const Hamburger = ({ setOpen }) => {
  return (
    <button className="w-10 h-10 focus:outline-none" onClick={setOpen}>
      <span className="sr-only">Open main menu</span>
      <div className="block w-5 absolute transform  -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className={clsx(
            "block absolute h-0.5 w-5 rounded-sm bg-current -translate-y-1.5 "
          )}
        ></span>
        <span
          aria-hidden="true"
          className={clsx(
            "block absolute  h-0.5 w-5 bg-current rounded-sm transform"
          )}
        ></span>
        <span
          aria-hidden="true"
          className={clsx(
            "block absolute  h-0.5 w-5 bg-current rounded-sm translate-y-1.5"
          )}
        ></span>
      </div>
    </button>
  )
}

export default Hamburger
