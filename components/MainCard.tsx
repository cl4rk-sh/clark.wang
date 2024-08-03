import Image from "next/image";
import { H1, Paragraph } from "./ui/Text";
import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

export default function MainCard() {
    return (
        <section className="max-w-[44rem] w-full bg-gradient-to-b from-slate-600/60 to-slate-800/60 backdrop-blur-lg rounded-2xl shadow-lg !shadow-white/40 p-6">
          <div className="flex gap-5">
            <Image src="/image.png" alt="Clark Wang" width={120} height={120} className="rounded-xl aspect-square !w-32 !h-32 min-w-[128px] max-sm:!w-28 max-sm:!h-28 max-sm:!min-w-[112px]" />
            <div>
              <H1 className="text-white tracking-wider drop-shadow-glow">Clark Wang</H1>
              <Paragraph className="text-white !font-extralight">Hi, I'm Clark. I am a 16-year-old web developer and a Junior in high school. I have been coding for over 8 years and moved towards web development 2 years ago, with NextJS as my web framework of choice. I also have experience in backend development.</Paragraph>
              <Paragraph className="text-white !font-extralight">Currently, I am actively learning about AI safety, specifically focusing on rainbow teaming. Additionally, I am working towards obtaining my private pilot license at Cloud Aviation.</Paragraph>
              <Paragraph className="text-white !font-extralight">Apart from web development, I work as a laboratory assistant at Stanford Medical School, where I used my web development skills to design a resource database for neurodivergent individuals.</Paragraph>
            </div>
          </div>
          <div className="flex gap-5 mt-5 text-white justify-center">
            <a href="https://www.instagram.com/cl4rk.sh/" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-2 duration-200 hover:drop-shadow-glow transition-all">
              <Instagram size={32} />
            </a>
            <a href="https://github.com/cl4rk-sh" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-2 duration-200 hover:drop-shadow-glow transition-all">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/clark-wang-aa729226a/" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-2 duration-200 hover:drop-shadow-glow transition-all">
              <Linkedin size={32} />
            </a>
            <a href="https://www.youtube.com/channel/UCTRQvq12BjF7XZb3smtA1WA" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-2 duration-200 hover:drop-shadow-glow transition-all">
              <Youtube size={32} />
            </a>
            <a href="mailto:me@clark.wang" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-2 duration-200">
              <Mail size={32} />
            </a>
          </div>
        </section>
    )
}