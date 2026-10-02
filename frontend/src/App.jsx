import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://portfolio-cms-project-ml3o.onrender.com/api";

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/profile/`)
      .then((response) => {
        if (response.data.length > 0) {
          setProfile(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Profile error:", error);
      });

    axios
      .get(`${API_URL}/skills/`)
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Skills error:", error);
      });

    axios
      .get(`${API_URL}/projects/`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Projects error:", error);
      });

    axios
      .get(`${API_URL}/education/`)
      .then((response) => {
        setEducation(response.data);
      })
      .catch((error) => {
        console.error("Education error:", error);
      });

    axios
      .get(`${API_URL}/experience/`)
      .then((response) => {
        setExperience(response.data);
      })
      .catch((error) => {
        console.error("Experience error:", error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setFormMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/contact/`,
        formData
      );

      if (response.data.success) {
        setFormMessage("Message sent successfully! ✅");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact error:", error);

      setFormMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="portfolio">

      {/* Navigation */}
      <nav className="navbar">
        <h2>Sneha</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        {profile && (
          <>
            <p className="hello">
              Hello, I'm
            </p>

            <h1>
              {profile.name}
            </h1>

            <h2>
              {profile.title}
            </h2>

            <p className="hero-bio">
              {profile.bio}
            </p>

            <div className="hero-buttons">

              <a
                href="#contact"
                className="button"
              >
                Contact Me
              </a>

              <a
                href="/resume.pdf"
                className="button resume-button"
                target="_blank"
                rel="noreferrer"
              >
                Download Resume
              </a>

            </div>
          </>
        )}
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2>About Me</h2>

        {profile && (
          <div className="about-card">
            <p>
              {profile.bio}
            </p>

            <div className="about-details">
              <p>
                <strong>Location:</strong>{" "}
                {profile.location}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {profile.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {profile.phone}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <h2>My Skills</h2>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              className="skill-card"
              key={skill.id}
            >
              <h3>
                {skill.name}
              </h3>

              <p>
                {skill.level}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <h2>My Projects</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              className="project-card"
              key={project.id}
            >
              <h3>
                {project.title}
              </h3>

              <p>
                {project.description}
              </p>

              <p>
                <strong>
                  Technologies:
                </strong>{" "}
                {project.technologies}
              </p>

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <h2>Education</h2>

        <div className="education-grid">
          {education.map((item) => (
            <div
              className="education-card"
              key={item.id}
            >
              <h3>
                {item.degree}
              </h3>

              <h4>
                {item.institution}
              </h4>

              <p>
                {item.year}
              </p>

              <p>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section">
        <h2>Experience</h2>

        <div className="experience-grid">
          {experience.map((item) => (
            <div
              className="experience-card"
              key={item.id}
            >
              <h3>
                {item.role}
              </h3>

              <h4>
                {item.company}
              </h4>

              <p>
                {item.start_date} -{" "}
                {item.end_date || "Present"}
              </p>

              <p>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="section contact"
      >
        <h2>Contact Me</h2>

        <p>
          Have a question or want to work together?
          Send me a message.
        </p>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="button"
            disabled={sending}
          >
            {sending
              ? "Sending..."
              : "Send Message"}
          </button>

          {formMessage && (
            <p className="form-message">
              {formMessage}
            </p>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 Sneha Kancharla.
          All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;

