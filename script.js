(function () {
  // footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // mobile nav
  const btn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // catalog search + filter
  const search = document.getElementById("catalogSearch");
  const grid = document.getElementById("catalogGrid");
  const chips = document.querySelectorAll(".chip");

  if (grid && (search || chips.length)) {
    let activeFilter = "all";

    function apply() {
      const q = (search?.value || "").trim().toLowerCase();
      const cards = grid.querySelectorAll(".card-book");

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const tags = (card.getAttribute("data-tags") || "").toLowerCase();

        const matchesQuery = !q || text.includes(q) || tags.includes(q);
        const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);

        card.style.display = (matchesQuery && matchesFilter) ? "" : "none";
      });
    }

    if (search) {
      search.addEventListener("input", apply);
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeFilter = chip.getAttribute("data-filter") || "all";
        apply();
      });
    });

    apply();
  }
})();
