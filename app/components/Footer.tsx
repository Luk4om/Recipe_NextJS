import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-[#2E2E2E] text-white py-8 w-full">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo + Description */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                    <Image
                        src="https://lh3.googleusercontent.com/a/ACg8ocImc8m6AhcMN974sPbfbP-Hy1W5_WgypIx55w50QWarpA=s288-c-no"
                        alt="me"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <p className="font-bold text-lg">
                        PCRP Industries Ltd.
                    </p>
                    <p className="text-sm text-gray-300">
                        Providing food advice services since 2003
                    </p>
                    <p className="text-sm text-gray-400">
                        © 2023 - All rights reserved
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center md:items-end gap-2">
                    <h2 className="text-lg font-semibold">Social</h2>
                    <div className="flex gap-4">
                        <a
                            className="hover:text-blue-400 transition"
                            href="https://www.facebook.com/HallsXII"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook size={24} className="hover:text-blue-400" />
                        </a>
                        <a
                            className="hover:text-pink-400 transition"
                            href="https://www.instagram.com/luk._.aom/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram size={24} className="hover:text-pink-400" />
                        </a>
                        <a
                            className="hover:text-red-500 transition"
                            href="https://www.youtube.com/channel/UCpFv37rd2_Lev-GzDLznEiw"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Youtube size={24} className="hover:text-red-500" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
