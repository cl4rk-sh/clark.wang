import { H2, Paragraph } from "@/components/ui/Text";
import { Image } from "@nextui-org/react";
import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="fixed w-full h-full bg-violet-950 bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: "url('/background.svg')",
      }}>
        <section className="max-w-[44rem] w-full bg-gradient-to-b from-slate-600/60 to-slate-800/60 backdrop-blur-lg rounded-2xl shadow-lg !shadow-white/40 p-6">
          <div className="flex gap-5">
            <Image src="/image.png" alt="Clark Wang" width={120} height={120} className="rounded-xl aspect-square !w-[120px] !h-[120px] min-w-[120px]" />
            <div>
              <H2 className="text-white tracking-wider">Clark Wang</H2>
              <Paragraph className="text-white">Hi, I’m Clark. I am a 16-year-old web developer and a Junior in high school. I have been coding for over 8 years, with NextJS as my web framework of choice. I also have experience in backend development.</Paragraph>
              <Paragraph className="text-white">Currently, I am actively learning about AI safety, specifically focusing on rainbow teaming. Additionally, I am working towards obtaining my private pilot license at Cloud Aviation.</Paragraph>
              <Paragraph className="text-white">Apart from web development, I work as a laboratory assistant at Stanford Medical School, where I used my web development skills to design a resource database for neurodivergent individuals.</Paragraph>
            </div>
          </div>
          <div className="flex gap-5 mt-5 text-white justify-center">
            <a href="https://www.instagram.com/cl4rk.sh/" target="_blank" rel="noopener noreferrer">
              <Instagram size={32} />
            </a>
            <a href="https://github.com/cl4rk-sh" target="_blank" rel="noopener noreferrer">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/clark-wang-aa729226a/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={32} />
            </a>
            <a href="https://www.youtube.com/channel/UCTRQvq12BjF7XZb3smtA1WA" target="_blank" rel="noopener noreferrer">
              <Youtube size={32} />
            </a>
            <a href="mailto:me@clark.wang" target="_blank" rel="noopener noreferrer">
              <Mail size={32} />
            </a>
          </div>
        </section>
      </div> 
    </main>
  );
}
