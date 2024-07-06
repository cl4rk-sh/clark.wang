import { FC } from "react";
// import favicon
import profile from '../assets/profile.jpeg';

// import icons
import { AiFillInstagram, AiFillGithub, AiFillLinkedin, AiFillYoutube, AiFillMail } from "react-icons/ai";

interface btnProps {
    type: string;
    link: string;
};

const SocialBtn: FC<btnProps> = (props) => {
    return (
        // conditional rendering for social media buttons
        <a href={props.link} target="_blank" className="text-3xl text-zinc-600">
            {props.type === "instagram" && <AiFillInstagram />}
            {props.type === "github" && <AiFillGithub />}
            {props.type === "linkedin" && <AiFillLinkedin />}
            {props.type === "youtube" && <AiFillYoutube />}
            {props.type === "mail" && <AiFillMail />}
        </a>
    )
};

interface IProps { };

const Landing: FC<IProps> = () => {
    return (
        <div>
            <div className="flex gap-x-8 max-sm:flex-col">
                <img src={profile} alt="profile" className="w-44 h-44 object-fill rounded-lg" />
                <div className="flex-1 flex-col h-fit sm:mt-auto max-sm:mt-8">
                    <h1 className="font-semibold text-left text-zinc-800 text-5xl">Clark Wang</h1>
                    <p className="text-left text-xl text-zinc-600 font-medium mt-5">Web Developer • Student Pilot </p>
                    <div className="mt-4 flex flex-row gap-x-2">
                        <SocialBtn type="instagram" link="https://www.instagram.com/cl4rk.sh/" />
                        <SocialBtn type="github" link="https://github.com/cl4rk-sh" />
                        <SocialBtn type="linkedin" link="https://www.linkedin.com/in/clark-wang-aa729226a/" />
                        <SocialBtn type="youtube" link="https://www.youtube.com/channel/UCTRQvq12BjF7XZb3smtA1WA" />
                        <SocialBtn type="mail" link="mailto:me@clark.wang" />
                    </div>
                </div>
            </div>

            <div className="border-b my-8 border-zinc-300" />

            {/* About */}
            <div className="flex-1 flex-col h-fit">
                <h2 className="font-semibold text-left text-zinc-800 mt-auto">About Me</h2>
                <p className="text-left text-lg text-zinc-600 mt-3">
                    Hi, I’m Clark, a 16-year-old web developer and student pilot. I have been coding for over half of my life, and done things like game development and app design; however, I eventually decided to focus on web development. 
                </p>
                <p className="text-left text-lg text-zinc-600 mt-3">
                    Currently, I work as a lab assistant for a professor at Stanford Medical School, where I am developing a database website for neurodivergent individuals. Additionally, I am serving as CTO at UNHRD.xyz and building a real estate startup with Zach Derhake. 
                </p>
            </div>
        </div>
    )
};

export default Landing;