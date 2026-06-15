const STORAGE_KEY = "sprint-master-projects";
const projectForm = document.querySelector("#project-form");
const projectsList = document.querySelector("#projects-list");
const emptyState = document.querySelector("#projects-empty-state");
const feedback = document.querySelector("#form-feedback");
const totalProjects = document.querySelector("#total-projects");
const totalActivities = document.querySelector("#total-activities");
const completedActivities = document.querySelector("#completed-activities");
const overallProgress = document.querySelector("#overall-progress");
const projectCardTemplate = document.querySelector("#project-card-template");
const VALID_STATUSES = ["a fazer", "andando", "concluído"];
const LEGACY_STATUS_MAP = {
  concluido: "concluído"
};

let projects = loadProjects();

function loadProjects() {
  try {
    const rawProjects = localStorage.getItem(STORAGE_KEY);

    if (!rawProjects) {
      return [];
    }

    const parsedProjects = JSON.parse(rawProjects);

    if (!Array.isArray(parsedProjects)) {
      return [];
    }

    return parsedProjects.map((project) => ({
      ...project,
      activities: Array.isArray(project.activities)
        ? project.activities.map((activity) => ({
            ...activity,
            status: LEGACY_STATUS_MAP[activity.status] || activity.status || "a fazer"
          }))
        : []
    }));
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
  setFeedback("Projeto excluído.");
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

function createActivity({ title, responsible }) {
  return {
    id: generateId(),
    title,
    responsible,
    status: "a fazer"
  };
}

function updateActivityStatus(projectId, activityId, newStatus) {
  if (!VALID_STATUSES.includes(newStatus)) {
    return;
  }

  projects = projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      activities: project.activities.map((activity) => (
        activity.id === activityId
          ? { ...activity, status: newStatus }
          : activity
      ))
    };
  });

  saveProjects();
  renderDashboard();
  renderProjects();
}

function deleteActivity(projectId, activityId) {
  projects = projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      activities: project.activities.filter((activity) => activity.id !== activityId)
    };
  });

  saveProjects();
  renderDashboard();
  renderProjects();
}

function addActivity(projectId, { title, responsible }) {
  const activity = createActivity({ title, responsible });

  projects = projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      activities: [...project.activities, activity]
    };
  });

  saveProjects();
  renderDashboard();
  renderProjects();
}

function calculateProjectProgress(project) {
  const total = project.activities.length;

  if (total === 0) {
    return 0;
  }

  const completed = project.activities.filter((activity) => activity.status === "concluído").length;
  return Math.round((completed / total) * 100);
}

function calculateTotals() {
  const activityCount = projects.reduce((sum, project) => sum + project.activities.length, 0);
  const completedCount = projects.reduce(
    (sum, project) => sum + project.activities.filter((activity) => activity.status === "concluído").length,
    0
  );

  return {
    activityCount,
    completedCount,
    overallPercent: activityCount === 0 ? 0 : Math.round((completedCount / activityCount) * 100)
  };
}

function renderDashboard() {
  const totals = calculateTotals();

  totalProjects.textContent = String(projects.length);
  totalActivities.textContent = String(totals.activityCount);
  completedActivities.textContent = String(totals.completedCount);
  overallProgress.textContent = `${totals.overallPercent}%`;
}

function createStatusSelect(projectId, activity) {
  const select = document.createElement("select");
  select.className = "activity-status";
  select.setAttribute("aria-label", `Status da atividade ${activity.title}`);

  VALID_STATUSES.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    option.selected = activity.status === status;
    select.append(option);
  });

  select.addEventListener("change", (event) => {
    updateActivityStatus(projectId, activity.id, event.target.value);
  });

  return select;
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
    const cardFragment = projectCardTemplate.content.cloneNode(true);
    const card = cardFragment.querySelector(".project-card");
    const title = cardFragment.querySelector(".project-card__title");
    const description = cardFragment.querySelector(".project-card__description");
    const status = cardFragment.querySelector(".project-card__status");
    const deadlineTag = cardFragment.querySelector(".project-deadline-tag");
    const progressTag = cardFragment.querySelector(".project-progress-tag");
    const deleteButton = cardFragment.querySelector(".project-delete-button");
    const activityCounter = cardFragment.querySelector(".activities__counter");
    const activityForm = cardFragment.querySelector(".activity-form");
    const projectIdField = cardFragment.querySelector('input[name="projectId"]');
    const activityList = cardFragment.querySelector(".activity-list");
    const activityEmptyState = cardFragment.querySelector(".activities-empty-state");
    const progress = calculateProjectProgress(project);

    title.textContent = project.name;
    description.textContent = project.description || "";
    description.hidden = !project.description;
    status.textContent = `${progress}%`;
    deadlineTag.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2"/>
        <path d="M8 3v4M16 3v4M4 10h16"/>
      </svg>
      <span>${formatDate(project.deadline)}</span>
    `;
    progressTag.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 4a8 8 0 1 1-8 8"/>
        <path d="M12 4v8h8"/>
      </svg>
      <span>${progress}%</span>
    `;
    activityCounter.textContent = `${project.activities.length} item(ns)`;
    projectIdField.value = project.id;

    deleteButton.setAttribute("aria-label", `Excluir projeto ${project.name}`);
    deleteButton.addEventListener("click", () => {
      deleteProject(project.id);
    });

    activityForm.addEventListener("submit", handleActivitySubmit);

    if (project.activities.length === 0) {
      activityEmptyState.hidden = false;
    } else {
      activityEmptyState.hidden = true;

      project.activities.forEach((activity) => {
        const item = document.createElement("li");
        item.className = "activity-item";

        const itemHead = document.createElement("div");
        itemHead.className = "activity-item__head";

        const copy = document.createElement("div");
        const activityTitle = document.createElement("div");
        activityTitle.className = "activity-item__title";
        activityTitle.textContent = activity.title;

        const responsible = document.createElement("p");
        responsible.className = "activity-item__responsible";
        responsible.innerHTML = `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5"/>
            <path d="M5 19a7 7 0 0 1 14 0"/>
          </svg>
          <span>${activity.responsible}</span>
        `;

        copy.append(activityTitle, responsible);

        const controls = document.createElement("div");
        controls.className = "activity-item__controls";

        const statusSelect = createStatusSelect(project.id, activity);

        const deleteActivityButton = document.createElement("button");
        deleteActivityButton.type = "button";
        deleteActivityButton.className = "icon-button";
        deleteActivityButton.setAttribute("aria-label", `Excluir atividade ${activity.title}`);
        deleteActivityButton.innerHTML = `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M4 7h16"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 4h6l1 3H8z"/>
            <path d="M6 7l1 12h10l1-12"/>
          </svg>
        `;
        deleteActivityButton.addEventListener("click", () => {
          deleteActivity(project.id, activity.id);
        });

        controls.append(statusSelect, deleteActivityButton);
        itemHead.append(copy, controls);
        item.append(itemHead);
        activityList.append(item);
      });
    }

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

function handleActivitySubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const projectId = String(formData.get("projectId") || "");
  const title = String(formData.get("title") || "").trim();
  const responsible = String(formData.get("responsible") || "").trim();

  if (!title || !responsible) {
    setFeedback("Informe título e responsável da atividade.", true);
    return;
  }

  addActivity(projectId, { title, responsible });
  setFeedback("Atividade adicionada com sucesso.");
}

projectForm.addEventListener("submit", handleProjectSubmit);

renderDashboard();
renderProjects();
