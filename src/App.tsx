
import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import "./App.css";

type Course = {
  id: number;
  title: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  lessons: number;
  description: string;
  instructor: string;
  accent: string;
  symbol: string;
  featured?: boolean;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Verilog HDL: From Zero to RTL",
    category: "RTL Design",
    level: "Beginner",
    price: 399,
    duration: "8 hours",
    lessons: 32,
    description:
      "Learn digital design fundamentals, Verilog syntax, combinational logic, sequential circuits and RTL coding through practical examples.",
    instructor: "Siva Reddy",
    accent: "blue",
    symbol: "01",
    featured: true,
  },
  {
    id: 2,
    title: "SystemVerilog for Verification",
    category: "Verification",
    level: "Intermediate",
    price: 599,
    duration: "12 hours",
    lessons: 42,
    description:
      "Explore SystemVerilog data types, interfaces, testbenches, assertions and verification fundamentals.",
    instructor: "VLSI Telugu Team",
    accent: "purple",
    symbol: "SV",
    featured: true,
  },
  {
    id: 3,
    title: "Physical Design Fundamentals",
    category: "Physical Design",
    level: "Beginner",
    price: 999,
    duration: "10 hours",
    lessons: 36,
    description:
      "Understand the physical design flow, floorplanning, placement, clock tree synthesis and routing.",
    instructor: "Siva Reddy",
    accent: "green",
    symbol: "PD",
  },
  {
    id: 4,
    title: "Static Timing Analysis (STA)",
    category: "Physical Design",
    level: "Intermediate",
    price: 999,
    duration: "9 hours",
    lessons: 30,
    description:
      "Build your understanding of timing paths, setup and hold checks, slack, constraints and timing reports.",
    instructor: "VLSI Telugu Team",
    accent: "orange",
    symbol: "STA",
  },
  {
    id: 5,
    title: "Digital Electronics Essentials",
    category: "Digital Design",
    level: "Beginner",
    price: 399,
    duration: "6 hours",
    lessons: 24,
    description:
      "Revise number systems, Boolean algebra, logic gates, multiplexers, flip-flops, counters and FSMs.",
    instructor: "Siva Reddy",
    accent: "cyan",
    symbol: "DE",
  },
  {
    id: 6,
    title: "VLSI Interview Preparation",
    category: "Interview Prep",
    level: "All levels",
    price: 399,
    duration: "5 hours",
    lessons: 20,
    description:
      "Practice core VLSI concepts, commonly asked technical questions and interview-focused revision topics.",
    instructor: "VLSI Telugu Team",
    accent: "pink",
    symbol: "Q&A",
  },
];

const categories = [
  "All Courses",
  "RTL Design",
  "Verification",
  "Physical Design",
  "Digital Design",
  "Interview Prep",
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Courses");
  const [level, setLevel] = useState("All Levels");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
  const savedTheme = localStorage.getItem("vlsi-theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("vlsi-theme", nextTheme);
  }
  
const [chipRotate, setChipRotate] = useState({ x: 0, y: 0 });

  function handleChipMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setChipRotate({
      x: (0.5 - y) * 20,
      y: (x - 0.5) * 20,
    });
  }

  function resetChipRotation() {
    setChipRotate({ x: 0, y: 0 });
  }

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Courses" || course.category === category;

      const matchesLevel =
        level === "All Levels" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  function showDemoNotice(course: Course) {
    setNotice(
      `"${course.title}" is a demo course listing. Student enrollment and payments will be added in a later stage.`,
    );
    setSelectedCourse(null);
  }

  return (
    <div className="site-shell" data-theme={theme}>
      <div className="announcement">
        <span className="announcement-dot" />
        Learn VLSI concepts in Telugu. Build your skills, one lesson at a time.
      </div>

      <header className="navbar">
        <a href="#home" className="brand" aria-label="VLSI Telugu home">
          <span className="brand-mark">V</span>
          <span className="brand-copy">
            <strong>VLSI Telugu</strong>
            <small>LEARN · DESIGN · GROW</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
          <a href="#learning" onClick={() => setMenuOpen(false)}>Why VLSI Telugu?</a>
          <a href="#instructors" onClick={() => setMenuOpen(false)}>Instructors</a>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title="Switch theme"
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <a className="nav-cta" href="#courses">
          Explore courses <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-icon">✳</span>
              YOUR VLSI LEARNING JOURNEY STARTS HERE
            </div>

            <h1>
              Turn your VLSI
              <br />
              <span>curiosity into</span>
              <br />
              <span className="gradient-text">capability.</span>
            </h1>

            <p className="hero-description">
              Understand complex chip design concepts in a simpler way.
              Learn in Telugu, strengthen your fundamentals, and prepare
              for your next step in the semiconductor industry.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#courses">
                Explore all courses <span>→</span>
              </a>
              <a className="button button-secondary" href="#learning">
                Discover our approach
              </a>
            </div>

            <div className="hero-trust">
              <div className="avatar-stack" aria-hidden="true">
                <span>S</span>
                <span>V</span>
                <span>+</span>
              </div>
              <div>
                <strong>Built for aspiring chip designers</strong>
                <small>Learn at your own pace, step by step.</small>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Illustration of a semiconductor chip">
            <div className="circuit circuit-a" />
            <div className="circuit circuit-b" />
            <div className="chip-orbit orbit-one" />
            <div className="chip-orbit orbit-two" />

           <div
                className="chip"
                onMouseMove={handleChipMouseMove}
                onMouseLeave={resetChipRotation}
                style={{
                  transform: `perspective(800px) rotateX(${chipRotate.x}deg) rotateY(${chipRotate.y}deg)`,
                }}
              >
              <div className="chip-inner">
                <div className="chip-topline">VLSI TELUGU</div>
                <div className="chip-symbol">V</div>
                <div className="chip-bottomline">SEMICONDUCTOR LEARNING</div>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon icon-blue">⌘</span>
              <span><strong>RTL Design</strong><small>Build the logic</small></span>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon icon-green">⌁</span>
              <span><strong>Physical Design</strong><small>Shape the silicon</small></span>
            </div>

            
          </div>

          
        </section>

        <section className="learning-strip" id="learning">
          <div className="learning-intro">
            <span className="section-kicker">THE VLSI TELUGU APPROACH</span>
            <h2>Complex concepts.<br /><span>Clear explanations.</span></h2>
          </div>

          <div className="benefit">
            <span className="benefit-icon">⌘</span>
            <h3>Build fundamentals</h3>
            <p>Understand the concepts behind digital design and chip development.</p>
          </div>

          <div className="benefit">
            <span className="benefit-icon">◈</span>
            <h3>Learn step by step</h3>
            <p>Follow a structured path from essential topics to advanced concepts.</p>
          </div>

          <div className="benefit">
            <span className="benefit-icon">↗</span>
            <h3>Prepare for industry</h3>
            <p>Develop knowledge relevant to VLSI roles and technical interviews.</p>
          </div>
        </section>

        <section className="courses-section" id="courses">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR NEXT STEP STARTS HERE</span>
              <h2>Explore our <span>courses.</span></h2>
              <p>Find a topic that matches your interests and current skill level.</p>
            </div>
            <div className="course-count">
              <strong>{filteredCourses.length.toString().padStart(2, "0")}</strong>
              <span>COURSES SHOWN</span>
            </div>
          </div>

          <div className="catalog-toolbar">
            <div className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses or topics..."
                aria-label="Search courses"
              />
              {search && (
                <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>
              )}
            </div>

            <label className="level-filter">
              <span>Level:</span>
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>All levels</option>
              </select>
            </label>
          </div>

          <div className="category-list" aria-label="Filter courses by category">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-chip active" : "category-chip"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="course-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className={`course-cover cover-${course.accent}`}>
                  <div className="cover-grid" />
                  <div className="cover-top">
                    <span className="cover-brand">VLSI<span>.</span> TELUGU</span>
                    <span className="cover-code">COURSE / {String(course.id).padStart(2, "0")}</span>
                  </div>
                  <div className="cover-art">
                    <span className="cover-symbol">{course.symbol}</span>
                    <div className="cover-lines"><i /><i /><i /></div>
                  </div>
                  <div className="cover-bottom">
                    <span>ENGINEERING SERIES</span>
                    <span>VT — 2026</span>
                  </div>
                  {course.featured && <span className="featured-tag">FEATURED</span>}
                </div>

                <div className="course-body">
                  <div className="course-meta">
                    <span className="course-category">{course.category}</span>
                    <span className="course-level">{course.level}</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  <div className="course-stats">
                    <span>◷ {course.duration}</span>
                    <span>▤ {course.lessons} lessons</span>
                  </div>

                  <div className="course-footer">
                    <div className="course-price">
                      <small>COURSE PRICE</small>
                      <strong>₹{course.price.toLocaleString("en-IN")}</strong>
                    </div>
                    <button className="course-button" onClick={() => setSelectedCourse(course)}>
                      View course <span>↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No matching courses found</h3>
              <p>Try another keyword or reset your filters.</p>
              <button
                className="button button-primary"
                onClick={() => { setSearch(""); setCategory("All Courses"); setLevel("All Levels"); }}
              >
                Reset filters
              </button>
            </div>
          )}

          <p className="catalog-note">
            These are sample listings for the website prototype. Final course availability,
            prices, instructors and syllabuses must be confirmed before launch.
          </p>
        </section>

        <section className="instructors-section" id="instructors">
          
          <div className="instructors-copy mentor-profile">
            <div className="mentor-photo">
              <img
                src="images/shiva.jpg"
                alt="Mentor portrait placeholder"
              />
            </div>

            <div className="mentor-details">
              <span className="section-kicker">MEET THE MIND BEHIND VLSI TELUGU</span>
              <h2>Vanga Siva Reddy</h2>
              <span className="mentor-role">VLSI Telugu Founder &amp; Mentor</span>
              <p>
                Explore VLSI with Siva Reddy through clear explanations,
                practical insights, and a passion for semiconductor technology.
                Build strong fundamentals and grow with confidence.
              </p>
            </div>
          </div>


          <div className="instructor-feature">
            <div className="instructor-monogram">VT<span>.</span></div>
            <div className="instructor-feature-text">
              <span>About Us</span>
              <h3>VLSI Telugu Team</h3>
              <p>Learn with us as we build a community around chip design and semiconductor education.</p>
            </div>
            <div className="instructor-decoration">VLSI</div>
          </div>
        </section>

        <section className="bottom-cta">
          <div>
            <span className="section-kicker">YOUR JOURNEY. YOUR PACE.</span>
            <h2>Ready to explore the world of VLSI?</h2>
            <p>Start with the fundamentals and keep building your knowledge.</p>
          </div>
          <a className="button button-dark" href="#courses">Browse the catalog <span>→</span></a>
        </section>
      </main>

      <footer className="footer">
        <div>Copyright © 2026 VLSI Telugu</div>
      </footer>

      {selectedCourse && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedCourse(null);
        }}>
          <section className="course-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelectedCourse(null)} aria-label="Close course details">×</button>
            <div className={`modal-cover cover-${selectedCourse.accent}`}>
              <span>VLSI TELUGU · COURSE PREVIEW</span>
              <strong>{selectedCourse.symbol}</strong>
            </div>
            <span className="section-kicker">{selectedCourse.category}</span>
            <h2 id="modal-title">{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <div className="modal-facts">
              <span>◷ {selectedCourse.duration}</span>
              <span>▤ {selectedCourse.lessons} lessons</span>
              <span>◎ {selectedCourse.level}</span>
            </div>
            <div className="modal-price">
              <div><small>DEMO LISTING PRICE</small><strong>₹{selectedCourse.price.toLocaleString("en-IN")}</strong></div>
              <button className="button button-primary" onClick={() => showDemoNotice(selectedCourse)}>
                Enroll <span>→</span>
              </button>
            </div>
            
          </section>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss message">×</button>
        </div>
      )}
    </div>
  );
}

export default App;
