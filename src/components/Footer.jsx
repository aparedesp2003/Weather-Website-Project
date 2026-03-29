import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 pb-6 text-center text-sm text-gray-300 border-t border-white/10 pt-6">
      <p>
        Built by <span className="font-semibold text-white">Andres Paredes</span>
      </p>

        <p className="mt-1">
            © {new Date().getFullYear()} • React • Tailwind CSS • OpenWeather API
        </p>

      <div className="mt-4 flex justify-center gap-6 text-xl">
        <a
          href="https://github.com/aparedesp2003"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-white hover:scale-110"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/andresparedesp/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-white hover:scale-110"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;