import sergeyImg from "../assets/Sergey.jpg";
import annaImg from "../assets/Anna.jpg";
import artemImg from "../assets/Artem.jpg";

const team = [
  {
    name: "Sergey",
    nick: "sidoryakasergey",
    github: "https://github.com/sidoryakasergey",
    img: sergeyImg,
  },
  {
    name: "Anna",
    nick: "annaDzig",
    github: "https://github.com/annaDzig",
    img: annaImg,
  },
  {
    name: "Artem",
    nick: "dzzuze",
    github: "https://github.com/dzzuze",
    img: artemImg,
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-stone-200 pt-8">
      <div className="flex-1 p-10 pb-15">
        <h1 className="text-4xl font-bold text-center mb-5 text-black">
          Team👋🐱Members
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              <div className="h-96 w-full">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="mb-4 text-xl font-bold text-black">
                  {member.name}
                  <br></br>
                  <span
                    className="inline-block
  bg-gradient-to-r from-[#1e40af] via-[#7e22ce] to-[#be185d] 
  bg-[length:200%_auto] animate-gradient 
  bg-clip-text text-transparent "
                  >
                    {member.nick}
                  </span>
                </h3>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-[#141b21] text-white font-semibold py-2 px-6 rounded-xl 
               hover:bg-[#141b21] hover:scale-105 hover:shadow-lg 
               active:scale-95 transition-all duration-300 ease-in-out"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 fill-current inline-block"
                    xmlns="http://www.w3.org"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
