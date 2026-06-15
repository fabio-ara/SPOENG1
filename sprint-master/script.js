const STORAGE_KEY = "sprint-master-projects";
const projectForm = document.querySelector("#project-form");
const projectsList = document.querySelector("#projects-list");
const emptyState = document.querySelector("#projects-empty-state");
const feedback = document.querySelector("#form-feedback");
const totalProjects = document.querySelector("#total-projects");
const projectsWithDeadline = document.querySelector("#projects-with-deadline");
const nextDeadline = document.querySelector("#next-deadline");

let projects = loadProjects();

function loadProjects() {
  try {
    const rawProjects = localStorage.getItem(STORAGE_KEY);

    if (!rawProjects) {
      return [];
    }

    const parsedProjects = JSON.parse(rawProjects);
    return Array.isArray(parsedProjects) ? parsedProjects : [];
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
    return [];
  }
}

function saveProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function deleteProject(projectId) {
  projects = projects.filter((project) => project.id !== projectId);
  saveProjects();
  renderDashboard();
  renderProjects();
  setFeedback("Projeto excluido.");
}

function generateId() {
  return `project-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createProject({ name, description, deadline }) {
  return {
    id: generateId(),
    name,
    description,
    deadline,
    activities: [],
    createdAt: new Date().toISOString()
  };
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sem prazo definido";
  }

  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function getNextDeadline(projectItems) {
  const datedProjects = projectItems
    .filter((project) => project.deadline)
    .sort((firstProject, secondProject) => firstProject.deadline.localeCompare(secondProject.deadline));

  return datedProjects[0] || null;
}

function renderDashboard() {
  const projectsWithDate = projects.filter((project) => project.deadline);
  const closestProject = getNextDeadline(projects);

  totalProjects.textContent = String(projects.length);
  projectsWithDeadline.textContent = String(projectsWithDate.length);
  nextDeadline.textContent = closestProject
    ? `${formatDate(closestProject.deadline)}`
    : "Nenhum";
}

function renderProjects() {
  projectsList.innerHTML = "";

  if (projects.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const sortedProjects = [...projects].sort((firstProject, secondProject) => {
    if (firstProject.deadline && secondProject.deadline) {
      return firstProject.deadline.localeCompare(secondProject.deadline);
    }

    if (firstProject.deadline) {
      return -1;
    }

    if (secondProject.deadline) {
      return 1;
    }

    return secondProject.createdAt.localeCompare(firstProject.createdAt);
  });

  sortedProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const header = document.createElement("div");
    header.className = "project-card__header";

    const titleGroup = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "project-card__title";
    title.textContent = project.name;

    const description = document.createElement("p");
    description.className = "project-card__description";
    description.textContent = project.description || "Sem descricao informada.";

    titleGroup.append(title, description);

    const actions = document.createElement("div");
    actions.className = "project-card__actions";

    const status = document.createElement("span");
    status.className = "project-card__status";
    status.textContent = "0%";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "icon-button";
    deleteButton.setAttribute("aria-label", `Excluir projeto ${project.name}`);
    deleteButton.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M4 7h16"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 4h6l1 3H8z"/>
        <path d="M6 7l1 12h10l1-12"/>
      </svg>
    `;
    deleteButton.addEventListener("click", () => {
      deleteProject(project.id);
    });

    actions.append(status, deleteButton);
    header.append(titleGroup, actions);

    const meta = document.createElement("div");
    meta.className = "project-card__meta";

    const deadlineTag = document.createElement("span");
    deadlineTag.className = "project-tag";
    deadlineTag.textContent = `Prazo: ${formatDate(project.deadline)}`;

    const progressTag = document.createElement("span");
    progressTag.className = "project-tag";
    progressTag.textContent = "Progresso: 0%";

    meta.append(deadlineTag, progressTag);
    card.append(header, meta);
    projectsList.append(card);
  });
}

function setFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.classList.toggle("form-feedback--error", isError);
}

function handleProjectSubmit(event) {
  event.preventDefault();

  const formData = new FormData(projectForm);
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const deadline = String(formData.get("deadline") || "").trim();

  if (!name) {
    setFeedback("Informe o nome do projeto antes de salvar.", true);
    return;
  }

  const newProject = createProject({ name, description, deadline });
  projects.push(newProject);
  saveProjects();
  renderDashboard();
  renderProjects();
  projectForm.reset();
  setFeedback("Projeto salvo com sucesso.");
}

projectForm.addEventListener("submit", handleProjectSubmit);

renderDashboard();
renderProjects();
