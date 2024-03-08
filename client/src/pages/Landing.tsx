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
            <div className="flex gap-x-8">
                <img src={profile} alt="profile" className="w-44 h-44 object-fill rounded-lg" />
                <div className="flex-1 flex-col h-fit mt-auto">
                    <h1 className="font-semibold text-left text-zinc-800 text-5xl mt-auto">Clark Wang</h1>
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

            {/* About */}
            <div className="flex-1 flex-col h-fit mt-8">
                <h2 className="font-semibold text-left text-zinc-800 mt-auto">About Me</h2>
                <p className="text-left text-lg text-zinc-600 mt-3">
                    Hi, I'm Clark. I'm currently 15 years old, and I'm a web developer and student pilot. I've been coding for almost half my life. Over the years, I have explored game development, app design, and eventually decided to focus on web development. I am currently working at Stanford Medical School as a lab assistant, developing a database for neurodivergent individuals. I have a few side projects, and I am also working on a startup with my co-founder, Zach Derhake.
                </p>
            </div>

            {/* What is this site for? */}
            <div className="flex-1 flex-col h-fit mt-8">
                <h2 className="font-semibold text-left text-zinc-800 mt-auto">What this site is and is not for? </h2>
                <p className="text-left text-lg text-zinc-600 mt-3">
                    This site serves as a platform to document my journey as a web developer and startup founder. I will be sharing my projects, thoughts, and experiences here. My goal is to look back on this site in a few years and see how much I've grown, while also hoping to inspire others to pursue their passions. (This is not a portfolio site, maybe I will build one in the future.)
                </p>
            </div>
        </div>
    )
};

export default Landing;