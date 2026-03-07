// Cursor
const c1 = document.getElementById("c1"),
  c2 = document.getElementById("c2");
let mx = 0,
  my = 0,
  cx = 0,
  cy = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  c1.style.left = mx + "px";
  c1.style.top = my + "px";
});
(function anim() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  c2.style.left = cx + "px";
  c2.style.top = cy + "px";
  requestAnimationFrame(anim);
})();

document.querySelectorAll("a,button").forEach((el) => {
  el.addEventListener("mouseenter", () =>
    document.body.classList.add("cur-hover"),
  );
  el.addEventListener("mouseleave", () =>
    document.body.classList.remove("cur-hover"),
  );
});

// Progress bar
window.addEventListener("scroll", () => {
  const p =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById("pg").style.width = p + "%";
});

// Skills modal
const overlay = document.getElementById("overlay");
function openModal() {
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(animateSkills, 300);
}
function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("skillsBtn").addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});
document.getElementById("skillsBtn2").addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});
document.getElementById("closeModal").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("on"));
    document.querySelectorAll(".pane").forEach((p) => p.classList.remove("on"));
    tab.classList.add("on");
    document.getElementById("pane-" + tab.dataset.tab).classList.add("on");
    setTimeout(animateSkills, 50);
  });
});

function animateSkills() {
  document.querySelectorAll(".pane.on .sk").forEach((sk, i) => {
    sk.classList.remove("shown");
    setTimeout(() => {
      sk.classList.add("shown");
    }, i * 70);
  });
}

// Intersection observer for links
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(
          () => e.target.classList.add("shown"),
          e.target.dataset.i * 80,
        );
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".lk").forEach((el, i) => {
  el.dataset.i = i;
  io.observe(el);
});
