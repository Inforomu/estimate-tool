import { Link } from "react-router-dom";

export default function NavLogo() {
    return (

        <div className='navlogo absolute top-4 left-4 z-10 '>
            <Link to={"/"}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="75"
                    height="75"
                    x="0"
                    y="0"
                    viewBox="0 0 32 32"
                    style={{ enableBackground: 'new 0 0 512 512' }}
                    xmlSpace="preserve"
                    className=""
                >
                    <g>
                        <linearGradient
                            id="a"
                            x1="15.918"
                            x2="16.084"
                            y1="-.334"
                            y2="32.666"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopOpacity="1" stopColor="#b621fe" offset="0"></stop>
                            <stop stopOpacity="1" stopColor="#00b400" offset="0"></stop>
                        </linearGradient>
                        <linearGradient
                            xlinkHref="#a"
                            id="b"
                            x1="15.929"
                            x2="16.095"
                            y1="-.334"
                            y2="32.666"
                        ></linearGradient>
                        <g fillRule="evenodd">
                            <path
                                fill="url(#a)"
                                d="M16 1.5A14.5 14.5 0 1 0 30.5 16 14.507 14.507 0 0 0 16 1.5zm0 28A13.5 13.5 0 1 1 29.5 16 13.506 13.506 0 0 1 16 29.5z"
                                opacity="1"
                                dataOriginal="url(#a)"
                                className=""
                            ></path>
                            <path
                                fill="url(#b)"
                                d="M16.893 6.8a1.48 1.48 0 0 0-.864-.3h-.053a1.484 1.484 0 0 0-.869.3l-7.849 5.884a1.378 1.378 0 0 0 .827 2.481h.6v6.314a2.772 2.772 0 0 0 2.772 2.771h9.084a2.772 2.772 0 0 0 2.772-2.771v-6.314h.6a1.378 1.378 0 0 0 .827-2.481zm.878 16.452h-3.542v-5.18a.637.637 0 0 1 .635-.636h2.272a.637.637 0 0 1 .635.636zm6.5-9.343a.378.378 0 0 1-.359.258h-1.1a.5.5 0 0 0-.5.5v6.814a1.771 1.771 0 0 1-1.772 1.771h-1.769v-5.18a1.637 1.637 0 0 0-1.635-1.636h-2.272a1.637 1.637 0 0 0-1.635 1.636v5.178h-1.771a1.771 1.771 0 0 1-1.772-1.771v-6.814a.5.5 0 0 0-.5-.5h-1.1a.378.378 0 0 1-.227-.681L15.707 7.6A.489.489 0 0 1 16 7.5h.02a.482.482 0 0 1 .273.1l7.849 5.886a.379.379 0 0 1 .132.421z"
                                opacity="1"
                                dataOriginal="url(#b)"
                                className=""
                            ></path>
                        </g>
                    </g>
                </svg>
            </Link>

        </div >
    )
}
