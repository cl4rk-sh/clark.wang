import Image from "next/image";
import { H1, H3, H4, Paragraph } from "./ui/Text";
import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

export default function MainCard() {
  return (
    <section className="max-w-[44rem] w-full bg-gradient-to-b from-slate-600/60 to-slate-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-secondary/40">
      <div className="flex gap-5 max-sm:flex-col relative z-50">
        <Image
          src="/image.png"
          alt="Clark Wang"
          width={120}
          height={120}
          className="rounded-xl aspect-square !w-32 !h-32 min-w-[128px] max-sm:!w-28 max-sm:!h-28 max-sm:!min-w-[112px]"
        />
        <div>
          <H1 className="text-white tracking-wider drop-shadow-glow !mb-2">
            Clark Wang
          </H1>
          <H4 className="text-secondary !mb-4">
            <Typewriter
              words={[
                "Web Developer",
                "AI Researcher",
                "Lab Assistant",
                "Student Pilot",
              ]}
              loop={-1}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </H4>
          <Paragraph className="text-white !font-extralight">
            Hi, I'm Clark. I'm a web developer and currently in high school.
            I've been coding for over 8 years, focusing on web development for
            the past 2 years using NextJS as my preferred framework. I also have
            experience in backend development.
          </Paragraph>
          <Paragraph className="text-white !font-extralight">
            Besides web development, I work as a laboratory assistant at
            Stanford Medical School, where I used my web development skills to
            design a resource database for neurodivergent individuals.
          </Paragraph>
          <Paragraph className="text-white !font-extralight">
            Currently, I'm actively learning about AI safety with a focus on
            rainbow teaming @ Virtue AI as an intern.
          </Paragraph>
          <Paragraph className="text-white !font-extralight">
            Additionally, I'm working towards obtaining my private pilot license
            at Cloud Aviation.
          </Paragraph>
        </div>
      </div>
      <div className="flex gap-5 mt-5 text-white justify-center">
        <a
          href="https://www.instagram.com/cl4rk.sh/"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-300 hover:scale-125 hover:drop-shadow-glow transition-all"
        >
          <Instagram size={32} />
        </a>
        <a
          href="https://github.com/cl4rk-sh"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-300 hover:scale-125 hover:drop-shadow-glow transition-all"
        >
          <Github size={32} />
        </a>
        <a
          href="https://www.linkedin.com/in/clark-wang-aa729226a/"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-300 hover:scale-125 hover:drop-shadow-glow transition-all"
        >
          <Linkedin size={32} />
        </a>
        <a
          href="https://www.youtube.com/channel/UCTRQvq12BjF7XZb3smtA1WA"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-300 hover:scale-125 hover:drop-shadow-glow transition-all"
        >
          <Youtube size={32} />
        </a>
        <a
          href="mailto:me@clark.wang"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-300 hover:scale-125 hover:drop-shadow-glow transition-all"
        >
          <Mail size={32} />
        </a>
      </div>
    </section>
  );
}
