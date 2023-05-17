import React from "react";
import { AiFillFacebook, AiFillPhone, AiFillInstagram} from "react-icons/ai";

export const Footer = () => {
  return (
    <div className=" sticky footer-wrapper bg-neutral-focus text-neutral-content md:px-12">
      <footer className="footer p-12 min-h-[20vh] flex flex-col gap-4 sm:flex-row  sm:gap-10">
        <div className="flex flex-col gap-1 flex-1">
          <div className={`font-bold text-2xl`}>Contact</div>

        <div>
            <div className="flex flex-row gap-2">
              <span>
                <AiFillPhone />
              </span>
              <span className="text-zinc-400">(+84)32762370 </span>
            </div>
            {/* Social medias */}
            <div className="flex flex-row text-2xl my-1">
              <div>
                <AiFillFacebook />
              </div>
              <div>
                <AiFillInstagram />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-2xl font-bold">Products</div>
          <div className="text-zinc-400">
            <div>Toys</div>
            <div>Games</div>
            <div>Sales</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-2xl font-bold">References</div>
          <div className="text-zinc-400">
            <div>Policies</div>
            <div>Exchange and Refurbish</div>
            <div>Warranty</div>
          </div>
        </div>
                
      </footer>
    </div>
  )
}

